import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import apiError from "../Utils/apiError.js";

export const isUserLoggedIn = asyncHandler(async (req, res, next)=>{
    try {
        const { accessToken } = req.cookies;
        if(!accessToken){
            throw new apiError(404, "access token is expired");
        }
        
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken){
            throw new apiError(404, "error while decoding token");
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        next(error)   
    }
})