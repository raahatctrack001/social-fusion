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
import bcryptjs from 'bcryptjs';
import Otp from "../Models/otp.model.js";
import { kMaxLength } from "buffer";

export const isAuthorised = asyncHandler(async (req, res, next)=>{
    console.log(req.user)
    if(req.user){
        return res.status(200).json( new apiResponse(401, "User is authorised to use this app!", {status:true}))
    }
    
    return res.status(401).json( new apiResponse(401, "Unauthorised!", {status: false}))
})

export const isEmailVerified = asyncHandler(async (req, res, next)=>{
    // const deletedOTP = await Otp.deleteMany({});
    // console.log(deletedOTP)
    try {
        const { email } = req.body;
        console.log(req.body)
        if(!email){
            throw new apiError(404, "email is necessary to verify")
        }
        const otp = await Otp.findOne({email});
        if(!otp){
            throw new apiError(404, "Otp doesn't exist, may be it has been expired");
        }
    
        if(!otp.isVerified){
            throw new apiError(401, "email is not verified");
        }
        
        await Otp
            .findByIdAndDelete(otp?._id)
            .then((deletedOTP)=>{
                 return res.status(200).json(new apiResponse(200, "email has been verified and otp has been deleted!", deletedOTP))
            })
            .catch(err=>next(err))
    } catch (error) {
        next(error)
    }
})

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

export const loginUser = asyncHandler(async (req, res, next) => {
    const { userEmail, password: pass} = req.body;
    console.log(req.body)
    try {
        const query = uniqueIdValidator(userEmail);
        const user = await User.findOne(query).select("+password");
        if(!user){
            throw new apiError(404, "user doesn't exist")
        }
        
        if (user) {
            if (!bcryptjs.compareSync(pass, user?.password)) {
                throw new apiError(403, "Password didn't match!");
            }
            user.isActive = true;
            user.lastActive = new Date();
            await user.save();
            const tokens = await generateAccessAndRefreshToken(user._id);
            const { password, ...userData} = user?._doc;
            res
                .status(202)
                .cookie('accessToken', tokens.accessToken, options)
                .cookie('refreshToken', tokens.refreshToken, options)
                .json(new apiResponse(202, "User logged in", userData));
        } else {
            throw new apiError(404, "User not found!");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        // Clear the user's refresh token in the database
        const currentUser = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: { refreshToken: null } // Clear refreshToken instead of setting it to 1
            },
            { new: true }
        );

        // console.log(currentUser);
        currentUser.isActive = false;
        await currentUser.save();
        // Clear cookies and respond
        return res
            .status(200)
            .clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'None' })
            .clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' })
            .json(new apiResponse(200, "User logged out", {}));
    } catch (error) {
        next(error);
    }
});


// export const resetPassword = asyncHandler(async (req, res, next)=>{
//     console.log("reset password controller...")
// })

export const updatePassword = asyncHandler(async (req, res, next)=>{
    
    try {        
        if(req.user?._id !== req.params?.userId){
            throw new apiError(401, "Unauthorized attempt!")
        }

        const { oldPassword, newPassword, repeatPassword } = req.body;
        if(newPassword !== repeatPassword){
            throw new apiError(404, "repeat password didn't match");
        }
        
        const result = passwordSchema.safeParse(newPassword);
        if(!result.success){        
            throw new apiError(406, result?.error?.errors[0]?.message)
        }
        
        const currentUser = await User.findById(req.params?.userId);
        if(!currentUser.isPasswordCorrect(oldPassword)){
            throw new apiError(404, "old password is wrong")
        }

        if(currentUser.isPasswordCorrect(newPassword)){
            throw new apiError(406, "Old and new password can't be same!")
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
