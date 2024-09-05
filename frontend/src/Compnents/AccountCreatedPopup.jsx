import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuccessPopup = ({heading, info, setShowPopup }) => {
  const { theme } = useSelector(state=>state.theme);
  const darkTheme = theme === 'dark';
  const navigate = useNavigate();
  // console.log(darkTheme);

  const handleClickOk = ()=>{
    setShowPopup(false)
    if(heading === 'Account Created!' || "Reset Password Success!"){
      navigate('/sign-in')
    }
  }
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkTheme ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
      <div className={`w-full max-w-sm p-6 rounded-lg shadow-lg ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex items-center justify-center">
          <HiCheckCircle className={`h-16 w-16 ${darkTheme ? 'text-green-400' : 'text-green-500'}`} />
        </div>
        <h2 className="mt-4 text-center text-2xl font-semibold">
            {heading}
        </h2>
        <p className="mt-2 text-center">
          {info}
        </p>
        <button
          className={`mt-6 w-full px-4 py-2 rounded-md text-white ${darkTheme ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkTheme ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
          onClick={handleClickOk}
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
