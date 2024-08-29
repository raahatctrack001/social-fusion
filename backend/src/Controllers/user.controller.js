import { upload } from "../Middlewares/multer.middleware.js";
import Story from "../Models/story.model.js";
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";
import { emailSchema, updateUserSchema, userSchema } from "../Validators/user.validator.js";
import bcryptjs from 'bcryptjs'

export const uploadProfilePicture = asyncHandler(async (req, res, next) => {
    try {
      const response = await uploadOnCloudinary(req.file?.path);
  
      if (!response || !response.url) {
        throw new apiError(500, "Failed to upload profile picture to Cloudinary");
      }
  
      const user = await User.findByIdAndUpdate(
        req.params?.userId,
        {
          $push: {
            profilePic: response.url,
          },
        },
        { new: true }
      );
  
      if (!user) {
        throw new apiError(404, "User doesn't exist");
      }
  
      const currentUser = await user.populate("posts");
  
      res.status(200).json(
        new apiResponse(200, "Profile picture updated successfully!", currentUser)
      );
    } catch (error) {
      next(error);
    }
  });  

export const removeProfilePicture = asyncHandler(async (req, res, next)=>{
    try {
        const { userId } = req.params;
        if(req.user?._id !== userId){
            throw new apiError(404, "userId is missing")
        }

        const currentUser = await User.findByIdAndUpdate(userId, {            
            $push: {
                profilePic: 'https://cdn4.sharechat.com/img_964705_8720d06_1675620962136_sc.jpg?tenant=sc&referrer=tag-service&f=136_sc.jpg'
            },
        }, {new: true});
        if(!currentUser){
            throw new apiError(404, "user id is missing or user doesn't exist")
        }

        return res.status(200).json(new apiResponse(200, "profle pic removed", currentUser));

    } catch (error) {
        next(error)
    }
})

export const updateUser = asyncHandler(async (req, res, next)=>{
    if(req.user?._id != req.params?.userId){
        throw new apiError(401, "Unothorized Attempt!")
    }
    const {username, email, fullName, bio} = req.body;
    const userData = [username, email, fullName];
    
    try {
        if(userData.some(field=>field?.trim()?0:1)){
            throw new apiError(404, "All fields are necessary!");
        }

        if(emailSchema.safeParse(username).success){
            throw new apiError(403, "username and email shouldn't be similar")
        }
        
        const result = updateUserSchema.safeParse({username, email, fullName, bio})
        if(!result.success){
            throw new apiError(406, result?.error?.errors[0]?.message)
        }

        // req.body.password = bcryptjs.hashSync(req.body.password)
        User
            .findByIdAndUpdate(req.params?.userId, req.body, {new: true})
            .then((updatedUser)=>{
                if(!updatedUser){
                    throw new apiError(403, "failed to update User")
                }
                res
                    .status(201)
                    .json(
                        new apiResponse(201, `Hoooooomannnnnn!!! ${updatedUser.fullName} what a change u've made... we appreciate it `, updatedUser)
                    )
                })
            .catch(error=>next(error))
    } catch (error) {
        next(error);
    }
})

export const getUsers = asyncHandler(async (req, res, next)=>{
    const page = 1;
    try {        
        await User
        .find({})
        .skip((page-1)*10)
        .limit(10)
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
        .populate("posts")
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

export const imageUpload = asyncHandler(async (req, res, next)=>{
    try {
        const response = await uploadOnCloudinary(req.file?.path)
        if(!response){
            throw new apiError(500, "failed to upload image")
        }
        res
            .status(200)
            .json(
                new apiResponse(200, "image updloaded!", response)
            )

    } catch (error) {
        next(error)
    }
})

export const toggleFollowUser = asyncHandler(async (req, res, next) => {
    if (!req?.user) {
        throw new apiError(401, "First sign in to follow");
    }

    const { followId } = req.params;
    if (followId == req?.user?._id) {
        throw new apiError(409, "You can't follow yourself!");
    }
    try {
        const currentUser = await User.findById(req?.user?._id);
        const followUser = await User.findById(followId);

        const indexOfFollowUser = currentUser?.followings.indexOf(followUser?._id);
        const indexOfCurrentUser = followUser?.followers?.indexOf(currentUser?._id);
        
        if (indexOfFollowUser !== -1) {
            // Remove just the one element
            currentUser?.followings?.splice(indexOfFollowUser, 1);
            followUser?.followers?.splice(indexOfCurrentUser, 1);

            await currentUser.save();
            await followUser.save();

            return res
                .status(200)
                .json(
                    new apiResponse(200, `You unfollowed ${followUser?.fullName}`, {follower: currentUser, following: followUser})
                );
        }

        currentUser.followings.push(followUser?._id);
        followUser.followers.push(currentUser?._id);
    
        await currentUser.save();
        await followUser.save();

        res
            .status(200)
            .json(
                new apiResponse(200, `You started following ${followUser?.fullName}`, {follower: currentUser, following: followUser})
            );
    
    } catch (error) {
        next(error);
    }
});

export const toggleOnlineStatus = asyncHandler( async (req, res, next)=>{
    try {
        const { userId } = req.params;
        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new apiError(404, "userr doesn't exist")
        }
        console.log(req.body)
        
        currentUser.isActive = req.body?.status;
        currentUser.lastActive = new Date();                                    

        await currentUser.save();
        return res.status(200).json(new apiResponse(200, `${ req.body?.status ? "Offline" : "Online" }`, currentUser))
    } catch (error) {
        next(error)
    }
})

const markUsersOffline = async () => {
    const offlineThreshold = new Date(Date.now() - 2 * 60 * 1000); // 2 minutes ago
    console.log('Offline Threshold:', offlineThreshold);
  
    try {
      // Find users who haven't been active in the last 2 minutes
      const inactiveUsers = await User.find({
        lastActive: { $lt: offlineThreshold },
        isActive: true,
      }).exec();
  
      console.log('Users to mark offline:', inactiveUsers);
  
      // Mark those users as offline
      const result = await User.updateMany(
        { lastActive: { $lt: offlineThreshold }, isActive: true },
        { $set: { isActive: false } }
      );
  
      console.log('Update result:', result);
      console.log(`${result.nModified || result.modifiedCount} users marked as offline.`);
    } catch (error) {
      console.error('Error marking users as offline:', error);
    }
  };
  
  // Run the offline check every minute
  setInterval(markUsersOffline, 60000);
  