import React, { useState, useRef, useEffect } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles
import styled from '@emotion/styled';
import { CgCalendarDates } from 'react-icons/cg';
import { Calendar, DateObject } from "react-multi-date-picker"

// Styled components
const DatePickerContainer = styled.div`
  position: relative;
  display: inline-block;
position: relative;
  width: 100%; /* Full width by default */
@media (min-width: 767px) { /* Small screens and up */
    width: auto; /* Fix width for small screens */
  }
`;

const CustomInput = styled.div`
  width: 100%;
  padding: 9px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color:#FFFFFF;
  width: 100%; /* Full width by default */

  @media (min-width: 767px) { /* Small screens and up */
    width: 170px; /* Fix width for small screens */
  }

  @media (min-width: 1440px) { /* Large screens */
    width: 100%; /* Fix width for large screens */
  }

  &:focus-within {
    outline: none;
    border-color: #007bff;
  }

  span {
    display: inline-block;
    color: #333;
  }
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 50px; 
  z-index: 10;
  // background: #fff;
  // border-radius: 12px;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  // padding: 25px;
  // width: 400px; 
`;

// Custom styles for the calendar navigation
const CalendarStyled = styled(Calendar)`
  .react-calendar__navigation button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    margin: 0;
    padding: 0;
    outline: inherit;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: transparent; 
      color: inherit; 
    }
  }
`;

// const CustomSelect = styled.select`
//   background: none;
//   border: none;
//   font-size: 16px;
//   color: #333;
//   appearance: none;
//   padding: 10px;
//   cursor: pointer;

//   &:hover, &:focus {
//     outline: none;
//     background: none; 
//   }
// `;

const DatePickerWrapper = ({ selectedDate, onDateChange, defaultText }) => {
  console.log(selectedDate, "selectedDate")
  const selectedDate2 = new Date(selectedDate || Date.now());
  console.log(selectedDate2, "selectedDate2")

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate2 || new Date());
  const [values, setValues] = useState([
    // new DateObject({ format: "YYYY-MM-DD" })
  ])
  const calendarRef = useRef(null);

  const handleDateClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), newMonth + 1, 0).getDate();
    const day = Math.min(currentDate.getDate(), lastDayOfMonth);
    const newDate = new Date(currentDate.getFullYear(), newMonth, day);
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    const lastDayOfMonth = new Date(newYear, currentDate.getMonth() + 1, 0).getDate();
    const day = Math.min(currentDate.getDate(), lastDayOfMonth);
    const newDate = new Date(newYear, currentDate.getMonth(), day);
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  const handleDateChange = (date) => {
    // console.log("Selected date:", date);

    const newDate = new Date(currentDate);
    const newDate2 = new Date(currentDate);
    newDate.setDate(date[0].getDate());
    newDate.setMonth(currentDate.getMonth());
    newDate.setFullYear(currentDate.getFullYear());
    newDate.setDate(date[1].getDate());
    newDate.setMonth(currentDate.getMonth());
    newDate.setFullYear(currentDate.getFullYear());
    setCurrentDate(newDate);
    onDateChange({ from: newDate, to: newDate2 });
    setIsOpen(false);
  };

  const from = values?.[0];
const to = values?.[1];
const fromDate = from ? new Date(from.unix * 1000) : null;
const toDate = to ? new Date(to.unix * 1000) : null;
// console.log("values", values , "from" ,  fromDate , "toDate" , toDate);

  return (
    <DatePickerContainer ref={calendarRef}>
      <CustomInput onClick={handleDateClick}>
        {/* <span style={{ textWrap: 'nowrap', color: '#666666', fontWeight: '300' }}>{selectedDate2 ? selectedDate2?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : defaultText}</span> */}
        <span style={{ textWrap: 'nowrap', color: '#666666', fontWeight: '300' }}>
        {  `${fromDate || toDate ? `${fromDate ? fromDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "from"} - ${toDate ? toDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "to"} `: selectedDate2?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`}
          </span>
        <div><CgCalendarDates size={20} /></div>
      </CustomInput>
      {isOpen && (
        // <CalendarWrapper>
        //   <CalendarStyled
        //     onChange={handleDateChange}
        //     // value={currentDate}
        //     selectRange={true}
        //     formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 2)}
        //     prevLabel={null}
        //     nextLabel={null}
        //     next2Label={null}
        //     prev2Label={null}
        //     showNavigation
        //     view="month"
        //     navigationLabel={({ date }) => (
        //       <div style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
        //         <select
        //           value={currentDate.getMonth()}
        //           onChange={handleMonthChange}
        //         >
        //           {Array.from({ length: 12 }, (_, i) => (
        //             <option key={i} value={i}>
        //               {new Date(0, i).toLocaleDateString('en-GB', { month: 'long' })}
        //             </option>
        //           ))}
        //         </select>
        //         <select
        //           value={currentDate.getFullYear()}
        //           onChange={handleYearChange}
        //         >
        //           {Array.from({ length: 10 }, (_, i) => (
        //             <option key={i} value={new Date().getFullYear() - 5 + i}>
        //               {new Date().getFullYear() - 5 + i}
        //             </option>
        //           ))}
        //         </select>
        //       </div>
        //     )}
        //   />
        // </CalendarWrapper>
        <CalendarWrapper>
        <Calendar
          value={values}
          onChange={(e)=>{
          setValues(e);
            const from = e?.[0];
            const to = e?.[1];
            const fromDate = from ? new Date(from.unix * 1000) : null;
            const toDate = to ? new Date(to.unix * 1000) : null;
            if (fromDate && toDate) {
            onDateChange({ from: fromDate, to: toDate });
            setIsOpen(false);
            console.log("values ===" , fromDate ,"to" , toDate )
            }
          }
          }
          range
          rangeHover
          
        />
      </CalendarWrapper>
      )}
    </DatePickerContainer>
  );
};

export default DatePickerWrapper;
