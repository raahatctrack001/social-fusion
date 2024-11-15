import React, { useEffect, useState } from 'react';
import { Sidebar, Navbar, Dropdown, Button, Table, Alert } from 'flowbite-react';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import DisplayContent from '../Compnents/DisplayContent';
import RecentPostsTable from '../Compnents/RecentPostTable';
import DashSidebar from '../Compnents/DashSidebar';
import DashHeader from '../Compnents/DashHeader';
import DashHome from '../Compnents/DashHome';
import { useLocation } from 'react-router-dom';
import UnderDevelopment from '../TestComponent/UnderDevelopment';
import DashPosts from '../Compnents/DashPosts';
import DashSavedPosts from '../Compnents/DashSavedPosts';
import DashCategorised from '../Compnents/DashCategorised';
import DashComments from '../Compnents/DashComments';
import DashUsers from '../Compnents/DashAudience';
import DashAnalytics from '../Compnents/DashAnalytics';
import DashSettings from '../Compnents/DashSettings';
import DashAudience from '../Compnents/DashAudience';
import HiddenPosts from '../Compnents/HiddenPosts';
import MyBooks from '../Compnents/MyBooks';
import AuthorsBook from './Book/AuthorsBook';
// import PublishedBooks from './Book/PublishedBooks';
import PublishedBooksOfAuthor from './Book/PublishedBooksOfAuthor';
// import { join } from 'path';

const Dashboard = () => {

  const location = useLocation();   
  const [tab, setTab] = useState('');   
  
  useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
      window.scroll(0, 0)
    }, [location.search]);

    //console.log("tab", tab)
    
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[rgb(16,23,42)]">
      {/* Sidebar */}
      <DashSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <DashHeader />
      <div className='flex flex-col w-full ml-10 justify-center items-center'>        
        <Alert color={'warning'} className='font-bold text-xl md:hidden fixed top-16 z-10 w-full flex justify-start items-start'> consider larger screen for dashboard analysis </Alert>
      </div>

        {/* Content Area */}
      {tab === 'home' && <DashHome />}
      {tab === 'posts' && <DashPosts />} 
      {tab === 'saved-posts' && <DashSavedPosts />} 
      {tab === 'categories' && <DashCategorised />}
      {tab === 'comments' && <DashComments />} 
      {tab === 'users' && <DashAudience />} 
      {tab === 'analytics' && <DashAnalytics />} 
      {tab === 'settings' && <DashSettings />} 
      {tab === 'hidden-posts' && <HiddenPosts />}
      {tab === 'books' && <AuthorsBook />}
      {tab === 'published-books' && <PublishedBooksOfAuthor />}
      </div>
    </div>
  );
};

export default Dashboard;
