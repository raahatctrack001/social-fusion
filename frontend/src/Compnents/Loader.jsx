import React from 'react';

const LoaderPopup = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        <p className="text-white mt-4">Loading, please wait...</p>
      </div>
      <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top-color: #3498db;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderPopup;
