import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import ApiError  from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { userSchema } from "../Validators/zod.validator.js";

export const registerUser = asyncHandler(async (req, res, next)=>{
    const {username, email, fullName, password, isAdmin} = req.body;
    const userData = [username, email, fullName, password];
    
    try {
        if(userData.some(field=>field?.trim()?0:1)){
            throw new apiError(404, "All fields are necessary!");
        }
        
        const result = userSchema.safeParse({username, email, fullName, password})
        if(!result.success){
            console.log()
            throw new apiError(406, result?.error?.errors[0]?.message)
        }

        User
            .create({username, email, fullName, password, isAdmin})
            .then((newUser)=>{
                res.json(
                    new apiResponse(201, "new user created", newUser)
                )
            })
            .catch(error=>next(error))

    } catch (error) {
        next(error)
    }
})
export const loginUser = asyncHandler(async (req, res)=>{

})
export const logoutUser = asyncHandler(async (req, res)=>{

})
export   const resetPassword = asyncHandler(async (req, res)=>{

})
export const updatePassword = asyncHandler(async (req, res)=>{

})
export const googleLogin = asyncHandler(async (req, res)=>{

})
export const deleteUser = asyncHandler(async (req, res)=>{

})
