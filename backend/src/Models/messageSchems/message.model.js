import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String, 
        enum: ["sent", "delivered", "received"],
    },
    isReadByAll: {
        type: Boolean,
        default: false,
    },
    mediaURL: {
        type: String,
    },
    mediaTypes: {
        type: String,
        enum: ["image", "video", "file", "none"],
        default: "none"
    },
    isDeleted: {
        type: Boolean, 
        default: false
    }
}, {timestamps: true});

const Message = new mongoose.model("Message", messageSchema);
export default Message;
