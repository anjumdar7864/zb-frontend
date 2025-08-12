import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./AdminUser.module.css";
import AdminUserTable from "./AdminUserTable";
import { FiSearch } from "react-icons/fi";
import DropDownFilter from "@/components/common/DropDownFilter/DropDownFilter";
import PaginationComp from "@/modules/DirectImport/Pagination";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";
import Components from "@/components";
import CreateAdminModal from "./CreateAdminModal";
import Select from "react-select";
import { useGlobalContext } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser, GetAllPermission, LoginAsUser } from "@/store/actions";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import Modules from "@/modules";
import RolesAndPermissionsModal from "../Permissions";
import {
  logOut,
  
} from "@/store/actions";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [roles, setRoles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const { windowWidth, setIsLoaderShowing } = useGlobalContext();
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const [userToUpdatePermission, setUserToUpdatePermission] = useState(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [userRoll , setUserRoll] = useState("")
  const [loader, setLoader] = useState(false)
  const [adminOptions, setAdminsOptions] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Content Admin" },
    { id: 3, name: "Customer" },
  ]);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const dispatch = useDispatch();
  const {
    message,
    users,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);

  const userObj = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

const navigate = useNavigate();

// console.log("check Alowed rolls" , roles);


  const {
    permissions,
    errors: error2,
    loading: loading2,
    message: message2,
  } = useSelector((state) => state.permissionReducer);
  const fetchRoles = async () => {
    try {
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_MASTER_ROLES}`,
      );
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        // dispatch(logOut());

        // navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setRoles(data?.results || [])
      console.log("feth data" , data?.results);
      
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchRoles();
    dispatch(GetAllUser());
    dispatch(GetAllPermission());
  }, []);
  const filterByName = () => {
    const filteredData = users?.filter((user) =>
      (user?.fullName ?? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`)
        ?.toLowerCase()
        ?.includes(searchText?.toLowerCase())
    );
    return filteredData;
  }
  const deleteHandler = async (id, value) => {

    try {

      setLoader(true);


      const payload = { active: !value };

      const { record, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.PATCH,
        `${ENDPOINTS.USERS}/${id}`,
        payload , 
        dispatch , 
      );

      setLoader(false);
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      const cloneData = [...filteredData];
      const index = cloneData.length ? cloneData?.findIndex(x => x?._id === id) : {};
      if (index !== -1) {
        cloneData[index].active = !value;
        setFilteredData(cloneData);
      }
    } catch (error) {

    }

  }
  useEffect(() => {
    const data = filterByName();
    setFilteredData(data);


  }, [searchText, users]);
  // console.log("get  user Admin" , filteredData);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  const handleDismiss = () => {
    setIsAlertVisible(false);
  };
  const handleCreateClick = () => {
    setIsCreateAdmin(true);
    // setIsCreateUserOpen(true) ;
  };
  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value)); // Update limit based on dropdown selection
    setCurrentPage(1); // Reset page to 1 when changing limit
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#5BF1B2' : '#D3D7DD', // Change border color
      boxShadow: 'none',
      borderRadius: '8px', // Change border radius
      height: "48px",
      width: "150px",
      '&:hover': {
        borderColor: '#5BF1B2', // Hover border color
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 8,
    }),
    indicatorSeparator: () => ({
      display: 'none', // Remove the indicator separator line
    }),
    menu: (provided) => ({
      ...provided,
      // Dropdown list background color
      zIndex: 1000, // Set z-index for menu
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 1000, // Set z-index for menu portal to ensure it’s on top
    }),
  };
  const roleFilterHandler = (value) => {


    const data = filterByName();
    const filteredData = data.filter(user => user?.role?.name === value);
    setFilteredData(
      filteredData
    );
    setRole(value);
  }
  const resetHandler = () => {
    setRole('');
    setSearchText('');
    setFilteredData(users)

  }
  return (
    <div className={styles.tabContainerSubscription}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Left-side controls with 8px gap */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className={styles.searchContainer}>
            <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
            <input
              className={styles.SearchInput}
              placeholder="Search for a user"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
            />
          </div>


          <Select
            value={role && { value: role, label: role }}
            onChange={(val) => roleFilterHandler(val.value)}
            styles={customStyles}
            options={roles.map((option) => ({
              value: option.name,
              label: option.name,
            }))}

            isSearchable
            placeholder="Roles"

          />
          {/* </div> */}
          <div style={{ color: "#012635", cursor: "pointer" }} onClick={() => resetHandler()}>Reset</div>
        </div>

        {/* Right-aligned Create Admin button */}
        {(user.role === 'superAdmin' || user.permissions.includes('FC_Admin User')) && (
        <div onClick={handleCreateClick} className={styles.creatAdmin}>Create Admin</div>
        )}
      </div>

      {/* Table section */}

      <div style={{
        display: "flex", flexDirection: "column", marginTop: "16px",
        marginBottom: "20px "
      }} className={styles.tableLayout}>
        <AdminUserTable users={filteredData} deleteHandler={deleteHandler}
          isPermissionModalOpen={isPermissionModalOpen}
          setIsPermissionModalOpen={setIsPermissionModalOpen}
          setAllowedPermissions={setAllowedPermissions}
          setUserToUpdatePermission={setUserToUpdatePermission}
          isEditUserOpen={isEditUserOpen}
          setIsEditUserOpen={setIsEditUserOpen}
          selectedDeleteId={selectedDeleteId}
          allowedPermissions={allowedPermissions}
          userToUpdatePermission={userToUpdatePermission}
          setSelectedDeleteId={setSelectedDeleteId}
          setUserRoll={setUserRoll}
          userObj={userObj}
        />

      </div>
      <Components.Common.ModalTop open={isCreateAdmin} onClose={() => { }} >
        <CreateAdminModal
          isOpen={isCreateAdmin}
          onClose={() => setIsCreateAdmin(false)}
          handleDismiss={handleDismiss}
          isAlertVisible={isAlertVisible}
          roles={roles}
        />
      </Components.Common.ModalTop>
      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() => {
          setIsModelOpen(!isModelOpen);
          setSelectedUserId(selectedDeleteId);
          setSelectedDeleteId("");
        }}
        open={Boolean(selectedDeleteId)}
        deleteItemName="User"
        deleteItemText={
          "Before Deletion you have to transfer to another user. "
        }
      />
      <Components.Common.ModalTop
        open={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
      >
        <div style={{ maxHeight: "90vh", overflow: "auto" }}>
          <Modules.Settings.AddUser
            onClose={() => setIsCreateUserOpen(false)}
            refreshUsers={() => {
              dispatch(GetAllUser());
            }}
          //onClose={handleCloseAndRefresh}
          />
        </div>
      </Components.Common.ModalTop>
      <Components.Common.ModalTop
        open={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
      >
        {/* <div style={{maxHeight:'80vh', overflow:'auto', width:'500px', backgroundColor: 'white'}}> */}
        {/* <Modules.AdminSettings.UserNew /> */}
        {/* <Components.Common.PermissionsOptions permissions={permissionsData.permissions}  /> */}
        <RolesAndPermissionsModal roles={roles} userRoll={userRoll} allowedPermissions={allowedPermissions} setAllowedPermissions={setAllowedPermissions} onClose={() => {
          dispatch(GetAllUser());
          setIsPermissionModalOpen(false)
        }} userId={userToUpdatePermission} />
        {/* </div> */}
      </Components.Common.ModalTop>
      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() => {
          setIsModelOpen(!isModelOpen);
          setSelectedUserId(selectedDeleteId);
          setSelectedDeleteId("");
        }}
        open={Boolean(selectedDeleteId)}
        deleteItemName="User"
        deleteItemText={
          "Before Deletion you have to transfer to another user. "
        }
      />
    </div>
  );
};

export default AdminUser;
