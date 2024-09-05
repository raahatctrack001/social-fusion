// import { resourceLimits } from "worker_threads";
// import { response } from "express";
import Post from "../Models/post.model.js"
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";
// import postSeederData from '../Controllers/posts.js'
export const createPost = asyncHandler(async (req, res, next)=>{
    // try {
    //     await Post.deleteMany({});
    //     const postWithAuthor = postSeederData.forEach(async (post)=>{
    //         const author = await User.find({email: post.author.email});
    //         const newPost = await Post.create({
    //             title: post.title,
    //             content: post.content,
    //             author: author[0]?._id,
    //             thumbnail: post.thumbnail[0],
    //             category: post.category,                
    //         })

    //         // console.log(newPost);
    //     })

    //     // You can now use postWithAuthor here
    //     console.log(postSeederData);
    // } catch (error) {
    //     console.error(error);
    // }
    //     return
        // const postsCreated = await Post.insertMany(postSeederData);
        // console.log(postsCreated)
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
                // post.thumbnail.push(req.body.thumbnail);
                // post.save();
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
    const { page } = req.params;
    try {        
        const totalCount = await Post.countDocuments({});

        await Post
            .find({})
            .populate("author") //fix this ... password and refresh token is getting exposed!                                                                                                 
            .skip((page-1)*9)
            .limit(9)
            .sort({createdAt: -1})
            .then((posts)=>{
                // console.log(posts)
                if(posts.length == 0){
                    throw new apiError(404, "posts doesn't exist!")
                }
                res
                    .status(200)
                    .json(
                        new apiResponse(200, "posts fetched!, Populating", {posts, totalCount})
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

export const getPostOfUser = asyncHandler(async (req, res, next)=>{
    const { userId } = req.params;
    try {
        if(!userId){
            throw new apiError(404, "userId is missing")
        }

        const posts = await Post.find({author: userId}).populate("author");
        if(posts.length === 0){
            throw new apiError(404, "no post found")
        }

        return res.status(200).json(new apiResponse(200, "posts of user is here!", posts));
    } catch (error) {
        next(error)
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
            currentUser.likedPosts.splice(currentUser.likedPosts.indexOf(postId), 1);
            currentPost.updatedAt = new Date(); // Update the timestamp
            await currentUser.save();
            await currentPost.save();
            return res
                .status(200)
                .json(
                    new apiResponse(200, "post unliked", {currentUser, currentPost})
                )
        }
        
        likes.push(userId)
        currentUser.likedPosts.push(currentPost?._id);
        currentPost.updatedAt = new Date(); // Update the timestamp

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
        
        const updatedPost = await Post.findByIdAndUpdate(postId, rest, {new: true})
        if(!updatedPost){
            throw new apiError(500, "Failed to update post, try again later!")
        }    
        updatedPost.thumbnail.push(thumbnail);
        await updatedPost.save();
    
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

export const savePost = asyncHandler (async (req, res, next)=>{
    // console.log(req.params)
    // return;
    const { postId, userId } = req.params;
    try {
        if(req.user?._id !== userId){
            throw new apiError(401, "Please sign in to save with post")
        }

        // const currentPost = await Post.findById(postId);
        const currentUser = await User.findById(userId);

        if(!currentUser){
            throw new apiError(404, "user doesn't exist");
        }

        if(currentUser?.savedPosts?.includes(postId)){
            currentUser?.savedPosts?.splice(currentUser?.savedPosts?.indexOf(postId), 1);
            await currentUser.save();
            return res
                .status(200)
                .json(
                    new apiResponse(200, "post unsaved!", currentUser)
                )
        }
        currentUser?.savedPosts?.push(postId);
        await currentUser.save();

        return res
            .status(200)
            .json(
                new apiResponse(200, "post saved!", currentUser)
            )

    } catch (error) {
        next(error)
    }
})

export const getSavedPosts = asyncHandler(async (req, res, next) => {
    // console.log(req.params);
    try {
        const { userId } = req.params;

        // Fetch user and populate savedPosts and the author field within each savedPost
        const user = await User.findById(userId)
            .populate({
                path: 'savedPosts',
                populate: {
                    path: 'author',  // Populate the author field within each savedPost
                    model: 'User'    // Ensure you specify the model name if it's not inferred
                }
            });

        if (!user) {
            throw new apiError(404, "User doesn't exist");
        }

        if (!user.savedPosts || user.savedPosts.length === 0) {
            throw new apiError(404, "No saved posts.");
        }

        return res
            .status(200)
            .json(new apiResponse(200, "Saved posts fetched", user.savedPosts));
    } catch (error) {
        next(error);
    }
});

export const toggleDisableComment = asyncHandler( async (req, res, next)=>{
    try {
        const currentPost = await Post.findById(req.params?.postId);
        if(!currentPost){
            throw  new apiError(404, "Post doesn't exist");
        }

        if(req.user?._id != currentPost?.author){
            throw new apiError(401, "unatauthorised attempt!")
        }
        const status = currentPost?.enableComments;
        currentPost.enableComments = !status;
        await currentPost?.save();
        const post = await currentPost.populate(["author", "comments"])
        return res.status(200).json(new apiResponse(200, `${!status ? " Comments enabled" : "Comments disabled"}`, post))


    } catch (error) {
        next(error);
    }
})

export const getFollowers = asyncHandler( async (req, res, next)=>{
    const { userId } = req.params;
    
    try {        
        const currentUser = await User.findById(userId).populate("followers");

        const followers = currentUser?.followers
        // console.log(followers)
        if(!followers){
            throw new apiError(404, "failed to fetch followings")
        }
        return res.status(200).json(new apiResponse(200, "followings fetcehd", followers));
    } catch (error) {
        next(error);
    }
})

export const getFollowings = asyncHandler( async (req, res, next)=>{
    const { userId } = req.params;
    
    try {        
        const currentUser = await User.findById(userId).populate("followings");

        const followings = currentUser?.followings
        // console.log(followings)
        if(!followings){
            throw new apiError(404, "failed to fetch followings")
        }
        return res.status(200).json(new apiResponse(200, "followings fetcehd", followings));
    } catch (error) {
        next(error);
    }
})

export const getLikersOfPost = asyncHandler (async (req, res, next)=>{
    try {
        const { postId } = req.params;
        if(!postId){
            throw new apiError(404, "postId is missing dude! jyada hoshiyar mat bano");
        }

        const currentPost = await Post.findById(postId).populate("likes");
        if(!currentPost){
            throw new apiError(404, "current post doesn't exist");
        }

        return res.status(200).json(new apiResponse(200, "likers fetched", currentPost.likes));

    } catch (error) {
        next(error)
    }
})

