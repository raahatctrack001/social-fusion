import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiSave } from 'react-icons/hi'
import { HiChartBar, HiCog, HiHome, HiPencil, HiUser } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const DashSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup className=' '>
            <Link to={'/dashboard?tab=home'} className=''>
                <Sidebar.Item as={"div"}  icon={HiHome} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1 ">
                  Home
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=posts'}>
                <Sidebar.Item as={"div"} icon={HiPencil} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1" >
                  Posts
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=saved-posts'}>
                <Sidebar.Item as={"div"} icon={HiSave} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Saved Posts
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=categories'}>
                <Sidebar.Item as={"div"} icon={HiUser} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Categories
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=comments'}>
                <Sidebar.Item as={"div"} icon={HiUser} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Comments
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=users'}>
                <Sidebar.Item as={"div"} icon={HiUser} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Users
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=analytics'}>
                <Sidebar.Item as={"div"} icon={HiChartBar} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                  Analytics
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=settings'} className="dark:hover:bg-gray-500 hover:bg-gray-200 hover:rounded-lg hover:mx-2 hover:mt-1">
                <Sidebar.Item as={"div"} icon={HiCog}>
                  Settings
                </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  )
}

export default DashSidebar