import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true,
    },
    problem:{
        type: String,
        require: true,
    },
    solution:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Feedback = new mongoose.model("Feedback", feedbackSchema);
export default Feedback;