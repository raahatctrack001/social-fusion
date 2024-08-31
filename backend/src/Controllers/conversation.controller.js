import { asyncHandler } from "../Utils/asyncHandler.js";

export const createNewConversation = asyncHandler(async (req, res, next)=>{
    console.log(req.params)
})