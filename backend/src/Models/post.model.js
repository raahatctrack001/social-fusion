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
    thumbnail:[{
        type: String,
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
    popularityScore: {
        type: Number,
        default: 0,
    },
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

// Method to calculate and update popularity score
postSchema.methods.calculatePopularityScore = function () {
    this.popularityScore = (this.likes * 0.2) + (this.comments * 0.4) + (this.shares * 0.3) + (this.views * 0.1);
    return this.popularityScore;
  };
  
// Middleware to recalculate popularityScore before saving if any engagement field is modified
postSchema.pre("save", function (next) {
    this.calculatePopularityScore();
    next();
  });

  
const Post = new mongoose.model("Post", postSchema);
export default Post