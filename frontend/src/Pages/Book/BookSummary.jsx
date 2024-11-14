// BookSummaryPage.js

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DisplayContent from '../../Compnents/DisplayContent';

export default function BookSummary() {
    const bookData = JSON.parse(localStorage.getItem("bookDetail"))
    const { title, summary } = bookData;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>

      <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-7xl mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">{title || 'Book Summary'}</h1>

        {/* <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          <DisplayContent content={description || "No description available"} />
        </p> */}

        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <DisplayContent content={summary || "No summary available"} />
        </p>
      </div>
    </div>
  );
}
