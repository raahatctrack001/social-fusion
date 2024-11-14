import mongoose from "mongoose";

const postReviewSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    starRating: {
        type: Number,
        required: true,
    },
    messageContent: {
        type: String,
        required: true,
    }, 
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true});

const postReview = new mongoose.model("postReviewSchema", postReviewSchema);
export default postReview;