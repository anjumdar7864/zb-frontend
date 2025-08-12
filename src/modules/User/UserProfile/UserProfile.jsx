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
import { GetSingleUser, GetSingleUserProfile, UpdateLoginTanent, UpdateSingleUser } from "@/store/actions/auth.action";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearMessages,
  clearErrors,
  GetAllSubscription,
} from "@/store/actions";
import { useGlobalContext } from "@/hooks";
import { CreateUserButton } from "../styles";
import Select, { components } from 'react-select';
import { FaAngleDown } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import styles from "./UserProfile.module.css";
import { getInitials } from "@/utils/helpers";
import LoginLink from '../../../assets/images/LoginLink.png'
import {
  ForgotPassword,
} from "../../../store/actions";
import { forgetPasswordSchema } from "@/schema";



const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  timeZone: Yup.string().required('timeZone is required'),
});

const TenatProfile = ({ tenantData }) => {
  const [isCreateNewCategoryModalOpen, setIsCreateNewCategoryModalOpen] = useState(false);
  const { Id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(GetSingleUser(Id, "user"))
    // dispatch(GetSingleUserProfile(Id, "user"))

  }, []);


  const { singleUser, message, loading, errors: error, } = useSelector((state) => state.authReducer);
  const { setIsLoaderShowing } = useGlobalContext();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Status");
  const [selectedSub, setSelectedSub] = useState(null);
  const [profilePic, setProfilePic] = useState(photo);
  const [userEmail, setUserEmail] = useState();
  const [userPasword, setUserPasword] = useState();
  const [passwordType, setPasswordType] = useState("email");
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
      dispatch(GetSingleUser(Id, "user"))
      // dispatch(GetSingleUserProfile(Id, "user"))
      setTimeout(() => {
        // navigate(-1);
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


  // const formik = useFormik({
  //   initialValues: {
  //     firstName: SingleUser?.firstName,
  //     lastName: SingleUser?.lastName,
  //     companyName: SingleUser?.companyName,
  //     paymentStatus: SingleUser?.paymentStatus,
  //     email: SingleUser?.email,
  //     password: "",
  //   },

  useEffect(() => {
    setSelectedOption(singleUser?.status);
    if (singleUser) {
      formik.setValues({
        firstName: singleUser?.firstName || "",
        lastName: singleUser?.lastName || "",
        timeZone: singleUser?.timeZone || "",
      });
      formikPassword.setValues({
        email: singleUser?.email || "",
      });
      setProfilePic(singleUser?.avatar);
      setUserEmail(singleUser?.email)
      setImage(singleUser?.avatar)
    }
  }, [singleUser]);


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      timeZone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { lastName, firstName, timeZone } = values;
      let finalResult = new FormData();
      if (firstName) {
        finalResult.append("firstName", firstName);
      }
      if (lastName) {
        finalResult.append("lastName", lastName);
      }
      if (timeZone) {
        finalResult.append("timeZone", timeZone);
      }
      if (image !== false) {
        finalResult.append("avatar", image);
      }
      dispatch(UpdateSingleUser(finalResult, Id, "user"));
    },
  });


  const PaawodResetReducer = useSelector((state) => state.authReducer);
  const formikPassword = useFormik({
    initialValues: {
      email: userEmail,
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      let finalResult = new FormData();
      console.log("values", values.email, passwordType, values.email && passwordType == "email");
      if (values.email && passwordType == "email") {
        finalResult.append("email", values.email);
        dispatch(UpdateSingleUser(finalResult, Id, "user"));

      }
      if (passwordType == "password") {
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
      if (PaawodResetReducer?.message == "kindly check your mail inbox for resetPassword") {
        setIsCreateNewCategoryModalOpen(true)
      }
      dispatch(clearMessages());
    }
  }, [PaawodResetReducer?.error, PaawodResetReducer?.message]);

  const timezonesOption =
    timezones?.map((timezone, index) => ({
      value: index,
      label: timezone,
    }))
    ;
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaAngleDown style={{ color: '#777777' }} />
      </components.DropdownIndicator>
    );
  };
  const [isLoading, setLoader] = useState("");
  const deleteLogoHandler = async () => {
    setProfilePic("")
    setImage("")
  }

  // const undoAction = async () => {
  //   if (singleUser) {
  //     formik.setValues({
  //       firstName: singleUser?.firstName || "",
  //       lastName: singleUser?.lastName || "",
  //       timeZone: singleUser?.timeZone || "",
  //     });
  //     setProfilePic(singleUser?.avatar);
  //   }
  // }

  const undoAction = async () => {
    if (singleUser) {
      formik.setValues({
        firstName: formik.values?.firstName || "",
        lastName: formik.values?.lastName || "",
        timeZone: singleUser?.timeZone || "",
        // aliasName: singleUser?.aliasName || "",
        // companyName: singleUser?.companyName || "",
      });
      setProfilePic(singleUser?.avatar);
    }
  }


  const undoActionfirst = async () => {
    if (singleUser) {
      formik.setValues({
        firstName: singleUser?.firstName || "",
        lastName: singleUser?.lastName || "",
        timeZone: formik.values?.timeZone || "",
        // aliasName: formik.values?.aliasName || "",
        // companyName: formik.values?.companyName || "",
      });
      setProfilePic(singleUser?.avatar);
    }
  }

  const toggleExpand = () => {
    setIsOpen(!isOpen);
  };

  const checkDirty = singleUser?.timeZone == formik.values.timeZone ? true : false
  const checkDirtyFirst = singleUser?.firstName == formik.values.firstName && singleUser?.lastName == formik.values.lastName && image == singleUser?.avatar ? true : false
  // console.log(formik, checkDirty, 'riuhjk')

  return (
    <EditContainer>
      <Flex direction="column" gap="20px">
        <Card>
          <div style={{ padding: "20px" }}>
            <Flex align="center" justify="space-between">
              <p style={{ fontWeight: 600, fontSize: "1.7rem", }}>Personal Information</p>
            </Flex>
            <Flex align="center" gap="40px" paddingTop="20px">
              <div className={styles.CompanyInfo_upload}>
                <div className={styles.CompanyInfo_uploadTop}>
                  {
                    profilePic ?
                      <img className={styles.CompanyInfo_logoImg} width={"80px"} height={"80px"} src={profilePic} />
                      :
                      <span className={styles.name_intial}>
                        {getInitials(formik.values.firstName || "", true)}
                      </span>
                  }
                </div>
                <div className={styles.CompanyInfo_uploadBottom}>
                  {
                    profilePic ?
                      <div style={{ width: "100%", height: "100%" }}>
                        {
                          isLoading == "imgLoading" ?
                            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                              <CircularLoader />
                            </div>
                            :
                            <div style={{ width: "100%", height: "100%" }}>
                              <div className={styles.CompanyInfo_UploadedLayout} style={{ height: "100%" }}>
                                <div className={styles.CompanyInfo_UploadedLayoutChild} style={{ borderRight: "1px solid #E2E7E4" }}>
                                  <span onClick={() => deleteLogoHandler()} style={{ paddingTop: "0px" }} className={styles.CompanyInfo_button} >Delete picture</span>
                                </div>
                                <div className={styles.CompanyInfo_UploadedLayoutChild} >
                                  <label style={{ paddingTop: "8px" }} className={styles.CompanyInfo_button}>
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
                        }
                      </div>
                      :
                      <label className={styles.CompanyInfo_button}>
                        {isLoading == "imgLoading" ? <div style={{ display: "flex", justifyContent: "center" }}> <CircularLoader /></div> : "Upload Picture"}
                        <input
                          onChange={handlePictureUpload}
                          type="file"
                          name="profilePic"
                          style={{ visibility: " hidden" }}
                        />
                      </label>
                  }
                </div>
              </div>
              <Flex direction="column" width="35%" gap="30px">
                <Flex direction="column">
                  <p style={{ fontWeight: 500, fontSize: "14px", }}>
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
                  <p style={{ fontWeight: 500, fontSize: "14px", }}>
                    Last Name
                  </p>
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
              </Flex>
            </Flex>

          </div>




          {
            !checkDirtyFirst && (
              <Flex justify="end" align="start" gap="20px" style={{ borderTop: "1px solid #F0F0F0", padding: "20px" }}>
                <button type="button" onClick={undoActionfirst} style={{
                  padding: '0.8rem 1.3rem',
                  color: 'black',
                  fontWeight: 600,
                  borderRadius: "0.8rem"
                }}>
                  <p style={{ fontWeight: 500, fontSize: "16px", }}>undo</p>
                </button>
                <button onClick={() => {
                  formik.handleSubmit()
                  setDataType("first")
                }} style={{
                  background: '#00BD82',
                  padding: '0.8rem 1.9rem',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: "0.8rem"
                }}>
                  <p style={{ fontWeight: 500, fontSize: "16px", }}>Save Changes</p>
                </button>
              </Flex>
            )
          }


        </Card>

        <Card2>
          <div style={{ padding: "20px" }}>
            <p style={{ fontWeight: 600, fontSize: "1.7rem", }}>Profile Setting</p>
            <div style={{ paddingTop: "2rem" }}>
              <p style={{ fontWeight: 500, fontSize: "14px", color: '#777777' }}>Current role(s):</p>
              <div style={{ paddingTop: "1rem", display: 'flex', alignItems: 'center' }}>
                <div style={{
                  paddingInline: "1rem",
                  paddingBlock: "0.3rem",
                  border: '1px solid #A69FEA',
                  background: '#E1DDF8',
                  borderRadius: "2rem",
                  width: 'fit-content'
                }}>
                  <p style={{ fontWeight: 500, fontSize: "14px", color: '#6955DA' }}>{singleUser?.role?.name ? singleUser?.role?.name : singleUser?.role}</p>
                </div>
              </div>
            </div>
            <Flex align="start" gap="20px" paddingTop="20px">
              <Flex direction="column" width="30%" position="relative" gap="5px">
                <p style={{ fontWeight: 500, fontSize: "14px" }}>
                  Timezone
                </p>
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
                      formik.setFieldValue("timeZone", "US/Pacific")
                      toggleExpand()
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
                      formik.setFieldValue("timeZone", "US/Eastern")
                      toggleExpand()
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
                      formik.setFieldValue("timeZone", "US/Central")
                      toggleExpand()
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
                      formik.setFieldValue("timeZone", "US/Mountain")
                      toggleExpand()
                    }}
                  >
                    <Option style={{ fontSize: "14px", color: "#012635" }}>US/Mountain</Option>
                    {selectedOption === "US/Mountain" && (
                      <IoCheckmarkCircleSharp color="#1E9B50" size={20} />
                    )}
                  </Flex>
                </ExpandableDiv>


              </Flex>
            </Flex>
          </div>
          {
            !checkDirty && (
              <Flex justify="end" align="start" gap="20px" style={{ borderTop: "1px solid #F0F0F0", padding: "20px" }}>
                <button type="button" onClick={undoAction} style={{
                  padding: '0.8rem 1.3rem',
                  color: 'black',
                  fontWeight: 600,
                  borderRadius: "0.8rem"
                }}>
                  <p style={{ fontWeight: 500, fontSize: "16px", }}>undo</p>
                </button>
                <button onClick={() => formik.handleSubmit()} style={{
                  background: '#00BD82',
                  padding: '0.8rem 1.9rem',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: "0.8rem"
                }}>
                  <p style={{ fontWeight: 500, fontSize: "16px", }}>Save Changes</p>
                </button>
              </Flex>
            )
          }

        </Card2 >
        <Card style={{ padding: "20px" }}>
          <p style={{ fontWeight: 600, fontSize: "1.7rem", }}>Account Credentials</p>
          <Flex direction="column" gap="20px" paddingTop="20px">

            <Flex gap="10px" align="end">
              <Flex direction="column" width="30%">
                <p style={{ fontWeight: 500, fontSize: "14px" }}>
                  Email
                </p>
                <Components.Common.MyInput
                  type="email"
                  name="email"
                  placeholder=""
                  value={formikPassword.values.email}
                  onBlur={formikPassword.handleBlur}
                  onChange={(e) => {


                    formikPassword.handleChange(e)
                  }}
                  error={formikPassword.errors.email}
                // disabled
                />
              </Flex>
              {
                formikPassword?.values?.email != singleUser?.email && (
                  <Flex direction="column" >
                    <button onClick={() => {
                      formikPassword.handleSubmit()
                      setPasswordType("email")
                    }} type="button" style={{
                      // padding: '0.8rem 1.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00BD82',
                      fontWeight: 600,
                      borderRadius: "0.8rem",
                      border: '1px solid #00BD82',
                      height: "48px", width: "168px"
                    }}>
                      <p style={{ fontWeight: 500, fontSize: "16px", }}>Change Email</p>
                    </button>
                  </Flex>
                )
              }

            </Flex>



            <Flex gap="10px" align="end">
              <Flex direction="column" width="30%">
                <p style={{ fontWeight: 500, fontSize: "14px" }}>
                  Password
                </p>
                <Components.Common.MyInput
                  type="password"
                  name="password"
                  placeholder="**********"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : ""
                  }
                  disabled
                />
              </Flex>

              <Flex direction="column" >
                <button onClick={() => {
                  formikPassword.handleSubmit()
                  setPasswordType("password")
                }} type="button" style={{
                  // padding: '0.8rem 1.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00BD82',
                  fontWeight: 600,
                  borderRadius: "0.8rem",
                  border: '1px solid #00BD82',
                  height: "48px", width: "168px"
                }}>
                  <p style={{ fontWeight: 500, fontSize: "16px", }}>Change Password</p>
                </button>
              </Flex>
            </Flex>


          </Flex>
        </Card>
        <Flex paddingY="1rem"></Flex>
      </Flex >

      <Components.Common.ModalTop
        open={isCreateNewCategoryModalOpen}
      >
        <CreateNewCategoryModal onClose={() => { setIsCreateNewCategoryModalOpen(false) }} />
      </Components.Common.ModalTop>
    </EditContainer >
  );
};

export default TenatProfile;



const CreateNewCategoryModal = ({ onClose }) => {
  return (
    <CreateNewCategoryModalStyled>
      <div className="top">
        <h2></h2>
        <button onClick={onClose} type="button" >
          <IoCloseOutline size="2.4rem" />
        </button>
      </div>
      <div className="middle">
        <img src={LoginLink} style={{ height: '28rem', width: '30rem' }} />
        <p>Please click on the link we sent to</p>
        <p style={{
          color: '#073F56',
          fontWeight: 400,
          fontSize: "1.1rem",
          marginTop: '0',
        }}>Password change request sent!</p>
      </div>
    </CreateNewCategoryModalStyled>
  );
};