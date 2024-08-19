import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default:{author:{_id: '66b9e5072b4b7ac4113ea8fb', username: 'johndoe1234', email: 'johndoe1234@example.com', fullName: 'John Doe', password: '$2a$10$wvJrQpu446g476RqEVbm3OY1Lon9dhVaz2RgjnxABAaVtqIWUTwwm',},
            content: "  ",
            createdAt:"2024-08-18T17:27:17.061Z"}
    }] 

}, {timestamps: true})

const Comment = new mongoose.model("Comment", commentSchema);
export { Comment }