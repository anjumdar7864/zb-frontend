import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { size, isEmpty } from "lodash-es";
import { FaChevronDown, FaExclamation, FaFire, FaPhoneSlash, FaQuestion, FaSeedling } from "react-icons/fa6";
import { FaThermometerEmpty, FaTimes, FaTint } from "react-icons/fa";
import color from "@/styles/color";
import { statusIcons } from "../Filters/StatusFilter";


// export const statusIcons = {
//   Hot: {
//     active: 1,
//     icon: <FaFire />,
//     color: "#e52935",
//     message: {
//       content: "! Status was changed to Hot Lead",
//       color: color.Info,
//     },
//   },
//   Warm: {
//     active: 1,
//     icon: <FaThermometerEmpty />,
//     color: "#ffc12b",
//     message: {
//       content: "! Status was changed to Warm Lead",
//       color: color.Info,
//     },
//   },
//   Nurture: {
//     active: 1,
//     icon: <FaSeedling />,
//     color: "#43cd80",
//     message: {
//       content: "! Status was changed to Nurture",
//       color: color.Info,
//     },
//   },
//   Drip: { active: 1, icon: <FaTint />, color: "#36a3f7" },
//   DNC: { active: 0, icon: <FaPhoneSlash />, color: "" },
//   "No Status": { active: 1, icon: <FaQuestion />, color: "#dedfe7" },
//   "Not Interested": {
//     active: 0,
//     icon: <FaTimes />,
//     color: "#a62921",
//     message: {
//       content: "! Status was changed to Not Interested",
//       color: color.Warning,
//     },
//   },
//   "Wrong Number": { active: 0, icon: <FaExclamation />, color: "#a62921" },
// };
const UserSelect = ({
  selectedStatues,
  removeStatus,
  selectStatus,
  isOpen,
  toggleDropdown,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { results: statuses } = useSelector((s) => s.statusReducer);
  const handleChange = (event) => {
    // console.log("check status id..." , event.target);

    setSelectedOptions(event.target.value);

  };



  useEffect(() => {
    if (!size(statuses)) {
      dispatch(getAllStatusList());
    }
  }, []);

  // useEffect(() => {
  //   let filters = [];
  //   for (let status of statuses) {
  //     if (
  //       searchParams.get("noStatus") &&
  //       status.name.replace(" ", "").toLowerCase() == "nostatus"
  //     ) {
  //       filters = [status._id];
  //       break;
  //     }
  //     if (statusIcons[status.name]?.active) {
  //       filters.push(status._id);
  //     }
  //   }
  //   if (size(statuses)) {
  //     selectStatus(filters);
  //   }
  // }, [statuses]);

  return (
    <div>
      <div style={{ color: "#012635", fontWeight: 500, fontSize: "14px", marginBottom: "4px" }}>Status</div>
      <Box sx={{ width: 387, border: "0px", outline: "none"  }}>
        <FormControl fullWidth>
          {/* <InputLabel id="multi-select-label">Select Options</InputLabel> */}
          <Select
            labelId="multi-select-label"
            id="multi-select"
            multiple
            // value={selectedOptions}
            value={selectedStatues}
            onChange={handleChange}
            IconComponent={(props) => <FaChevronDown style={{color:"#012635" , fontSize:"16px"}} {...props} />}
            sx={{
              borderRadius: "8px", "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 1px #D3D7DD", // Remove border
              
                
              },
              "& .MuiSelect-select, & .MuiOutlinedInput-input": {
                padding: "11px !important", // Remove internal padding
                minHeight: "unset", // Optional: prevents extra height from default minHeight
                display: "flex",
                alignItems: "center",
              }
            }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap',  backgroundClip:"white" }}>
                {selected.map((value) => {
                  const selectedStatus = statuses.find((status) => status._id === value);
                  // return <Chip style={{backgroundColor:"white" , paddingLeft:"0px" , fontSize:"14px" , height:"20px" , borderRadius:"0px"}} key={value} label={`${selectedStatus?.name},`} />;
                  return <span style={{backgroundColor:"white" , paddingLeft:"0px" , height:"20px" , borderRadius:"0px"}} className="body4Regular textPrimeryColor"  >{selectedStatus?.name && `${selectedStatus?.name},`}</span>;
                })}
              </Box>
            )}
          >
            {statuses?.map((status) => (
              <MenuItem onClick={() => removeStatus(status._id)}
                key={status._id} value={status._id}>
              <div style={{display:"flex" , gap:"8px"}}><span>{statusIcons[status.name]?.icon}</span> <span>{status.name}</span></div> 
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>

  );
};

export default UserSelect;
