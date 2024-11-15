import { Sidebar } from 'flowbite-react'
import React, { useState } from 'react'
import { HiBookOpen, HiChevronDoubleDown, HiChevronDoubleUp, HiDocument, HiDotsHorizontal, HiSave, HiUserGroup, HiXCircle } from 'react-icons/hi'
import { HiBars3, HiChartBar, HiCheckBadge, HiCog, HiDocumentCheck, HiHome, HiMiniBookOpen, HiPencil, HiUser } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const DashSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
        <div>
          <div className='fixed top-14 bg-white dark:bg-gray-800 z-10 rounded-r-lg p-2 flex flex-col gap-3 text-lg mt-14'>
            {isOpen === false ? (
              <HiBars3 
                title="Open Sidebar" // Tooltip for open button
                className='my-5 mt-5 w-full flex justify-center text-2xl dark:text-white md:3xl cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg'
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              <HiXCircle 
                title="Close Sidebar" // Tooltip for close button
                className='my-5 mt-5 w-full flex justify-center text-2xl dark:text-white md:3xl cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg'
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
            <Link to={'/dashboard?tab=home'} className=''>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:ml-2 hover:mt-1"
                  title="Home" // Tooltip for Home
                >
                  <HiHome className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Home </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=posts'}>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                  title="My Posts" // Tooltip for My Posts
                >
                  <HiDocumentCheck className='text-2xl md:text-3xl'/> {isOpen && <span className=''> My Posts </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=books'}>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                  title="My Books" // Tooltip for My Posts
                >
                  <HiMiniBookOpen className='text-2xl md:text-3xl'/> {isOpen && <span className=''> My Books </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=published-books'}>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                  title="Published Books" // Tooltip for My Posts
                >
                  <HiCheckBadge className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Published Books </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=saved-posts'}>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                  title="Saved Posts" // Tooltip for Saved Posts
                >
                  <HiSave className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Saved Posts </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=users'}>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                  title="Audience" // Tooltip for Audience
                >
                  <HiUserGroup className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Audience </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=analytics'}>
                <div 
                  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                  title="Analytics" // Tooltip for Analytics
                >
                  <HiChartBar className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Analytics </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=settings'}>
              <div 
                className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                title="Settings" // Tooltip for Settings
              >
                <HiCog className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Settings </span>}
              </div>
            </Link>
            <Link to={'/dashboard?tab=hidden-posts'}>
              <div 
                className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1"
                title="Hidden Posts" // Tooltip for Hidden Posts
              >
                <HiChevronDoubleDown className='text-2xl md:text-3xl'/> {isOpen && <span className=''> Hidden Posts </span>}
              </div>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default DashSidebar
