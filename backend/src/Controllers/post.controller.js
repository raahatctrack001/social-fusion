import { asyncHandler } from "../Utils/asyncHandler"

export const createPost = asyncHandler(async(req, res, next)=>{
    console.log("create post controller")
    // console.log(req.body)
})