import React from 'react';

const About = () => {
  const features = [
    {
      title: 'Chat and Messaging',
      description: 'Communicate seamlessly with individuals or groups through our advanced chat and messaging features.',
      icon: '💬',
      complete: false,
    },
    {
      title: 'Voice and Video Calls',
      description: 'Connect with friends and groups via high-quality voice and video calls, both one-on-one and in groups.',
      icon: '📞',
      complete: false,

    },
    {
      title: 'Live Streaming',
      description: 'Go live and share moments with your audience in real-time. Engage with viewers instantly.',
      icon: '🎥',
      complete: false,

    },
    {
      title: 'Video Uploads',
      description: 'Upload and share videos of any length. From short clips to long-form content, we’ve got you covered.',
      icon: '🎬',
      complete: false,

    },
    {
      title: 'Filters and Snaps',
      description: 'Express yourself with fun filters and quick snaps. Capture and share your best moments with creativity.',
      icon: '📸',
      complete: false,

    },
    {
      title: 'Story Highlights',
      description: 'Save your favorite stories as highlights that stay on your profile for everyone to see.',
      icon: '⭐',
      complete:true,
    },
    {
      title: 'Customizable Profiles',
      description: 'Personalize your profile with custom themes, bio, and display options that reflect your personality.',
      icon: '🎨',
      complete: true,
    },
    {
      title: 'Event Creation and Management',
      description: 'Create, share, and manage events. Invite friends and followers to join your happenings.',
      icon: '📅',
      complete: false,

    },
    {
      title: 'Advanced Analytics',
      description: 'Track your social media growth with detailed analytics and insights into your engagement.',
      icon: '📊',
      complete: false,

    },
    {
      title: 'Privacy Controls',
      description: 'Have full control over who sees your content with advanced privacy settings and controls.',
      icon: '🔒',
      complete: false,

    },
    {
      title: 'Dynamic Post Mastery',
      description: 'Craft compelling posts, refine them to perfection, and share with ease. Analyze your engagement with advanced metrics.',
      icon: '📝',
      complete: true,
    },
    {
      title: 'Comment Conversations',
      description: 'Dive into deep, nested discussions. Engage with replies, highlight important threads, and keep the conversation flowing.',
      icon: '💬',
      complete: true,
    },
    // {
    //   title: 'Profile Transformation',
    //   description: 'Express your unique style with customizable themes, bios, and profile visuals that showcase who you truly are.',
    //   icon: '🎨',
    //   complete: true,
    // },
    {
      title: 'Story Interaction Hub',
      description: 'Add, remove, like, and reply to stories in real-time. Keep your audience engaged with fresh, interactive content.',
      icon: '📸',
      complete: true,
    },
    {
      title: 'Story Highlight Creation',
      description: 'Curate and showcase your best moments by creating and managing story highlights that stay on your profile.',
      icon: '🌟',
      complete: true,
    },
    {
      title: 'Follow and Unfollow Dynamics',
      description: 'Manage your connections with ease. Follow new friends, unfollow when needed, and keep your feed curated.',
      icon: '👥',
      complete: true,
    },
    {
      title: 'Instant Presence Detection',
      description: 'Know when your friends are online with real-time detection, so you never miss a chance to connect.',
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
            {feature.complete && <h1 className='w-52 grid place-items-center bg-green-950 text-white rounded-lg'> Feature is live </h1>}
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
