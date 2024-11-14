import React, { useState, useEffect } from 'react';

const CustomDropdown = ({ defaultValue, options, onSelect }) => {
  // Set the selectedOption to defaultValue on the first render
  const [selectedOption, setSelectedOption] = useState('');

  // Update the selectedOption when the defaultValue prop changes
  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // Update the selected option to the new value
    if (onSelect) {
      onSelect(value); // Call the onSelect function if provided
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <select
        value={selectedOption}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        className="dark:bg-[rgb(16,23,42)] rounded-lg"
      >
        <option value={defaultValue || ""} disabled>
          {defaultValue || "Please Select Category"}
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
