import { Dropdown, Navbar } from 'flowbite-react'
import React from 'react'

const DashHeader = () => {
  return (
    <Navbar className="shadow-md">
          <Navbar.Brand href="/">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Dashboard
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown inline label="Profile">
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
    </Navbar>
  )
}

export default DashHeader