import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";

const Dropdown = ({
  name,
  options,
  onSelect,
  multiSelect,
  selectedOptions,
  colors,
  custom,
  percentage,
  downIcon,
  TopPosition = "bottom",
  isOpen,
  onToggle
}) => {
  const [selectedOption, setSelected] = useState(name);
  const dropdownRef = useRef(null);


  const StyledDropdown = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    

    button {
      border: none;
      cursor: pointer;
      color: #777777;
      background: transparent;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      gap: 4px;
      width: 100%;
      justify-content: space-between;
    }

    ul {
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};
      position: absolute;
      list-style: none;
      padding: 0;
      width: ${({ multiSelect }) => (multiSelect ? "170px" : "130px")};
      background-color: white;
      border: 1px solid #ccc;
      right: 0;
      top: 2rem;
      border-radius: 4px;
      z-index: 1;
      transition: all 0.3s ease-in-out;
      max-height: 25rem;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.6rem 0.5rem;
      cursor: pointer;
      color: #2f323571;
      font-weight: 400;
      font-size: 1.1rem;
      transition: 0.3s ease-in-out;
      justify-content: flex-end;
      &:hover {
        background-color: #237bd9ba;
        color: white;
      }
    }

    .checkbox {
      width: 16px;
      height: 16px;
      border: 1px solid #ccc;
      border-radius: 50%;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .checkbox.selected {
      background-color: #ccc;
    }

    .align {
      display: flex;
      width: 90%;
      align-items: center;
      justify-content: space-between;
    }

    .circle {
      border-radius: 50%;
      padding: 3px;
      background-color: gray;
      display: inline-block;
      align-self: center;
      width: 2rem;
      height: 1.8rem;
    }
  `;

  const toggleDropdown = (event) => {
    event.stopPropagation();
    onToggle("open");
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      onToggle("close");
    }
  };
  useEffect(() => {
   

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onToggle]);

  return (
    <StyledDropdown  isOpen={isOpen} multiSelect={multiSelect}>
      <button onClick={toggleDropdown} ref={dropdownRef}>
        {custom ? custom : selectedOption} {downIcon ? (isOpen ? <FaChevronUp /> : <FaChevronDown />) : ""}
      </button>
      <ul style={{ top: TopPosition === "top" ? -150 : "auto" }}>
        {!multiSelect &&
          options.map((option, index) => (
            <li key={index} onClick={() => { onSelect(option); setSelected(option); onToggle("close"); }}>
              {option}
            </li>
          ))}
        {multiSelect &&
          options.map((option, index) => (
            <li key={index} onClick={() => onSelect(option)}>
              <div className="circle" style={{ backgroundColor: option.color[0] }}></div>
              <div className="align">
                {option._id} <div className={`checkbox${selectedOptions.some((val) => option._id === val._id) ? " selected" : ""}`} />
              </div>
            </li>
          ))}
      </ul>
    </StyledDropdown>
  );
};

export default Dropdown;
