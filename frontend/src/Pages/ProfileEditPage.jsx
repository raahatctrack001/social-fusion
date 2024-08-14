import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Textarea, Button, Alert } from 'flowbite-react';
import { updateSuccess } from '../redux/slices/user.slice';

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    fullName: currentUser?.fullName || '',
    bio: currentUser?.bio || '',
  });

  const [error, setError] = useState(null);

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
      // Dispatch the action to update the profile
      await dispatch(updateProfile(formData)).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };
  console.log(formData);
  return (
    <div className=" flex flex-col justify-center items-center border">
      <h1 className="text-2xl font-bold my-3 px-10 w-full flex justify-center"> Update Profile </h1>
      {error && <Alert color="failure" className="mb-4">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4 w-full p-3 md:px-10">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 m-1">Username</label>
          <TextInput
            className='w-full'
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
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 m-1">Showcase your latest self.</label>
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
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
