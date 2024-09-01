import mongoose from "mongoose";
import Conversation from "../../Models/messageSchema/conversation.model.js";
import User from "../../Models/user.model.js";
import apiError from "../../Utils/apiError.js";
import apiResponse from "../../Utils/apiResponse.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";

export const openOrCreateNewConverstaion = asyncHandler(async (req, res, next)=>{
    try {
        const { senderId, receiverId } = req.params;
        if(!senderId){
            throw new apiError(404, "senderId is missing");
        }

        if(!receiverId){
            throw new apiError(404, "receiverId is missing");
        }
        
        const conversation = await Conversation.find({
            isGroup: false,
            participants: {
                $all: [senderId, receiverId]
            }
        })            

        if(conversation.length === 0){
            const receiver = await User.findById(receiverId);
            if(!receiver){
                throw new apiError(404, "receiver doesn't exist")
            }
            const newConversation = await Conversation.create({
                name: receiver.fullName,
                participants: [senderId, receiverId],
                isGroup: false,
            })

            return res.status(200).json(new apiResponse(200, `new conversation has been created with ${receiver.fullName}`, newConversation));
        }

        return res.status(200).json(new apiResponse(200, "opened existing conversation", conversation));
    } catch (error) {
        next(error)
    }
})

export const getAllConversationOfSender = asyncHandler(async (req, res, next)=>{
    try {
        const { senderId } = req.params;
        const conversations = await Conversation.find({
            isGroup: false,
            participants: {$elemMatch: {$eq: senderId}}
        });

        console.log(conversations)
    } catch (error) {
        next(error)
    }
})