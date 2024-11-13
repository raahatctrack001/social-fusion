import React, { useEffect, useState } from 'react'
// import conversations from '../../../conversation'
import { HiArrowLeft, HiPaperAirplane, HiPencil, HiPlus, HiSearch, HiUser, HiUserGroup } from 'react-icons/hi'
import { TextInput } from 'flowbite-react'
import ChatBoxHeader from './ChatBox'
import ChatPage from './MessageBox'
import { HiFunnel, HiUserPlus } from 'react-icons/hi2'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UnderDevelopment from '../TestComponent/UnderDevelopment'
import WelcomePage from './Welcome'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { useDispatch, useSelector } from 'react-redux'
import ConversationPage from './MessageComponents/ConversationPage'
import LoaderPopup from './Loader'
import { formatDistanceToNow } from 'date-fns'


const MessageComponent = () => {
    const { currentUser } = useSelector(state=>state.user);

    const [conversations, setConversations] = useState([]); // all conversations between different users
    const [sendConversationId, setSendConversationId] = useState(''); //converstion to carry out right now
    const [showChatBox, setShowChatBox] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [createConversationLoading, setCreateConversationLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const handleMessageInputKeydown = (e)=>{
        if(e.key === 'Enter'){
            //console.log("enter key is pressed!")
        }
    }

    
    //get all conversations
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(apiEndPoints.getAllConversationsOfUser(currentUser?._id));
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.message || "Network response wasn't ok while fetching conversation");
                }
    
                if (data.success) {
                    const updatedConversations = data?.data?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    
                    setConversations(updatedConversations);
                    
                    // Use updatedConversations to set the conversation ID
                    setSendConversationId(updatedConversations[0]?._id); //conversations doesn't reflect immediately hence user updated conversation array for it
                    
                    setShowChatBox(true);
                }
    
            } catch (error) {
                setError(error.message);
                //console.log(error);
            }
        })();
    }, [currentUser?._id]);
    
    //search user
    useEffect(()=>{
        const timeout = setTimeout(() => {
            if(searchTerm.trim() === ''){
                setSearchedUsers([]);
            }
            else{

                (async ()=>{
                    try {
                        const response = await fetch(apiEndPoints.searchUsersAddress(searchTerm), {method: "POST"});
                        const data = await response.json();
                        
                        if(!response.ok){
                            throw new Error(data.message || "Network response wasn't ok while searching for users")
                        }
                        
                        if(data.success){
                            setSearchedUsers(data?.data)
                            // //console.log(data)
                        }
                    } catch (error) {
                        //console.log(error);
                    }
                })()
            }
        }, 1000);
        return ()=>clearTimeout(timeout)
    }, [searchTerm])
    
    //open or create new conversation
    const openOrCreateConversation = async (receiver)=>{
        setCreateConversationLoading(true)
        try {
            // //console.log(apiEndPoints.openOrCreateNewConversationAddress(currentUser?._id, receiver?._id))
            const response = await fetch(apiEndPoints.openOrCreateNewConversationAddress(currentUser?._id, receiver?._id), 
            {method: "POST"});
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Network response wasn't ok while creating conversation");
            }

            if(data.success){
                const newConversation = data?.data;
                if(data.statusCode === 202){
                    setSendConversationId(newConversation[0]?._id);
                    // //console.log("data for existing conversation", data);
                }
                else{
                    // //console.log("data for new conversation", data);
                    const updatedConversations = [...conversations, newConversation];
                    setConversations(updatedConversations.sort((a, b)=> new Date(b.updatedAt) - new Date(a.updatedAt)));
                    setSendConversationId(newConversation?._id);
                    
                }      
                setSearchTerm('')
                setShowChatBox(true); 
            }

        } catch (error) {
            alert(error.message);
            //console.log(error)
        }
        finally{
            setCreateConversationLoading(false)
        }
    }

    // if(conversations.length === 0){
    //     return <div> No active conversation </div>
    // }
    console.log("conversations", conversations)
    return (
    <div className='flex w-full h-[825px]'>
        {createConversationLoading && <LoaderPopup loading={createConversationLoading} setLoading={setCreateConversationLoading} info={"creating/opening conversation please wait!"} />}
        {/* conversations lists */}
        <div className='w-96 max-h-[780px] dark:bg-gray-600 pt-2 hidden md:inline'>
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
                {searchTerm.trim() !== '' && <HiArrowLeft onClick={()=>setSearchTerm('')} className='text-2xl bg-gray-700 relative top-8 left-2 z-10 cursor-pointer' />}
                <TextInput 
                    icon={HiSearch}
                    placeholder='search contact...'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className='max-h-96 overflow-y-scroll '>
                {searchedUsers.length > 0 ? searchedUsers.map((user, index)=>{
                    return <div 
                                onClick={(e)=>{ e.stopPropagation(), openOrCreateConversation(user)}}
                                key={index} 
                                className='flex gap-2 my-2 pl-2 shadow-lg py-1 cursor-pointer'> 
                        <img src={user.profilePic.at(-1)} alt="" className='h-14 w-14 rounded-full' />
                        <div>
                            <p> { user.fullName } </p>
                            <p> {user.username} </p>
                        </div>
                    </div>
                }) : searchTerm.trim().length > 0 && <div className='w-full h-full grid place-items-center'> No user found </div>}
            </div>

            <div className={`flex resize-x flex-col w-60 md:w-80 gap-2 py-1 px-2 mt-2 ml-3 h-[680px] overflow-y-scroll ${searchedUsers.length > 0 && 'opacity-0'}`}>
                {conversations?.length > 0 ? conversations.map((conversation, index)=>{
                    return conversation?.lastMessage && <div key={index} className='flex  justify-between' onClick={()=>{setShowChatBox(true); setSendConversationId(conversation?._id)}}>
                            <div className='flex start gap-2 cursor-pointer'>
                                <img 
                                    className='h-12 w-12 rounded-full' 
                                    src={conversation?.participants[0]?._id === currentUser?._id ? conversation?.participants[1]?.profilePic?.at(-1) : conversation?.participants[0]?.profilePic?.at(-1) || 'social-fusion-icon'} 
                                />
                                <div className='flex flex-col items-start'>  
                                    <p className='font-bold text-nowrap'> 
                                    {conversation?.participants[0]?._id === currentUser?._id ? conversation?.name[1] : conversation?.name[0]} 
                                    </p>
                                    <p>
                                      {
                                        conversation.lastMessage ? (conversation.lastMessage?.content?.length > 0 ? 
                                                (conversation.lastMessage?.content?.length > 30 ? (conversation.lastMessage?.content.substr(0, 30)) : (conversation.lastMessage?.content)): 
                                                (conversation.lastMessage?.mediaURL.length > 30 ? (conversation.lastMessage?.mediaURL?.substr(0, 30)) : (conversation.lastMessage?.mediaURL))) : 
                                            (`${conversation?.participants[0]?._id === currentUser?._id
                                              ? conversation?.participants[1]?.fullName
                                              : conversation?.participants[0]?.fullName
                                            } started a conversation...`)
                                      }
                                    </p>                                  
                                </div>
                            </div>
                            <div className='pr-5 text-xs text-gray-400 flex items-end'>
                                {/* {conversation?.isGroup ? <HiUserGroup /> : <HiUser />} */}
                                <p className=''>
                                    {conversation?.updatedAt && formatDistanceToNow(new Date(conversation?.updatedAt), { addSuffix: true })} 
                                </p>
                            </div>
                           </div>
                }) : <div className='flex flex-col justify-center items-center w-full h-full'>
                    <h1> No Conversation Yet!</h1>
                    <div className='flex flex-col items-center justify-center mt-2 text-xl font-semibold cursor-pointer'>
                        <HiPlus className='text-2xl' />
                        <span className=''> Start a new conversation. </span>
                    </div>
                 </div>}
            </div>
        </div>

        {/* main chat box */}
        {showChatBox && <ConversationPage conversationId={sendConversationId} conversations={conversations} setConversations={setConversations} />}

        {/* <div className='flex flex-col w-full'>            */}
            {/* <ChatBoxHeader conversation={sendToChatBox} /> */}
            {/* <ChatPage  />
            <div className='w-10 bg-green-700 py-2 px-2 rounded-lg relative right-[3rem] top-[3rem] cursor-pointer hover:bg-green-500'> <HiUserPlus /> </div>
            <TextInput
                className='border-2 rounded-lg border-white ml-4 mr-1 relative top-10'
                placeholder='send message...'
                onKeyDown={(e)=>{if(e.key === 'Enter' && !e.shiftKey){//console.log("enter only")}}}
             />
             <div className='flex justify-between'>
                <div></div>
                <HiPaperAirplane className='relative bottom-2 right-4 rounded-lg px-2 text-5xl cursor-pointer' />
             </div> */}
        </div>
        // :<div className='w-full'> <WelcomePage /> </div> 
    // </div>
  )
}



export default MessageComponent