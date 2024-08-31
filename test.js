const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  avatarUrl: { type: String }, // Profile picture
  statusMessage: { type: String, default: "Hey there! I'm using WhatsApp" }, // User status
  lastSeen: { type: Date }, // To track last activity time
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of user's contacts
  blockedContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Blocked users
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], // List of groups the user is in
}, { timestamps: true });


const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Sender of the message
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Receiver (only for private messages)
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // Group (only for group messages)
  content: { type: String }, // Text message content
  mediaUrl: { type: String }, // For multimedia (images, files, etc.)
  mediaType: { type: String, enum: ['image', 'video', 'audio', 'file', 'none'], default: 'none' }, // Media type if applicable
  isRead: { type: Boolean, default: false }, // Status of the message (read/unread)
  isDeleted: { type: Boolean, default: false }, // Soft delete for messages
  createdAt: { type: Date, default: Date.now }, // Time when the message was sent
}, { timestamps: true });


const ConversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // List of users involved in this conversation
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, // Store the last message for faster access
  isGroupChat: { type: Boolean, default: false }, // Whether this is a group chat
}, { timestamps: true });


const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Group admin user
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users in the group
  groupAvatarUrl: { type: String }, // Group profile image
  description: { type: String, default: '' }, // Group description
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


const MediaSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true }, // File storage URL
  type: { type: String, enum: ['image', 'video', 'audio', 'document'], required: true }, // Media type
  size: { type: Number, required: true }, // File size in bytes
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });


const StatusSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who posted the story
  mediaUrl: { type: String, required: true }, // Media (image, video)
  mediaType: { type: String, enum: ['image', 'video'], required: true }, // Type of media
  createdAt: { type: Date, default: Date.now }, // Time when the story was created
  expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 }, // Automatically expire after 24 hours
}, { timestamps: true });


const NotificationSchema = new mongoose.Schema({
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['message', 'status', 'group'], required: true },
  message: { type: String }, // Notification content
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


const MessageStatusSchema = new mongoose.Schema({
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveredAt: { type: Date }, // When the message was delivered to the user
  readAt: { type: Date }, // When the message was read by the user
}, { timestamps: true });



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////