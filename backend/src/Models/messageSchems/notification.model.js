import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        enum: ["message", "connection", "group", "story", "post"]
    }
}, {timestamps: true});

const Notification = new mongoose.model("Notification", notificationSchema);
export default Notification;