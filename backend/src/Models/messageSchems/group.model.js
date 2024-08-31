import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: [{
        type: String,
        required: true,
    }],
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    description: [{
        type: String,        
    }],
    avatar: [{
        type: String,
    }]
}, {timestamps: true});

const Group = new mongoose.model("Group", groupSchema);
export default Group;
