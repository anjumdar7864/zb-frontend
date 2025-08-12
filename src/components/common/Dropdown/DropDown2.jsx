import React, { useState } from 'react';
import { ArrowWrapper, DropdownButton, DropdownContainer, DropdownItem, DropdownMenu } from './styles2';



const Dropdown = ({ options, onSelect,label, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelect = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onSelect) {
        onSelect(option);
      }
    };
  
    return (
      <DropdownContainer>
        <DropdownButton onClick={handleToggle} {...rest}>
          {selectedOption ? selectedOption.label : label? label : 'Select an option'}
          <ArrowWrapper isOpen={isOpen}>
            <ArrowIcon />
          </ArrowWrapper>
        </DropdownButton>
        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    );
  };
  
  export default Dropdown;

const ArrowIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10l5 5 5-5H7z"
        fill="currentColor"
      />
    </svg>
  );