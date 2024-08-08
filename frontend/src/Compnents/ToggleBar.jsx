import React, { useState } from 'react';

const ToggleBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">My App</div>
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="hamburger-icon">
            <div
              className={`h-1 w-6 my-1 rounded-full bg-white transition transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <div
              className={`h-1 w-6 my-1 rounded-full bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <div
              className={`h-1 w-6 my-1 rounded-full bg-white transition transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex space-x-4 text-lg`}
        >
          <a href="#" className="block py-2 md:py-0">
            Home
          </a>
          <a href="#" className="block py-2 md:py-0">
            About
          </a>
          <a href="#" className="block py-2 md:py-0">
            Services
          </a>
          <a href="#" className="block py-2 md:py-0">
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
};

export default ToggleBar;
