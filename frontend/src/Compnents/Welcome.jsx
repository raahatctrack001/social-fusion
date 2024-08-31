import React from 'react';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-8 rounded-lg shadow-2xl max-w-6xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4 ">Welcome to Social Fusion!</h1>
        <p className="mb-6">
          Hello and welcome! We're thrilled to have you here. Social Fusion is the ultimate platform for connecting with friends, sharing updates, and engaging in meaningful conversations.
        </p>
        <p className="">
          To get started, explore our features and dive into the conversations happening right now. If you have any questions or need assistance, feel free to reach out to our support team.
        </p>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Start Conversation Now...
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
