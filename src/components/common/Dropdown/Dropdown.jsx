import React, { useState } from "react";
import styled from "styled-components";
import {
  ArrowWrapper,
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownMenu,
} from "./styles";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({
  options,
  onSelect,
  label,
  dropdownNumber,
  bg,
  color,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    onSelect(option, dropdownNumber, setSelectedOption);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options?.filter(
    (option) =>
      option.areaCode &&
      typeof option.areaCode !== "undefined" &&
      option.areaCode
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle} {...rest}>
        {selectedOption ? selectedOption : label ? label : "Select an option"}
        <ArrowWrapper isOpen={isOpen}>
          <IoIosArrowDown size={24}/>
        </ArrowWrapper>
      </DropdownButton>
      {isOpen && (
        <DropdownMenu bg={bg} color={color}>
          <SearchInput
            type="text"
            style={{ color: "black" }}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            autoFocus
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <DropdownItem
                key={option._id}
                onClick={() => handleSelect(option.areaCode)}
              >
                {option.areaCode} {option.cityName && `- ${option.cityName}`}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>No results found</DropdownItem>
          )}
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
    <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
  </svg>
);

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;
