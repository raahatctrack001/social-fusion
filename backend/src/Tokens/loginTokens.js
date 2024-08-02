import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";

export const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const currentUser = await User.findById(userId);     

        const accessToken = await currentUser.generateAccessToken();
        const refreshToken =  await currentUser.generateRefreshToken();
        
        currentUser.refreshToken = refreshToken;
        currentUser
            .save()
            .then(()=>{
                console.log('tokens generated successfully!')
            })
            .catch((error)=>{
                throw new apiError(500, error.message)
            })
        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500, error.message)
    }
}

export const options = {
    httpOnly: true,
    secure: false
}