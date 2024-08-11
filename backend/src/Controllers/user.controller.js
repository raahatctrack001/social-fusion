import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";
import { emailSchema, userSchema } from "../Validators/user.validator.js";
import bcryptjs from 'bcryptjs'

export const uploadProfilePicture = asyncHandler(async (req, res, next)=>{
    
    try {
        const response = await uploadOnCloudinary(req.file?.path)
        if(!response){
            throw new apiError(500, "failed to update profile")
        }

        const currentUser = await User.findById(req.params?.userId)
        if(!currentUser){
            throw new apiError(404, "user doesn't exist");
        }

        currentUser.profilePic = response.url;
        currentUser.save();
        res
            .status(200)
            .json(
                new apiResponse(200, "profile picture updated!", currentUser)
            )

    } catch (error) {
        next(error)
    }
})

export const updateUser = asyncHandler(async (req, res, next)=>{
    if(req.user?._id != req.params?.userId){
        throw new apiError(401, "Unothorized Attempt!")
    }
    const {username, email, fullName, password} = req.body;
    const userData = [username, email, fullName, password];
    
    try {
        if(userData.some(field=>field?.trim()?0:1)){
            throw new apiError(404, "All fields are necessary!");
        }

        if(emailSchema.safeParse(username).success){
            throw new apiError(403, "username and email shouldn't be similar")
        }
        
        const result = userSchema.safeParse({username, email, fullName, password})
        if(!result.success){
            throw new apiError(406, result?.error?.errors[0]?.message)
        }

        req.body.password = bcryptjs.hashSync(req.body.password)
        User
            .findByIdAndUpdate(req.params?.userId, req.body, {new: true})
            .then((updatedUser)=>{
                if(!updatedUser){
                    throw new apiError(403, "failed to update User")
                }
                res
                    .status(201)
                    .json(
                        new apiResponse(201, `welcome hoooooomannnnnn!!! ${updatedUser.fullName} what a change u've made... we appreciate it `, updatedUser)
                    )
                })
            .catch(error=>next(error))
    } catch (error) {
        next(error);
    }
})

export const getUsers = asyncHandler(async (req, res, next)=>{
    try {        
        await User
        .find({})
        .select("-password")
        .then((users)=>{
            if(!users){
                throw new apiError(404, "users doesn't exist")
            }
            
            const safeUsers = users.map((user) => {
                const { password, refreshToken, resetPasswordToken, ...safeUserData } = user._doc; 
                return safeUserData;
              });
            
            res
            .status(200)
            .json(
                new apiResponse(200, "users fetched", safeUsers)
                )
            })
        } catch (error) {
            next(error)
        }
})

export const getUser = asyncHandler(async (req, res, next)=>{
    try {        
        await User
        .findById(req.params?.userId)
        .then((user)=>{
            if(!user){
                throw new apiError(404, "user doesn't exist")
            }
            const {password, refreshToken, passwordResetToken, ...safeData} = user._doc;
            res
            .status(200)
            .json(
                new apiResponse(200, "user fetched", safeData)
                )
            })
        } catch (error) {
            next(error)
        }
})

export const deleteUser = asyncHandler(async (req, res, next)=>{
    try {
       
        if(req.user?._id != req.params?.userId){
            throw new apiError(401, "Unauthorized attempt!")
        }

        await User
            .findByIdAndDelete(req.params?.userId)
            .then((deletedUser)=>{
                if(!deletedUser){
                    throw new apiError(404, "error deleting user");
                }

                res 
                    .status(200)
                    .json(
                        new apiResponse(200, `${deletedUser.fullName} is deleted`, deletedUser)
                    )
            })
    } catch (error) {
        next(error)
    }
})

export const followUnfollow = asyncHandler(async (req, res, next)=>{

    // followerId: one who is following someone
    // followingId: one who is followed by follower

    const { followerId, followingId } = req.params;
    try {
        const follower = await User.findById(followerId);
        const following = await User.findById(followingId);
        const indexOfFollower = follower.followings.indexOf(following?._id)
        const indexOfFollowing = following.followers.indexOf(follower?._id);


        if(indexOfFollowing != -1){
            follower.followings.splice(indexOfFollower, 1);
            following.followers.splice(indexOfFollowing, 1);
        }
        else{
            follower.followings.push(following?._id);
            following.followers.push(follower?._id);
        }
        // console.log(indexOfFollower);
        // console.log(indexOfFollowing);
        
        // return;
        // follower.followings.push(following);
        // following.followers.push(follower);
        follower.save();
        following.save();
        return res.status(200).json(
            new apiResponse(200, `${follower.fullName} followed ${following.fullName}`, {
                "follower: ": follower,
                "follwing: ": following
            })
        )
    } catch (error) {
        next(error)
    }
})

export const unfollow = asyncHandler(async (req, res, next)=>{

})