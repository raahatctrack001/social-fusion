import React from 'react';

const About = () => {
  const features = [
    {
      title: 'Chat and Messaging',
      description: 'Communicate seamlessly with individuals or groups through our advanced chat and messaging features.',
      icon: '💬',
    },
    {
      title: 'Voice and Video Calls',
      description: 'Connect with friends and groups via high-quality voice and video calls, both one-on-one and in groups.',
      icon: '📞',
    },
    {
      title: 'Live Streaming',
      description: 'Go live and share moments with your audience in real-time. Engage with viewers instantly.',
      icon: '🎥',
    },
    {
      title: 'Video Uploads',
      description: 'Upload and share videos of any length. From short clips to long-form content, we’ve got you covered.',
      icon: '🎬',
    },
    {
      title: 'Filters and Snaps',
      description: 'Express yourself with fun filters and quick snaps. Capture and share your best moments with creativity.',
      icon: '📸',
    },
    {
      title: 'Story Highlights',
      description: 'Save your favorite stories as highlights that stay on your profile for everyone to see.',
      icon: '⭐',
    },
    {
      title: 'Customizable Profiles',
      description: 'Personalize your profile with custom themes, bio, and display options that reflect your personality.',
      icon: '🎨',
    },
    {
      title: 'Event Creation and Management',
      description: 'Create, share, and manage events. Invite friends and followers to join your happenings.',
      icon: '📅',
    },
    {
      title: 'Advanced Analytics',
      description: 'Track your social media growth with detailed analytics and insights into your engagement.',
      icon: '📊',
    },
    {
      title: 'Privacy Controls',
      description: 'Have full control over who sees your content with advanced privacy settings and controls.',
      icon: '🔒',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Upcoming Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <div className="text-6xl text-center mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-semibold mb-4 text-center">{feature.title}</h2>
            <p className="text-lg text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
