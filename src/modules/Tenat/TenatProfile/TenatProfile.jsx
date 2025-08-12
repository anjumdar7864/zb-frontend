import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  Card2,
  ChangePasswordBtn,
  CreateNewCategoryModalStyled,
  EditContainer,
  ExpandableDiv,
  FilterBox,
  IMG,
  Option,
  PackageBox,
  PicBox,
  SubscriptionBox,
  UploadPicButton,
} from "./styles";
import { Flex, P } from "@/styles/CommonStyles";
import { photo } from "@/assets/images";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoCheckmarkCircleSharp, IoCloseOutline } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { GoCircle } from "react-icons/go";
// import { Components.Common.MyInput } from '../CreateUserModel/styles';
import Components from "@/components";
import { ModalInput } from "../CreateUserModel/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleUser,
  UpdateLoginTanent,
  UpdateSingleUser,
  UpdateSingleUserAgent,
} from "@/store/actions/auth.action";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearMessages,
  clearErrors,
  GetAllSubscription,
} from "@/store/actions";
import { useGlobalContext } from "@/hooks";
import { CreateUserButton } from "../styles";
import Select, { components } from "react-select";
import { FaAngleDown, FaEye, FaEyeSlash } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import styles from "./TenatProfile.module.css";
import { getInitials } from "@/utils/helpers";
import LoginLink from "../../../assets/images/LoginLink.png";
import { ForgotPassword } from "../../../store/actions";
import { forgetPasswordSchema } from "@/schema";
import PhoneInput from "react-phone-input-2";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  aliasName: Yup.string().required("Alias/Rep Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  timeZone: Yup.string().required("TimeZone is required"),
});

