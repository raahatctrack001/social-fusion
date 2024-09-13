import React from 'react';

const FeaturesPage = () => {
  const categories = [
    {
      title: 'Users',
      features: [
        'Register using Google Auth and OTP on email.',
        'Login, Logout, Update Password, Delete User.',
        'Dynamic profile update for users (profile picture change, status update, real-time updates).',
        'See who followed you, your followings, and who likes your posts.',
      ],
    },
    {
      title: 'Posts',
      features: [
        'See who liked your posts.',
        'Advanced post analytics.',
        'Create, edit, delete, and manage posts.',
      ],
    },
    {
      title: 'Comments',
      features: [
        'Create, reply, show, delete, and edit recursive comment section.',
        'Like comments.',
        'Create, get, search, edit, delete, report, like, save comments.',
        'Disable comments.',
      ],
    },
    {
      title: 'Stories',
      features: [
        'Upload story, delete story, create and delete highlights from story.',
        'Like, reply, and report story.',
      ],
    },
    {
      title: 'General',
      features: [
        'Feedback taker.',
      ],
    },
  ];

  const upcomingFeatures = [
    'Chat and messaging (individual and group).',
    'Voice and video calls (individual and group).',
    'Live streaming and video uploads (short and long videos).',
    'Filters and snaps.',
    'Event creation and management.',
    'In-app notifications for likes, comments, and follows.',
    'Integration with third-party apps and services.',	 
    'Todo List to organise your task effectively',
    'Schedule events or celebrate events on schedule without being awake',
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Features of Our Social Media Web App</h1>

      {categories.map((category, idx) => (
        <section key={idx} className="mb-12">
          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {category.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section>
        <h2 className="text-4xl font-bold text-center mb-8">Upcoming Features</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {upcomingFeatures.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature {idx + 1}</h3>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
