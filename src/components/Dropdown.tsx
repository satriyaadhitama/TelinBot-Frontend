import React, { useState } from 'react';

const Dropdown = ({ placeholder, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOption = () => setIsOpen((prev) => !prev);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    onSelect(value);
    setIsOpen(false);
  };
  return (
    <div className="d-flex flex-column">
      <button
        className="button button-square-light active dropdown-toggle"
        onClick={toggleOption}
      >
        <span style={{ marginRight: '6px' }}>
          {placeholder ?? selectedOption}
        </span>
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={onOptionClicked(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
