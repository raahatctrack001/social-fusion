import React from 'react';

// Example list of messages
const messages = [
  { id: 1, user: 'Alice', text: 'Hey, how are you?', time: '10:30 AM' },
  { id: 2, user: 'You', text: 'I am good, thanks! How about you?', time: '10:31 AM' },
  { id: 3, user: 'Alice', text: 'I am great! Working on a new project.', time: '10:32 AM' },
  { id: 4, user: 'You', text: 'That’s awesome. Can’t wait to hear more about it.', time: '10:33 AM' },
  // Add more messages as needed
];

const ChatPage = () => {
  return (
    <div className="flex h-screen">
      {/* Contacts List */}
      

      {/* Chat Window */}
      <div className="w-full flex flex-col ">
        
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map(message => (
            <div key={message.id} className={`mb-4 ${message.user === 'You' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${message.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p>{message.text}</p>
                <p className="text-xs text-gray-500">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
