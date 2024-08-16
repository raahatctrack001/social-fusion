import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiSave } from 'react-icons/hi'
import { HiChartBar, HiCog, HiHome, HiPencil, HiUser } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const DashSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=home'}>
                <Sidebar.Item as={"div"}  icon={HiHome}>
                  Home
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=posts'}>
                <Sidebar.Item as={"div"} icon={HiPencil}>
                  Posts
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=saved-posts'}>
                <Sidebar.Item as={"div"} icon={HiSave}>
                  Saved Posts
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=categories'}>
                <Sidebar.Item as={"div"} icon={HiUser}>
                  Categories
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=comments'}>
                <Sidebar.Item as={"div"} icon={HiUser}>
                  Comments
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=users'}>
                <Sidebar.Item as={"div"} icon={HiUser}>
                  Users
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=analytics'}>
                <Sidebar.Item as={"div"} icon={HiChartBar}>
                  Analytics
                </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=settings'}>
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