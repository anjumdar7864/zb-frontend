import { FaArrowLeft, FaSave, FaInfoCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  AvatarContainer,
  CustomScroll,
  StyledInput,
  StyledSelect,
  UserEditStyled,
  UserNewStyled,
} from "./styles";
import { useEffect, useLayoutEffect, useState } from "react";
import Assets from "@/assets";
import Components from "@/components";
import { useFormik } from "formik";
import { userSchema } from "@/schema";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";
import {
  GetSingleUser,
  GetAllRole,
  clearErrors,
  clearMessages,
  UpdateSingleUser,
} from "./../../../store/actions";
import { useGlobalContext } from "@/hooks";
import { MyCheckbox } from "@/components/common";
import moment from "moment-timezone";
import { Flex, H1 } from "@/styles/CommonStyles";
import { IoMdClose } from "react-icons/io";
import { FiInfo } from "react-icons/fi";

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

const UserEdit = ({ userId, onClose, setSelectedDeleteId }) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const { setIsLoaderShowing } = useGlobalContext();
  // const allTimezones = moment.tz.names();
  // const timezones = allTimezones.filter((timezone) => {
  //   const zone = timezone
  //   return zone  && zone.includes('US');
  // });
  const timezones = ["US/Pacific", "US/Eastern", "US/Central", "US/Mountain"];
  const onSuccess = () => {
    // console.log('handle onSuccess');
    onClose()
  }
  const {
    message,
    singleUser,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { roles, loading: roleLoading } = useSelector(
    (state) => state.roleReducer
  );

  const formik = useFormik({
    initialValues: {
      avatar: null,
      firstName: singleUser?.firstName && singleUser.firstName,
      lastName: singleUser?.lastName && singleUser.lastName,
      email: singleUser?.email && singleUser.email,
      role: singleUser?.role && singleUser.role?._id,
      aliasRepName: singleUser?.aliasName && singleUser.aliasName,
      companyName: singleUser?.companyName && singleUser.companyName,
      phoneNumber: singleUser?.phoneNumber && singleUser.phoneNumber,
      timeZone: singleUser?.timeZone && singleUser?.timeZone,
      active: singleUser?.active ?? true,
      password: "",
    },
    enableReinitialize: true,
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      let finalResult = new FormData();
      if (values.avatar) finalResult.append("avatar", values.avatar);
      finalResult.append("firstName", values.firstName);
      finalResult.append("lastName", values.lastName);
      finalResult.append("role", values.role);
      finalResult.append("aliasName", values.aliasRepName);
      finalResult.append("companyName", values.companyName);
      finalResult.append("email", values.email);
      finalResult.append("phoneNumber", values.phoneNumber);
      finalResult.append("active", values.active);
      finalResult.append("timeZone", values.timeZone);
      if (values?.password) {
        finalResult.append("password", values?.password);
      }
      dispatch(UpdateSingleUser(finalResult, userId, "", onSuccess));
    },
  });

  const handleImageChange = (e) => {
    const img = e.target.files[0];

    if (!["image/jpg", "image/png", "image/jpeg"].includes(img.type)) {
      toast.error("Allowed file types: png, jpg, jpeg.");
      return;
    }

    formik.setFieldValue("avatar", img);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(img);
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 10);

    let formattedNumber = "";
    for (let i = 0; i < formattedValue.length; i++) {
      if (i === 0) formattedNumber += "(";
      else if (i === 3) formattedNumber += ") ";
      else if (i === 6) formattedNumber += "-";
      formattedNumber += formattedValue[i];
    }

    formik.setFieldValue("phoneNumber", formattedNumber);
  };

  // useEffect(() => {
  //   if (!singleUser?.avatar) return;
  //   setAvatar(singleUser?.avatar);
  // }, [singleUser]);

  useEffect(() => {
    if (!userId) {
      onClose();
    }
    // if (error.length > 0) {
    //   toast.error(error);
    //   dispatch(clearErrors());
    // }
    // if (message !== "") {
    //   toast.success(message);
    //   dispatch(clearMessages());
    //   setTimeout(() => onClose(), 1000);
    // }
  }, []);

  useEffect(() => {
    dispatch(GetSingleUser(userId));
    dispatch(GetAllRole());
  }, []);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading || roleLoading);
  }, [loading, setIsLoaderShowing, roleLoading]);


  // console.log(formik.values, 'avalasldp')
  return (
    <UserNewStyled ChevronDown={Assets.Images.ChevronDown}>
      {/* <Flex direction="row" justify="space-between" align="center" bg="#f5f5f5">
        <H1 fontSize="1.5rem">Edit User</H1>
        <div onClick={() => onClose()} style={{ fontSize: "2rem" }}>
          <IoMdClose />
        </div>
      </Flex> */}
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #F7F7F7",
          padding: "16px"
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: 600, color: "#012635", lineHeight: "26px", }}>
          Edit User
        </div>
        <div onClick={() => onClose()} style={{ fontSize: "2rem" }}>
          <IoMdClose />
        </div>
      </Flex>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <CustomScroll style={{ maxHeight: "512px", overflow: "auto", padding: "0px 24px" }}>
          <div
            css={AvatarContainer}
            className="avatar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "10px 0px",
              marginBottom: "10px"

            }}
          >
            {avatar ?
              <img
                src={avatar ?? Assets.Images.profileA}
                alt="AVATAR"
                style={{ height: "80px", width: "90px", borderRadius: "8px" }}
              />
              :
              <>
                {
                  singleUser?.avatar ?
                    <img
                      src={singleUser?.avatar ?? Assets.Images.profileA}
                      alt="AVATAR"
                      style={{ height: "80px", width: "90px", borderRadius: "8px" }}
                    />
                    :
                    <div style={{ width: "80px", height: "80px", border: "solid 2px #F49C17", borderRadius: "12px", backgroundColor: "#FFF2CC", color: "#F49C17", fontSize: "30px", fontWeight: 600, lineHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {formik?.values?.firstName?.[0] ?? "N/A"}
                    </div>
                }
              </>
            }

            <div
              className="bottom"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <label
                className="top"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept=".png, .jpg, .jpeg"
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#012635",
                    color: "white",
                    border: "none",
                    // fontFamily: "'Inter', sans-serif" ,
                    fontSize: "16px",
                    cursor: "pointer",
                    // padding: "1rem 1.4rem",
                    borderRadius: "12px",
                    width: "137px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px"
                  }}
                >
                  Upload Avatar
                </button>
              </label>
              <p style={{ marginTop: "0.5rem", marginRight: "2px", color: "#777777", fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}>
                Allowed file types: png, jpg, jpeg.
              </p>
            </div>
          </div>


          <Flex
            // direction="column"
            // mdDirection="row"
            // gap="1rem"
            // justify="space-between"
            direction="column"
            mdDirection="row"
            gap="1.8rem"
            justify="space-between"
            style={{ marginBottom: "15px" }}
          >
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  First Name <span style={{ color: "red" }}>*</span>
                </div>
              </div>
              <div className="bottom">
                <StyledInput
                  type="text"
                  placeholder="Enter name"
                  value={formik.values.firstName}
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p>{formik.errors.firstName}</p>
                )}
              </div>
            </label>
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Last Name <span style={{ color: "red" }}>*</span>
                </div>
              </div>
              <div className="bottom">
                <StyledInput
                  type="text"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p>{formik.errors.lastName}</p>
                )}
              </div>
            </label>
          </Flex>
          <Flex
            // direction="column"
            // mdDirection="row"
            // gap="1rem"
            // justify="space-between"
            direction="column"
            mdDirection="row"
            gap="1.8rem"
            justify="space-between"
            style={{ marginBottom: "15px" }}
          >
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Email <span style={{ color: "red" }}>*</span>
                </div>
              </div>
              <div className="bottom">
                <StyledInput
                  type="email"
                  placeholder="example@domain.com"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.email && formik.errors.email && (
                  <p>{formik.errors.email}</p>
                )}
              </div>
            </label>
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Alias/Rep Name <span style={{ color: "red" }}>*</span>
                  <LightTooltip
                    arrow
                    placement="right"
                    title={
                      <>
                        <p>
                          Note: You don't have to enter an Alias Name. Use you
                          real name. First name anyway.
                        </p>
                        <p>
                          It's anonymous, but when the time comes to sign the
                          contract, honest too.
                        </p>
                      </>
                    }
                  >
                    <span className="icon">
                      <FiInfo style={{ fontSize: "large", marginLeft: "14px" }} />
                    </span>
                  </LightTooltip>
                </div>
              </div>
              <div className="bottom">
                <StyledInput
                  type="text"
                  placeholder="Alias/Rep Name"
                  value={formik.values.aliasRepName}
                  name="aliasRepName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.aliasRepName && formik.errors.aliasRepName && (
                  <p>{formik.errors.aliasRepName}</p>
                )}
              </div>
            </label>
          </Flex>
          <Flex direction="column"
            mdDirection="row"
            gap="1.8rem"
            justify="space-between"
            style={{ marginBottom: "15px" }}>
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Company Name <span style={{ color: "red" }}>*</span>
                  <LightTooltip
                    arrow
                    placement="right"
                    title={
                      <>
                        <p>
                          Note: Don't use your actual company name. Use an
                          acronym. The real name lacks anonymity, probably has
                          negative keywords (cash, buyer) and definitely adds
                          unneeded characters.{" "}
                        </p>
                        <p>
                          Example: you can use 'BCH LLC' instead of 'Bay Capital
                          Holdings'
                        </p>
                      </>
                    }
                  >
                    <span className="icon">
                      <FiInfo style={{ fontSize: "large", marginLeft: "14px" }} />

                    </span>
                  </LightTooltip>
                </div>
              </div>
              <div className="bottom">
                <StyledInput
                  type="text"
                  placeholder="Company Name"
                  value={formik.values.companyName}
                  name="companyName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <p>{formik.errors.companyName}</p>
                )}
              </div>
            </label>
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </div>
              </div>
              <div className="bottom">
                <StyledInput
                  type="text"
                  placeholder="Phone Number"
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p style={{ textWrap: 'wrap', maxWidth: '240px' }}>{formik.errors.phoneNumber}</p>
                )}
              </div>
            </label>
          </Flex>
          <Flex
            direction="column"
            mdDirection="row"
            gap="1.8rem"
            justify="space-between"
            style={{ marginBottom: "15px" }}
          >
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Timezone <span style={{ color: "red" }}>*</span>
                </div>
              </div>
              <div className="bottom">
                <StyledSelect
                  className="select"
                  value={formik.values.timeZone}
                  name="timeZone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                >
                  <option disabled value="">
                    Select
                  </option>
                  {timezones.map((timezone, index) => (
                    <option key={index} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </StyledSelect>
                {formik.touched.timeZone && formik.errors.timeZone && (
                  <p>{formik.errors.timeZone}</p>
                )}
              </div>
            </label>
            <label className="select" style={{ width: "100%" }}>
              <div className="top">
                <div className="text" style={{ fontWeight: 500, marginBottom: "4px", fontSize: "14px", color: "#012635" }}>
                  Role <span style={{ color: "red" }}>*</span>
                </div>
              </div>
              <div className="bottom">
                <StyledSelect
                  className="select"
                  value={formik.values.role}
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value="">
                    Select any role
                  </option>
                  {loading && <option>Loading...</option>}
                  {roles.length > 0 &&
                    roles.map((data, ind) => {
                      return (
                        <option value={data?._id && data._id} key={ind}>
                          {data?.name && data.name}
                        </option>
                      );
                    })}
                </StyledSelect>
                {formik.touched.role && formik.errors.role && (
                  <p>{formik.errors.role}</p>
                )}
              </div>
            </label>
          </Flex>
          <label className="checkbox"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span className="box">
              <MyCheckbox
                title={"Active"}
                isChecked={formik.values.active}
                onClick={() =>
                  formik.setFieldValue("active", !formik.values.active)
                }
              />
            </span>
            {/* <p>This is error</p> */}
          </label>
        </CustomScroll>
        <div style={{ borderTop: "solid 1px #F0F0F0", height: "72px", padding: "0px 16px", gap: "15px", display: "flex", justifyContent: "space-between" }} className="group">

          <div onClick={() => {
            setSelectedDeleteId(userId)
            onClose()
          }} style={{ color: "#FF5D3E", fontSize: "16px", fontWeight: 500, lineHeight: "24px", cursor: "pointer" }}>Delete user</div>
          <div style={{ display: "flex", gap: "16px" }}>
            <button type="button" style={{ width: "100px", height: "40px", borderRadius: "8px", border: "solid 1px #777777", color: "#777777", fontSize: "16px", fontWeight: 500, padding: "0px" }} onClick={() => onClose()}>
              Cancel
            </button>
            <Components.Common.ButtonRightIcon
              disabled={!formik.isValid || !formik.dirty}
              text={loading || roleLoading ? "Loading..." : "Update"}
              // icon={<FaSave />}
              type="submit"
              style={{ backgroundColor: "#00BD82", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, padding: "0px" }}
            />
          </div>



        </div>
      </form>
    </UserNewStyled >
  );
};

export default UserEdit;
