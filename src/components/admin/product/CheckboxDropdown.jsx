import React, { useState } from 'react';

const CheckboxDropdown = ({ options, selectedOptions, handleSelectionChange }) => {
  const toggleOption = (value) => {
    const updatedSelection = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    handleSelectionChange(updatedSelection);
  };

  return (
    <div className="flex flex-col mt-3 text-sm relative">
      <label htmlFor="">Collections</label>
      <div className="border mt-1 p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md">
        {options &&
          options.map((item) => (
            <div key={item._id} className="flex items-center">
              <input
                type="checkbox"
                id={item._id}
                value={item.name}
                checked={selectedOptions.includes(item.name)}
                onChange={() => toggleOption(item.name)}
              />
              <label htmlFor={item._id} className="ml-2">
                {item.name}
              </label>
            </div>
          ))}
      </div>
      {selectedOptions.length > 0 && (
        <div className="absolute top-full left-0 bg-white border border-gray-300 mt-1 p-1 rounded-md">
          {selectedOptions.map((selected) => (
            <div key={selected} className="flex items-center">
              <span>{selected}</span>
              <button
                className="ml-2 text-red-500"
                onClick={() => toggleOption(selected)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown