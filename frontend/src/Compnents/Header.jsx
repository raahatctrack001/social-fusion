import { 
    Button, 
    Label, 
    TextInput 
} from 'flowbite-react'
import React from 'react'
import { 
    HiBookOpen, 
    HiCode, 
    HiDocument, 
    HiExclamation, 
    HiLogin, 
    HiMail, 
    HiMailOpen, 
    HiOutlineMail, 
    HiOutlineQuestionMarkCircle, 
    HiSun, 
    HiUser, 
    HiUsers 
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div 
        className='bg-blue-900 py-2 px-5 text-gray-100 flex justify-between items-center gap-2'>
        <div>            
            <Link 
                className='bg-blue-800 w-32 py-1 font-bold text-lg flex justify-center rounded-lg border-2 border-gray-400 hover:text-pink-400'>
                Soul Echo
            </Link>
        </div>

        <form 
            className="max-w-60 bg-blue-800">
            <TextInput 
                className='' id="email4" type="email" icon={HiBookOpen} rightIcon={HiUsers} placeholder="search post or author" required />
        </form>

        <div 
            className='flex justify-between items-center gap-2'>
            <div 
                className='flex justify-center items-center gap-2 px-2 bg-blue-800 py-1 rounded-lg border-2 border-gray-400'>
                <Link className='hover:text-pink-400'> Home </Link> <span> | </span>
                <Link className='hover:text-pink-400'> About </Link> <span> | </span>
                <Link className='hover:text-pink-400'> Project </Link> <span> | </span>
                <Link className='hover:text-pink-400'> Latest </Link>
            </div>

            <div 
                className='flex  justify-center items-center gap-2'>
                <Button gradientDuoTone="purpleToBlue"> <HiSun /> </Button>
                <Button gradientDuoTone="purpleToBlue" className='flex justify-center items-center'> <HiLogin /> </Button>
            </div>
        </div>
    </div>
  )
}

export default Header