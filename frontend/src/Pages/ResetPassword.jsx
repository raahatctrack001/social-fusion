import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Textarea, Button, Alert } from 'flowbite-react';
import { updateSuccess } from '../redux/slices/user.slice';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { HiExclamation, HiExternalLink, HiLockClosed, HiPencil, HiPencilAlt, HiRefresh, HiTrash, HiUserRemove } from 'react-icons/hi';


const ResetPassword = () => {
//   const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

   
    try {
      const response = await fetch(apiEndPoints.updateUserAddress(currentUser?._id), {
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(!response.ok){
        setError(response.message);
        // alert("failed to update profile");
      }


      const data = await response.json();
      console.log("response", response); 
      console.log("data", data);
      if(data.success){
        dispatch(updateSuccess(data.data));
        alert('Profile updated successfully!');
        window.location.reload();
        return;
      }
      setError(data.message)
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };
  console.log(formData);
  return (
    <div className=" flex flex-col justify-center items-center border bg-gray-200">
      <h1 className="text-2xl font-bold my-3 px-10 w-full flex justify-center"> Update Password </h1>
      {error && <Alert color="failure" className="text-lg rounded-lg">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-1/2 p-3 ">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 m-1">Old Password</label>
          <TextInput
            className=''
            id="oldPassword"
            name="oldPassword"
            type='password'
            // value={formData.username}
            onChange={handleChange}
            placeholder="**********"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 m-1">New Password</label>
          <TextInput
            type="password"
            id="newPassword"
            name="newPassword"
            // value={formData.email}
            onChange={handleChange}
            placeholder="**********"
            required
          />
        </div>

        <div>
          <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 m-1">Repeat Password</label>
          <TextInput
            id="repeatPassword"
            name="repeatPassword"
            type='password'
            // value={formData.fullName}
            onChange={handleChange}
            placeholder="**********"
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full"
          color={'failure'}
        >
           <span className='flex justify-center items-center gap-1'> <HiLockClosed />Reset Password</span>
           </Button>
        
      </form>
    </div>
  );
};

export default ResetPassword;
