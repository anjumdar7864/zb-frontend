import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { commonAPICall } from "@/services/api/common";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";

import Components from "@/components";
import RolesAndPermissionsModal from "./RolesAndPermissionsModal";
import RolesAndPermissionsTenantTable from "./RolesAndPermissionsTenantTable";
import { toast } from "react-hot-toast";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
const RolesAndPermissionsTenant = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [roles, setRoles] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [selectedRecord, setSelectdRecord] = useState({});
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [deleteId , setDeleteId] = useState("")
  const [loading, setLoading] = useState(false);
  const [rollName , setRollName] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateRoleClick = () => {
    setIsModalOpen(true);
  };
  const handleWarningModal = (id , name) =>{
    setIsModelOpen(!isModelOpen)
    setDeleteId(id)
    setRollName(name)
  }
  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); 
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  const fetchData = async (search = "") => {
    try {
      setLoader(true);
      const params = {
        ...(search && { search }),
      };
      const queryParams = new URLSearchParams(params);
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_TENANt_ROLES}?${queryParams}`
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
      setRoles(data || [])

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const deleteHandler = async (id = "") => {
    try {
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.DELETE,
        `${ENDPOINTS.GET_TENANt_ROLES}/${id}`
      );
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      fetchData();
      setLoading(false)
      toast.success("Deleted successfully.")
      setIsModelOpen(!isModelOpen)
    } catch (error) {
      toast.error("Deletion unsuccessful")
      console.log(error);
    }
  }
  const editHandler = async (record ={}) => {
    if(record && Object.keys(record).length){
      setSelectdRecord(record)
      setIsModalOpen(true)
    }
  }
  const closeHandler=()=>{
    fetchData();
    setSelectdRecord({});
    setIsModalOpen(false)
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom:"24px"
        }}
      >
        <div className="searchContainer">
          <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
           <form onSubmit={(e) => {
                e.preventDefault(); // ✅ Prevent page refresh
              }} autoComplete="off">
 <input
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ outline: "none", border: "none" }}
            autoComplete="off"
          />
              </form>
         
        </div>
        {(user.role === 'superAdmin' || user.permissions.includes('FC_Roles & Permissions -Tenant')) && (
        <div className="button" onClick={handleCreateRoleClick}>
          Create Role
        </div>
        )}
      </div>
      <div className="AdminTop">
        <div className="AdminTitle">Roles & Permissions -Tenant</div>
        <div className="AdminBody">
          <div className="tableLayout">
            <RolesAndPermissionsTenantTable handleWarningModal={handleWarningModal} roles={roles} deleteHandler={deleteHandler}  editHandler={editHandler} user={user}/>
          </div>
        </div>
      </div>
      <Components.Common.ModalTop open={isModalOpen} onClose={() => { }}>
        <RolesAndPermissionsModal
          isOpen={isModalOpen}
          onClose={() => closeHandler()}
          selectedRecord={selectedRecord}
          isLoading={isLoading}
          
        />
      </Components.Common.ModalTop>
      <Components.Common.WarningModal
        onClose={() => {
          setIsModelOpen(false);
          setSelectedDeleteId("");
        }}
        isLoading={loading}
        // setIsLoading={setIsLoading}
        onOkay={() => {
          // deleteHandler(deleteId);
          // setLoading(true);
          setOpenDelete(true);
        }} // Confirm delete when "Okay" is clicked
        open={isModelOpen}
        WarningItemTitle={`Are you sure want to delete?`}
        WarningItemName="Direct Import"
        warningItemText={`Are you sure you want to  delete this ? This action cannot be undone.`}
      />

         <DeleteModal
              // refreshDetails={refreshDetails}
              // curruntNumber={curruntNumber}
              // originalNumber={originalNumber}
              handleDelete={() => {
                deleteHandler(deleteId);
                setLoading(true);
              }}
              rollName={rollName}
              open={openDelete}
              setOpen={setOpenDelete}
            // noMessageSent={noMessageSent}
            />
    </div>
  );
};

export default RolesAndPermissionsTenant;
