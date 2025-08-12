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
  GetAllTenets,
  GetSingleTenets,
  UpdateSingleTenet,
  ResetTenetPaymentEmail,
} from "@/store/actions/tenets.action";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearMessages,
  clearErrors,
  GetAllSubscription,
  ForgotPassword,
} from "@/store/actions";
import { useGlobalContext } from "@/hooks";
import { CreateUserButton } from "../styles";
import styles from "./EditUser.module.css";
import { getInitials } from "@/utils/helpers";
import { forgetPasswordSchema } from "@/schema";
import LoginLink from "../../../assets/images/LoginLink.png";
import { FormInputStyle } from "@/modules/Settings/MarketLists/styles";
import PhoneInput from "react-phone-input-2";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  status: Yup.string().required("TimeZone is required"),
  companyName: Yup.string().required("Company name is required"),
  subscriptionId: Yup.string().required("Subscription is required"),
});

const validationSchemaWithoutCompany = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  status: Yup.string().required("TimeZone is required"),
  companyName: Yup.string().optional(),
  subscriptionId: Yup.string().required("Subscription is required"),
});

const MainPackeges = [
  "67445d36f4d8d6cff7dbde60",
  "67445e5cf4d8d6cff7dbde85",
  "6744614ba4d142ed16ea9c97",
  "6744617ea4d142ed16ea9c9e",
  "67a46abcc15fce67f83fb05f",

]
export const EditUser = ({ tenantData }) => {
  const [isCreateNewCategoryModalOpen, setIsCreateNewCategoryModalOpen] =
    useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [intialStatus, setIntialStatus] = useState("");
  const { Id } = useParams();
  useEffect(() => {
    dispatch(GetSingleTenets(Id));
  }, []);
  const { SingleTenets } = useSelector((state) => state.tenetsReducer);

  const { setIsLoaderShowing } = useGlobalContext();

  const {
    tenets,
    errors: error2,
    loading: loading2,
    message: message2,
  } = useSelector((state) => state.tenetsReducer);

  const dispatch = useDispatch();
  const {
    message,
    errors: error,
    loading,
  } = useSelector((state) => state.tenetsReducer);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [preSlct, setPreSlct] = useState();
  const [profilePic, setProfilePic] = useState(photo);
  const [userEmail, setUserEmail] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [credentialsType, setCredentialsType] = useState("email");
  const [dataType, setDataType] = useState("first");



  useEffect(() => {
    if (SingleTenets && SingleTenets.subscriptionId) {
      setPreSlct(SingleTenets.requestedSubscriptionId);
      setUserEmail(SingleTenets?.email);
    }
  }, [SingleTenets]);

  useEffect(() => {
    dispatch(GetAllSubscription());
  }, [dispatch]);

  const {
    results,
    errors: error1,
    message: message3,
  } = useSelector((state) => state.billingReducer);

  useEffect(() => {
    const tenant = tenets?.find((tenet) => tenet._id === Id);
    if (tenant) {
      setSelectedTenant(tenant);
    }
  }, [tenets, Id]);

  const toggleExpand = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsLoaderShowing(loading);
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => {
        if (changePassword) {
          setChangePassword(false);
          formikPassword.handleSubmit();
        } else {
          // navigate(-1);
          dispatch(GetSingleTenets(Id));
        }
      }, 1000);
    }
  }, [error, dispatch, message, loading]);

  const handleSubsClick = (option) => {
    if (formik.values?.paymentStatus === "pending") {
      formik.setValues({
        ...formik.values,
        subscriptionId: option,
      });
      setIsEmailSend(true);
      // return alert("payment status is active");
    } else if (
      option == "67445d36f4d8d6cff7dbde60" ||
      option == "67445e5cf4d8d6cff7dbde85" ||
      option == "6744614ba4d142ed16ea9c97" ||
      option == "6744617ea4d142ed16ea9c9e"
    ) {
      toast.error("Sorry Can't add this subscription in request");
    } else {
      formik.setValues({
        ...formik.values,
        subscriptionId: option,
      });
    }
  };

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
  console.log("SingleTenets", SingleTenets);

  useEffect(() => {
    if (SingleTenets) {
      setIntialStatus(SingleTenets?.status);
      formik.setValues({
        ...formik.values,
        firstName: SingleTenets?.firstName || "",
        lastName: SingleTenets?.lastName || "",
        companyName: SingleTenets?.companyName || "",
        paymentStatus: SingleTenets?.isPaymentReceived
          ? "Up-to-date"
          : "pending",
        status: SingleTenets?.status || "",
        subscriptionId: SingleTenets?.subscriptionId?._id || "",
      });
      setProfilePic(SingleTenets?.avatar);
      formikPassword.setValues({
        email: SingleTenets?.email || "",
      });
    }
  }, [SingleTenets]);

  const handleOptionClick = (option) => {
    formik.setValues({
      ...formik.values,
      status: option,
    });
    setIsOpen(false);
  };

  const [isLoading, setLoader] = useState("");
  const deleteLogoHandler = async () => {
    setProfilePic("");
    setImage("");
  };
  const undoAction = async () => {
    if (SingleTenets) {
      formik.setValues({
        firstName: formik.values?.firstName,
        lastName: formik.values?.lastName,
        companyName: SingleTenets?.companyName || "",
        paymentStatus: formik.values?.paymentStatus || "",
        status: SingleTenets?.status || "",
        subscriptionId: formik.values?.subscriptionId || "",
      });
      setProfilePic(SingleTenets?.avatar);
    }
  };



  const undoAction1 = async () => {
    if (SingleTenets) {
      formik.setValues({
        firstName: SingleTenets?.firstName || "",
        lastName: SingleTenets?.lastName || "",
        companyName: formik.values?.companyName || "",
        paymentStatus: formik.values?.paymentStatus || "",
        status: formik.values?.status || "",
        subscriptionId: formik.values?.subscriptionId || "",
      });
      setProfilePic(SingleTenets?.avatar);
    }
  };

  const undoAction2 = async () => {
    if (SingleTenets) {
      formik.setValues({
        firstName: formik.values?.firstName || "",
        lastName: formik.values?.lastName || "",
        companyName: formik.values?.companyName || "",
        paymentStatus: SingleTenets?.paymentStatus || "",
        status: formik.values?.status || "",
        subscriptionId: SingleTenets?.subscriptionId?._id || "",
      });
      setProfilePic(SingleTenets?.avatar);
    }
  };

  const PaawodResetReducer = useSelector((state) => state.authReducer);

  // const formikPassword = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: forgetPasswordSchema,
  //   onSubmit: (values) => {
  //     const { email, password } =
  //       values;
  //     let finalResult = new FormData();
  //     if (email) {
  //       finalResult.append("email", email);
  //     }
  //     if (password) {
  //       finalResult.append("password", password);
  //     }
  //     dispatch(UpdateSingleTenet(finalResult, Id));
  //   },
  // });

  const formikPassword = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userEmail,
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      values["url"] = import.meta.env.VITE_APP_FRONTEND_BASE_URL_FOR_CHANGE;
      dispatch(ForgotPassword(values));
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      status: "",
      paymentStatus: "",
      subscriptionId: "",
    },
    validationSchema:
      isEmailSend || SingleTenets?.isPaymentReceived === false
        ? validationSchemaWithoutCompany
        : validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { lastName, firstName, companyName, subscriptionId, status } =
        values;

      if (isEmailSend) {
        const result = {
          firstName: firstName,
          lastName: lastName,
          email: userEmail,
          subscriptionId: subscriptionId,
          url:
            import.meta.env.VITE_APP_PAYMENT_PAGE ||
            "https://dev3.zeitblast.com/#/signup/",
        };
        dispatch(ResetTenetPaymentEmail(result));
      }
      let finalResult = new FormData();

      if (firstName && dataType === "first") {
        finalResult.append("firstName", firstName);
      }
      if (lastName && dataType === "first") {
        finalResult.append("lastName", lastName);
      }
      if (image !== false && dataType === "first") {
        finalResult.append("avatar", image);
      }
      if (status != intialStatus && dataType === "second") {
        finalResult.append("status", status);
      }
      if (companyName && dataType === "second") {
        finalResult.append("companyName", companyName);
      }
      if (
        subscriptionId != "67445d36f4d8d6cff7dbde60" &&
        subscriptionId != "67445e5cf4d8d6cff7dbde85" &&
        subscriptionId != "6744614ba4d142ed16ea9c97" &&
        subscriptionId != "6744617ea4d142ed16ea9c9e"
      ) {
        finalResult.append("subscriptionId", subscriptionId);
      }
      dispatch(UpdateSingleTenet(finalResult, Id));
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
  const checkDirtyFirst = SingleTenets?.firstName == formik.values.firstName && SingleTenets?.lastName == formik.values.lastName && SingleTenets?.avatar == profilePic ? true : false
  const checkDirty2 = SingleTenets?.subscriptionId?._id == formik.values.subscriptionId && SingleTenets?.paymentStatus == formik.values.SingleTenets?.paymentStatus ? true : false
  const checkDirty3 = SingleTenets?.companyName == formik.values.companyName && SingleTenets?.status == formik.values.status ? true : false

  return (
    <EditContainer>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="20px">
          <Card>
            <div style={{ padding: "20px" }}>
              <Flex align="center" justify="space-between">
                <P color="#2E2E2E" fontSize="20px" fontweight="700">
                  Personal Information
                </P>
              </Flex>
              <Flex align="center" gap="40px" paddingTop="20px">
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
                <Flex display="grid" lgDisplay="grid" gridCols="1fr 1fr" direction="column" width="65%" gap="10px">
                  <Flex direction="column">
                    <P color="#2E2E2E" fontSize="14px" fontweight="500">
                      First Name
                    </P>
                    <Components.Common.MyInput
                      type="text"
                      name="firstName"
                      placeholder=""
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
                    <P color="#2E2E2E" fontSize="14px" fontweight="500">
                      Last Name
                    </P>
                    <Components.Common.MyInput
                      type="text"
                      name="lastName"
                      placeholder=""
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

                  <Flex direction="column">
                    <P color="#2E2E2E" fontSize="14px" fontweight="500" style={{ marginBottom: "0.65rem" }}>
                      Phone Number
                    </P>
                    {/* <Components.Common.MyInput
                      type="text"
                      name="lastName"
                      placeholder=""
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={SingleTenets?.phoneNumber}
                      error={
                        formik.touched.lastName && formik.errors.lastName
                          ? formik.errors.lastName
                          : ""
                      }
                    /> */}
                    <PhoneInput
                      country={'us'}
                      placeholder="Enter Mobile Number"
                      enableSearch={true}
                      value={`${SingleTenets?.phoneNumber}`}
                      inputStyle={{ fontFamily: 'fellix', color: '#777777', border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", }}
                      maxLength={14}
                      disabled={true}
                      disableDropdown={true}
                    />
                  </Flex>
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
                    onClick={undoAction1}
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
                    type="button"
                    onClick={() => formik.handleSubmit()}
                    style={{
                      background: "#00BD82",
                      padding: "0.8rem 1.9rem",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "0.8rem",
                    }}
                  >
                    <p style={{ fontWeight: 500, fontSize: "16px" }}>
                      Save Changes
                    </p>
                  </button>
                </Flex>
              )}

          </Card>

          <Card>
            <div style={{ padding: "20px" }}>
              <P color="#2E2E2E" fontSize="20px" fontweight="700">
                Subscription
              </P>

              <Flex paddingTop="20px" gap="20px" wrap="wrap">
                {results.map((sub) => (
                  <SubscriptionBox
                    key={sub._id}
                    select={formik.values.subscriptionId === sub?._id}
                    preSelect={preSlct === sub?._id}
                    onClick={() => handleSubsClick(sub._id)}
                    style={{
                      backgroundColor:
                        formik.values.subscriptionId === sub?._id
                          ? "#FFC000" // Dark green for formik.values.subscriptionId
                          : MainPackeges.includes(sub._id)
                            ? "#006400"
                            : preSlct === sub?._id
                              ? "#90EE90" // Light green for preSlct
                              : "white", // Default background color
                      border:
                        formik.values.subscriptionId === sub?._id ||
                          preSlct === sub?._id
                          ? "2px solid #FFC000" // Green border for any match
                          : MainPackeges.includes(sub._id)
                            ? "1px solid #006400" // Green border for MainPackeges
                            : "1px solid #E0E0E0", // Default border
                      cursor: "pointer",
                      color:
                        formik.values.subscriptionId === sub?._id ||
                          preSlct === sub?._id || MainPackeges.includes(sub._id)
                          ? "white"
                          : "black", // Text color adjustment
                    }}
                  >
                    <Flex justify="space-between" align="center">
                      <PackageBox
                        select={formik.values.subscriptionId === sub._id || MainPackeges.includes(sub._id)}
                      >
                        Package
                      </PackageBox>
                      {formik.values.subscriptionId === sub._id ? (
                        <IoMdCheckmarkCircle color="white" size={20} />
                      ) : preSlct === sub?._id ? (
                        <GoCircle color="#006400" size={20} /> // Green circle for preSlct
                      ) : (
                        <GoCircle color={MainPackeges.includes(sub._id) ? "white" : "#00000033"} size={20} /> // Default
                      )}
                    </Flex>
                    <P fontSize="14px" fontweight="600">
                      {sub.title}
                    </P>
                  </SubscriptionBox>
                ))}
              </Flex>
            </div>
            {
              !checkDirty2 && (
                <Flex
                  justify="end"
                  align="start"
                  gap="20px"
                  style={{ borderTop: "1px solid #F0F0F0", padding: "20px" }}
                >
                  <button
                    type="button"
                    onClick={undoAction2}
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
                    type="button"
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
                    <p style={{ fontWeight: 500, fontSize: "16px" }}>
                      Save Changes
                    </p>
                  </button>
                </Flex>
              )
            }



          </Card>

          <Card2>
            <div style={{ padding: "20px" }}>
              <P color="#2E2E2E" fontSize="20px" fontweight="700">
                Profile Setting
              </P>
              <Flex align="start" gap="10px" paddingTop="20px">
                <Flex direction="column" width="35%" gap="10px">
                  <Flex direction="column">
                    <P color="#2E2E2E" fontSize="14px" fontweight="500">
                      Company Name
                    </P>
                    <Components.Common.MyInput
                      type="text"
                      name="companyName"
                      placeholder=""
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

                <Flex
                  direction="column"
                  width="30%"
                  position="relative"
                  gap="0.65rem"
                >
                  <P color="#2E2E2E" fontSize="14px" fontweight="500">
                    Status
                  </P>
                  <FilterBox margin="0px" onClick={toggleExpand}>
                    <P color="#012635" fontSize="14px" fontweight="500">
                      {formik.values.status}
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
                      onClick={() => handleOptionClick("Active")}
                    >
                      <Option style={{ fontSize: "14px", color: "#012635" }}>Active</Option>
                      {formik.values.status === "Active" && (
                        <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                      )}
                    </Flex>
                    <Flex
                      align="center"
                      justify="space-between"
                      padding="10px"
                      cursor="pointer"
                      onClick={() => handleOptionClick("Suspended")}
                    >
                      <Option style={{ fontSize: "14px", color: "#012635" }}>Suspended</Option>
                      {formik.values.status === "Suspended" && (
                        <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                      )}
                    </Flex>
                    <Flex
                      align="center"
                      justify="space-between"
                      padding="10px"
                      cursor="pointer"
                      onClick={() => handleOptionClick("On-Hold")}
                    >
                      <Option style={{ fontSize: "14px", color: "#012635" }}>On-Hold</Option>
                      {formik.values.status === "On-Hold" && (
                        <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                      )}
                    </Flex>
                  </ExpandableDiv>
                </Flex>
              </Flex>
            </div>
            {
              !checkDirty3 && (
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
                    type="button"
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
                    <p style={{ fontWeight: 500, fontSize: "16px" }}>
                      Save Changes
                    </p>
                  </button>
                </Flex>
              )
            }

          </Card2>

          <Card style={{ padding: "20px" }}>

            <p style={{ fontWeight: 600, fontSize: "1.7rem" }}>
              Account Credentials
            </p>
            <Flex align="start" direction="column" gap="20px" paddingTop="20px">

              <Flex direction="row" align="end" xsWidth="100%" width="100%" gap="10px">

                <Flex direction="column" style={{ height: "80px", justifyContent: "end" }} width="30%">
                  <p style={{ fontWeight: 500, fontSize: "14px" }}>Email</p>
                  <Components.Common.MyInput
                    type="email"
                    name="email"
                    placeholder=""
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    // value={userEmail}
                    value={formikPassword.values.email}
                    error={formikPassword.errors.email}
                  // disabled
                  />
                </Flex>

                {
                  formikPassword.values.email != SingleTenets?.email && (
                    <Flex direction="column" xsWidth="100%" width="10%" >

                      <button
                        disabled={formikPassword?.errors?.password || !formikPassword?.values?.password}
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

                <Flex direction="column" style={{ height: "80px", justifyContent: "end" }} width="30%">
                  <p style={{ fontWeight: 500, fontSize: "14px" }}>Password</p>
                  <Components.Common.MyInput
                    type="password"
                    name="password"
                    placeholder="********"
                    disable={true}
                  />
                </Flex>

                <Flex direction="column" width="10%">
                  <Flex direction="column" xsWidth="100%" width="10%" style={{ height: "80px", justifyContent: "end" }}>
                    <button
                      onClick={() => {
                        if (formikPassword.values.email == userEmail) {
                          formikPassword.handleSubmit();
                        } else {
                          setChangePassword(true);
                          formikPassword.handleSubmit();
                        }
                      }}
                      type="button"
                      style={{
                        // padding: "0.8rem 1.9rem",
                        color: "#00BD82",
                        fontWeight: 500,
                        borderRadius: "0.8rem",
                        border: "1px solid #00BD82",
                        // marginBottom: "5px",
                        height: "48px",
                        width: "168px"
                      }}
                    >
                      <p style={{ fontWeight: 500, fontSize: "16px" }}>
                        Change Password
                      </p>
                    </button>
                  </Flex>

                </Flex>

              </Flex>

            </Flex>
          </Card>
          <Flex paddingY="1rem"></Flex>
        </Flex>
      </form>

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
