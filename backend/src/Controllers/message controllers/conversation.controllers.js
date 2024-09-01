import { asyncHandler } from "../../Utils/asyncHandler.js";

export const openOrCreateNewConverstaion = asyncHandler(async (req, res, next)=>{
    console.log(req.params);
})