import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['comment', 'like', 'follow', 'mention', 'message', 'custom'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      // This can store additional information based on the type of notification
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      // Add other fields as necessary
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification
