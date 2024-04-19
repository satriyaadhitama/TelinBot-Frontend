import { DropdownOption } from '@/types/components/DropdownOption';
import React, { useState } from 'react';

// Define the props type
type DropdownProps = {
  placeholder?: string; // Optional string
  options: DropdownOption[]; // Array of strings
  onSelect: (option: DropdownOption) => void; // Function that takes a string
};

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    options[0]
  );

  const toggleOption = () => setIsOpen((prev) => !prev);

  const onOptionClicked = (value: any) => () => {
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
          {placeholder ?? selectedOption?.name}
        </span>
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option.name} onClick={onOptionClicked(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
