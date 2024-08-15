import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Textarea, Button, Alert } from 'flowbite-react';
import { updateSuccess } from '../redux/slices/user.slice';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { HiExclamation, HiExternalLink, HiLockClosed, HiPencil, HiPencilAlt, HiRefresh, HiTrash, HiUserRemove } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    fullName: currentUser?.fullName || '',
    bio: currentUser?.bio || '',
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

    // console.log(formData)

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
  // console.log(formData);
  return (
    <div className=" flex flex-col justify-center items-center border bg-gray-200">
      <h1 className="text-2xl font-bold my-3 px-10 w-full flex justify-center"> Update Profile </h1>
      {error && <Alert color="failure" className="text-lg rounded-lg">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4 w-full p-3 md:w-3/4 xl:w-1/2">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 m-1">Username</label>
          <TextInput
            className=''
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 m-1">Email</label>
          <TextInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 m-1">Full Name</label>
          <TextInput
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
{/* 
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <TextInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div> */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 m-1">Bio</label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
        >
           <span className='flex justify-center items-center gap-1'> <HiPencilAlt />Update Profile</span>
        </Button>
        
      </form>
      <div className='flex gap-2 w-full p-3 md:w-3/4 xl:w-1/2'>
          <Button
            color={'failure'}
            
            className="w-full"
          >
           <span className='flex justify-center items-center gap-1'> <HiTrash />Delete Account</span>
          </Button>
          <Button
            color={'warning'}
            onClick={()=>navigate(`/reset-password/${currentUser?._id}`)}
            className="w-full"
          >
           <span className='flex justify-center items-center gap-1'> <HiLockClosed />Reset Password</span>
           </Button>
        </div>
    </div>
  );
};

export default ProfileEditPage;
