import React, { useEffect, useState } from 'react';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import LoaderPopup from '../Compnents/Loader';
import PasswordResetSuccessPopup from '../Compnents/PasswordResetSuccessPopup';
import SuccessPopup from '../Compnents/AccountCreatedPopup';
import { setMinutes } from 'date-fns';

function ResetForgotPassword() {
    // const token = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // oldPassword: '',
        newPassword: '',
        repeatPassword: '',
    });
    const { token } = useParams();
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);

    const [seeNewPassword, setSeeNewPassword] = useState(false)
    const [seeRepeatPassword, setSeeRepeatPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    console.log(token)
    useEffect(()=>{
        (async()=>{
            try {
                const response = await fetch(apiEndPoints.verifyResetPasswordToken(token), {method: "POST"});
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Network response wasn't ok while verification of reset password token")
                }
                console.log(data)
                if(data.success === false){
                  alert("done");
                  navigate('/sign-in');
                }
            } catch (error) {
                alert(error.message)
                navigate('/sign-in')
                setError(error.message);
            }
        })()
    }, [])

    
    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    console.log(formData);
    
    const handleResetForgotPassword = async(e)=>{
        e.preventDefault();
        try {
          setLoading(true)
          const newFormData = new FormData();
          newFormData.append("newPassword", formData.newPassword);
          newFormData.append("repeatPassword", formData.repeatPassword);
          const response = await fetch(apiEndPoints.resetForgotPasswordAddress(token), {method: "PATCH", body: newFormData});
          const data = await response.json();

          if(!response.ok){
            throw new Error(data.message || "Network response isn't ok while resetting password using token")
          }

          if(data.success){
            setSuccess(data.message);
            setShowPopup(true)
          }

        } catch (error) {
          setError(error.message)
        }
        finally{
          setLoading(false)
        }
    }
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  return (
    <div className="mt-3 flex flex-col items-center justify-center p-2 md:p-5">
      {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"Verifyiing and Resetting your password, please wait!"} />}
      {showPopup && <SuccessPopup setShowPopup={setShowPopup} heading={"Reset Password Success!"} info={`Your password has been changed to "${formData.newPassword}", please keep in mind.` } />}

      <h2 className="text-2xl font-bold mb-3 text-center text-red-600">Reset Password</h2>
      <form onSubmit={handleResetForgotPassword} className='p-5 space-y-3 border-2 border-red-500 rounded-lg w-full md:w-3/4 xl:w-1/2'>
        {/* <div className="mb-4 relative">
          <div className='flex justify-between mr-4 mb-1'>
            <Label htmlFor="oldPassword" value="Old Password" />
            { seeOldPassword ? 
                    <HiEyeOff onClick={()=>setSeeOldPassword(seeOldPassword?false:true)} className='relative top-9 z-10' />: 
                    <HiEye onClick={()=>setSeeOldPassword(seeOldPassword?false:true)}  className='relative top-9 z-10' /> }
          </div>
          <TextInput
            id="oldPassword"
            name="oldPassword"
            type={seeOldPassword?"text":"password"}
            placeholder="Enter your old password"
            required
            onChange={handleInputChange}
          />
        </div> */}
        <div className="mb-4">
            <div className='flex justify-between mr-4 mb-1'>
                <Label htmlFor="newPassword" value="New Password" />
                { seeNewPassword ? 
                    <HiEyeOff onClick={()=>setSeeNewPassword(seeNewPassword?false:true)} className='relative top-9 z-10' />: 
                    <HiEye onClick={()=>setSeeNewPassword(seeNewPassword?false:true)}  className='relative top-9 z-10' /> }
            </div>
          <TextInput
            id="newPassword"
            name="newPassword"
            type={seeNewPassword?"text":"password"}
            placeholder="Enter your new password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
            <div className='flex justify-between mr-4 mb-1'>
                <Label htmlFor="repeatPassword" value="Repeat New Password" />
                { seeRepeatPassword ? 
                    <HiEyeOff onClick={()=>setSeeRepeatPassword(seeRepeatPassword?false:true)} className='relative top-9 z-10' />: 
                    <HiEye onClick={()=>setSeeRepeatPassword(seeRepeatPassword?false:true)}  className='relative top-9 z-10' /> }
            </div>
          <TextInput
            id="repeatPassword"
            name="repeatPassword"
            type={seeRepeatPassword?"text":"password"}
            placeholder="Repeat your new password"
            required
            onChange={handleInputChange}
          />
        </div>
        {error && <Alert color={'failure'}> {error} </Alert>}
        {success && <Alert color={'success'}> {success} </Alert> }
        <Button type="submit" className="w-full" color={'failure'}>
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default ResetForgotPassword;
