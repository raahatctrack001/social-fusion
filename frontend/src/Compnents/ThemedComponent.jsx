// ThemedComponent.js
import React from 'react';
import { useSelector } from 'react-redux';
// import { useTheme } from './ThemeContext';

const ThemedComponent = () => {
  const { theme }  = useSelector(state=>state.theme)

  return (
    <div
      className={`p-6 ${
        theme === 'dark' ? 'bg-dark-primary text-white' : 'bg-light-primary text-gray-900'
      }`}
    >
      <h1
        className={`text-3xl font-bold ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}
      >
        {theme === 'dark' ? 'Technical and Calm' : 'Trust and Serenity'}
      </h1>
      <p
        className={`mt-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        This is an example of {theme === 'dark' ? 'a dark theme with technicality and calmness, and a hint of danger' : 'a light theme with trust, serenity, and a slight hint of danger'}.
      </p>
      <button
        className={`mt-4 p-2 rounded ${
          theme === 'dark' ? 'bg-dark-accent text-white' : 'bg-light-accent text-white'
        }`}
      >
        {theme === 'dark' ? 'Danger Action' : 'Trust Action'}
      </button>
    </div>
  );
};

export default ThemedComponent;
