import { asyncHandler } from "../Utils/asyncHandler.js";
import { users } from "../DataSeeders/author50.js";
import User from "../Models/user.model.js";
import apiResponse from "../Utils/apiResponse.js";
import { testPosts } from "../DataSeeders/post50.js";
import bcryptjs from 'bcryptjs';
import Post from "../Models/post.model.js";

export const userSeeder = asyncHandler(async (req, res, next)=>{
    // await User.deleteMany({})
    // .then((user)=>{
    //     res.status(200)
    //     .json(
    //         new apiResponse(200, "all user deleted", user)
    //     )
    // })
    // .catch(err=>next(err))
    // return;
    users.map((user)=>{
        user.password = bcryptjs.hashSync(user.password, 10);
    })
    await User.insertMany(users)
    .then((users)=>{
        // console.log(users);
        res.status(200)
            .json(
                new apiResponse(200, "users seeded", {"users list: " : users, "length: ": users.length})
            )
    })
    .catch(err=>next(err))

})

export const postSeeder = asyncHandler(async (req, res, next)=>{

    // await Post.find({})
    //     .then((posts)=>{
    //         res.status(200).json(new apiResponse(200, "posts fetched", posts))
    //     })
    // await Post.deleteMany({})
    //             .then((post)=>
    //                 res.status(200).json(new apiResponse(200, "post deleted", post))
    //             )
    //             .catch(err=>next(err))

    // return;


    const posts = [...new Set(testPosts)];
    
    const fetchedUser = await User.find({});
    posts.map((post)=>{
        const random = Math.floor((Math.random()*fetchedUser.length));
        post.author = fetchedUser[random];
    })

    // console.log(posts)
    await Post.insertMany(posts)
    .then((posts)=>{
        // console.log(users);
        res.status(200)
            .json(
                new apiResponse(200, "posts seeded", {"posts list: " : posts, "length: ": posts.length})
            )
    })
    .catch(err=>next(err))
    


})