import React, { useEffect, useState } from 'react';
import { Sidebar, Navbar, Dropdown, Button, Table } from 'flowbite-react';
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
import DashUsers from '../Compnents/DashUsers';
import DashAnalytics from '../Compnents/DashAnalytics';
import DashSettings from '../Compnents/DashSettings';
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
    }, [location.search]);

    console.log("tab", tab)
    
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[rgb(16,23,42)]">
      {/* Sidebar */}
      <DashSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <DashHeader />

        {/* Content Area */}
      {tab === 'home' && <DashHome />}
      {tab === 'posts' && <DashPosts />} 
      {tab === 'saved-posts' && <DashSavedPosts />} 
      {tab === 'categories' && <DashCategorised />}
      {tab === 'comments' && <DashComments />} 
      {tab === 'users' && <DashUsers />} 
      {tab === 'analytics' && <DashAnalytics />} 
      {tab === 'setting s' && <DashSettings />} 
      </div>
    </div>
  );
};

export default Dashboard;
