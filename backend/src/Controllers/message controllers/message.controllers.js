import Conversation from "../../Models/messageSchema/conversation.model.js";
import Message from "../../Models/messageSchema/message.model.js";
import User from "../../Models/user.model.js";
import apiError from "../../Utils/apiError.js";
import apiResponse from "../../Utils/apiResponse.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";

export const sendPrivateMessage = asyncHandler(async (req, res, next)=>{
    // console.log(req.params);
    // console.log(req.body);
    // return;
    try {
        const { senderId, receiverId, conversationId } = req.params;
        const { message, mediaURL, mediaType, } = req.body;
        if(!message && !mediaURL){
            throw new apiError(404, "Please type message or send some media")
        }
        if(!senderId){
            throw new apiError(404, "senderId is misssing");
        }
        
        if(!receiverId){
            throw new apiError(404, "receiverId is misssing");
        }
        
        if(!conversationId){
            throw new apiError(404, "conversationId is misssing");
        }

        if(!message || !message.trim()){
            throw new apiError(404, "message content is missing")
        }

        // const sender = await User.findById(senderId);
        // const receiver = await User.findById(receiverId);
        // const conversation = await Conversation.findById(conversationId);

        // console.log(sender?.fullName);
        // console.log(receiver?.fullName);
        // console.log(conversation.name);
        // return;
        
        const createMessage = await Message.create({
            sender: senderId,
            receivers: [receiverId],
            conversation: conversationId,
            content: message || "",
            status: "sent",
            mediaURL: mediaURL || "",
            mediaTypes: mediaType || "none"            
        })
        // console.log("sent message: ", createMessage);
        if(!createMessage){
            throw new apiError(500, "failed to send message!");
        }

        const conversation = await Conversation.findByIdAndUpdate(conversationId, {
            $set: {
                lastMessage: createMessage, // as in schema its objectId not string
            }
        },{new: true}).populate(["participants", "lastMessage"])
        
        if(!conversation){
            throw new apiError(404, "failed to udpate conversation!")
        }
        
        return res.status(200).json(new apiResponse(200, 'message sent', {message: createMessage, conversation}));
    } catch (error) {
        next(error)
    }
})

export const getAllMessageOfUserWithAnotherUser = asyncHandler(async (req, res, next)=>{
    try {
        const {senderId, receiverId, conversationId } = req.params;
        if([senderId, receiverId, conversationId].some(field=>field?0:1)){
            throw new apiError(404, "senderId or receiverId or conversationId is missing and is necessary for getting messages")
        }

        // const sender = await User.findById(senderId);
        // const receiver = await User.findById(receiverId);
        // const conversation = await Conversation.findById(conversationId);

        // console.log(sender.fullName, receiver.fullName, conversation.name);

        const messages = await Message.find({
            // sender: senderId,
            // receivers: {$elemMatch: {$eq: receiverId}},
            conversation: conversationId,
        }).sort({createdAt: -1})
        .limit(20);
        // console.log(messages)
        return res.status(200).json(new apiResponse(200, `${ messages.length === 0 ? "no conversations yet!" : "messages fetched" }`, messages.reverse()))


        
    } catch (error) {
        next(error);
    }
    
    
})

export const sendPost = asyncHandler(async (req, res, next)=>{
    try {
        const { senderId } = req.params;
        const {message, users, mediaURL, mediaType } = req.body;

        const conversations = await Promise.all(
            users.map(async (userId) => {
                return await Conversation.findOne({
                    participants: { $all: [senderId, userId], $size: 2 } // Ensures only two participants
                })
            })
        );

        // Filter out any null values if a conversation does not exist for a user
        const filteredConversations = conversations.filter(conversation => conversation !== null);
        console.log(filteredConversations)
        // Map each conversation to create a message and wait for all to complete
        const messages = await Promise.all(
            filteredConversations.map(async (conversation) => {
                const receiverId = senderId === conversation.participants[0].toString() ? 
                                   conversation.participants[1] : 
                                   conversation.participants[0];
            
                const createMessage = await Message.create({
                    sender: senderId,
                    receivers: [receiverId],
                    conversation: conversation._id,
                    content: message || "",
                    status: "sent",
                    mediaURL: mediaURL || "",
                    mediaTypes: mediaType || "none"
                });

                const updatedConverstaion = await Conversation.findByIdAndUpdate(conversation?._id, {
                    $set: {
                        lastMessage: createMessage, // as in schema its objectId not string
                    }
                },{new: true}).populate(["participants", "lastMessage"])
                
                if(!updatedConverstaion){
                    throw new apiError(404, "failed to udpate conversation!")
                }
                return createMessage;
            })
        );
        
        
        console.log("messaged sent", messages);
        return res.status(200).json(new apiResponse(200, 'message sent', messages));
    } catch (error) {
        next(error)
    }  
})