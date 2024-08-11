import User from "../Models/user.model.js";
import { 
    generateAccessAndRefreshToken, 
    options 
} from "../Tokens/loginTokens.js";
import apiError from "../Utils/apiError.js";
import ApiError  from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { 
    asyncHandler 
} from "../Utils/asyncHandler.js";
import { 
    emailSchema, 
    passwordSchema, 
    uniqueIdValidator, 
    userSchema 
} from "../Validators/user.validator.js";
import jwt from 'jsonwebtoken'


export const registerUser = asyncHandler(async (req, res, next)=>{
    const {username, email, password, repeatPassword, fullName} = req.body;
    if(password !== repeatPassword){
        throw new apiError (404, "Password and confirm password should be same!")
    }
    
    const userData = [username, email, password, repeatPassword, fullName];
    
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

        User
            .create(req.body)
            .then((newUser)=>{
                if(!newUser){
                    throw new apiError(401, "failed to register user");
                }
                console.log("newUser", newUser);
                const {password, refreshToken, resetPasswordToken, ...data} = newUser._doc;

                console.log("data", data);
                res
                    .status(201)
                    .json(
                        new apiResponse(201, `welcome hoooooomannnnnn!!! Human with name ${newUser.fullName} is in the team now!`, data)
                    )
                })
            .catch(error=>next(error))

    } catch (error) {
        next(error)
    }
})

export const loginUser = asyncHandler(async (req, res, next)=>{
    const {userEmail, password: pass} = req.body;
    
    try {
        const query = uniqueIdValidator(userEmail);
        await User
        .findOne(query)
        // .select("-password -refreshToken")
        .then((user)=>{
                if(user){
                    if(!user.isPasswordCorrect(pass)){
                        throw new apiError(403, "password didn't matched!")
                    }
                    
                    const {password, refreshToken, resetPasswordToken, ...userData} = user._doc
                    generateAccessAndRefreshToken(user)
                       .then((tokens)=>{
                            const { accessToken, refreshToken } = tokens;
                            res
                            .status(202)
                            .cookie('accessToken', accessToken, options)
                            .cookie('refreshToken', refreshToken, options)
                            .json(
                                new apiResponse(202, "user logged in", userData)
                            )                        
                        })
                       .catch(err=>next(err))
                }
                else{
                    throw new apiError(404, "user not found!")
                }
                
            })
            .catch(error=>next(error))            
    } catch (error) {
        console.log(error)
        next(error);
    }

})

export const logoutUser = asyncHandler(async (req, res, next)=>{
    try {
        const currentUser = await User
            .findByIdAndUpdate(req.user?._id, {
                $set: {
                    refreshToken: 1,
                },
                
            },
            {
                new: true
            }
        )
        console.log(currentUser);
        return res
                .status(200)
                .clearCookie('accessToken', options)
                .clearCookie('refreshToken', options)
                .json(
                    new apiResponse(200, "user logged out", {})
                )
        
    } catch (error) {
        next(error)
    }
})

export   const resetPassword = asyncHandler(async (req, res, next)=>{
})

export const updatePassword = asyncHandler(async (req, res, next)=>{
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {        
        if(newPassword !== confirmPassword){
            throw new apiError(404, "password didn't match");
        }
        
        const result = passwordSchema.safeParse(newPassword);
        if(!result.success){        
            throw new apiError(406, result?.error?.errors[0]?.message)
        }
        
        const currentUser = await User.findById(req.user?._id);
        if(!currentUser.isPasswordCorrect(oldPassword)){
            throw new apiError(404, "old password is wrong")
        }

        currentUser.password = newPassword;
        await currentUser
            .save()
            .then((savedUser)=>{
                res
                    .status(200)
                    .json(
                        new apiResponse(200, "password changed successfully!", savedUser)
                    )
            })
            .catch(err=>next(err));
    } catch (error) {
        next(error)
    }
})

export const googleLogin = asyncHandler(async (req, res)=>{
})

export const deleteUser = asyncHandler(async (req, res)=>{
    try {
        await User
            .findByIdAndDelete(req.user?._id)
            .then(()=>{
                res
                    .status(200)
                    .clearCookie("accessToken", options)
                    .clearCookie("refreshToken", options)
                    .json(
                        new apiResponse(200, "user deleted successfully.")
                    )
            })
            .catch(err=>next(err))

    } catch (error) {
        next(error)
    }
})
