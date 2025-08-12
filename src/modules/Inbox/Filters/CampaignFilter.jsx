import React from 'react'
import { useState, useEffect, useRef } from "react";
import { BsDash } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { isEmpty } from "lodash-es";
import { Box, MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";

import { getAllCompaignsForInbox } from "@/store/actions";

import { CampaignsButtonDropdownStyled, MyLightTooltip } from "../styles";
import DropDown from '@/components/common/DropDwon/DropDown';
const 
CampaignFilter = ({ selectCampaign, isOpen, toggleDropdown , filters }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { results: campaignData } = useSelector(
    (s) => s.campaignReducer.campaignData
  );



  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(
        getAllCompaignsForInbox({
          // limit: 10,
          search: searchText,
        })
      );
    }, 500);
    return () => clearTimeout(getData);
  }, [searchText]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const getTitle = (campaign) => {
    return campaign.name || campaign.title;
  };

  const toggleDropdownInside = (event) => {
    // setIsOpen(!isOpen);
    toggleDropdown();
    event.stopPropagation();
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // setIsOpen(false);
      toggleDropdown();
    }
  };

  const selectCampaignClicked = (e, campaign) => {

    
    e.stopPropagation();
    setSelectedCampaign(campaign);
    selectCampaign(campaign);
    toggleDropdown();
  };
const valFuncState =(campaign)=>{
  setSelectedCampaign(campaign);
  selectCampaign(campaign);
}



  return (
    <div style={{width:"100%"}}>
      <div style={{ color: "#012635", fontWeight: 500, fontSize: "14px", marginBottom: "4px" }}>
        Campaign
      </div>
      {/* <Box sx={{ width: 387, border: "0px", outline: "none" }}>
        <FormControl fullWidth>
          <Select
            IconComponent={(props) => <FaChevronDown style={{ color: "#012635", fontSize: "16px" }} {...props} />}
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 1px #D3D7DD",
              },
            }}
        
            displayEmpty
            renderValue={() => <span style={{ color: "#aaa" }}>{selectedCampaign?.name ? selectedCampaign?.name : "Select an option"}</span>} // Placeholder
          >
        
            {campaignData?.map((campaign, i) => (
              <MenuItem onClick={(e) => selectCampaignClicked(e, campaign)} >
                {getTitle(campaign)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}
      <DropDown
        objVal={true}
        name=""
        valueKey="_id"
        option={"name"}
        defaultValue={filters?.campaign == null ? "" :filters?.campaign }
        ArrData={campaignData}
        valFunc={valFuncState} />
       
    </div>
  )
}

export default CampaignFilter
