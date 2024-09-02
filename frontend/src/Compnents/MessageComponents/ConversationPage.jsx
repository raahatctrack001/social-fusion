import React, { useEffect, useState } from 'react'
import { HiPaperAirplane, HiPhone, HiSearch, HiVideoCamera } from 'react-icons/hi'
import MessageBox from '../MessageBox'
import { HiUserPlus } from 'react-icons/hi2'
import { TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { apiEndPoints } from '../../apiEndPoints/api.addresses'
import PageLoader from '../PageLoader'

const ConversationPage = ({conversationId, conversations, setConversations}) => {
    const { currentUser } = useSelector(state=>state.user);
    const [conversation, setConversation] = useState(null);
    const [messageContent, setMessageContent] = useState('');
    const [messageToDisplay, setMessagesToDisplay] = useState('');
    const [error, setError] = useState('');
    useEffect(()=>{
        setMessageContent('')
    }, [conversation])

    const getMesages = async(senderId, receiverId, conversationId)=>{
        console.log("getting message")
        try {
            const participants = conversation;
            console.log("participants: ", participants)
            const response = await fetch(apiEndPoints.getAllMessageOfUserWithAnotherUserAddress(senderId, receiverId, conversationId))
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Network response wasn't ok while fetching messages")
            }
            
            if(data.success){
                console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        (async ()=>{
            try {
                console.log("getting converationid")
                const response = await fetch(apiEndPoints.getConversationAddress(conversationId));
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Network response wasn't ok while fetching current Conversation!")
                }

                if(data.success){
                    const participants = data?.data?.participants;
                    const receiverId = currentUser?._id === participants[0]?._id ? participants[1]?._id : participants[0]?._id;
                    setConversation(data?.data);

                    getMesages(currentUser?._id, receiverId, conversationId);

                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [conversationId])
   
    const sendMessageClick = async ()=>{
        // console.log("message clicked with following details");
        // console.log("sender: ", currentUser.fullName);
        // console.log("reciever: ", conversation?.participants[1]?.fullName);
        // console.log("conversation name: ", conversation.name)
        // console.log("message: ", messageContent);
        try {
            if(messageContent.trim() === ''){
                throw new Error("Message content can't be empty");
            }
            const formData = new FormData();
            formData.append("message", messageContent);
            const response = await fetch(apiEndPoints.sendPrivateMessageAddress(currentUser?._id, conversation?.participants[1]?._id, conversation?._id),
            {  
                method: "POST",
                body: formData,

             });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Network response wasn't ok while sending message");
            }

            if(data.success){
                // console.log(data)
                const modifiedConversation = data?.data?.conversation;                          
                const updatedConversations = conversations.map(conversation => 
                  conversation?._id === modifiedConversation?._id ? modifiedConversation : conversation
                );
                setConversations(updatedConversations.sort((a, b)=> new Date(b.updatedAt) - new Date(a.updatedAt)));
                setMessageContent('')
            }
        } catch (error) {
            alert(error.message)
            console.log("error from conversation page while sending message", error)
            setError(error.message)
        }
    }

    if(!conversation){
    return <div className='w-full grid place-items-center'> <PageLoader /> </div>
    }
    // console.log("current conversation id", conversation)
  return (
      <div className='w-full'>
      {/* //chat header */}
        <div className='flex justify-between dark:bg-gray-600 border-b-2'>
            <div className='pb-1 flex items-center'> 
                <img 
                src={conversation?.participants[0]?._id === currentUser?._id ? conversation?.participants[1]?.profilePic?.at(-1) : conversation?.participants[0]?.profilePic?.at(-1) || 'social-fusion-icon'} 
                className='h-12 w-12 rounded-full ml-2' alt={conversation?.name} />
                <div className='flex flex-col items-start pl-2'>
                    <p className='font-bold text-xl'> 
                    {conversation?.participants[0]?._id === currentUser?._id ? conversation?.name[1] : conversation?.name[0]} 
                    </p>
                    <p className='text-xs font-light tracking-widest'> last seen: 3 min ago</p>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 pr-10'>
                <HiPhone className='text-3xl cursor-pointer hover:bg-gray-500 m-1 rounded-lg' />
                <HiVideoCamera className='text-3xl cursor-pointer hover:bg-gray-500 m-1 rounded-lg' />
                <HiSearch className='text-3xl cursor-pointer hover:bg-gray-500 m-1 rounded-lg' />
            </div>
        </div>


        {/* //message box */}
        <MessageBox />

        <div className='w-10 bg-green-700 py-2 px-2 rounded-lg relative right-[4rem] top-[3rem] cursor-pointer hover:bg-green-500'> 
            <HiUserPlus /> 
        </div>
        <TextInput
            className='border-2 rounded-lg border-white ml-4 mr-1 relative top-10'
            placeholder='send message...'
            onChange={(e)=>(setMessageContent(e.target.value))}
            value = {messageContent}
            // onKeyDown={(e)=>{if(e.key === 'Enter' && !e.shiftKey){sendMessageClick}}}
        />
         <div className='flex justify-between'>
            <div></div>
            <HiPaperAirplane onClick={sendMessageClick} className='relative bottom-2 right-4 rounded-lg px-2 text-5xl cursor-pointer' />
         </div>
    </div>
  )
}

export default ConversationPage