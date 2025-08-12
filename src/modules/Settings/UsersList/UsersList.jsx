import {
  FaArrowLeft,
  FaEdit,
  FaTimes,
  FaSearch,
  FaTrash,
  FaUser,
  FaSave,
} from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosApps, IoMdAlert } from "react-icons/io";
import {
  TransferModelStyle,
  UsersListStyled,
  PasswordModelStyle,
  Button,
  StyledInputWrapper,
  UserTop,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "@/components/common";
import Assets from "@/assets";
import { useGlobalContext } from "@/hooks";
import { remToPixels } from "@/utils";
import Components from "@/components";
import { useState, useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { TbArrowsTransferUp } from "react-icons/tb";

import { useFormik } from "formik";
import * as yup from "yup";
import {
  GetAllUser,
  DeleteUser,
  LoginAsUser,
  clearErrors,
  clearMessages,
  VerifyPassword,
  GetAllPermission,
  UpdateSinglePermission,
  logOut,
} from "./../../../store/actions";
import { Flex, H1 } from "@/styles/CommonStyles";
import Modules from "@/modules";
import { FiSearch } from "react-icons/fi";
import DropDownFilter from "@/components/common/DropDownFilter/DropDownFilter";
import { MdMoreVert } from "react-icons/md";
import MorePopover from "./MorePopover";
import { RxCross1 } from "react-icons/rx";
import { Alert, Stack } from "@mui/material";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";

const UsersList = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isPasswordModel, setIsPasswordModel] = useState(false);
  const [leadTransferData, setLeadTransferData] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { windowWidth, setIsLoaderShowing } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const [userToUpdatePermission, setUserToUpdatePermission] = useState(null);
  // console.log("check permission log", allowedPermissions);

  // useEffect(() => {
  //   console.log("allowedPermissions", allowedPermissions);
  // }, [allowedPermissions]);

  const dispatch = useDispatch();
  
  const {
    message,
    users,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);

  const {
    permissions,
    errors: error2,
    loading: loading2,
    message: message2,
  } = useSelector((state) => state.permissionReducer);

  // useEffect(() => {
  //   console.log("permissions", permissions);
  // }, [permissions]);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
      setIsPasswordModel(false);
      setLeadTransferData("");
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setIsPasswordModel(false);
      setLeadTransferData("");
    }
  }, [error, message]);
  const fetchRoles = async () => {
    try {
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_TENANt_ROLES}`
      );
      // dispatch(logOut());
      //   navigate("/Login");
      if(sessionExpired){
   

        
      
        // sessionStorage.clear()
        // dispatch(logOut());
        // navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
      setRoles(data);
    } catch (error) {}
  };
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
  };
  useEffect(() => {
    const data = filterByName();
    setFilteredData(data);
  }, [searchText, users]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = new Intl.DateTimeFormat(undefined, {
      month: "numeric",
      day: "numeric",
      // year: "2-digit",
      year: "numeric",
      timeZone: userInfo?.timeZone || "UTC", // Default to UTC if timezone is
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    }).format(date);

    return formattedDate;
  };

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours || 12; // Convert 0 to 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    if (!search) return;
    setSearchText(search);
  };

  const loginAsUser = (user) => {
    const { email , permissions } = user;
    
    const hasPermissionDashboard = ["Dashboard", "What's own your plate", "Prospect KPI", "Lead Breakdown", "Top3 Campaigns", "Last 30 Minutes", "Average Reply Time", "Drip KPI", "Text Activity", "Tag KPI", "Flag KPI"].some(permission =>
      permissions?.includes(permission)
    );

    const hasPermissionInbox = ["Inbox", "Inbox Module Access", "Inbox Module Access", "Status Filter", "Campaigns Filter", "Users Filter", "Tags Filter", "Reminders", "Chat box", "Right Panel Prospect Details"].some(permission =>
      permissions?.includes(permission)
    );

    const hasPermissionDirectImport = ["Direct Import", "Import or Drag & Drop File", "Assign to Campaign", "Download File",].some(permission =>
      permissions?.includes(permission)
    );

    const hasPermissionCampaign = ["Campaigns", "Create Initial Campaign", "Edit Initial Campaign", "Delete Initial Campaign", "Campaign List Table", "Search Campaign", "Campaign Details", "Select Campaign"].some(permission =>
      permissions?.includes(permission)
    );
    const hasPermissionTemplate = ["Templates", "Create Initial Template", "Edit Initial Template", "Delete Initial Template", "Initial Template List Table", "Initial Template Search", "Create Quick Replies", "Edit Quick Replies"].some(permission =>
      permissions?.includes(permission)
    );

    //  console.log("check permission", user?.permissions, hasPermissionDashboard, hasPermissionInbox, hasPermissionDirectImport, hasPermissionCampaign, hasPermissionTemplate);

    
    dispatch(
      LoginAsUser(email, () => {
        if(hasPermissionDashboard){
          navigate("/redirect?redirect=/dashboard");

        }else if (hasPermissionInbox){
          navigate("/redirect?redirect=/inbox");

        }else if (hasPermissionDirectImport){
          navigate("/redirect?redirect=/direct-import");

        } else if (hasPermissionCampaign){
          navigate("/redirect?redirect=/campaigns");

        } else {
          navigate("/redirect?redirect=/dashboard");

        }
        window.location.reload();
      })
    );
  };

  const handleCloseAndRefresh = async () => {
    try {
      // Dispatch the action to refresh users and wait for it to complete
      await dispatch(GetAllUser());
      // Close the modal after the action is completed
      setIsCreateUserOpen(false);
    } catch (error) {
      // Handle any errors if necessary
      console.error("Failed to refresh users:", error);
    }
  };
  const deleteHandler = async (id, value) => {
    try {
      setLoader(true);
      const payload = { active: !value };
      const { record, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.PATCH,
        `${ENDPOINTS.USERS}/${id}`,
        payload
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
      const index = cloneData.length
        ? cloneData?.findIndex((x) => x?._id === id)
        : {};
      if (index !== -1) {
        cloneData[index].active = !value;
        setFilteredData(cloneData);
      }
    } catch (error) {}
  };
  const roleFilterHandler = (value) => {
    const data = filterByName();
    const filteredData = data.filter((user) => user?.role?.name === value);
    setFilteredData(filteredData);
    setRole(value);
  };
  const resetHandler = () => {
    setRole("");
    setSearchText("");
    setFilteredData(users);
  };
  return (
    <>
      <Components.Common.ModalTop
        open={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
      >
        {/* <div style={{maxHeight:'80vh', overflow:'auto', width:'500px', backgroundColor: 'white'}}> */}
        {/* <Modules.AdminSettings.UserNew /> */}
        {/* <Components.Common.PermissionsOptions permissions={permissionsData.permissions}  /> */}
        <Components.Common.PermissionsOptions
          permissions={permissions}
          allowedPermissions={allowedPermissions}
          setAllowedPermissions={setAllowedPermissions}
          permissionId={userToUpdatePermission}
          refreshUsers={() => {
            dispatch(GetAllUser());
          }}
          onClose={() => {
            setUserToUpdatePermission(null);
            setAllowedPermissions([]);
            setIsPermissionModalOpen(false);
            dispatch(GetAllUser());
          }}
        />
        {/* </div> */}
      </Components.Common.ModalTop>

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
        open={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
      >
        <div style={{ maxHeight: "90vh", overflow: "auto" }}>
          <Modules.Settings.EditUser
            userId={userToUpdatePermission}
            onClose={() => {
              dispatch(GetAllUser());
              setIsEditUserOpen(false);
            }}
            setSelectedDeleteId={setSelectedDeleteId}
          />
        </div>
      </Components.Common.ModalTop>

      <Components.Common.ModalTop open={isModelOpen} onClose={() => {}}>
        <TransferModel
          onClose={() => setIsModelOpen(false)}
          selectedUserId={selectedUserId}
          onSave={() => setIsPasswordModel(!isPasswordModel)}
          setIsPasswordModel={setIsPasswordModel}
          setLeadTransferData={setLeadTransferData}
          setIsModelOpen={setIsModelOpen}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop open={isPasswordModel} onClose={() => {}}>
        <PasswordModel
          onClose={() => setIsPasswordModel(false)}
          setLeadTransferData={setLeadTransferData}
          leadTransferData={leadTransferData}
        />
      </Components.Common.ModalTop>

      <UsersListStyled
        tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
      >
        {/* <Flex direction="column">
          <Flex direction="row" justify="space-between" align="center">
            <H1 weight="500" fontSize="2rem" color="black">
              Users List
            </H1>
            <div>
              <Button onClick={() => setIsCreateUserOpen(true)}>
                <span className="icon">
                  <FaPlus />
                </span>
                <span className="text">Create New User</span>
              </Button>
            </div>
          </Flex>
          <Flex direction="row" justify="flex-end" align="center">
            <StyledInputWrapper onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                name="search"
                onChange={(e) =>
                  e.target.value === "" ? setSearchText("") : ""
                }
              />
              <button>
                <FaSearch />
              </button>
            </StyledInputWrapper>
          </Flex>
        </Flex> */}

        <UserTop>
          <div className="left">
            <div className="searchContainer">
              <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
              <input
                name="search"
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                placeholder="Search for a user"
              />
            </div>
            {/* <div className="dropDown" ><DropDownFilter placeHolder={"Teams"} /></div> */}
            <div className="dropDown">
              <DropDownFilter
                value={role}
                roleFilterHandler={roleFilterHandler}
                placeHolder={"Roles"}
                options={roles}
              />
            </div>
            <div
              style={{ color: "#012635", cursor: "pointer" }}
              onClick={() => resetHandler()}
            >
              Reset
            </div>
          </div>
          <div className="right">
            {(user.role === "admin" ||
              user.permissions.includes("Create User")) && (
              <div
                onClick={() => setIsCreateUserOpen(true)}
                style={{
                  width: "111px",
                  height: "48px",
                  backgroundColor: "#00BD82",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Create User
              </div>
            )}
          </div>
        </UserTop>
        <div style={{ flexGrow: 1 }} className="bottom">
          <div className="table">
            <div style={{ borderBottom: "solid 1px #E0E0E0" }} className="row">
              <h6 className="col bold">Name</h6>
              {/* <h6 className="col bold">First Name</h6> */}
              {/* <h6 className="col bold">Last Name</h6> */}
              {/* <h6 className="col bold">Email Address</h6> */}
              {/* <h6 className="col bold">Email Confirmed</h6> */}
              {/* <h6 className="col bold">Active</h6> */}
              <h6 className="col bold">Status</h6>
              <h6 className="col bold">Role</h6>

              {/* <h6 className="col bold">Creation Time</h6> */}
              <h6 className="col bold">Joined Date</h6>

              <h6
                style={{ position: "relative", margin: "auto" }}
                className="col bold"
              >
                Actions
              </h6>
            </div>
            {filteredData.length === 0 && (
              <div className="row body">
                <p className="error">No Record Found!</p>
              </div>
            )}
            {filteredData?.length > 0 &&
              filteredData?.map((data, i) => (
                <div
                  style={{
                    backgroundColor: "white ",
                    borderBottom: "solid 1px #E0E0E0",
                  }}
                  className="row body"
                  key={i}
                >
                  <div className="col data">
                    <p style={{ display: "flex", gap: "3px" }}>
                      <div
                        style={{
                          border: "solid 1px #777777",
                          borderRadius: "9px",
                          fontSize: "10px",
                          fontWeight: 500,
                          lineHeight: "14px",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#777777",
                        }}
                      >{` ${data?.firstName[0] ?? ""} ${
                        data?.lastName[0] ?? ""
                      } `}</div>
                      {`${data?.firstName ?? ""} ${data?.lastName ?? ""}`}
                    </p>
                  </div>

                  {/* <div className="col data">
                    <div style={{ backgroundColor: data?.role?.name == "Agent" ? "#FFF2CC" : data?.role?.name == "Admin" ? "#E1DDF8" : "", borderRadius: "18px", padding: '2px 8px', color: data?.role?.name == "Agent" ? "#F49C17" : data?.role?.name == "Admin" ? "#6955DA" : "", border: data?.role?.name == "Agent" ? "solid 1px #FFE185" : data?.role?.name == "Admin" ? "#A69FEA" : "" }}>
                      <p style={{ fontSize: "12px", fontWeight: 500, lineHeight: "20px" }}>{data?.role?.name && data?.role?.name}</p>

                    </div>
                  </div> */}

                  <div className="col data">
                    {/* <p>{data?.active && data?.active ? "Yes" : "No"}</p> */}
                    <div
                      style={{
                        backgroundColor: data?.active
                          ? "#C2FFEC"
                          : !data?.active
                          ? "#FFEEEE"
                          : "",
                        borderRadius: "18px",
                        padding: "2px 8px",
                        color: data?.active
                          ? "#00724E"
                          : !data?.active
                          ? "#EA3815"
                          : "",
                        border: data?.active
                          ? "solid 1px #5BF1B2"
                          : !data?.active
                          ? "solid 1px #EA3815"
                          : "",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        {data?.active && data?.active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                  <div className="col data">
                    <div
                      style={{
                        backgroundColor:
                          data?.role?.color === "#6955DA"
                            ? "#EBE9F8"
                            : data?.role?.color === "#FF5D3E"
                            ? "#FFEEEE"
                            : data?.role?.color === "#3086EE"
                            ? "#E8F0FB"
                            : "#EBE9F8",
                        borderRadius: "18px",
                        padding: "2px 8px",
                        color:
                          data?.role?.color === "#6955DA"
                            ? "#6955DA"
                            : data?.role?.color === "#FF5D3E"
                            ? "#FF5D3E"
                            : data?.role?.color === "#3086EE"
                            ? "#3086EE"
                            : "#6955DA",
                        border: `solid 1px ${
                          data?.role?.color === "#6955DA"
                            ? "#6955DA"
                            : data?.role?.color === "#FF5D3E"
                            ? "#FF5D3E"
                            : data?.role?.color === "#3086EE"
                            ? "#3086EE"
                            : "#6955DA"
                        }`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        {data?.role?.name && data?.role?.name}
                      </p>
                    </div>
                  </div>

                  <div className="col data">
                    <p>{data?.createdAt && formatDate(data.createdAt)}</p>
                  </div>

                  {/* <div className="col data" > */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <MorePopover
                      loginAsUser={loginAsUser}
                      setSelectedDeleteId={deleteHandler}
                      isPermissionModalOpen={isPermissionModalOpen}
                      setIsPermissionModalOpen={setIsPermissionModalOpen}
                      setAllowedPermissions={setAllowedPermissions}
                      setUserToUpdatePermission={setUserToUpdatePermission}
                      setIsEditUserOpen={setIsEditUserOpen}
                      isEditUserOpen={isEditUserOpen}
                      data={data}
                    >
                      <MdMoreVert style={{ cursor: "pointer" }} />
                    </MorePopover>
                  </div>
                  {/* </div> */}
                </div>
              ))}
          </div>
        </div>

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
      </UsersListStyled>
    </>
  );
};

export default UsersList;

const TransferModel = ({
  onClose,
  selectedUserId,
  onSave,
  setIsPasswordModel,
  setLeadTransferData,
  setIsModelOpen,
}) => {
  const { users } = useSelector((state) => state.authReducer);
  const [idOfSelectedDropDown, setIdOfSelectedDropDown] = useState("");
  const [permission, setPermission] = useState("user");
  let userWithoutSelectedId = users.filter(
    (item) => item._id !== selectedUserId
  );

  const formik = useFormik({
    initialValues: {
      userId: idOfSelectedDropDown,
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      let oldUserId = selectedUserId;
      let newUserId = values?.userId?.value;
      let finalResult = { oldUserId, newUserId, permission };
      setLeadTransferData(finalResult);
      setIsPasswordModel(true);
      setIsModelOpen(false);
      actions.resetForm();
      setIdOfSelectedDropDown("");
      setPermission("");
    },
  });

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const userType =
      localStorage.getItem("type") ?? localStorage.getItem("type") ?? "";
    if (userType === "admin" && userWithoutSelectedId.length <= 0) {
      setIdOfSelectedDropDown({ value: user?._id });
      setPermission("admin");
    }
  }, []);

  return (
    <TransferModelStyle>
      <div className="top">
        <h2>Transfer Lead</h2>
        <button
          type="button"
          onClick={(e) => {
            onClose(e);
            formik.resetForm();
            setIdOfSelectedDropDown("");
            setLeadTransferData("");
          }}
        >
          <RxCross1 />
        </button>
      </div>
      <div
        style={{
          width: "680px",
          backgroundColor: "#fff",
        }}
      >
        {/* <Stack
          sx={{
            width: "100%",
            color: "#D6E7FC",
            padding: "16px 24px",
          }}
          spacing={2}
        >

          <Alert
            icon={<IoMdAlert style={{ color: "#005ABB", fontSize: "32px" }} />}
            action={
              <Button
             
                style={{
                  color: "#012635",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  backgroundColor: "transparent",
                  marginTop: "4px",
                }}
              >
                Dismiss
              </Button>
            }
            style={{
              color: "#012635",
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: "500",
              borderRadius: "12px",
            }}
            severity="info"
          >
            Please note that this number/user will be charged according to your
            current subscription.
          </Alert>
         
        </Stack> */}
      </div>

      <div
        style={{
          width: "680px",
          maxHeight: "108px",
          backgroundColor: "#fff",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div style={{ padding: "16px 24px" }}>
            {userWithoutSelectedId?.length > 0 ? (
              <label>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "22px",
                    marginBottom: "4px",
                    color: "#012635",
                  }}
                >
                  Select
                </span>

                <Select
                  value={idOfSelectedDropDown}
                  onChange={(e) => {
                    setIdOfSelectedDropDown(e);
                  }}
                  options={userWithoutSelectedId.map((option) => ({
                    value: option._id,
                    label: option.firstName + " " + option.lastName,
                  }))}
                  isSearchable
                  placeholder="Search..."
                />
              </label>
            ) : (
              <p style={{ color: "red" }}>
                You don't have any user if u wish to transfer it will transfer
                to your's account
              </p>
            )}
          </div>

          <div
            style={{
              width: "auto",
              height: "72px",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
              padding: "16px",
              backgroundColor: "#fff",
              borderTop: "solid 1px #F0F0F0",
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                onClose(e);
                formik.resetForm();
                setIdOfSelectedDropDown("");
                setLeadTransferData("");
              }}
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "8px",
                border: "solid 1px #777777",
                color: "#777777",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 12px",
              }}
            >
              Cancel
            </button>
            <Components.Common.ButtonRightIcon
              text="Save"
              type="submit"
              style={{
                backgroundColor: "#00BD82",
                width: "100px",
                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 12px",
              }}
              disabled={!idOfSelectedDropDown}
            />
          </div>
        </form>
      </div>
    </TransferModelStyle>
  );
};

const PasswordModel = ({ onClose, setLeadTransferData, leadTransferData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      let finalResult = { email: user?.email, password: values.password };
      dispatch(VerifyPassword(finalResult, leadTransferData));
      actions.resetForm();
      setLeadTransferData("");
    },
  });
  return (
    <PasswordModelStyle>
      <div className="top">
        <h2>Verify password</h2>
        <button
          type="button"
          onClick={(e) => {
            onClose(e);
            setLeadTransferData("");
          }}
        >
          <RxCross1 />
        </button>
      </div>
      {/* <header>
       
      </header> */}
      {/* <div
        style={{
          width: "680px",
          backgroundColor: "#fff",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            color: "#D6E7FC",
            padding: "8px 16px",
          }}
          spacing={2}
        >
       
          <Alert
            icon={<IoMdAlert style={{ color: "#005ABB", fontSize: "32px" }} />}
            action={
              <Button
           
                style={{
                  color: "#012635",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  backgroundColor: "transparent",
                  marginTop: "4px",
                }}
              >
                Dismiss
              </Button>
            }
            style={{
              color: "#012635",
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: "500",
              borderRadius: "12px",
            }}
            severity="info"
          >
            Please note that this number/user will be charged according to your
            current subscription
          </Alert>
               </Stack>
      </div> */}
      {/* <header>
        <h2>Verify password</h2>
        <button
          type="button"
          onClick={(e) => {
            onClose(e);
            setLeadTransferData("");
          }}
        >
          <RxCross1 />
        </button>
      </header> */}
      <div
        style={{
          width: "680px",
          maxHeight: "108px",
          backgroundColor: "#fff",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div style={{ padding: "16px 24px" }}>
            <blockquote>
              {/* <label>Password</label> */}
              <Components.Common.MyInputWithEndIcon
                title="Password"
                placeholder="Please type your password"
                type="Password"
                Icon={Assets.Icons.Eye}
                // iconCSS={{
                //   color: isPassShow ? "#5867dd" : "#D8D8D8",
                // }}
                // onIconClick={() => setIsPassShow((p) => !p)}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </blockquote>
          </div>

          <div
            style={{
              width: "auto",
              height: "72px",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
              padding: "16px",
              backgroundColor: "#fff",
              borderTop: "solid 1px #F0F0F0",
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                onClose(e);
                formik.resetForm();
                setLeadTransferData("");
              }}
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "8px",
                border: "solid 1px #777777",
                color: "#777777",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 12px",
              }}
            >
              Cancel
            </button>
            <Components.Common.ButtonRightIcon
              disabled={!formik.isValid || !formik.dirty}
              text={loading ? "Please wait..." : "Save"}
              //  icon={<FaSave />}
              type="submit"
              style={{
                backgroundColor: "#00BD82",
                width: "100px",
                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 12px",
              }}
            />
          </div>
        </form>
      </div>
    </PasswordModelStyle>
  );
};
