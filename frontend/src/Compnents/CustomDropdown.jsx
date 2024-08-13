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
    <div style={{ width: '100%' }}>
      <select
        value={selectedOption}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
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
