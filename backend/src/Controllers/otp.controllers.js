import Otp from "../Models/otp.model.js";
import User from "../Models/user.model.js";
import { sendEmail } from "../Services/sendEmail.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { createPost } from "./posts.controllerrs.js";
// import { createPost } from "./posts.controllerrs.js";
// const { Vonage } = require('@vonage/server-sdk')
// import { Vonage } from '@vonage/server-sdk';

export const sendEmailToUser = asyncHandler(async (req, res, next)=>{
    
    
    // return;
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
        const html = `<!DOCTYPE html>
                        <html>
                        <head>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              color: #333;
                              background-color: #f1f1f1;
                              margin: 0;
                              padding: 0;
                            }
                            .container {
                              max-width: 600px;
                              margin: 20px auto;
                              padding: 20px;
                              border: 1px solid #ddd;
                              border-radius: 5px;
                              background-color: #ffffff;
                              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                              font-size: 24px;
                              margin-bottom: 20px;
                              color: #007bff;
                              text-align: center;
                            }
                            .content {
                              font-size: 16px;
                              line-height: 1.5;
                            }
                            .otp {
                              font-size: 24px;
                              font-weight: bold;
                              color: #007bff;
                              text-align: center;
                              margin: 20px 0;
                            }
                            .footer {
                              margin-top: 20px;
                              font-size: 14px;
                              color: #777;
                              text-align: center;
                            }
                            .footer a {
                              color: #007bff;
                              text-decoration: none;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <div class="header">OTP Verification for Social Fusion</div>
                            <div class="content">
                              <p>Hello user of ${email},</p>
                              <p>Thank you for registering with Social Fusion! To complete your registration, please use the following OTP:</p>
                              <div class="otp">${otp}</div>
                              <p>The OTP is valid for the next 15 minutes. If you did not request this, please ignore this email.</p>
                            </div>
                            <div class="footer">
                              <p>For any assistance, feel free to visit our <a href="socialfusion001.sf@gmail.com">Help Center</a>.</p>
                              <p>This is an automated message, but if you want, you can reply!!!.</p>
                            </div>
                          </div>
                        </body>
                        </html>
                        `  
                        
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



export const sendMessageToMobile = asyncHandler(async (req, res, next)=>{

  const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
  })

  console.log("inside send message")
  const from = "Raahat Khan"
  const to = "+918920151361"
  const text = ' your otp for social fusion under beta mode is: 789432'

  async function sendSMS() {
      await vonage.sms.send({to, from, text})
          .then(resp => { console.log('Message sent successfully'); console.log(resp); })
          .catch(err => { console.log('There was an error sending the messages.'); next(err); });
  }
  sendSMS();
})