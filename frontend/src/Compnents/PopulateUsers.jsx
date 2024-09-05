import React from 'react'
import { useNavigate } from 'react-router-dom'

const PopulateUsers = ({ users }) => {
    const navigate = useNavigate();
  console.log("users: ", users)
  return (
    <div className='w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div 
            key={index}
            onClick={()=>navigate(`/authors/author/${user?._id}`)}
            className=' cursor-pointer p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700'>
            
            {/* Profile Picture */}
            <div className='flex justify-center mb-4'>
              <img 
                src={user.profilePic.at(-1)} 
                alt={user.fullName} 
                className='h-24 w-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            {/* User Info */}
            <div className='text-center space-y-2'>
              <p className='text-lg font-semibold text-gray-900 dark:text-white'>{user.username.length > 20 ? user.username.substring(0, 20) : user.username}</p>
              
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {user.fullName.length > 20 ? user.fullName.substring(0, 20) + '...' : user.fullName}
              </p>
            </div>

            {/* Stats */}
            <div className='mt-4 flex justify-between items-center text-center text-gray-800 dark:text-gray-200'>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user.followers.length}</span>
                <span className='text-xs'>Followers</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user.followings.length}</span>
                <span className='text-xs'>Following</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user.posts.length}</span>
                <span className='text-xs'>Posts</span>
              </div>
            </div>
            
            {/* Bio */}
            {/* {user.bio && (
              <p className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
                {user.bio.length > 50 ? user.bio.substring(0, 50) + '...' : user.bio}
              </p>
            )} */}
          </div>
        ))
      ) : (
        <div className='col-span-full text-center text-gray-600 dark:text-gray-300'>No users found</div>
      )}
    </div>
  )
}

export default PopulateUsers;
