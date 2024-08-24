import { asyncHandler } from "../Utils/asyncHandler.js";
import { users } from "../DataSeeders/author50.js";
import User from "../Models/user.model.js";
import apiResponse from "../Utils/apiResponse.js";
import { testPosts } from "../DataSeeders/post50.js";
import bcryptjs from 'bcryptjs';
import Post from "../Models/post.model.js";
import apiError from "../Utils/apiError.js";


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
                // //     })
                
                
                
                const posts = [...new Set(testPosts)];
                
                const fetchedUser = await User.find({});
                const seededPost = posts.map((post)=>{
                    const random = Math.floor((Math.random()*fetchedUser.length));
                    const {password, refreshToken, resetPasswordToken, ...author} = fetchedUser[random]?._doc;
                    
                    post.author = author;
                    Post.create(post)
                    .then((post)=>{
                        User.findById(post?.author?._id)
                        .then((user)=>{
                            if(!user){
                                throw new apiError(404, "creator of post doesn't exist")
                            }
                            
                            user.posts.push(post)   ;
                            user.save();
                            console.log(user)
                        })
                        .catch(err=>next(err))
                    })
                    .catch(err=>next(err))
                    return post
                })
                res.status(200).json(new apiResponse(200, "post seeded", seededPost));
                // return;
                
                // console.log(posts)
                // // return;
                // Post.insertMany(posts)
                // .then((posts)=>{
                    //     // console.log(users);
                    //     res.status(200)
                    //         .json(
                        //             new apiResponse(200, "posts seeded", {"posts list: " : posts, "length: ": posts.length})
                        //         )
                        // })
                        // .catch(err=>next(err))
                        
                        
                        
                    })
                    
                    export const seededPostDeleter = asyncHandler(async(req, res, next)=>{
                        await Post.deleteMany({})
                .then((post)=>
                    res.status(200).json(new apiResponse(200, "post deleted", post))
            )
            .catch(err=>next(err))
            
        })

  
