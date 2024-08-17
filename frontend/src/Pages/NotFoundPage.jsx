import React, { useEffect } from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirects to the home page
  };

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-2xl text-gray-600">Oops! Page not found.</p>
        <p className="mt-2 text-lg text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-8 w-full flex justify-center">
          <Button onClick={handleGoHome} outline>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
