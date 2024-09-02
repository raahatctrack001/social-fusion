import mongoose from "mongoose";
import Conversation from "../../Models/messageSchema/conversation.model.js";
import User from "../../Models/user.model.js";
import apiError from "../../Utils/apiError.js";
import apiResponse from "../../Utils/apiResponse.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import { truncateSync } from "fs";

export const openOrCreateNewConverstaion = asyncHandler(async (req, res, next)=>{
    try {
        const { senderId, receiverId } = req.params;
        if(!senderId){
            throw new apiError(404, "senderId is missing");
        }

        if(!receiverId){
            throw new apiError(404, "receiverId is missing");
        }
        
        const conversation = await Conversation.find({ //private conversations only!
            isGroup: false,
            participants: {
                $all: [senderId, receiverId]
            }
        }).populate(["participants", "lastMessage"])         

        if(conversation.length === 0){
            const receiver = await User.findById(receiverId);
            const sender = await User.findById(senderId);

            if(!receiver){
                throw new apiError(404, "receiver doesn't exist");
            }
            
            if(!sender){
                throw new apiError(404, "sender doesn't exist");
            }

            const newConversation = await Conversation.create({
                name: [sender.fullName, receiver.fullName],
                participants: [senderId, receiverId],
                isGroup: false,
            })
            if(!newConversation){
                throw new apiError(500, "failed to create conversation, please try again later or report the problem at feedback")
            }
            const populatedConversation = await newConversation.populate("participants");

            return res.status(200).json(new apiResponse(200, `new conversation has been created with ${receiver.fullName}`, populatedConversation));
        }
        // const populatedConversation = await conversation.populate["pa]
        return res.status(202).json(new apiResponse(202, "opened existing conversation", conversation));
    } catch (error) {
        next(error)
    }
})

export const getAllConversationOfUser = asyncHandler(async (req, res, next)=>{
    // console.log(req.params);
    try {
        const { userId } = req.params;
        const conversations = await Conversation.find({
            isGroup: false,
            participants: {$elemMatch: {$eq: userId}}
        })
        .populate(["participants", "lastMessage"]);


        if(!conversations){
            throw new apiError(404, "no conversations found");
        }
        return res.status(200).json(new apiResponse(200, "conversations fetched", conversations));
    } catch (error) {
        next(error)
    }
})

export const getConversation = asyncHandler(async (req, res, next)=>{
    try {
        const { conversationId } = req.params;
        // console.log(conversationId)
        if(!conversationId){
            throw new apiError(404, "conversationId is missing")
        }

        const conversation = await Conversation.findById(conversationId).populate("participants");
        if(!conversation){
            throw new apiError(404, "conversation does't exist")
        }

        return res.status(200).json(new apiResponse(200, `current converstion between ${conversation.name[0]} and ${conversation.name[1]} has been fetched!`, conversation))
    } catch (error) {
        next(error)
    }
})