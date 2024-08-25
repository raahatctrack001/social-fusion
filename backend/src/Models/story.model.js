import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  contentURL: {
    type: String, // URL to the story content (image/video)
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'], // Type of content
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h',
  },
  viewers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    }
  }],
});

const Story = mongoose.model('Story', storySchema);

export default Story;
