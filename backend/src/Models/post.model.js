import mongoose from 'mongoose'
import { type } from 'os';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        require: true
    }, 
    thumbnail:[{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2019/04/29/13/20/post-it-4166054_1280.png',
        require: true,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    enableComments:{
        type: Boolean,
        default: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    shares: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    category: {
        type: String,
        required:true,
        default: "Uncategorised"
    },
    imagesURLs: [{
        url: { 
            type: String 
        },
        original_filename: { 
            type: String 
        }
      }],
    videoURLs: [{
      url: {
          type: String,
      }, 
      original_filename: {
          type: String,
      }
    }],
    status: {
        type: String, 
        enum: ["Draft", "Published"],
        default: "Published"
    },
    aiGenerated: {
        type: Boolean,
        default: false,
    }, 
    isHidden: {
        type: Boolean,
        default: false
    },
    isPrivate: { //to enable user to post the blog that is only meant for them and not public.
        type: Boolean,
        default: false,
    }
},
{ timestamps: true })

const Post = new mongoose.model("Post", postSchema);
export default Post