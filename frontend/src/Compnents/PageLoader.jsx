// Loader.js
import React from 'react';

const PageLoader = ({info}) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"> </div>
        <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">Hold tight! We're loading your content.</p>
            <p className="mt-2">Thanks for your patience.</p>
            {info && <p> { info || "If it's taking longer time than expected, please check your internet connection or refresh the page!" }</p>}
        </div>
    </div>
  );
};

export default PageLoader;
