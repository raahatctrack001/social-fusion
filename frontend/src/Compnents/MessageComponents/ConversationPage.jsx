import React, { useEffect, useRef, useState } from 'react'
import { HiArrowCircleLeft, HiArrowCircleRight, HiArrowRight, HiArrowsExpand, HiChartBar, HiDocumentText, HiEmojiHappy, HiLocationMarker, HiMicrophone, HiOutlineArrowCircleRight, HiOutlinePaperAirplane, HiOutlinePaperClip, HiPaperAirplane, HiPaperClip, HiPhone, HiPhotograph, HiSearch, HiUser, HiVideoCamera } from 'react-icons/hi'
import MessageBox from '../MessageBox'
import { HiMiniPaperAirplane, HiMiniPaperClip, HiUserPlus } from 'react-icons/hi2'
import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { apiEndPoints } from '../../apiEndPoints/api.addresses'
import PageLoader from '../PageLoader'
import EmojiPickerComponent from './EmojiPicker'
import EmojiPicker from 'emoji-picker-react'
import { useNavigate } from 'react-router-dom'
import SocketContext from '../../Context/SocketContext'


const ConversationPage = ({conversationId, conversations, setConversations, socket}) => {
    const { theme } = useSelector(state=>state.theme)
    const { currentUser } = useSelector(state=>state.user);
    const [conversation, setConversation] = useState(null);
    const [messageContent, setMessageContent] = useState('');
    const [messageToDisplay, setMessagesToDisplay] = useState([]);
    const [showEmojis, setShowEmojis] = useState(false);
    const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
    const messageRef = useRef();
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();


   
    useEffect(()=>{
        setMessageContent('')
        // console.log(conversation)
        if(conversation){
            // const participants = conversation.participants;
            // const userId = participants[0]?._id === currentUser?._id ? participants[1]?._id : participants[0]?._id;
            // Join the room with user's ID
            // socket.emit('join roPom', currentUser?._id);

            // Listen for incoming messages
            socket.on('receive message', (data) => {
                console.log('Message received:', data);
                const message = data.message;
                const newConversation = data.conversation;
                setMessagesToDisplay((prevMessages) => [...prevMessages, data.message]);
                const updatedConversations = conversations.map(conversation=>conversation?._id === newConversation?._id ? newConversation : conversation);
                setConversations(updatedConversations.sort((a, b)=> new Date(b.udpatedAt) - new Date(a.updatedAt)));
            });

        // Clean up on component unmount
        return () => {
            socket.off('receive message');
        };
        }
        
    }, [conversation])

    useEffect(() => {
        // Scroll to bottom when messages change
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messageToDisplay]);
    
    
    // get messages of two users
    const getMesages = async(senderId, receiverId, conversationId)=>{
        try {
            const response = await fetch(apiEndPoints.getAllMessageOfUserWithAnotherUserAddress(senderId, receiverId, conversationId))
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Network response wasn't ok while fetching messages")
            }
            
            if(data.success){
                console.log(data)
                setMessagesToDisplay(data?.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (!conversation || !currentUser) return;
    
    //     const interval = setInterval(() => {
    //       const participants = conversation.participants;
    //       const receiverId = currentUser._id === participants[0]?._id ? participants[1]?._id : participants[0]?._id;
    //       getMesages(currentUser._id, receiverId, conversationId);
    //       console.log("Interval triggered"); // Logging for debugging
    //     }, 1000);
    
    //     // Cleanup the interval on component unmount or dependency change
    //     return () => clearInterval(interval);
    
    //   }, [conversation, currentUser]);
    
  
    //    setInterval(() => {
    //     }, 1000);
     

        //get current conversation address
    useEffect(()=>{
        (async ()=>{
            try {
                // console.log("getting converationid")
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
                console.log(data);
                console.log(data);
                const modifiedConversation = data?.data?.conversation;                          
                const updatedConversations = conversations.map(conversation => 
                  conversation?._id === modifiedConversation?._id ? modifiedConversation : conversation
                );
                setConversations(updatedConversations.sort((a, b)=> new Date(b.updatedAt) - new Date(a.updatedAt)));
                setMessageContent('')
                setMessagesToDisplay(prev=>[...prev, data?.data?.message])
                socket.emit("send message", data?.data)
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
    // console.log(messageContent)
    // console.log("Message to display: ", messageToDisplay)
    // console.log("current conversation id", conversation)
  return (
      <div className='w-full flex flex-col'>
      {/* //chat header */}
        <div className='sticky top-4 z-50 w-full flex justify-between py-1 bg-white dark:bg-gray-600 border-b-2'>
            <div className='pb-1 flex items-center cursor-pointer' onClick={()=>{navigate(`/authors/author/${conversation?.participants[0]?._id === currentUser?._id ? conversation?.participants[1]?._id : conversation?.participants[0]?._id}`)}}> 
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
        <MessageBox messages={messageToDisplay} scrollToLastMessage={messagesEndRef}/>
        <div className="relative bottom- p-1 md:px-4 md:py-2 dark:bg-gray-800">
            <div className="flex gap-2 items-center dark:bg-gray-700 rounded-full py-2 px-4">
            <div className="relative group hidden md:inline">
              <HiUserPlus className="text-sm md:text-xl dark:text-white cursor-pointer hover:text-green-500" />
              <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 dark:bg-gray-700 dark:text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Add user temporarily in this chat...
              </span>
            </div>
                <div className="relative">
                    <HiEmojiHappy
                        className="text-sm md:text-xl dark:text-white cursor-pointer hover:text-green-500"
                        onClick={() => setShowEmojis(!showEmojis)}
                    />
                    {showEmojis && (
                        <div
                            onMouseLeave={()=>setShowEmojis(false)} 
                            className="absolute bottom-12 -left-14 z-50">
                            <EmojiPicker
                                searchPlaceHolder='mood kaisa hai janab ka?'
                                theme={theme}
                                // autoFocusSearch={true}
                                onEmojiClick={(emoji) => setMessageContent(messageContent => messageContent + emoji.emoji)}
                            />
                        </div>
                    )}
                </div>

                <HiOutlinePaperClip
                    onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)} 
                    className="text-lg md:text-xl dark:text-white cursor-pointer hover:text-green-500" />

                <TextInput
                    className="flex-grow dark:bg-gray-600 dark:text-white placeholder-gray-400 rounded-full md:py-2 md:px-4 focus:outline-none"
                    placeholder="Type a message..."
                    autoFocus
                    onChange={(e) => setMessageContent(e.target.value)}
                    value={messageContent}
                    onFocus={()=>setShowEmojis(false)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { sendMessageClick(); } }}
                />

                {
                    showAttachmentOptions && 
                    <div className="absolute bottom-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4 bg-gray-800 rounded-lg">
                      <div  onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)}
                            className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <HiPhotograph className="text-2xl text-white" />
                        <span className="text-sm text-white mt-1">Photos</span>
                      </div>
                      <div  onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)}
                            className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <HiVideoCamera className="text-2xl text-white" />
                        <span className="text-sm text-white mt-1">Videos</span>
                      </div>
                      <div  onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)}
                            className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <HiDocumentText className="text-2xl text-white" />
                        <span className="text-sm text-white mt-1">Documents</span>
                      </div>
                      <div  onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)}
                            className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <HiChartBar className="text-2xl text-white" />
                        <span className="text-sm text-white mt-1">Poll</span>
                      </div>
                      <div  onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)}
                            className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <HiUser className="text-2xl text-white" />
                        <span className="text-sm text-white mt-1">Contact</span>
                      </div>
                      <div  onClick={()=>setShowAttachmentOptions(!showAttachmentOptions)}
                            className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <HiLocationMarker className="text-2xl text-white" />
                        <span className="text-sm text-white mt-1">Location</span>
                      </div>
                    </div>
                }
                {/* <div className='flex justify-center items-center gap-1 md:text-2xl'> */}
                    { messageContent.trim() === '' ? 
                    <HiMicrophone className='cursor-pointer md:text-2xl'/>
                    : 
                    <Button
                        onClick={sendMessageClick}
                        disabled={messageContent.trim() === ''}
                        className={`order-1 dark:text-white bg-green-600 rounded-full ${messageContent.trim() === '' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                        <HiOutlinePaperAirplane className="text-xs md:text-xl transform rotate-45" />
                    </Button> 
                    }
                {/* </div> */}
            </div>
        </div>
    </div>
  )
}
const ConversationWithSocket = (props) => (
    <SocketContext.Consumer>
      {(socket) => <ConversationPage {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
// export default ChatRoomWithSocket;
export default ConversationWithSocket