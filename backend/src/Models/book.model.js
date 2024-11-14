import mongoose from 'mongoose'
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        default: "Uncategorised"
    },
    genre: {
        type: String,
    },
    isOpenSource: {
        type: Boolean,
        deafult: false,
    },
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    summary: {
        type: String,
    },
    coverPage:[{
        type: String,
    }],
    // reviews: [{
    //     type: postReview,
    //     required: true,
    // }],
    price: {
        type: Number, 
        default: 0,
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    bookType: {
        type: String,
        enum: ["FREE", "PREMIUM"],
        default: "FREE",
    },
    publishedDate: {
        type: Date,
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
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            receivers: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }]
        }
    ],
    popularityScore: {
        type: Number,
        default: 0,
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
        default: "Draft"
    },
    aiGenerated: {
        type: Boolean,
        default: false,
    }, 
    isHidden: {
        type: Boolean,
        default: false
    },
    isPrivate: { //to enable user to book the blog that is only meant for them and not public.
        type: Boolean,
        default: false,
    }
},
{ timestamps: true })

// Method to calculate and update popularity score
bookSchema.methods.calculatePopularityScore = function () {
    this.popularityScore = (this.likes * 0.2) + (this.comments * 0.4) + (this.shares * 0.3) + (this.views * 0.1);
    return this.popularityScore;
  };
  
// Middleware to recalculate popularityScore before saving if any engagement field is modified
bookSchema.pre("save", function (next) {
    this.calculatePopularityScore();
    next();
  });

  
const Book = new mongoose.model("Book", bookSchema);
export default Book