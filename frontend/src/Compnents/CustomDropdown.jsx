import React, { useState } from 'react';

const CustomDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div style={{ width: '100%' }} className=''>
      <select
        value={selectedOption}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        className='dark:bg-[rgb(16,23,42)] rounded-lg hover:bg-gray-500'
        
      >
        <option value="" disabled>
          Select a category
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
