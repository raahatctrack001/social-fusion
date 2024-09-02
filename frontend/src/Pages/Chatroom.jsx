import React, { useEffect, useState } from 'react'
import { HiChatAlt, HiCog, HiDocumentAdd, HiPaperAirplane, HiPencil, HiPhone, HiPhoneMissedCall, HiSearch, HiSearchCircle, HiStatusOnline, HiUser, HiUserGroup } from 'react-icons/hi'
import { HiBars3, HiChatBubbleLeftEllipsis, HiFunnel, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import HIDocumentWithPencil from '../Compnents/SVG/HIDocumentWithPencil'
import { Button, TextInput } from 'flowbite-react'
import conversations from '../../../conversation'
import { useLocation, useNavigate } from 'react-router-dom'
// import ChatBox from '../Compnents/ChatBox'
import ChatBoxHeader from '../Compnents/ChatBox'
import ChatPage from '../Compnents/MessageBox'
import MessageComponent from '../Compnents/MessageComponent'
import UnderDevelopment from '../TestComponent/UnderDevelopment'

const Chatroom = () => {
    const [openLeftMost, setOpenLeftMost] = useState(false);
    const [conversation, setConversation] = useState(null)  
    const navigate = useNavigate();
    const location = useLocation();   
    const [tab, setTab] = useState(''); 
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
    console.log("tab", tab)

  return (
    <div className='w-full dark:bg-gray-700 flex z-10'>
        {/* left most part for icons and icon with term */}
        <div className='flex'>
            <div className={`w-[50px] dark:bg-gray-800 pt-4 pl-2 h-[825px] flex flex-col items-start justify-between gap-5`}>            
                <div className='flex flex-col gap-5'>
                    <div onClick={()=>setOpenLeftMost(!openLeftMost)} className='flex items-center justify-start pl-1 cursor-pointer'>
                        <HiBars3 className=' text-2xl rounded-lg hover:text-gray-400'/> 
                    </div>
                    <div onClick={()=>navigate("/chatroom/?tab=chat")} className='flex items-center justify-start pl-1 cursor-pointer'>
                        <HiChatAlt className=' text-2xl rounded-lg hover:text-gray-400'/>
                    </div>
                    <div  onClick={()=>navigate("/chatroom?tab=calls")} className='flex items-center justify-start pl-1 cursor-pointer'>
                        <HiPhone className=' text-2xl rounded-lg hover:text-gray-400'/>
                    </div>
                    <div onClick={()=>navigate("/chatroom?tab=stories")} className='flex items-center justify-start pl-1 cursor-pointer'>
                        <HiStatusOnline className=' text-2xl rounded-lg hover:text-gray-400'/>
                    </div>
                </div>
                <div className='flex items-center justify-start pl-1 cursor-pointer pb-2'>
                    <HiCog className=' text-2xl rounded-lg hover:text-3xl'/>
                </div>
            </div>
            {openLeftMost && <div className={`w-[100px] dark:bg-gray-800 pt-4 pl-2 h-[825px] flex flex-col items-start justify-between gap-5`}>            
                <div className='flex flex-col gap-5'>
                    <div className='flex items-center justify-start pl-1 cursor-pointer'>
                         
                    </div>
                    <div onClick={()=>navigate("/chatroom/?tab=chat")} className='flex items-center justify-start pl-1 cursor-pointer pt-6'>
                        Chat
                    </div>
                    <div onClick={()=>navigate("/chatroom?tab=calls")}  className='flex items-center justify-start pl-1 cursor-pointer'>
                        Call
                    </div>
                    <div onClick={()=>navigate("/chatroom?tab=stories")} className='flex items-center justify-start pl-1 cursor-pointer'>
                        Status
                    </div>
                </div>
                <div className='flex items-center justify-start pl-1 cursor-pointer pb-2'>
                    Settings
                </div>
            </div>}            
        </div>
        <div className='w-full h-[600px]'>
            {tab === 'chat' && <MessageComponent />}
            {tab === 'calls' && <UnderDevelopment />}
            {tab === 'stories' && <UnderDevelopment />}
        </div>

        
    </div>
  )
}

export default Chatroom