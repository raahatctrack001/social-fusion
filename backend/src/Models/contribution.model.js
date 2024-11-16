import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    documentType: {
        type: String,
        enum: ["POST", "BOOK"],
        required: true,
    },
    documentId: {
        type: String,
        required: true,
    },
    contributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    originalContent: {
        type: String,
        require: true,
    },
    contributedContent: {
        type: String,
    }
}, {timestamps: true})

const Contribution = new mongoose.model("contribution", contributorSchema);
export default Contribution;