const TenatProfile = ({ tenantData }) => {
  const [isCreateNewCategoryModalOpen, setIsCreateNewCategoryModalOpen] =
    useState(false);
  const { Id } = useParams();
  const dispatch = useDispatch();
  const storedType =
    localStorage.getItem("type") ?? localStorage.getItem("type");
  useEffect(() => {
    if (storedType != "other") {
      dispatch(GetSingleUser(Id, "admin"));
    }
  }, []);
  const { singleUser } = useSelector((state) => state.authReducer);
  const { setIsLoaderShowing } = useGlobalContext();



  const {
    message,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Status");
  const [selectedSub, setSelectedSub] = useState(null);
  const [profilePic, setProfilePic] = useState(photo);
  const [userPasword, setUserPasword] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [CredentialsType, setCredentialsType] = useState("email");
  const [dataType, setDataType] = useState("first");
  const timezones = ["US/Pacific", "US/Eastern", "US/Central", "US/Mountain"];


  useEffect(() => {
    setIsLoaderShowing(loading);
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      // dispatch(GetSingleUser(Id, "admin"))
      setTimeout(() => {
        if (changePassword) {
          setChangePassword(false);
        } else {
          // navigate(-1);
          if (storedType != "other") {
            dispatch(GetSingleUser(Id, "admin"));
          }
        }
      }, 1000);
    }
  }, [error, dispatch, message, loading]);

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setSelectedOption(singleUser?.status);
    if (singleUser) {
      formik.setValues({
        firstName: singleUser?.firstName || "",
        lastName: singleUser?.lastName || "",
        timeZone: singleUser?.timeZone || "",
        aliasName: singleUser?.aliasName || "",
        companyName: singleUser?.companyName || "",
      });
      formikPassword.setValues({
        email: singleUser?.email || "",
      });
      setProfilePic(singleUser?.avatar);
      setImage(singleUser?.avatar);
    }
  }, [singleUser]);

  const PaawodResetReducer = useSelector((state) => state.authReducer);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      timeZone: "",
      aliasName: "",
      companyName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { lastName, firstName, timeZone, aliasName, companyName } = values;


      let finalResult = new FormData();
      if (firstName && dataType == "first") {
        finalResult.append("firstName", firstName);
      }
      if (lastName && dataType == "first") {
        finalResult.append("lastName", lastName);
      }
      if (timeZone && dataType == "second") {
        finalResult.append("timeZone", timeZone);
      }
      if (aliasName && dataType == "second") {
        finalResult.append("aliasName", aliasName);
      }
      if (companyName && dataType == "second") {
        finalResult.append("companyName", companyName);
      }
      if (image !== false && dataType == "first") {
        finalResult.append("avatar", image != undefined ? image : "");
      }
      if (storedType == "other") {


        dispatch(UpdateSingleUserAgent(finalResult, Id, (data) => {

          localStorage.setItem("user", data);

        }));
      } else {

        dispatch(UpdateLoginTanent(finalResult, Id, "admin", () => {

          setio

        }));
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {

      const { email, password } = values;
      let finalResult = new FormData();
      if (email && CredentialsType == "email") {
        finalResult.append("email", email);
        if (storedType == "other") {
          dispatch(UpdateSingleUserAgent(finalResult, Id,));
        } else {
          dispatch(UpdateLoginTanent(finalResult, Id, "admin"));
        }
      }
      if (CredentialsType == "password") {


        // finalResult.append("password", password);
        values["url"] = import.meta.env.VITE_APP_FRONTEND_BASE_URL_FOR_CHANGE;
        dispatch(ForgotPassword(values));
      }

    },
  });

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

  const timezonesOption = timezones?.map((timezone, index) => ({
    value: index,
    label: timezone,
  }));
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaAngleDown style={{ color: "#777777" }} />
      </components.DropdownIndicator>
    );
  };
  const [isLoading, setLoader] = useState("");
  const deleteLogoHandler = async () => {
    setProfilePic("");
    setImage("");
  };
  const undoAction = async () => {
    if (singleUser) {
      formik.setValues({
        firstName: formik.values?.firstName,
        lastName: formik.values?.lastName,
        timeZone: singleUser?.timeZone || "",
        aliasName: singleUser?.aliasName || "",
        companyName: singleUser?.companyName || "",
      });
      setProfilePic(singleUser?.avatar);
    }
  };
  const undoActionFirst = async () => {
    if (singleUser) {
      formik.setValues({
        firstName: singleUser?.firstName || "",
        lastName: singleUser?.lastName || "",
        timeZone: formik.values.timeZone,
        aliasName: formik.values.aliasName,
        companyName: formik.values.companyName,
      });
      setProfilePic(singleUser?.avatar);
    }
  };
  const toggleExpand = () => {
    setIsOpen(!isOpen);
  };

  // const checkDirty = singleUser?.firstName == formik.values.firstName && singleUser?.lastName == formik.values.lastName && singleUser?.timeZone == formik.values.timeZone && singleUser?.aliasName == formik.values.aliasName && singleUser?.companyName == formik.values.companyName && image == singleUser?.avatar ? true : false
  const checkDirty = singleUser?.timeZone == formik.values.timeZone && singleUser?.aliasName == formik.values.aliasName && singleUser?.companyName == formik.values.companyName ? true : false
  const checkDirtyFirst = singleUser?.firstName == formik.values.firstName && singleUser?.lastName == formik.values.lastName && image == singleUser?.avatar ? true : false
  // console.log(formik, checkDirty, 'riuhjk')
  // console.log(singleUser,'riuhjk')

  return (
    <EditContainer>
      <Flex direction="column" gap="20px">
        <Card>
          <div style={{ padding: "20px" }}>
            <Flex align="center" justify="space-between">
              <p style={{ fontWeight: 600, fontSize: "24px" }}>
                Personal Information
              </p>
            </Flex>
            <Flex xsDirection="column" align="center" gap="40px" paddingTop="20px">
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
                      {getInitials(formik.values.firstName || "", true)}
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
                            <div
                              className={styles.CompanyInfo_UploadedLayoutChild}
                            >
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
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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
              <Flex display={storedType != "superAdmin" && "grid"} lgDisplay={storedType != "superAdmin" && "grid"} gridCols="1fr 1fr" direction="column" xsWidth="100%" width={storedType != "superAdmin" ? "65%" : "35%"} xsGap='10px' gap="10px">
                <Flex direction="column">
                  <p style={{ fontWeight: 500, fontSize: "14px" }}>
                    First Name
                  </p>
                  <Components.Common.MyInput
                    type="text"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={
                      formik.touched.firstName && formik.errors.firstName
                        ? formik.errors.firstName
                        : ""
                    }
                  />
                </Flex>

                <Flex direction="column">
                  <p style={{ fontWeight: 500, fontSize: "14px" }}>Last Name</p>
                  <Components.Common.MyInput
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && formik.errors.lastName
                        ? formik.errors.lastName
                        : ""
                    }
                  />
                </Flex>
                {
                  storedType != "superAdmin" && (
                    <Flex direction="column">
                      <P color="#2E2E2E" fontSize="14px" fontweight="500" style={{ marginBottom: "0.65rem" }}>
                        Phone Number
                      </P>

                      <PhoneInput
                        country={'us'}
                        placeholder="Enter Mobile Number"
                        enableSearch={true}
                        value={`${singleUser?.phoneNumber}`}
                        inputStyle={{ fontFamily: 'fellix', color: '#777777', border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", }}
                        maxLength={14}
                        disabled={true}
                        disableDropdown={true}
                      />
                    </Flex>
                  )
                }

              </Flex>
            </Flex>
          </div>


          {
            !checkDirtyFirst && (
              <Flex
                justify="end"
                align="start"
                gap="20px"
                style={{ borderTop: "1px solid #F0F0F0", padding: "20px" }}
              >

                <button
                  type="button"
                  onClick={undoActionFirst}
                  style={{
                    padding: "0.8rem 1.3rem",
                    color: "black",
                    fontWeight: 600,
                    borderRadius: "0.8rem",
                  }}
                >
                  <p style={{ fontWeight: 500, fontSize: "16px" }}>undo</p>
                </button>
                <button
                  onClick={() => {
                    formik.handleSubmit()
                    setDataType("first")
                  }}
                  style={{
                    background: "#00BD82",
                    padding: "0.8rem 1.9rem",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "0.8rem",
                  }}
                >
                  <p style={{ fontWeight: 500, fontSize: "16px" }}>Save Changes</p>
                </button>
              </Flex>
            )
          }




        </Card>

        <Card2>
          <div style={{ padding: "20px" }}>
            <p style={{ fontWeight: 600, fontSize: "24px" }}>
              Profile Setting
            </p>
            <div style={{ paddingTop: "2rem" }}>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#777777",
                }}
              >
                Current role(s):
              </p>
              <div
                style={{
                  paddingTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    paddingInline: "1rem",
                    paddingBlock: "0.3rem",
                    border: "1px solid #A69FEA",
                    background: "#E1DDF8",
                    borderRadius: "2rem",
                    width: "fit-content",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#6955DA",
                    }}
                  >
                    {singleUser?.role?.name
                      ? singleUser?.role?.name
                      : singleUser?.role}
                  </p>
                </div>
              </div>
            </div>
            <Flex xsDirection='column' align="start" gap="20px" paddingTop="20px">
              <Flex
                direction="column"
                width="30%"
                xsWidth="100%"
                position="relative"
                gap="0.65rem"
              >
                <p style={{ fontWeight: 500, fontSize: "14px" }}>Timezone</p>
                <FilterBox margin="0px" onClick={toggleExpand}>
                  <P color="#012635" fontSize="14px" fontweight="500">
                    {formik.values.timeZone}
                  </P>
                  {isOpen ? (
                    <TiArrowSortedUp size={20} />
                  ) : (
                    <TiArrowSortedDown size={20} />
                  )}
                </FilterBox>
                <ExpandableDiv isOpen={isOpen}>
                  <Flex
                    align="center"
                    justify="space-between"
                    padding="10px"
                    cursor="pointer"
                    wrap="wrap"
                    onClick={() => {
                      formik.setFieldValue("timeZone", "US/Pacific");
                      toggleExpand();
                    }}
                  >
                    <Option style={{ fontSize: "14px", color: "#012635" }}>US/Pacific</Option>
                    {formik.values.timeZone === "US/Pacific" && (
                      <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                    )}
                  </Flex>
                  <Flex
                    align="center"
                    justify="space-between"
                    padding="10px"
                    cursor="pointer"
                    wrap="wrap"
                    onClick={() => {
                      formik.setFieldValue("timeZone", "US/Eastern");
                      toggleExpand();
                    }}
                  >
                    <Option style={{ fontSize: "14px", color: "#012635" }}>US/Eastern</Option>
                    {formik.values.timeZone === "US/Eastern" && (
                      <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                    )}
                  </Flex>
                  <Flex
                    align="center"
                    justify="space-between"
                    padding="10px"
                    cursor="pointer"
                    wrap="wrap"
                    onClick={() => {
                      formik.setFieldValue("timeZone", "US/Central");
                      toggleExpand();
                    }}
                  >
                    <Option style={{ fontSize: "14px", color: "#012635" }}>US/Central</Option>
                    {formik.values.timeZone === "US/Central" && (
                      <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                    )}
                  </Flex>
                  <Flex
                    align="center"
                    justify="space-between"
                    padding="10px"
                    cursor="pointer"
                    wrap="wrap"
                    onClick={() => {
                      formik.setFieldValue("timeZone", "US/Mountain");
                      toggleExpand();
                    }}
                  >
                    <Option style={{ fontSize: "14px", color: "#012635" }}>US/Mountain</Option>
                    {selectedOption === "US/Mountain" && (
                      <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                    )}
                  </Flex>
                </ExpandableDiv>
              </Flex>
              <Flex direction="column" xsWidth="100%">
                <p style={{ fontWeight: 500, fontSize: "14px" }}>
                  Alias/Rep Name
                </p>
                <Components.Common.MyInput
                  type="text"
                  name="aliasName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.aliasName}
                  error={
                    formik.touched.aliasName && formik.errors.aliasName
                      ? formik.errors.aliasName
                      : ""
                  }
                />
              </Flex>
              <Flex direction="column" xsWidth="100%">
                <p style={{ fontWeight: 500, fontSize: "14px" }}>
                  Company Name
                </p>
                <Components.Common.MyInput
                  type="text"
                  name="companyName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.companyName}
                  error={
                    formik.touched.companyName && formik.errors.companyName
                      ? formik.errors.companyName
                      : ""
                  }
                />
              </Flex>
            </Flex>

          </div>
          {
            !checkDirty &&
            <Flex
              justify="end"
              align="start"
              gap="20px"
              style={{ borderTop: "1px solid #F0F0F0", padding: "20px" }}
            >

              <button
                type="button"
                onClick={undoAction}
                style={{
                  padding: "0.8rem 1.3rem",
                  color: "black",
                  fontWeight: 600,
                  borderRadius: "0.8rem",
                }}
              >
                <p style={{ fontWeight: 500, fontSize: "16px" }}>undo</p>
              </button>
              <button
                onClick={() => {
                  formik.handleSubmit()
                  setDataType("second")
                }}
                style={{
                  background: "#00BD82",
                  padding: "0.8rem 1.9rem",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "0.8rem",
                }}
              >
                <p style={{ fontWeight: 500, fontSize: "16px" }}>Save Changes</p>
              </button>
            </Flex>
          }

        </Card2>
        <Card style={{ padding: "20px" }}>
          <p style={{ fontWeight: 600, fontSize: "24px" }}>
            Account Credentials
          </p>
          <Flex xsDirection="column" direction="column" xsAlign="start" align="start" xsGap="10px" gap="20px" paddingTop="20px">
            <Flex direction="row" align="end" xsWidth="100%" width="100%" gap="10px" >
              <Flex direction="column" xsWidth="100%" width="30%" >
                <p style={{ fontWeight: 500, fontSize: "14px" }}>Email</p>
                <Components.Common.MyInput
                  type="email"
                  name="email"
                  placeholder=""
                  value={formikPassword.values.email}
                  onBlur={formikPassword.handleBlur}
                  onChange={(e) => {
                    formikPassword.handleChange(e);
                  }}
                  error={formikPassword.errors.email}
                // disabled
                />
              </Flex>


              {
                formikPassword?.values?.email != singleUser?.email && (
                  <Flex direction="column" xsWidth="100%" width="10%" style={{ paddingBottom: formikPassword.errors.email ? "24px" : "0px" }} >

                    <button
                      // disabled={formikPassword?.errors?.password || !formikPassword?.values?.password}
                      onClick={() => {
                        formikPassword.handleSubmit()
                        setCredentialsType("email");
                      }}
                      type="button"
                      style={{
                        // padding: "0.8rem 1.9rem",
                        color: "#00BD82",
                        fontWeight: 500,
                        borderRadius: "0.8rem",
                        border: "1px solid #00BD82",
                        height: "48px",
                        width: "168px"
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: "16px",
                          userSelect: "none",

                        }}
                      >
                        Change Email
                      </p>
                    </button>
                  </Flex>
                )
              }

            </Flex>

            <Flex direction="row" align="end" xsWidth="100%" width="100%" gap="10px">
              <Flex direction="column" xsWidth="100%" width="30%" >
                <p style={{ fontWeight: 500, fontSize: "14px" }}>Password</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Components.Common.MyInput
                    type={showPassword ? "text" : "password"}
                    disabled={true}
                    name="password"
                    placeholder="**********"
                    password={true}
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    value={formikPassword.values.password}
                    error={
                      formikPassword.touched.password && formikPassword.errors.password
                        ? formikPassword.errors.password
                        : ""
                    }
                  // disabled
                  />
                </div>
              </Flex>

              <Flex direction="column" xsWidth="100%" width="10%" >

                <button
                  // disabled={formikPassword?.errors?.password || !formikPassword?.values?.password}
                  onClick={() => {
                    formikPassword.handleSubmit()
                    setCredentialsType("password");
                  }}
                  type="button"
                  style={{
                    // padding: "0.8rem 1.9rem",
                    color: "#00BD82",
                    fontWeight: 500,
                    borderRadius: "0.8rem",
                    border: "1px solid #00BD82",
                    height: "48px",
                    width: "168px"
                  }}
                >
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      userSelect: "none",

                    }}
                  >
                    Change Password
                  </p>
                </button>
              </Flex>


            </Flex>

          </Flex>
        </Card>

        <Flex paddingY="1rem"></Flex>
      </Flex>

      <Components.Common.ModalTop open={isCreateNewCategoryModalOpen}>
        <CreateNewCategoryModal
          onClose={() => {
            setIsCreateNewCategoryModalOpen(false);
          }}
          email={formikPassword.values.email}
        />
      </Components.Common.ModalTop>
    </EditContainer>
  );
};

export default TenatProfile;

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
            fontSize: "14px",
            marginTop: "0",
          }}
        >
          Password change request sent!
        </p>
      </div>
    </CreateNewCategoryModalStyled>
  );
};
