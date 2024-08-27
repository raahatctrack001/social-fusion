import HighlightModel from "../Models/story.highlight.model.js";
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
        console.log(stories)
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

        const currentUser = await User.findById(userId).populate("highlights");
        if(!currentUser){
            throw new apiError(404, "User is missing")
        }
        const stories = await Story.find({
            user:userId,
            createdAt: { $gt: new Date(Date.now() - 24*60*60*1000) } // all the documents whose date and timing are greater than 24 hours before now...
            //createdAt time should be greater than this given time
        
        })
        console.log(stories.length)
        if(!stories){
            throw new apiError(404, "No recent stories")
        }
        

        return res.status(200).json(new apiResponse(200, "stories fetched", {currentUser, stories}))
        
    } catch (error) {
        next(error)
    }
})

export const deleteStory = asyncHandler(async (req, res, next)=>{
    
})

export const createNewHighlights = asyncHandler(async (req, res, next) => {
    try {
        const { userId } = req.params;                      
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            throw new apiError(404, "Either userId is wrong or user doesn't exist.");
        }
        
        const { name, stories } = req.body;

        if (!name || name.trim() === '') {
            throw new apiError(400, "Highlight name is necessary!");
        }

        if (!stories || stories.length === 0) {
            throw new apiError(400, "No stories selected!");
        }

        const firstStory = await Story.findById(stories.split(',')[0]);
        if (!firstStory) {
            throw new apiError(404, "First story not found!");
        }

        const newHighlight = await HighlightModel.create({
            name,
            author: userId, // Directly using the userId
            thumbnail: firstStory.contentURL,
            stories: stories.split(','), // Assuming stories is an array of story IDs
        });

        if (!newHighlight) {
            throw new apiError(404, "Failed to create highlights");
        }
        currentUser.highlights.push(newHighlight);
        await currentUser.save();
        
        // const populatedHighlight = await HighlightModel.findById(newHighlight._id).populate('author');
        return res.status(200).json(new apiResponse(200, "New highlight has been created!", {currentUser, newHighlight} ));
    } catch (error) {
        next(error);
    }
});



export const getHeighlightStories = asyncHandler(async (req, res, next)=>{
    try {
        const { stories } = req.body;
        if(!stories.length){
            throw new apiError(404, "stories doesn't exist in this heighlights")
        }

        const fetchedStories = await Story.find({
            _id: { $in: stories.split(',') }
          });

        if(fetchedStories.length === 0){
            throw new apiError(404, "No stories exists in this highlights")
        }

        console.log(fetchedStories)
        return res.status(200).json(new apiResponse(200, "highlight stories fetched", fetchedStories))
        
    } catch (error) {
        next(error)
    }
})

export const deleteHighlight = asyncHandler( async(req, res, next)=>{
    console.log("control checkpoint 1")
    try {
        const { userId, highlightId } = req.params;
        if(!(userId && highlightId)){
            throw new apiError("userId or highlight story id is missing!")
        }
        console.log("control checkpoint 2")

        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new apiError(404, "user doesn't exist")
        }
        console.log("control checkpoint 3")

        const highlight = await HighlightModel.findById(highlightId);
        if(!highlight){
            throw new apiError(404, "highlight doesn't exist")
        }
        console.log("control checkpoint 4")

        const index = currentUser?.highlights.indexOf(highlight?._id)
        if(index != -1){
            currentUser?.highlights.splice(index, 1);
            await currentUser.save();
        }
        console.log("control checkpoint 5")

        const deletedHighlight = await HighlightModel.findByIdAndDelete(highlight?._id);
        if(!deletedHighlight){
            throw new apiError(404, "highlight doesn't exists")
        }
        console.log("control checkpoint 6")

        // console.log(deletedHighlight);
        return res.status(200).json(new apiResponse(200, `highlights with name ${deletedHighlight.name} is deleted`, {currentUser, deletedHighlight}))

    } catch (error) {
        next(error)
    }
})