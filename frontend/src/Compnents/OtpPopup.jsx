import React, { useState, useRef } from 'react';
import { HiCheckCircle, HiX } from 'react-icons/hi';
import { HiArrowTrendingDown } from 'react-icons/hi2';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import LoaderPopup from './Loader';

const OtpPopup = ({email, setShowOTPBox }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      inputs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

//   if (!isOpen) return null;
  const handleOTPSubmit = async ()=>{
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("userOTP", otp.join(''));
      formData.append("email", email);

      const response = await fetch(apiEndPoints.verifyOTPAddress(), {method: "POST", body: formData});
      const data = await response.json();
      if(!response.ok){
        throw new Error(data?.message ||"Network response isn't ok while verifying otp")
      }

      if(data.success){
        setLoading(false);
        setVerified(true)
        //console.log(data);
      }

    } catch (error) {
      setError(error.message)
      //console.log(error)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="fixed m-2 inset-0 flex items-start top-20 justify-center bg-opacity-50 z-50">
    {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"verifying email!"} />}
      <div className="items-center border-2 bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full md:w-3/4 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold"> { verified ? "OTP Verification: Success " : "Enter OTP" }</h2>
          {!verified && <button onClick={()=>setShowOTPBox(false)} className="text-gray-500 hover:text-gray-700">
            <HiX />
          </button>}
        </div>
        <div className="flex flex-col items-center mb-4">
          {verified ? <HiCheckCircle className=" text-9xl text-green-500 mb-2 " /> : <HiArrowTrendingDown className=" text-9xl text-green-500 mb-2 " />}
          <p className=""> {verified ? "Email Verified" : "An OTP has been sent to your email. Please enter it below to verify your account."}</p>
        </div>
        <div className="flex justify-center gap-1 mb-4">
          {!verified && otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              className="w-12 h-12 text-white bg-gray-700 dark:text-white font-bold text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={(el) => (inputs.current[index] = el)}
            />
          ))}
        </div>
        {error && <Alert color={'failure'} className='flex justify-center w-full items-center font-semibold'> { error }</Alert>}
        <button
          onClick={verified ? ()=>navigate('profile') : handleOTPSubmit}
          className={`${verified ? "bg-green-500" : "bg-blue-500"} mt-4 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
          {verified ? "proceed to next step" : "Submit OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;
