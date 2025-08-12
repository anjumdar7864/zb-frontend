
import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBox = ({searchTerm, setSearchTerm}) => {
    // const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    // Update the search term based on user input
    setSearchTerm(event.target.value);
  };

  const handleClearInput = () => {
    // Clear the input field
    setSearchTerm('');
  };

  return (
    <TextField
      variant="outlined"
      value={searchTerm} // Controlled input
      onChange={handleInputChange} // Handle input changes
      placeholder="Search..." // Placeholder text
      fullWidth // Full width of the parent container
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaSearch /> {/* Search icon on the left */}
          </InputAdornment>
        ),
        endAdornment: (
          searchTerm && (
            <InputAdornment
              position="end"
              onClick={handleClearInput} // Clear input on click
              style={{ cursor: 'pointer' }} // Change cursor to pointer
            >
              <FaTimes /> {/* Clear icon on the right */}
            </InputAdornment>
          )
        ),
      }}
      sx={{
        height: '48px', // Set the height
     
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'gray', // Default border color
            
          },
          '&:hover fieldset': {
            borderColor: 'gray', // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black', // Border color when focused
          },
        },
      }}

      onKeyDown={(e) => {
        if (e.key !== "Escape") {
          // Prevents autoselecting item while typing (default Select behaviour)
          e.stopPropagation();
        }
      }}
    />
  );
};

export default SearchBox;
