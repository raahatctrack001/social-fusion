import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import NotFoundPage from '../Pages/NotFoundPage';
import { Button } from 'flowbite-react';
import { HiCheckCircle, HiPlusCircle, HiUser } from 'react-icons/hi';
import AuthorCard from './AuthorCard';
import { useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';

const AuthorList = () => {
    const { currentUser } = useSelector(state => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(apiEndPoints.getUsersAddress())
          .then(users => {
            if (!users) throw new Error("Error getting author's detail");
            return users.json();
          })
          .then(data => {
            setUsers(data.data);
          })
          .catch(error => console.error("Error getting author's detail", error));
      }, []);

      const handlePageClick = (data) => {
        setCurrentPage(data.selected);
      };
       // Pagination logic
    const usersPerPage = 9;
    const indexOfLastUser = (currentPage + 1) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const pageCount = Math.ceil(users.length / usersPerPage);

  return (
    <div className='mb-2 border-2 md:m-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6'>
          Our Authors
        </h1>
        <div className='flex flex-col gap-4'>
          {currentUsers.length ? currentUsers.map((author, index) => (
            <div
              key={index}
              className='flex justify-between items-center gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300'
            >
              <div onClick={() => navigate(`/authors/author/${author?._id}`)} className='flex items-center cursor-pointer'>
                <AuthorCard author={author} />
              </div>
              <div> 
                <div className='hidden md:flex gap-4 md:ml-8'>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{followersCount}</p>
                      <p className="">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{author.followings.length}</p>
                      <p className="">Following</p>
                    </div>
                    <div className="text-center ">
                      <p className="text-lg font-semibold">{author.posts.length}</p>
                      <p className="">Posts</p>
                    </div>
                </div>
              </div>
              <div className='hidden md:inline'> 
              {author?._id !== currentUser?._id ? (
                <Button
                  onClick={() => handleToggleFollowButtonClick(author)}
                  outline="true"
                  className='bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500'
                >
                  {currentUser?.followings?.includes(author?._id) ? (
                    <div className='flex items-center gap-1'>
                      <HiUser className='text-lg' />
                      <HiCheckCircle className='text-xs' />
                      <span className='hidden md:inline'> Following </span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-1'>
                      <HiUser className='text-lg' />
                      <HiPlusCircle className='text-xs' />
                      <span className='hidden md:inline'> Follow </span>
                    </div>
                  )}
                </Button>
              ) : (
                <Button disabled className='bg-gray-500 text-white dark:bg-gray-600'>
                  Owner
                </Button>
              )}
              </div>
            </div>
          )) : (
            <NotFoundPage />
          )}
        </div>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          className="flex justify-center mt-4 "
          previousClassName="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
          nextClassName="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
          disabledClassName="text-gray-500"
          pageClassName="bg-gray-300 dark:bg-gray-700 mx-1 px-2 py-1 rounded cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
          activeLinkClassName="text-white bg-red-700 rounded px-4 py-1"
        />
      </div>
  )
}

export default AuthorList