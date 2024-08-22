import { Button } from 'flowbite-react'
import React from 'react'
import { HiUserAdd } from 'react-icons/hi'

const FollowButton = (props) => {
  return (
    <Button onClick={()=>props.handleClick} outline className=''> 
        <span className='flex justify-center items-center'> <HiUserAdd /> </span>
        <span className='hidden md:inline'> Follow </span>
    </Button>
  )
}

export default FollowButton