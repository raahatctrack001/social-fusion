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
        type: mongoose.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    contributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    originalData: {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        summary: {
            type: String,
        },
    },
    contributedContent:[{
        message: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    }]
}, {timestamps: true})

const Contribution = new mongoose.model("contribution", contributorSchema);
export default Contribution;