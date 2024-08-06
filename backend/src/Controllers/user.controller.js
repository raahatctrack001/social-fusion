import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { emailSchema, userSchema } from "../Validators/user.validator.js";
import bcryptjs from 'bcryptjs'

export const uploadProfilePicture = asyncHandler(async (req, res, next)=>{
    console.log(req.files)
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
        .then((users)=>{
            if(!users){
                throw new apiError(404, "users doesn't exist")
            }
            
            res
            .status(200)
            .json(
                new apiResponse(200, "users fetched", users)
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
            
            res
            .status(200)
            .json(
                new apiResponse(200, "user fetched", user)
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