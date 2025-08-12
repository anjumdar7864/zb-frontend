import { ChangePassword } from "@/store/actions";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordModalStyled } from "../Header/styles";
import { useEffect, useState } from "react";
import Components from "@/components";
import { passwordChangeSchema, profileUpdateSchema } from "@/schema";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Assets from "@/assets";

const ChangePasswordModal = ({ onClose }) => {
    const [isPassShow, setIsPassShow] = useState(false);
    const [isPassShow2, setIsPassShow2] = useState(false);
    const [isPassShow3, setIsPassShow3] = useState(false);
    const dispatch = useDispatch();
  
    const user = JSON.parse(
      localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
  
    const {
      message,
      errors: error,
      loading,
    } = useSelector((state) => state.authReducer);
  
    const formik = useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
        oldPassword: "",
      },
      validationSchema: passwordChangeSchema,
      onSubmit: (values) => {
        let { newPassword, confirmPassword, oldPassword } = values;
        let finalResult = { password: oldPassword, newPassword, confirmPassword };
        dispatch(ChangePassword(finalResult, user?._id ?? ""));
      },
    });
  
    useEffect(() => {
      if (error.length > 0) {
        toast.error(error);
        dispatch(clearErrors());
      }
      if (message !== "") {
        toast.success(message);
        dispatch(clearMessages());
        onClose();
      }
    }, [dispatch, error, message, onClose]);
  
    const getRemainingErrors = () => {
      const remainingErrors = [];
  
      if (!formik.values.newPassword.match(/[A-Z]/)) {
        remainingErrors.push("Password must contain at least one Capital Letter");
      }
  
      if (!formik.values.newPassword.match(/[a-z]/)) {
        remainingErrors.push("Password must contain at least one Small Letter");
      }
  
      if (!formik.values.newPassword.match(/[0-9]/)) {
        remainingErrors.push("Password must contain at least one Number");
      }
  
      if (!formik.values.newPassword.match(/[@$!%*?&]/)) {
        remainingErrors.push(
          "Password must contain at least one special Character (@$!%*?&)"
        );
      }
  
      if (formik.values.newPassword.length < 8) {
        remainingErrors.push("Password must contain at least 8 characters");
      }
  
      return remainingErrors;
    };
  
    const remainingErrors = getRemainingErrors();
  
    return (
      <ChangePasswordModalStyled>
        <div className="top">
          <h2>Change Password</h2>
          <button type="button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit} className="bottom">
          <div className="top">
            <Components.Common.MyInputWithEndIcon
              title="Current Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Current Password"
              type={isPassShow ? "text" : "password"}
              value={formik.values.oldPassword}
              Icon={Assets.Icons.Eye}
              iconCSS={{
                color: isPassShow ? "#5867dd" : "#D8D8D8",
              }}
              onIconClick={() => setIsPassShow((p) => !p)}
              name="oldPassword"
              error={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? formik.errors.oldPassword
                  : ""
              }
            />
            <Components.Common.MyInputWithEndIcon
              title="New Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="New Password"
              type={isPassShow2 ? "text" : "password"}
              value={formik.values.newPassword}
              Icon={Assets.Icons.Eye}
              iconCSS={{
                color: isPassShow2 ? "#5867dd" : "#D8D8D8",
              }}
              onIconClick={() => setIsPassShow2((p) => !p)}
              name="newPassword"
              error={
                formik.touched.newPassword &&
                (formik.errors.newPassword ? (
                  formik.errors.newPassword
                ) : remainingErrors.length !== 0 ? (
                  <ul>
                    {remainingErrors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                ) : (
                  ""
                ))
              }
            />
            <Components.Common.MyInputWithEndIcon
              title="New Password (repeat)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="New Password (repeat)"
              type={isPassShow3 ? "text" : "password"}
              value={formik.values.confirmPassword}
              Icon={Assets.Icons.Eye}
              iconCSS={{
                color: isPassShow3 ? "#5867dd" : "#D8D8D8",
              }}
              onIconClick={() => setIsPassShow3((p) => !p)}
              name="confirmPassword"
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
          </div>
  
          <div className="bottom">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <Components.Common.ButtonRightIcon
              disabled={loading || !formik.dirty || !formik.isValid}
              text="Save"
              icon={<FaSave />}
              type="submit"
            />
          </div>
        </form>
      </ChangePasswordModalStyled>
    );
  };


  
  export default ChangePasswordModal
  