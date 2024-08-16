import Feedback from "../Models/feedback.model.js";
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const createFeedback = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.user){
            throw new apiError(404, "please sign in before sending feedback")
        }

        if(req.user?._id !== req.params?.authorId){
            throw new apiError(404, "please sign in before sending feedback")
        }
        const { subject, problem, solution } = req.body;
        if([subject, problem].some(field=>field?.trim()?0:1)){
            throw new apiError(404, "subject or problem is missing!")
        }

        const author = await User.findById(req.params?.authorId);
        console.log(author)
        if(!author){
            throw new apiError(404,"User doesn't exist")
        }

        const feedback =  await Feedback.create({
            subject,
            problem,
            solution,
            author
        })

        if(!feedback){
            throw new apiError(500, "failed to send feedback")
        }

        author?.feedback?.push(feedback);
        author?.save();

        return res
                .status(200)
                .json(
                    new apiResponse(200, "feedback sent!")
                )

    } catch (error) {
        next(error)
    }
})