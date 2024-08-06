import mongoose from 'mongoose'
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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: String,
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
    }]

},
{ timestamps: true })

const Post = new mongoose.model("Post", postSchema);
export default Post