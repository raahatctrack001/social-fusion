import mongoose from 'mongoose'


const conversationSchema = new mongoose.Schema({
    name: [{
        type: String, 
        required:true
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    p: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    scheduledEvent: {
        name: {
            type: String, 
            enum: ["birthday", "anniversary", "first date", "first meeting"]
        },
        eventDate: {
            type: Date,
        }
    }
}, {timestamps: true})

const Conversation = new mongoose.model("Conversation", conversationSchema);
export default Conversation;