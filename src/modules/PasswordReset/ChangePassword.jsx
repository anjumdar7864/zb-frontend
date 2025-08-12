import Assets from "@/assets";
// import { PasswordResetStyled } from "./styles";
import { PasswordResetStyled } from "./stylesA";
import { Link, useNavigate, useParams } from "react-router-dom";
import Components from "@/components";
import { useFormik } from "formik";
import { passwordResetSchema } from "@/schema";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNewPassword,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const PasswordReset = () => {
  const [isPassShow, setIsPassShow] = useState(false);
  const [isPassShow2, setIsPassShow2] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    message,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordResetSchema,
    onSubmit: (values) => {
      let { newPassword } = values;
      let finalResult = { newPassword, id: id, resetPasswordToken: token };
      dispatch(CreateNewPassword(finalResult));
    },
  });

  useEffect(() => {
    if (!id) {
      navigate("/Login");
    }
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/Login"), 3000);
    }
  }, [error, message]);

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
    <PasswordResetStyled
      bgImage={Assets.Images.LoginBg}
      bgImage2={Assets.Images.LoginBg2}
    >

      <div className="left">

        <div className="left_img">
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }} >
            <div style={{ flexGrow: 1, alignItems: "center" }} className="left_text">
              <div style={{ maxWidth: "660px" }} >Opportunity is a naughty goddess who wastes no time with those who are unprepared.</div>

            </div>
            <img src={Assets.Images.LoginSectionA} />
          </div>


        </div>


      </div>
      <div className="right">
      <div style={{flexGrow:1}}></div>
        <section>
         
          <div className="top">
            <img style={{ marginBottom: "50px" }} width={"211px"} src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />
            <div style={{ fontSize: "32px", color: "#012635", fontWeight: 600, lineHeight: "40px", marginBottom: "8px", fontFamily: ' Fellix,  "Helvetica Neue",' }}>Reset Password</div>
            <div style={{ fontSize: "20px", fontWeight: 400, lineHeight: "28px", marginBottom: "30px", color: "#999999" }}>Welcome back! Please enter your new password.</div>
          </div>
          <div className="bottom">
            <div className="bottom">
              <form
                onSubmit={remainingErrors.length === 0 && formik.handleSubmit}
              >
                <div className="top">
                  <Components.Common.MyInputWithEndIcon
                    title="Password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    type={isPassShow ? "text" : "password"}
                    value={formik.values.newPassword}
                    Icon={Assets.Icons.Eye}
                    iconCSS={{
                      color: isPassShow ? "#5867dd" : "#D8D8D8",
                    }}
                    onIconClick={() => setIsPassShow((p) => !p)}
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
                    title="Confirm Password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Confirm Password"
                    type={isPassShow2 ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    Icon={Assets.Icons.Eye}
                    iconCSS={{
                      color: isPassShow2 ? "#5867dd" : "#D8D8D8",
                    }}
                    onIconClick={() => setIsPassShow2((p) => !p)}
                    name="confirmPassword"
                    error={
                      formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                  />
                </div>
                <div className="bottom">
                  <div className="bottom">
                    <button
                      disabled={
                        !formik.isValid ||
                        !formik.dirty ||
                        remainingErrors.length !== 0
                      }
                    >
                      <span className="extra">
                        {loading ? "Please wait..." : "Reset Password"}
                      </span>
                      <span className="text">
                        {loading ? "Please wait..." : "Reset Password"}
                      </span>
                      <span className="icon">
                        <FaArrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <div style={{flexGrow:1}}></div>
      </div>

    </PasswordResetStyled>
  );
};

export default PasswordReset;
