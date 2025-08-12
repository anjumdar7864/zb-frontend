import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaChevronDown } from 'react-icons/fa'; // Import an icon from react-icons
import { IoIosArrowDown } from 'react-icons/io';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    let fontWeight = '';
    if(typeof personName === 'number'){
   fontWeight = personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular
    }else{
        fontWeight = personName?.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular
    }
     
    return {
        fontWeight: fontWeight
    };
}

const DropDownFilter = ({placeHolder= "", roleFilterHandler, value ="" , options=[]}) => {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        roleFilterHandler(value)
    };
    return (
        <div>

            <Select
                displayEmpty
                value={value}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <span>{placeHolder}</span>;
                    }

                    return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                    backgroundColor: 'white', // Background color
                    borderColor: '#D3D7DD', // Border color
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00BD82', // Border color on focus
                        borderRadius: '8px',
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px', // Customize border-radius if needed
                    },
                    width: '100%', // Custom width
                    borderRadius: '8px',
                }}
                IconComponent={(props) => (
                    <IoIosArrowDown {...props} size={20} /> // Customize icon size here
                  )}
            >
                <MenuItem disabled value="">
                    <em>{placeHolder}</em>
                </MenuItem>
                {options.map((item) => (
                    <MenuItem
                        key={item?.id}
                        value={item?.name}
                        style={getStyles(item?.name, value, theme)}
                    >
                        {item?.name}
                    </MenuItem>
                ))}
            </Select>

        </div>
    );
};

export default DropDownFilter;
