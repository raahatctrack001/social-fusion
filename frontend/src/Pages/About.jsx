import React from 'react';

const About = () => {
  const features = [
    {
      title: 'Chat and Messaging',
      upcoming: true,
      description: 'Communicate seamlessly with individuals or groups through our advanced chat and messaging features.',
      icon: '💬',
      complete: false,
    },
    {
      title: 'Notification System',
      upcoming: false,
      description: 'Receive real-time notifications for everything from comment reactions to message updates, and voice to video calls.',
      icon: '🔔',
      complete: false,

    },
    {
      title: 'Voice and Video Calls',
      upcoming: false,
      description: 'Connect with friends and groups via high-quality voice and video calls, both one-on-one and in groups.',
      icon: '📞',
      complete: false,

    },
    {
      title: 'Live Streaming',
      upcoming: false,
      description: 'Go live and share moments with your audience in real-time. Engage with viewers instantly.',
      icon: '🎥',
      complete: false,

    },
    {
      title: 'Video Uploads',
      upcoming: false,
      description: 'Upload and share videos of any length. From short clips to long-form content, we’ve got you covered.',
      icon: '🎬',
      complete: false,

    },
    {
      title: 'Filters and Snaps',
      upcoming: false,
      description: 'Express yourself with fun filters and quick snaps. Capture and share your best moments with creativity.',
      icon: '📸',
      complete: false,

    },
    {
      title: 'Story Highlights',
      upcoming: false,
      description: 'Save your favorite stories as highlights that stay on your profile for everyone to see.',
      icon: '⭐',
      complete:true,
    },
    {
      title: 'Customizable Profiles',
      upcoming: false,
      description: 'Personalize your profile with custom themes, bio, and display options that reflect your personality.',
      icon: '🎨',
      complete: true,
    },
    {
      title: 'Event Creation and Management',
      upcoming: false,
      description: 'Create, share, and manage events. Invite friends and followers to join your happenings.',
      icon: '📅',
      complete: false,

    },
    {
      title: 'Advanced Analytics',
      upcoming: false,
      description: 'Track your social media growth with detailed analytics and insights into your engagement.',
      icon: '📊',
      complete: false,

    },
    {
      title: 'Privacy Controls',
      upcoming: false,
      description: 'Have full control over who sees your content with advanced privacy settings and controls.',
      icon: '🔒',
      complete: false,

    },
    {
      title: 'Dynamic Post Mastery',
      upcoming: false,
      description: 'Craft compelling posts, refine them to perfection, and share with ease. Analyze your engagement with advanced metrics(not live yet).',
      icon: '📝',
      complete: true,
    },
    {
      title: 'Comment Conversations',
      upcoming: false,
      description: 'Dive into deep, nested discussions. Engage with replies, highlight important threads, and keep the conversation flowing.',
      icon: '💬',
      complete: true,
    },
    {
      title: 'Profile Transformation',
      description: 'Express your unique style with customizable themes(not active), bios, and profile visuals that showcase who you truly are.',
      icon: '🎨',
      complete: true,
    },
    {
      title: 'Story Interaction Hub',
      upcoming: false,
      description: 'Add, remove, like, and reply (not active) to stories in real-time. Keep your audience engaged with fresh, interactive content.',
      icon: '📸',
      complete: true,
    },
    {
      title: 'Story Highlight Creation',
      upcoming: false,
      description: 'Curate and showcase your best moments by creating and managing story highlights that stay on your profile.',
      icon: '🌟',
      complete: true,
    },
    {
      title: 'Follow and Unfollow Dynamics',
      upcoming: false,
      description: 'Manage your connections with ease. Follow new friends, unfollow when needed, and keep your feed curated.',
      icon: '👥',
      complete: true,
    },
    {
      title: 'Instant Presence Detection',
      upcoming: false,
      description: "Get real-time updates on your friends' online status (with a ±3-minute delay) to ensure you never miss a chance to interact.",
      icon: '🟢',
      complete: true,
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
            {feature.complete && <h1 className='w-52 grid place-items-center bg-green-700 text-white rounded-lg'> Feature is live </h1>}
            {
              feature.upcoming ?
              feature.complete === false && <h1 className='w-52 grid place-items-center bg-yellow-400 text-white rounded-lg'> Upcoming </h1> :
              feature.complete === false && <h1 className='w-52 grid place-items-center bg-red-400 text-white rounded-lg'> Under evelopment queue </h1>
            }
            
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
