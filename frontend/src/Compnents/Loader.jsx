import { Alert } from 'flowbite-react';
import React from 'react';
import { HiX } from 'react-icons/hi';

const LoaderPopup = ({ loading, setLoading, info }) => {
  if (!loading) return null;

  console.log(info); // Should log "We are uploading your file"

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
        <div className='flex  w-full justify-between text-red-900 relative right-28'>
            <div></div>
            
            {setTimeout(()=>true, [1000])&&<HiX onClick={()=>setLoading(false)} className='cursor-pointer text-xl font-bold hover:border-2' />}
        </div>
      <div className="flex flex-col items-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        <p className="text-white mt-4">Loading, please wait...</p>
        {info && <Alert color={'warning'}  className='py-2 my-2'>{info}</Alert>}
      </div>
      <style>{`
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
