import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            throw new apiError(404, "User not found");
        }

        const accessToken = await currentUser.generateAccessToken();
        const refreshToken = await currentUser.generateRefreshToken();

        currentUser.refreshToken = refreshToken;
        await currentUser.save();

        console.log('Tokens generated successfully!');
        return {currentUser, accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, error.message);
    }
}

export const options = {
    httpOnly: true,
    secure: false
}