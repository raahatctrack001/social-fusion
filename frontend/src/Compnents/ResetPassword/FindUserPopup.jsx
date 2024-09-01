import React, { useState } from 'react';
import { apiEndPoints } from '../../apiEndPoints/api.addresses';
import { Alert } from 'flowbite-react';
import LoaderPopup from '../Loader';
import { findLast } from 'lodash';
import ResetTokenSent from './ResetTokenSent';

const ResetPasswordPopup = ({ isOpen, onClose }) => {
  const [userIdentifier, setUserIdentifier] = useState('');
  const [error, setError] = useState(false);
  const [findUserLoading, setFindUserLoading] = useState(false);
  const [sendTokenloading, setSendTokenLoading] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});

    const sendResetPasswordToken = async ()=>{
        setError('')
        setSendTokenLoading(true)
        try {
            const formData = new FormData();
            formData.append("userEmail", userIdentifier);
            const response = await fetch(apiEndPoints.sendResetPasswordToken(), {method: "POST", body: formData});
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Network response isn't ok while sending reset password email")
            }

            if(data.success){
                console.log(data);
                setTokenSent(true);
                // onClose(false);
            }
        } catch (error) {
            setError(error.message)
        }
        finally{
            setSendTokenLoading(false)
        }
    }

       
    const handleFindUser =  async ()=>{
        setError('')
        setFindUserLoading(true)
        try {
          const formData = new FormData();
          formData.append("userEmail", userIdentifier)
          const response = await fetch(apiEndPoints.checkIfUserExistsAddress(), {method: "POST", body: formData});
          const data = await response.json();
          if(!response.ok){
            throw new Error(data.message || "Network response wasn't ok while checking for availablity of username")
          }

          if(data.success){  
            // console.log(data);
            sendResetPasswordToken();
            setUser(data?.data);          
          }
        } catch (error) {
          setError(error.message)
        }
        finally{
            setFindUserLoading(false)
        }
    }
 
  return (
    <div className={`fixed inset-0  bg-opacity-50 flex items-start top-20 justify-center transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-10`}>
      <div className="bg-gray-300 dark:bg-gray-600 dark:text-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        {findUserLoading && <LoaderPopup loading={findUserLoading} setLoading={setFindUserLoading} info={'finding user, please wait!'} />}
        {sendTokenloading && <LoaderPopup loading={sendTokenloading} setLoading={setSendTokenLoading} info={'sending reset password token, please wait!'} /> }
        {tokenSent && <ResetTokenSent isOpen={tokenSent} onClose={setTokenSent} email={user.email} closeInputBox={onClose} />}
        {/* Close Button */}
        <button
          onClick={()=>onClose(false)}
          className="absolute top-2 right-2 text-lg hover:text-gray-700"
        >
          &times;
        </button>
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4 text-center">Find Your Account</h2>
        {/* Instruction Text */}
        <p className="mb-4  text-center">
          Please enter your email address or username to search for your account and reset your password.
        </p>
        {/* Input Field */}
        <input
          type="text"
          value={userIdentifier}
          onChange={(e) => setUserIdentifier(e.target.value)}
          placeholder="Email or Username"
          className="w-full p-2 border border-white  dark:text-black rounded-lg mb-4"
        />
        {/* Submit Button */}
        {error && <Alert color={'failure'} className='mb-2 h-8 flex items-center justify-center font-bold'> {error} </Alert>}
        <button
          onClick={handleFindUser}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
            Get Account
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
