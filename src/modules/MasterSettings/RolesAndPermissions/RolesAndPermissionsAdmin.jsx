import React, { useState, useEffect } from "react";
import RolesAndPermissionsAdminTable from "./RolesAndPermissionsAdminTable";
import styles from "./RolesAndPermissions.css";
import AdminNewRoleModal from "./AdminNewRoleModal";
import Components from "@/components";
import { FiSearch } from "react-icons/fi";
import { commonAPICall } from "@/services/api/common";
import {
  REQUEST_TYPES,
  ENDPOINTS,
} from "@/utils/constant/url";
import toast from "react-hot-toast";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const RolesAndPermissionsAdmin = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [roles, setRoles] = useState([]);
  const [record, setRecord] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rollName, setRollName] = useState("");
  const [deleteId, setDeleteId] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateRoleClick = () => {
    setIsModalOpen(true);
  };


  const handleWarningModal = (id, name) => {
    setIsModelOpen(!isModelOpen)
    setDeleteId(id)
    setRollName(name)
  }
  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); // Debounce delay of 500ms

    // Cleanup the timeout if searchValue changes before the delay
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
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_MASTER_ROLES}?${queryParams}`
      );
      setLoader(false);
      
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setRoles(data?.results || [])

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(debouncedSearchValue);
  }, [debouncedSearchValue]);
  const deleteHandler = async (id = "") => {
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.DELETE,
        `${ENDPOINTS.GET_MASTER_ROLES}/${id}`
      );
      setLoader(false);
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      fetchData();
      setLoading(false)
      setIsModelOpen(!isModelOpen)
      toast.success("Deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  }
  const editHandler = async (record = {}) => {
    if (record && Object.keys(record).length) {
      setRecord(record);
      setIsModalOpen(true);
    }
  }
  const saveAPIHandler = async (payload = {}) => {
    setLoader(true)
    console.log(payload);
    if (payload.permissions.length == 0) {
      toast.error("Select atleast one permission");

    }
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.POST,
        `${ENDPOINTS.GET_MASTER_ROLES}`,
        payload
      );
      setLoader(false);
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setIsModalOpen(false);
      toast.success("Successfully saved!");
      setLoader(false)
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  const updateAPIHandler = async (id = "", payload = {}) => {
    setLoader(true)
    if (payload.permissions.length == 0) {
      toast.error("Select atleast one permission");
      setLoader(false)
    }
    if (id && payload.permissions.length > 0) {
      try {
        const { data, isError, message, sessionExpired } = await commonAPICall(
          REQUEST_TYPES.PATCH,
          `${ENDPOINTS.GET_MASTER_ROLES}/${id}`,
          payload
        );
        setLoader(false);
        if (sessionExpired) {



          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");

        }
        if (isError) {
          return toast.error(message);
        }
        setRecord({})
        setLoader(false)
        toast.success("Successfully updated!");
        setIsModalOpen(false);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "24px"
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
            />
          </form>

        </div>
        {(user.role === 'superAdmin' || user.permissions.includes('FC_Roles & Permissions -Admin')) && (
          <div className="button" onClick={handleCreateRoleClick}>
            Create Role
          </div>
        )}
      </div>
      <div className="AdminTop">
        <div className="AdminTitle">Roles & Permissions -Admin</div>
        <div className="AdminBody">
          <div className="tableLayout">
            <RolesAndPermissionsAdminTable handleWarningModal={handleWarningModal} roles={roles} isLoading={isLoading} deleteHandler={deleteHandler} editHandler={editHandler} user={user} />
          </div>
        </div>
      </div>
      <Components.Common.ModalTop
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}

      >
        <AdminNewRoleModal onClose={() => setIsModalOpen(false)} saveAPIHandler={saveAPIHandler} updateAPIHandler={updateAPIHandler} isLoading={isLoading} record={record} />
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

export default RolesAndPermissionsAdmin;
