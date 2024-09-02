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
        const { message } = req.body;
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
            content: message,
            status: "sent",
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
    console.log(req.params);
})