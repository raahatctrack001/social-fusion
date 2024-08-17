// import { resourceLimits } from "worker_threads";
import { response } from "express";
import Post from "../Models/post.model.js"
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";

export const createPost = asyncHandler(async (req, res, next)=>{
    // console.log(req.body)
    // return;
    if(!req.user){
        throw new apiError(401, "Unauthorized! please login")
    }
    const { title, content, category } = req.body;
    if([title, content, category].some(field=>field?.trim()?0:1)){
        throw new apiError(404, "Title of Content for post is missing!")
    }

    try {
        // const files = req.files;
        // let fileURLs = [];

        // for(let i = 0; i < files.length; i++){
        //     const response = await uploadOnCloudinary(files[i].path);
        //     fileURLs.push(response)
        // }   

        // fileURLs.forEach(file=>console.log("files", file))
        
        await Post.create({
            title,
            content,
            category,
            // imagesURLs: fileURLs,
            author: req.user?._id
        })
        .then((post)=>{
            if(!post){
                throw new apiError(417, "Failed to upload the post!, plz try again")
            }
            post.thumbnail.push(req.body.thumbnail);
            post.save();
            User.findById(req.user?._id)
                .then((user)=>{
                    if(!user){
                        throw new apiError(404, "creator of post doesn't exist")
                    }

                    user.posts.push(post);
                    user.save();
                })
                .catch(err=>next(err))
            res
                .status(200)
                .json(
                    new apiResponse(200, "post uploaded", post)
                )
        })
        .catch(error=>next(error))

    } catch (error) {
       next(error) 
    }
})

export const searchPosts = asyncHandler(async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        // ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
            { category: { $regex: req.query.searchTerm, $options: 'i' } },
            // { author: { $regex: req.query.searchTerm, $options: 'i' } }
          ],
        }),
      })
        .populate("author") //fix bug: sensitive data is being sent!
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalPosts = await Post.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    }
  });

export const getPosts = asyncHandler(async (req, res, next)=>{
    try {        
        await Post
            .find({})
            .populate("author") //fix this ... password and refresh token is getting exposed!                                                                                                 
            // .skip(19)
            // .limit(10)
            .then((posts)=>{
                // console.log(posts)
                if(posts.length == 0){
                    throw new apiError(404, "posts doesn't exist!")
                }
                res
                    .status(200)
                    .json(
                        new apiResponse(200, "posts fetched!, Populating", posts)
                    )
            })
            .catch(error=>next(error));
    } catch (error) {
        next(error)
    }
})

export const getPost = asyncHandler(async (req, res, next)=>{
    try {
        await Post
            .findById(req.params?.postId)
            .populate("comments")
            .populate("author")
            .then((post)=>{
                if(!post){
                    throw new apiError(404, "post doesn't exists!")
                }
                return res
                        .status(200)
                        .json(
                            new apiResponse(200, "post fetched!", post)
                        )
            })
            .catch(error=>next(error))
    } catch (error) {
        next(error);
    }
})

export const deletePost = asyncHandler(async (req, res, next)=>{

    try {
        const postToDelete = await Post.findById(req.params?.postId).populate("author")
        if(!postToDelete){
            throw new apiError(404, "post to be deleted doesn't exist");
        }
        if(req.user?._id != postToDelete?.author?._id){
            throw new apiError(401, "Unauthorized Attempt!, You can only delete you own post")
        }
        await Post
            .findByIdAndDelete(req.params?.postId)
            .then((post)=>{
                res
                    .status(200)
                    .json(
                        new apiResponse(200,  `post with title "${post.title}" is deleted`, post)
                    )

            })
            .catch(error=>next(error))

    } catch (error) {
        next(error)
    }

})

export const likePost = asyncHandler(async(req, res, next)=>{
    const { userId, postId } = req.params;
    try {
        if(req.user?._id !== userId){
            throw new apiError(401, "Please sign in to interact with posts")
        }

        const currentPost = await Post.findById(postId);
        const currentUser = await User.findById(userId);

        if(!currentPost){
            throw new apiError(404, "post doesn't exist");
        }

        if(!currentUser){
            throw new apiError(404, "user doesn't exist");
        }

        const likes = currentPost.likes;
        const index = likes.findIndex(item => item._id == userId);
        if (index != -1) {
            likes.splice(index, 1);
            currentUser.likes.splice(currentUser.likes.indexOf(postId), 1);
            await currentUser.save();
            await currentPost.save();
            return res
                .status(200)
                .json(
                    new apiResponse(200, "post unliked", {currentUser, currentPost})
                )
        }
        
        likes.push(userId)
        currentUser.likes.push(currentPost?._id);
        await currentUser.save();
        await currentPost.save();

        // console.log('reached at the end')
        return res
            .status(200)
            .json(
                new apiResponse(200, "post liked", {currentUser, currentPost})
            )
    } catch (error) {
        next(error)
    }
})

export const updatePost = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.user){
            throw new apiError(401, "Unauthorized! please login")
        }
        
        const { postId } = req.params;
    
        const postToUpdate = await Post.findById(postId);
        if(!postToUpdate){
            throw new apiError(404, "post doesn't exist");
        }
    
        if(req.user?._id != postToUpdate?.author){
            throw new apiError(401, "You can't edit this post")
        }
        
        const { title, content, category } = req.body;
        if([title, content, category].some(field=>field?.trim()?0:1)){
            throw new apiError(404, "Title or Content or Category is missing!")
        }
       
        const { thumbnail, ...rest } = req.body;
        
        const updatedPost = await Post.findByIdAndUpdate(postId, rest)
        if(!updatedPost){
            throw new apiError(500, "Failed to update post, try again later!")
        }    
        updatedPost.thumbnail.push(thumbnail);
        updatedPost.save();
    
        return res
            .status(200)
            .json(
                new apiResponse(200, "post updated!", updatedPost)
            )
    } catch (error) {
        next(error)
    }
        
        
})


export const allPostAnalytics = asyncHandler(async (req, res, next) => {
    const now = new Date();

    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14);

    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    try {
        const allPosts = await Post.find()
            .populate("author")
            .sort({ createdAt: -1 });

        const postsLastWeek = [];
        const postsLastTwoWeeks = [];
        const postsLastMonth = [];
        const postsLastThreeMonths = [];
        // const olderPosts = [];

        allPosts.forEach(post => {
            if (post.createdAt >= oneWeekAgo) {
                postsLastWeek.push(post);
                postsLastTwoWeeks.push(post); // Also add to last two weeks
                postsLastMonth.push(post); // Also add to last month
                postsLastThreeMonths.push(post); // Also add to last three months
            } else if (post.createdAt >= twoWeeksAgo) {
                postsLastTwoWeeks.push(post);
                postsLastMonth.push(post); // Also add to last month
                postsLastThreeMonths.push(post); // Also add to last three months
            } else if (post.createdAt >= oneMonthAgo) {
                postsLastMonth.push(post);
                postsLastThreeMonths.push(post); // Also add to last three months
            } else if (post.createdAt >= threeMonthsAgo) {
                postsLastThreeMonths.push(post);
            }
        });

        // Return the categorized posts
        return res
            .status(200)
            .json(
                new apiResponse(200, "post analytics has been retrieved", {
                    allPosts,
                    postsLastWeek,
                    postsLastTwoWeeks,
                    postsLastMonth,
                    postsLastThreeMonths,
                    // olderPosts,
                })
            );
    } catch (error) {
        next(error);
    }
});
