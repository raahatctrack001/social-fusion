import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
        trim: true,
    },
    otp: [{
        type: String,
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP will expire after 5 minutes (300 seconds)
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    // expirationTime: {
    //     type: Date,
    //     default: function() {
    //         return new Date(Date.now() + 5 * 60 * 1000); // Set the expiration time to 5 minutes from now
    //     }
    // }
}, {timestamps: true});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
