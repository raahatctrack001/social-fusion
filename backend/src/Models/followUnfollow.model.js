import mongoose from "mongoose";

const followUnfollowSchema = new mongoose.Schema({
    following: {
        type: 'User',
        ref: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    follower: {
        type: 'User',
        ref: mongoose.Schema.Types.ObjectId,
        required: true,
    }    
}, {timestamps: true})

const followUnfollow = new mongoose.model("followUnfollow", followUnfollowSchema);
export default followUnfollow;