import { otpHtml } from "../EmailTemplates.js/opt.email.html.js";
import Otp from "../Models/otp.model.js";
import User from "../Models/user.model.js";
import { sendEmail } from "../Services/sendEmail.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { createPost } from "./posts.controllerrs.js";
// import { createPost } from "./posts.controllerrs.js";


export const sendEmailToUser = asyncHandler(async (req, res, next)=>{   
    try {
        const { to, subject, html } = req.body;
        // console.log(req.body)
        
        const emailResponse = await sendEmail(to, subject, html)
        if(emailResponse.success){
            res.status(200).json(new apiResponse(200, `An Otp is send to ${to}, plz verify to proceed!`, null))
        }
        else{
            throw new apiError(500, "Failed to send OTP, please try again in a moment!");
        }
    } catch (error) {
        next(error);
    }
})

export const createAndSendOTP = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email)
        const user = await User.findOne({email});
        if(user){
          throw new apiError(409, "User with this email already exists. Please try logging in or use forgot password feature inside sign in page to restore account!")
        }
        let otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Ensure OTP is 6 digits
        // const html = `<p>Your OTP is: <strong>${otp}</strong></p>`; // Simple HTML for the OTP email
        const html = otpHtml(email, otp);

        const subject = "Social Fusion: Your One-Time Password (OTP) Inside";
        let existingOTP = await Otp.findOne({ email });

        if (!existingOTP) {
            // Create a new OTP document if none exists for the email
            const createdOTP = await Otp.create({ email, otp: [otp] });
            if (!createdOTP) {
                throw new apiError(500, "Failed to create OTP");
            }

            const emailResponse = await sendEmail(email, subject, html);
            if (emailResponse.success) {
                res.status(200).json(new apiResponse(200, "OTP sent successfully", createdOTP));
            } else {
                throw new apiError(500, "Failed to send OTP, please try again later!");
            }
        } else {
            // If an OTP already exists for the email, add the new OTP to the array
            existingOTP.otp.push(otp);
            await existingOTP.save();

            const emailResponse = await sendEmail(email, subject, html);
            if (emailResponse.success) {
                res.status(200).json(new apiResponse(200, "OTP resent successfully", existingOTP));
            } else {
                throw new apiError(500, "Failed to resend OTP, please try again later!");
            }
        }
    } catch (error) {
        next(error);
    }
});


export const verifyOTP = asyncHandler(async (req, res, next)=>{
    const { email, userOTP } = req.body;

    const otps = await Otp.findOne({email: email});
    // console.log(otps)
    if(!otps){
        throw new apiError(404, "It appears that the OTP has not been sent yet or may have expired. Please try resending the OTP to receive a new one.");
    }

    const otpsArray = otps.otp;
    if(otpsArray.includes(userOTP)){
        otps.isVerified = true;
        await otps.save();
        res.status(200).json(new apiResponse(200, "email verified", otps));
    }
    else{
        throw new apiError(401, "The OTP you entered is invalid. Please check the OTP and try again.")
    }

})