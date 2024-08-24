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
        expires: 15*60, // OTP will expire after 10 minutes (900 seconds)
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
