
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './DropDown.module.css';
import SearchBox from './SearchBox';
import { ListSubheader } from '@mui/material';

const DropDown = ({ option, ArrData, format, valueKey, valFunc = () => { }, defaultValue = "",   standard=false , objVal }) => {
    const [age, setAge] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (event) => {

        if(objVal){
            valFunc(ArrData.find((item) => item?._id == event.target.value))
        }else{
            valFunc(event.target.value)

        }
        
        setAge(event.target.value);
      
    };
    // console.log("check dropdown" , defaultValue ,  age);

    // Custom MenuProps to control dropdown (menu) height
    const customMenuProps = {
        PaperProps: {
            style: {
                maxHeight: 410,  // Custom height for the dropdown menu
                overflowY: 'auto',  // Add scroll if items exceed maxHeight
               
            },
        },
    };

    const filteredData = ArrData.filter((item) => {
        const value = item[option];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    useEffect(() => {

        // setAge("")
        setAge(defaultValue)

    }, [ArrData])
    useEffect(() => {
        setTimeout(() => {
            setAge(defaultValue)

        }, 500);
    }, [defaultValue])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>

                <Select
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    IconComponent={IoIosArrowDown}  // Custom icon
                    displayEmpty  // Display placeholder when no value is selected
                    //   MenuProps={customMenuProps}  // Apply custom height to dropdown
                    MenuProps={{
                        ...customMenuProps,   // Merge customMenuProps here
                        autoFocus: false,     // Add autoFocus: false directly
                    }}


                    sx={{
                        borderRadius: '8px',  // Custom border radius for the select box
                        backgroundColor: standard && "white" ,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: standard ? "#D3D7DD" : '#E0E0E0',  // Custom border color


                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5BF1B2', // Change border color to red on hover
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5BF1B2', // Change border color to green on focus
                        },

                        '& .MuiOutlinedInput-input': {
                            padding: age && standard ? '8px 14px' : age ? '5px 14px' : standard ? "15px 14px" : "10px 14px", // Override padding for input


                        },
                        '& .MuiSelect-icon': {
                            fontSize: '22px',
                            color: 'black',
                            position: "relative",

                        },
                    }}

                >
                    {/* Placeholder item */}
                    <div style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1000 }}>
                        <div className={styles.searchLayout}>

                            <ListSubheader>
                                <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            </ListSubheader>

                            <div style={{ padding: "10px 18px", color: "#999999" }}>{`${filteredData.length} results`}</div>
                        </div>
                    </div>
                    <MenuItem value="">
                        <em className='body4Regular textPrimeryColor'>Select </em>
                    </MenuItem>
                    {/* <div style={{maxHeight:"280px" , overflow:"auto"}}> */}
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <MenuItem key={index} 
                            // value={objVal ? item : item[valueKey]}
                            value={ item[valueKey]}
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0px" }}>     <span style={{ display: format == 'country' ? "block" : "none" }}><img width={24} height={24} style={{ objectFit: 'cover', borderRadius: "12px" }} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item[valueKey]}.svg`} /></span>    <span style={{ color: "#012635", fontSize: "14px", fontWeight: "400", lineHeight: "22px" }}> {item[option]}</span></span>
                            </MenuItem>
                        ))
                    ) : (
                        // Show a message if there are no results
                        <MenuItem disabled>
                            <em>No results found</em>
                        </MenuItem>
                    )}
                    {/* </div> */}
                </Select>
            </FormControl>
        </Box>
    );
};

export default DropDown;



