import React, { useEffect, useState } from "react";

import styles from "./AdminEdit.module.css";
import { useFormik } from "formik";
import { CircularLoader } from "@/components/common";
import Select from "react-select";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Assets from "@/assets";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChangePassword,
  clearMessages,
  DeleteUser,
  ForgotPassword,
  GetAllRole,
  GetSingleUser,
  GetSingleUserAdmin,
  UpdateSingleUser,
} from "@/store/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CreateNewCategoryModalStyled } from "@/modules/Tenat/EditUser/styles";
import { IoCloseOutline } from "react-icons/io5";
import LoginLink from "../../../assets/images/LoginLink.png";
import Components from "@/components";
import { getInitials } from "@/utils/helpers";
import PhoneInput from "react-phone-input-2";
const AdminEdit = () => {
  const [companyLogo, setCompanyLogo] = useState("");
  const [isLoading, setLoader] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({});
  const [singleUserData, setSingleUserData] = useState({});
  const [activeChangePassword, setActiveChangePassword] = useState(false);
  const [isCreateNewCategoryModalOpen, setIsCreateNewCategoryModalOpen] =
    useState(false);
  const [roleState, setRoleState] = useState({})
  const timezones = ["US/Pacific", "US/Eastern", "US/Central", "US/Mountain"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const {
    message,
    singleAdminUser,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);

  const { roles, loading: roleLoading } = useSelector(
    (state) => state.roleReducer
  );
  const PaawodResetReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (singleAdminUser) {

      const userData = {
        firstName: singleAdminUser.firstName || "",
        lastName: singleAdminUser.lastName || "",
        role: singleAdminUser?.role?._id ? singleAdminUser?.role?._id : singleAdminUser?.role || "",
        aliasName: singleAdminUser.aliasName || "",
        companyName: singleAdminUser.companyName || "",
        phoneNumber: singleAdminUser.phoneNumber || "",
        active: singleAdminUser.active ?? true,
        timeZone: singleAdminUser.timeZone || "",
        email: singleAdminUser.email || "",
        avatar: singleAdminUser.avatar || "",
      };
      setState(userData);
      setRoleState({ value: singleAdminUser?.role?._id, label: singleAdminUser?.role?.name })
      setProfilePic(singleAdminUser.avatar?.replace(/^http:/, "https"));
      setSingleUserData(userData);
  console.log("check single user", state , userData , singleAdminUser);

    }

  }, [singleAdminUser, roles]);




  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#5BF1B2" : "#D3D7DD", // Change border color
      boxShadow: "none",
      borderRadius: "8px", // Change border radius
      height: "48px",
      width: "340px",
      color: "#012635",
      "&:hover": {
        borderColor: "#5BF1B2", // Hover border color
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 8,
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove the indicator separator line
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
  useEffect(() => {
    dispatch(GetSingleUserAdmin(userId));
    dispatch(GetAllRole());
  }, []);

  useEffect(() => {
    if (PaawodResetReducer?.error?.length > 0) {
      toast.error(PaawodResetReducer?.error);
      dispatch(clearErrors());
    }
    if (PaawodResetReducer?.message !== "") {
      if (
        PaawodResetReducer?.message ==
        "kindly check your mail inbox for resetPassword"
      ) {
        setIsCreateNewCategoryModalOpen(true);
      }
      dispatch(clearMessages());
    }
  }, [PaawodResetReducer?.error, PaawodResetReducer?.message]);

  const saveHandler = (type, status) => {
    const { role, firstName, lastName, avatar, timeZone } = state;
    let finalResult = new FormData();
    if (role && type == "second") {
      finalResult.append("role", role);
    }
    if (firstName && type == "first") {
      finalResult.append("firstName", firstName);
    }
    if (lastName && type == "first") {
      finalResult.append("lastName", lastName);
    }
    if (timeZone && type == "second") {
      finalResult.append("timeZone", timeZone);
    }
    finalResult.append("avatar", avatar != undefined ? avatar : "");
    dispatch(
      UpdateSingleUser(
        finalResult,
        userId,
        "",
        () => {
          toast.success("Successfully updated.");
          dispatch(GetSingleUser(userId));
          dispatch(GetAllRole());
        },
        (message) => {
          toast.error(message);
        }
      )
    );
  };




  const undoHandler2 = () => {
    console.log("check undo handler");
    setState((prev) => ({
      ...prev,
      role: singleUserData.role,

      timeZone: singleUserData.timeZone,
    }));
  };


  const undoHandler1 = () => {
    console.log("check undo handler");
    setState((prev) => ({ ...prev, firstName: singleUserData.firstName, lastName: singleUserData.lastName, avatar: singleUserData.avatar, }));
  };


  const checkDirty = singleUserData?.timeZone == state.timeZone && singleUserData?.aliasName == state.aliasName && singleUserData?.companyName == state.companyName && singleUserData?.role == state.role ? true : false
  const checkDirtyFirst = singleUserData?.firstName == state.firstName && singleUserData?.lastName == state.lastName  && state?.avatar == singleUserData?.avatar  ? true : false


  const commanHandler = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const ChangePasswordFunc = (type) => {
    const { email, password } = state;
    let finalResult = new FormData();
    if (email && type == "email") {
      finalResult.append("email", email);
    }
    if (password && type == "password") {
      finalResult.append("password", password);
    }
    dispatch(
      UpdateSingleUser(
        finalResult,
        userId,
        "",
        () => {
          toast.success("Successfully updated.");
          dispatch(GetSingleUser(userId));
          dispatch(GetAllRole());
          if (status == "reset pass") {
            setActiveChangePassword(false);
            ChangePassword();

          } else {
          }
        },
        (message) => {
          toast.error(message);

        }
      )
    );
  };

  const [profilePic, setProfilePic] = useState();
  const [openWarning, setOpenWarning] = useState(false)
  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    commanHandler("avatar", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteLogoHandler = async () => {
    setState((prev) => ({ ...prev, avatar: "" }));
    setProfilePic("");
  };

  const handleAdminDelte = () => {
    dispatch(DeleteUser(userId, () => {
      toast.success("Successfully deleted.")
      navigate("/master_setting/Adminuser")
    }));
  }




  return (
    <div className={styles.CompanyInfo_container}>
      <div

        className={styles.CompanyInfo_fieldsContainer}
      >

        <div style={{ padding: "20px" }}>

          <div style={{ height: "80px", display: "flex", alignItems: "center" }}>
            <div className={styles.companyInfo_title}>Personal Information</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
            <div className={styles.CompanyInfo_upload}>
              <div className={styles.CompanyInfo_uploadTop}>
                {profilePic ? (
                  <img
                    className={styles.CompanyInfo_logoImg}
                    width={"80px"}
                    height={"80px"}
                    src={profilePic}
                  />
                ) : (
                  <span className={styles.name_intial}>
                    {getInitials(state?.firstName || "", true)}
                  </span>
                )}
              </div>
              <div className={styles.CompanyInfo_uploadBottom}>
                {profilePic ? (
                  <div style={{ width: "100%", height: "100%" }}>
                    {isLoading == "imgLoading" ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <CircularLoader />
                      </div>
                    ) : (
                      <div style={{ width: "100%", height: "100%" }}>
                        <div
                          className={styles.CompanyInfo_UploadedLayout}
                          style={{ height: "100%" }}
                        >
                          <div
                            className={styles.CompanyInfo_UploadedLayoutChild}
                            style={{ borderRight: "1px solid #E2E7E4" }}
                          >
                            <span
                              onClick={() => deleteLogoHandler()}
                              style={{ paddingTop: "0px" }}
                              className={styles.CompanyInfo_button}
                            >
                              Delete picture
                            </span>
                          </div>
                          <div className={styles.CompanyInfo_UploadedLayoutChild}>
                            <label
                              style={{ paddingTop: "8px" }}
                              className={styles.CompanyInfo_button}
                            >
                              Upload Picture
                              <input
                                onChange={handlePictureUpload}
                                type="file"
                                name="profilePic"
                                style={{ visibility: " hidden" }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className={styles.CompanyInfo_button}>
                    {isLoading == "imgLoading" ? (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {" "}
                        <CircularLoader />
                      </div>
                    ) : (
                      "Upload Picture"
                    )}
                    <input
                      onChange={handlePictureUpload}
                      type="file"
                      name="profilePic"
                      style={{ visibility: " hidden" }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div  className={styles.CompanyInfo_fieldsPhone}>
              <div className={styles.CompanyInfo_fieldsInputLayout}>
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>
                    First Name
                  </label>
                </div>

                <input
                  type="text"
                  name="firstName"
                  value={state?.firstName}
                  onChange={(e) => commanHandler("firstName", e.target.value)}
                  // onBlur={(e) => blurHandler(e)}
                  className={styles.CompanyInfo_fieldsInput}
                  placeholder="Enter name"
                // style={{ border: errors.companyName && "solid 1px #FF8DA8" }}
                />
              </div>
              <div className={styles.CompanyInfo_fieldsInputLayout}>
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>
                    Last Name
                  </label>
                </div>

                <input
                  type="text"
                  name="lastName"
                  value={state?.lastName}
                  onChange={(e) => commanHandler("lastName", e.target.value)}
                  // onBlur={(e) => blurHandler(e)}
                  className={styles.CompanyInfo_fieldsInput}
                  placeholder="Enter name"
                />
              </div>

                <div className={styles.CompanyInfo_fieldsInputLayout}>
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>
                  Phone Number
                  </label>
                </div>

                   <PhoneInput
                    country={'us'}
                    placeholder="Enter Mobile Number"
                    enableSearch={true}
                    value={`1${singleAdminUser?.phoneNumber}`}
                    inputStyle={{ fontFamily: 'fellix', color: '#777777', border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", }}
                    maxLength={14}
                    disabled={true}
                    disableDropdown={true}
                  />
              </div>
            </div>
          </div>

        </div>

        {
          !checkDirtyFirst && (
            <div style={{ justifyContent: "end" }} className={styles.CompanyInfo_fieldsBottom}>

              <div>
                <button
                  onClick={() => undoHandler1()}
                  className={styles.CompanyInfo_undo}
                >
                  Undo
                </button>
                {isLoading == "saveLoader" ? (
                  <div
                    style={{
                      width: "133px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularLoader />
                  </div>
                ) : (
                  <button
                    onClick={() => saveHandler("first")}
                    className={styles.CompanyInfo_save}
                  // disabled={!state?.companyName}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          )
        }


      </div>
      <div className={styles.CompanyInfo_fieldsContainer}>
        <div className={styles.CompanyInfo_fieldsTop}>
          <div className={styles.companyInfo_title}>Profile Setting</div>

          <div style={{ marginBottom: "16px" }}>
            <p
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "22px",
                color: "#777777",
              }}
            >
              Current Role's:{" "}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  border: "solid 1px  #A69FEA",
                  backgroundColor: "#E1DDF8",

                  color: "#6955DA",
                  width: "fit-content",
                  borderRadius: "13px",
                  padding: "0px 8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                }}
              >
                {singleAdminUser?.role?.name ? singleAdminUser?.role?.name : singleAdminUser?.role}
              </div>
              {/* <div
                style={{
                  display: "flex",
                  gap: "4px",
                  width: "185px",
                  alignItems: "center",
                }}
              >
                <img src={Assets.Icons.pencilIcon} />
                <p
                  style={{
                    fontSize: "12px",
                    lineHeight: "20px",
                    fontWeight: "500",
                    color: "#777777",
                  }}
                >
                  Edit Settings
                </p>
              </div> */}
            </div>
          </div>
          <div className={styles.CompanyInfo_fields_flex}>
            <div className={styles.CompanyInfo_fieldsInputLayout}>
              <div>
                <label className={styles.CompanyInfo_fieldsLabel}>Role</label>
              </div>


              <Select
                styles={customStyles}

                onChange={(val) => {
                  console.log("check logg chulling", val);

                  setRoleState(val)
                  setState((prev) => ({ ...prev, role: val.value }))

                }}
                value={roleState}
                options={roles.map((role) => ({
                  value: role._id,
                  label: role.name,
                }))}

                isSearchable
                placeholder="Select a role"
              />
            </div>
            <div className={styles.CompanyInfo_fieldsInputLayout}>
              <div>
                <label className={styles.CompanyInfo_fieldsLabel}>
                  Timezone
                </label>
              </div>

              <Select
                value={state.timeZone}
                styles={customStyles}
                options={timezones.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(val) => commanHandler("timeZone", val.value || "")}
                isSearchable
                placeholder={state.timeZone}
              />
            </div>
          </div>
        </div>
        {
          !checkDirty && (
            <div style={{ justifyContent: "space-between" }} className={styles.CompanyInfo_fieldsBottom}>
              <button onClick={() => setOpenWarning(true)} style={{ color: "red", height: "40px", width: "100px", border: "solid 1px red", borderRadius: "8px", cursor: "pointer" }}>
                Delete
              </button>
              <div>
                <button
                  onClick={() => undoHandler2()}
                  className={styles.CompanyInfo_undo}
                >
                  Undo
                </button>
                {isLoading == "saveLoader" ? (
                  <div
                    style={{
                      width: "133px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularLoader />
                  </div>
                ) : (
                  <button
                    onClick={() => saveHandler("second")}
                    className={styles.CompanyInfo_save}
                  // disabled={!state?.companyName}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          )
        }

      </div>
      <div className={styles.CompanyInfo_fieldsContainer}>
        <div className={styles.CompanyInfo_fieldsTop}>
          <div className={styles.companyInfo_title}>Account Credentials</div>
          <div style={{ flexDirection: "column", alignItems: "start" }} className={styles.CompanyInfo_fields_flex}>
            <div style={{ display: "flex", gap: "8px", alignItems: "end" }}>
              <div className={styles.CompanyInfo_fieldsInputLayout}>
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>Email</label>
                </div>
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) => commanHandler("email", e.target.value)}
                  className={styles.CompanyInfo_fieldsInput}
                  placeholder={"Email"}
                />
              </div>
              {
                state?.email != singleUserData?.email && (
                  <button
                    style={{ width: "158px" }}
                    className={styles.CompanyInfo_change_password}
                    onClick={() => { ChangePasswordFunc("email"); }}
                  >
                    Change Email
                  </button>
                )
              }

            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "end" }}>
              <div className={styles.CompanyInfo_fieldsInputLayout}>
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>
                    Password
                  </label>
                </div>

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="mypassword"
                    onChange={(e) => commanHandler("password", e.target.value)}
                    className={styles.CompanyInfo_fieldsInput}
                    placeholder="********"
                    autoComplete="new-password"
                    style={{
                      paddingRight: "40px",
                    }}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      cursor: "pointer",
                      color: "#888",
                    }}
                  >
                    {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                  </span>
                </div>
                {/* <label>
                  {errors["companyWebsite"] ? errors["companyWebsite"] : ""}
                </label> */}
              </div>
              {
                state?.password && (
                  <button
                    className={styles.CompanyInfo_change_password}
                    onClick={() => { ChangePasswordFunc("password"); }}
                  >
                    Change Password
                  </button>
                )
              }

            </div>

          </div>
        </div>
      </div>
      <Components.Common.ModalTop open={isCreateNewCategoryModalOpen}>
        <CreateNewCategoryModal
          onClose={() => {
            setIsCreateNewCategoryModalOpen(false);
          }}
          email={state?.email}
        />
      </Components.Common.ModalTop>
      <Components.Common.DeleteModal
        onClose={() => setOpenWarning(false)}
        onOkay={() => {
          handleAdminDelte()
          setOpenWarning(false)
          // setIsModelOpen(!isModelOpen);
          // setSelectedUserId(selectedDeleteId);
          // setSelectedDeleteId("");
        }}
        open={openWarning}
        deleteItemName="User"
      // deleteItemText={
      //   "Before Deletion you have to transfer to another user. "
      // }
      />
    </div>
  );
};

export default AdminEdit;

const CreateNewCategoryModal = ({ onClose, email }) => {
  return (
    <CreateNewCategoryModalStyled>
      <div className="top">
        <h2></h2>
        <button onClick={onClose} type="button">
          <IoCloseOutline size="2.4rem" />
        </button>
      </div>
      <div className="middle">
        <img src={LoginLink} style={{ height: "28rem", width: "30rem" }} />
        <p>{`Please click on the link we sent to ${email}`}</p>
        <p
          style={{
            color: "#073F56",
            fontWeight: 400,
            fontSize: "1.1rem",
            marginTop: "0",
          }}
        >
          Password change request sent!
        </p>
      </div>
    </CreateNewCategoryModalStyled>
  );
};
