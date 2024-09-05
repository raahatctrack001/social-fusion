import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { HiDotsVertical } from 'react-icons/hi';

const MessageBox = ({ messages, scrollToLastMessage }) => {
  const { currentUser } = useSelector(state => state.user);
  const [showMessageOptions, setShowMessageOptions] = useState({});

  const handleMessageOptions = async (message) => {
    //console.log("edit reply delete or copy message clicked", message.content);
  };
  
  return (
    <div className="flex h-[625px]">
      {/* Chat Window */}
      <div className="w-full flex flex-col m-2">
        <div className="flex-1 overflow-y-auto">
          {messages?.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.sender === currentUser?._id ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-2 mx-3 rounded-lg ${message.sender === currentUser?._id ? 'dark:bg-gray-500 bg-gray-200' : 'dark:bg-red-800 bg-red-100'}`}>
                  <div className='flex justify-center items-center'> 
                    <div className='flex flex-col max-w-3/4'>
                      <div className='max-w-3/4'> <p>{message.content}</p> </div>
                      { message.createdAt && 
                      <p className="text-xs w-full flex justify-end">{format(new Date(message.createdAt),  'h:mm a')}</p>

                      }
                    </div>
                    {currentUser?._id === message?.sender && (
                      <HiDotsVertical 
                        className="text-2xl cursor-pointer" 
                        onClick={() => setShowMessageOptions({ [message._id]: !showMessageOptions[message._id] })}
                      />
                    )}
                  </div>
                  {showMessageOptions[message._id] && (
                    <div className='flex flex-col items-start dark:bg-gray-700 bg-gray-400 rounded-lg p-2'>
                      <span className='hover:text-lg text-sm cursor-pointer' onClick={() => handleMessageOptions(message)}> Reply </span>
                      <span className='hover:text-lg text-sm cursor-pointer' onClick={() => handleMessageOptions(message)}> Edit </span>
                      <span className='hover:text-lg text-sm cursor-pointer' onClick={() => handleMessageOptions(message)}> Delete </span>
                      <span className='hover:text-lg text-sm cursor-pointer' onClick={() => handleMessageOptions(message)}> Copy </span>
                    </div>
                  )}
                </div>
                <div ref={scrollToLastMessage} />
              </div>
            ))
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center gap-3'> 
              <h1 className='font-bold text-2xl'> No Messages yet! </h1>
              <p> Tu hi baat shuru karde! Chhota nahi ho jaega! </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
