import React from 'react'
import { HiPhone, HiSearch, HiVideoCamera } from 'react-icons/hi'

const ChatBoxHeader = ({conversation}) => {
  return (
    <div className='w-full'>
        <div className='flex justify-between dark:bg-gray-600 border-b-2'>
            <div className='pb-1 flex items-center py-1'> 
                <img src={conversation?.img} className='h-16 w-16 rounded-full ml-2' alt={conversation?.name} />
                <div className='flex flex-col items-start pl-2'>
                    <p className='font-bold text-2xl'> { conversation?.name } </p>
                    <p> last seen: 3 min ago</p>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 pr-10'>
                <HiPhone className='text-3xl cursor-pointer hover:bg-gray-500 m-1 rounded-lg' />
                <HiVideoCamera className='text-3xl cursor-pointer hover:bg-gray-500 m-1 rounded-lg' />
                <HiSearch className='text-3xl cursor-pointer hover:bg-gray-500 m-1 rounded-lg' />
            </div>
        </div>
    </div>
  )
}

export default ChatBoxHeader