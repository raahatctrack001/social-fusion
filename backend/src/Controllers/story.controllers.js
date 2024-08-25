import Story from "../Models/story.model.js";
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";

export const uploadStory = asyncHandler(async (req, res, next)=>{ 
    // console.log("upload story hits");
    // return;     
    try {
        const { userId } = req.params;
        if(!userId){
            throw new apiError(404, "current user isn't logged in yet!, please login first to proceed")
        }

        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new apiError(404, "current user isn't logged in yet!, please login first to proceed")
        }

        const storyFiles = req.files;
        let stories = [];

        for(let i = 0; i < storyFiles.length; i++){
            const response = await uploadOnCloudinary(storyFiles[i]?.path)
            const newStory = await Story.create({
                user: currentUser?._id, 
                contentURL: response?.url, 
                type:response?.resource_type
            })
            console.log(newStory);
            stories.push(newStory);
        }
        if(stories.length === 0){
            throw new apiError(404, "failed to upload photo or no file selected!")
        }

        currentUser.stories = [...currentUser?.stories, ...stories];
        await currentUser.save();
        res
            .status(200)
            .json(
                new apiResponse(200, "Stories uploaded", {stories, currentUser}
                )
            )

    } catch (error) {
        next(error)
    }
})

export const getStoriesOfUser = asyncHandler(async (req, res, next)=>{
    try {
        console.log("inside get stories")
        const { userId } = req.params;
        if(!userId){
            throw new apiError(404, "UserId is missing")
        } 

        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new apiError(404, "User is missing")
        }
        const stories = await Story.find({user: currentUser});
        if(!stories){
            throw new apiError(404, "No recent stories")
        }
        

        return res.status(200).json(new apiResponse(200, "stories fetched", stories))
        
    } catch (error) {
        next(error)
    }
})