import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import styled from "@emotion/styled";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { TiArrowSortedDown } from 'react-icons/ti';

const DateDropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  min-width:200px;
`;

const DropdownButton = styled.button`
  width: 100%;
 background-color:#FFFFFF;
 padding:10px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius:7px;
  font-size: 14px;
  background-color: white;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#666666; 
  font-weight:300;

  &:focus {
    outline: none;
   // border-color: #007bff;
  }
`;

const ArrowDownIcon = styled.span`
  margin-left: 8px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`;

const DateSelector = ({ selectedDate, onDateChange,defaultText="Select Date" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date) => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <DateDropdown>
      <DropdownButton onClick={toggleDatePicker}>
        {selectedDate ? format(selectedDate, "dd/MM/yyyy") : defaultText}
        <TiArrowSortedDown size={20} />
      </DropdownButton>
      {isOpen && (
        <DatePickerContainer>
          <DayPicker mode="single" selected={selectedDate} onSelect={handleDateChange} />
        </DatePickerContainer>
      )}
    </DateDropdown>
  );
};

export default DateSelector;
