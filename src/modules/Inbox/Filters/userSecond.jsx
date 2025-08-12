import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetAllUserWithAdmin } from "@/store/actions";

import DropDown from "@/components/common/DropDwon/DropDown";
const UserSecond = ({ selectUser, isOpen, toggleDropdown , filters }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { usersWithAdmin: users } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(GetAllUserWithAdmin());
    // dispatch(GetAllUser());
  }, []);

  // useEffect(() => {
  //   setFilteredData(
  //     users?.filter((user) =>
  //       (user?.fullName ?? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`)
  //         ?.toLowerCase()
  //         ?.includes(searchText?.toLowerCase())
  //     )
  //   );
  // }, [searchText, users]);

  useEffect(() => {
    if (users?.length) {
      const modifiedUsers = users.map((user) => ({
        ...user,
        fullName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
      }));

      setFilteredData(modifiedUsers);
    }
  }, [users]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

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

  const getUserName = (user) => {
    return user?.fullName ?? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
  };

  const selectUserClicked = (e, user) => {
    // console.log("selectUserClicked", user);

    e.stopPropagation();
    setSelectedUser(user);
    selectUser(user);
    toggleDropdown();
  };
 
  const valFuncState = (user) => {
    setSelectedUser(user);
    selectUser(user);
  };


  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          color: "#012635",
          fontWeight: 500,
          fontSize: "14px",
          marginBottom: "4px",
        }}
      >
        User
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
          value="" 
          displayEmpty
          renderValue={() => <span style={{ color: "#aaa" }}>{selectedUser?.firstName ? selectedUser?.firstName : "Select an option"}</span>} // Placeholder
        >
       
          {filteredData?.map((user, i) => (
            <MenuItem   onClick={(e) => selectUserClicked(e, user)} >
                 <span className="text">{getUserName(user)}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box> */}
    
      <div style={{ width: "100%" }}>
        {/* <DropDown
          name=""
          objVal={true}
          valueKey="fullName"
          option={"fullName"}
          ArrData={filteredData}
          valFunc={valFuncState}
          defaultValue={filters.user_object}
        /> */}
         <DropDown
          name=""
          objVal={true}
          valueKey="_id"
          option={"fullName"}
          ArrData={filteredData}
          valFunc={valFuncState}
          defaultValue={filters.user != null ? filters.user : undefined }
        />
      </div>
    </div>
  );
};

export default UserSecond;
