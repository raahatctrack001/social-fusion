import React, { useState } from 'react';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import LoaderPopup from '../Compnents/Loader';
import PasswordResetSuccessPopup from '../Compnents/PasswordResetSuccessPopup';

function resetPassword() {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
    });
    const { authorId } = useParams();
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);
    const [seeOldPassword, setSeeOldPassword] = useState(false)
    const [seeNewPassword, setSeeNewPassword] = useState(false)
    const [seeRepeatPassword, setSeeRepeatPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    console.log(formData);
    
    const handleUpdatePassword = async(e)=>{
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true)
        try {
            const response = await fetch(apiEndPoints.updatePasswordAddress(authorId), {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                setError("failed to update password, please try again later!")
            }

            const data = await response.json();
            // console.log(data);
            if(data.success){
                setShowPopup(true)
                setSuccess(data.message);
                // window.location.reload();
               return
            }
            setError(data.message);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
        finally{
          setTimeout(() => {
            
            setLoading(false)
          }, 10000);
        }
    }
    const handleClosePopup = () => {
      setShowPopup(false);
      window.location.reload();
    };
  return (
    <div className="mt-3 flex flex-col items-center justify-center p-2 md:p-5">
      <PasswordResetSuccessPopup show={showPopup} onClose={handleClosePopup} />

      <h2 className="text-2xl font-bold mb-3 text-center text-red-600">Update Password</h2>
      <form onSubmit={handleUpdatePassword} className='p-5 space-y-3 border-2 border-red-500 rounded-lg w-full md:w-3/4 xl:w-1/2'>
        <div className="mb-4 relative">
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
        </div>
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
          Update Password
        </Button>
      </form>
    </div>
  );
}

export default resetPassword;
