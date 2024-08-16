import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    subject:{
        type: Sting,
        required: true,
    },
    problem:{
        type: String,
        require: true,
    },
    solution:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Feedback = new mongoose.model("Feedback", feedbackSchema);
export default Feedback;