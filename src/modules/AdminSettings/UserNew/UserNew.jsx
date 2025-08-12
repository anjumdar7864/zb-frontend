import { FaArrowLeft, FaSave, FaInfoCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserNewStyled } from "./styles";
import { useEffect, useLayoutEffect, useState } from "react";
import Assets from "@/assets";
import Components from "@/components";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";
import {
  GetAllRole,
  CreateNewUser,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { useFormik } from "formik";
import { userSchema } from "@/schema";
import { useGlobalContext } from "@/hooks";
import { MyCheckbox } from "@/components/common";
import moment from "moment-timezone";

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

const initialValues = {
  avatar: null,
  fullName: "",
  email: "",
  role: "",
  aliasRepName: "",
  companyName: "",
  phoneNumber: "",
  active: true,
  firstName: "",
  lastName: "",
  timeZone: "",
};

const UserNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const { roles, errors, loading } = useSelector((state) => state.roleReducer);
  const { setIsLoaderShowing } = useGlobalContext();
  // const allTimezones = moment.tz.names();
  // const timezones = allTimezones.filter((timezone) => {
  //   const zone = timezone;
  //   return zone && zone.includes("US");
  // });
  const timezones = ["US/Pacific", "US/Eastern", "US/Central", "US/Mountain"];
  const {
    message,
    errors: error,
    loading: createLoading,
  } = useSelector((state) => state.authReducer);
  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => {
      const {
        avatar,
        firstName,
        lastName,
        email,
        role,
        aliasRepName,
        companyName,
        phoneNumber,
        active,
        timeZone,
      } = values;
      let url = import.meta.env.VITE_APP_FRONTEND_BASE_URL;
      let finalResult = new FormData();
      if (avatar) {
        finalResult.append("avatar", avatar);
      }
      finalResult.append("firstName", firstName);
      finalResult.append("lastName", lastName);
      finalResult.append("email", email);
      finalResult.append("role", role);
      finalResult.append("url", url);
      finalResult.append("aliasName", aliasRepName);
      finalResult.append("companyName", companyName);
      finalResult.append("phoneNumber", phoneNumber);
      finalResult.append("active", active);
      finalResult.append("timeZone", timeZone);

      dispatch(CreateNewUser(finalResult));
    },
  });

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

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/admin-settings/user-list"), 3000);
    }
  }, [dispatch, error, errors, message, navigate]);

  useEffect(() => {
    dispatch(GetAllRole());
  }, [dispatch]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading || createLoading);
  }, [loading, setIsLoaderShowing, createLoading]);

  return (
    <UserNewStyled ChevronDown={Assets.Images.ChevronDown}>
      <div className="top">
        <div className="left">
          <h1>Create New User</h1>
        </div>
        <div className="right">
          <div className="top">
            <button onClick={() => navigate(-1)}>
              <span className="icon">
                <FaArrowLeft />
              </span>
              <span className="text">Back</span>
            </button>
          </div>
        </div>
      </div>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <div className="avatar">
          <div className="top">
            <h6>Avatar</h6>
          </div>
          <div className="bottom">
            <label className="top">
              <input
                type="file"
                onChange={handleImageChange}
                accept=".png, .jpg, .jpeg"
              />
              <span className="icon">
                <MdModeEditOutline />
              </span>
              <img src={avatar ?? Assets.Images.Avatar} alt="AVATAR" />
            </label>
            <p>Allowed file types: png, jpg, jpeg.</p>
          </div>
        </div>
        <label className="input">
          <div className="top">
            <h6 className="text">
              First Name <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="First Name"
              value={formik.values.firstName}
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p>{formik.errors.firstName}</p>
            )}
          </div>
        </label>
        <label className="input">
          <div className="top">
            <h6 className="text">
              Last Name <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Last Name"
              value={formik.values.lastName}
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p>{formik.errors.lastName}</p>
            )}
          </div>
        </label>
        <label className="input">
          <div className="top">
            <h6 className="text">
              Email <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="email"
              placeholder="example@domain.com"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p>{formik.errors.email}</p>
            )}
          </div>
        </label>
        <label className="input">
          <div className="top">
            <h6 className="text">
              Alias/Rep Name <span>*</span>
              <LightTooltip
                arrow
                placement="right"
                title={
                  <>
                    <p>
                      Note: You don't have to enter an Alias Name. Use you real
                      name. First name anyway.
                    </p>
                    <p>
                      It's anonymous, but when the time comes to sign the
                      contract, honest too.
                    </p>
                  </>
                }
              >
                <pan className="icon">
                  <FaInfoCircle />
                </pan>
              </LightTooltip>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Alias/Rep Name"
              value={formik.values.aliasRepName}
              name="aliasRepName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.aliasRepName && formik.errors.aliasRepName && (
              <p>{formik.errors.aliasRepName}</p>
            )}
          </div>
        </label>
        <label className="input">
          <div className="top">
            <h6 className="text">
              Company Name <span>*</span>
              <LightTooltip
                arrow
                placement="right"
                title={
                  <>
                    <p>
                      Note: Don't use your actual company name. Use an acronym.
                      The real name lacks anonymity, probably has negative
                      keywords (cash, buyer) and definitely adds unneeded
                      characters.{" "}
                    </p>
                    <p>
                      Example: you can use 'BCH LLC' instead of 'Bay Capital
                      Holdings'
                    </p>
                  </>
                }
              >
                <pan className="icon">
                  <FaInfoCircle />
                </pan>
              </LightTooltip>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Company Name"
              value={formik.values.companyName}
              name="companyName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <p>{formik.errors.companyName}</p>
            )}
          </div>
        </label>
        <label className="input">
          <div className="top">
            <h6 className="text">
              Phone Number <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              name="phoneNumber"
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p>{formik.errors.phoneNumber}</p>
            )}
          </div>
        </label>
        <label className="select">
          <div className="top">
            <h6 className="text">
              Timezone <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <select
              className="select"
              value={formik.values.timeZone}
              name="timeZone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option disabled value="">
                Select a timezone
              </option>
              {timezones.map((timezone, index) => (
                <option key={index} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
            {formik.touched.timeZone && formik.errors.timeZone && (
              <p>{formik.errors.timeZone}</p>
            )}
          </div>
        </label>
        <label className="select">
          <div className="top">
            <h6 className="text">
              Role <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <select
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
            </select>
            {formik.touched.role && formik.errors.role && (
              <p>{formik.errors.role}</p>
            )}
          </div>
        </label>
        <label className="checkbox">
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
        <div className="group">
          <button type="button" onClick={() => formik.resetForm()}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            disabled={!formik.isValid || !formik.dirty}
            text={createLoading ? "Please wait..." : "Save"}
            icon={<FaSave />}
            type="submit"
          />
        </div>
      </form>
    </UserNewStyled>
  );
};

export default UserNew;
