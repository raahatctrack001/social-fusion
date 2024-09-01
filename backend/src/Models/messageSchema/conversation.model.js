import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {timestamps: true})

const Conversation = new mongoose.model("Conversation", conversationSchema);
export default Conversation;