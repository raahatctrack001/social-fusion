import { Sidebar } from 'flowbite-react'
import React, { useState } from 'react'
import { HiChevronDoubleDown, HiChevronDoubleUp, HiDocument, HiDotsHorizontal, HiSave, HiUserGroup, HiXCircle } from 'react-icons/hi'
import { HiBars3, HiChartBar, HiCog, HiDocumentCheck, HiHome, HiPencil, HiUser } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const DashSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
        <div>
          <div className='fixed top-14 bg-white dark:bg-gray-800 z-10 rounded-r-lg p-2 flex flex-col gap-3 text-lg mt-14'>
            {isOpen === false ? <HiBars3 className='my-5 mt-5 w-full flex justify-center text-2xl dark:text-white md:3xl cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg  ' onClick={()=>setIsOpen(!isOpen)} />:
            <HiXCircle className='my-5 mt-5 w-full flex justify-center text-2xl dark:text-white md:3xl cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg  ' onClick={()=>setIsOpen(!isOpen)} />}
            <Link to={'/dashboard?tab=home'} className=''>
                <div className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg  hover:ml-2 hover:mt-1 ">
                  <HiHome className='text-2xl md:text-3xl'/> { isOpen && <span className=''> Home </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=posts'}>
                <div className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1" >
                  <HiDocumentCheck className='text-2xl md:text-3xl'/> { isOpen && <span className=''> My Posts </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=saved-posts'}>
                <div className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  <HiSave className='text-2xl md:text-3xl'/> { isOpen && <span className=''> Saved Posts </span>}
                </div>
            </Link>
            {/* <Link to={'/dashboard?tab=categories'}>
                <Sidebar.Item as={"div"} icon={HiUser} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Categories
                </Sidebar.Item>
            </Link> */}
            {/* <Link to={'/dashboard?tab=comments'}>
                <Sidebar.Item as={"div"} icon={HiUser} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Comments
                </Sidebar.Item>
            </Link> */}
            <Link to={'/dashboard?tab=users'}>
                <div  className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  <HiUserGroup className='text-2xl md:text-3xl'/> { isOpen && <span className=''> Audience </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=analytics'}>
                <div className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  <HiChartBar className='text-2xl md:text-3xl'/> { isOpen && <span className=''> Analytics </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=settings'} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
              <div className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  <HiCog className='text-2xl md:text-3xl'/> { isOpen && <span className=''> Settings </span>}
                </div>
            </Link>
            <Link to={'/dashboard?tab=hidden-posts'} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
              <div className="flex justify-start items-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  <HiChevronDoubleDown className='text-2xl md:text-3xl'/> { isOpen && <span className=''> Hidden Posts </span>}
                </div>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default DashSidebar