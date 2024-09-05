import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Textarea, Button, Alert, Modal } from 'flowbite-react';
import { deleteUserSuccess, updateSuccess } from '../redux/slices/user.slice';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { HiExclamation, HiExternalLink, HiLockClosed, HiPencil, HiPencilAlt, HiRefresh, HiTrash, HiUserRemove } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
// import { current } from '@reduxjs/toolkit';


const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editSuccessPopup, setEditSuccessPopup] = useState(false)

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
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || "Network response isn't ok while profile edit submit pgae!");
        // alert("failed to update profile");
      }


      
      if(data.success){
        dispatch(updateSuccess(data.data));
        navigate(`/authors/author/${currentUser?._id}`)
        return;
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };
  // console.log(formData);

  const handleDeleteAccount = async(e)=>{
    try {
      const response = await fetch(apiEndPoints.deleteUserAddress(currentUser?._id), {
        method: "DELETE",
      });

      if(!response.ok){
        throw new Error("failed to delete account!")
      }

      const data = await response.json();
      //console.log(response);
      //console.log(data);
      if(data.success){

        dispatch(deleteUserSuccess());
        return;
      }

      setError("failed to delete user! please try again later.")
    } catch (error) {
      setError(error.message)
      alert(error.message)
      //console.log(error);
    }
  }
  return (
    <div className=" flex flex-col justify-center items-center border px-2">
      <h1 className="text-2xl font-bold my-3 w-full flex justify-center "> Update Profile </h1>
      {error && <Alert color="failure" className="text-lg rounded-lg">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4 w-full p-3 md:w-3/4 xl:w-1/2">
        <div>
          <label htmlFor="username" className="block text-sm font-medium  m-1">Username</label>
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
          <label htmlFor="email" className="block text-sm font-medium  m-1">Email</label>
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
          <label htmlFor="fullName" className="block text-sm font-medium  m-1">Full Name</label>
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
          <label htmlFor="bio" className="block text-sm font-medium  m-1">Bio</label>
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
            onClick={()=>setShowModal(true )}
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

{/* delete modal starts here */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <Alert color={"warning"}> Warning </Alert>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-between'>
            <Button color="failure" onClick={handleDeleteAccount}>
              Yes, Delete My Account
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete modal ends here */}
    </div>
  );
};

export default ProfileEditPage;
