import React, { useState } from 'react'
import conversations from '../../../conversation'
import { HiPaperAirplane, HiPencil, HiPlus, HiSearch } from 'react-icons/hi'
import { TextInput } from 'flowbite-react'
import ChatBoxHeader from './ChatBox'
import ChatPage from './Chatpage'
import { HiFunnel, HiUserPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import UnderDevelopment from '../TestComponent/UnderDevelopment'
import WelcomePage from './Welcome'

const MessageComponent = () => {
    const [conversation, setConversation] = useState();
    const [showChatBox, setShowChatBox] = useState(false);
    const navigate = useNavigate();

    const handleMessageInputKeydown = (e)=>{
        if(e.key === 'Enter'){
            console.log("enter key is pressed!")
        }
    }
  return (
    <div className='flex w-full h-[825px]'>
        {/* conversations lists */}
        <div className='w-96 dark:bg-gray-600 pt-2'>
            <div className='flex justify-between pl-2 text-2xl'>
                <p className='font-bold '> Chats </p>
                <div className='flex items-center gap-2 pr-2'>
                    <div className='cursor-pointer hover:text-gray-800'> 
                        <HiPlus />
                    </div>
                    <div className='cursor-pointer hover:text-gray-800'> <HiFunnel className='text-2xl mt-1'/> </div>
                </div>
            </div>

            <div className='mt-2 border-b-2'>
                <TextInput 
                    icon={HiSearch}
                    placeholder='search contact...'

                />
            </div>

            <div className='flex flex-col w-60 md:w-96 gap-1 mt-2 ml-3 h-[725px] overflow-y-scroll'>
                {conversations.map((conversation, index)=>{
                    return <div key={index} className='flex justify-between' onClick={()=>{setShowChatBox(true); setConversation(conversation)}}>
                            <div className='flex start gap-2 cursor-pointer'>
                                <img className='h-12 w-12 rounded-lg' src={conversation?.img} alt="" />
                                <div className='flex flex-col items-start'> 
                                    <p className='font-bold'> {conversation.name} </p>
                                    <p> {conversation.lastMessage} </p>
                                </div>
                            </div>
                            {/* <div className='pr-5 text-2xl'> <HiUserGroup /> </div> */}
                           </div>
                })}
            </div>
        </div>

        {/* main chat box */}
        {showChatBox ? <div className='flex flex-col w-full'>           
            <ChatBoxHeader conversation={conversation} />
            <ChatPage />
            <div className='w-10 bg-green-700 py-2 px-2 rounded-lg relative right-[4rem] top-[5rem] cursor-pointer hover:bg-green-500'> <HiUserPlus /> </div>
            <TextInput
                className='border-2 rounded-lg border-white ml-4 mr-1 relative top-10'
                placeholder='send message...'
                onKeyDown={(e)=>{if(e.key === 'Enter' && !e.shiftKey){console.log("enter only")}}}
             />
             <div className='flex justify-between'>
                <div></div>
                <HiPaperAirplane className='relative bottom-2 right-4 rounded-lg px-2 text-5xl cursor-pointer' />
             </div>
        </div>:<div className='w-full'> <WelcomePage /> </div> }
    </div>
  )
}

export default MessageComponent