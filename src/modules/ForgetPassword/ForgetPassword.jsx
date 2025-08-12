import Assets from "@/assets";
// import { ForgetPasswordStyled } from "./styles";
import { ForgetPasswordStyled , ButtonEmail } from "./stylesA";
import { Link, useNavigate } from "react-router-dom";
import Components from "@/components";
import { useFormik } from "formik";
import { forgetPasswordSchema } from "@/schema";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgotPassword,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { sentMail } from "@/assets/images";

const ForgetPasswordComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailSend, setEmailSend] = useState(false)
  const {
    message,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      values["url"] = import.meta.env.VITE_APP_FRONTEND_BASE_URL_FOR_CHANGE;
      dispatch(ForgotPassword(values));
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
      setTimeout(() => navigate("/Login"), 3000);
    }
  }, [error, message]);

  return (
  


    <ForgetPasswordStyled>

     
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
        <section>
          <div style={{flexGrow:1}}></div>
          <div className="bottom">
        

            <div className="top">
              <Link to="/">
              <img style={{ marginBottom: "100px" }} width={"211px"} src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />
              </Link>
              <div style={{ display:emailSend ? "none" : "block" , fontSize: "32px", color: "#012635", fontWeight: 600, lineHeight: "40px", marginBottom: "8px", fontFamily: ' Fellix,  "Helvetica Neue",' }}>Forgot password?</div>
              <div style={{ display:emailSend ? "none" : "block" , fontSize: "20px", fontWeight: 400, lineHeight: "28px", marginBottom: "30px", color: "#999999" }}>No worries, we’ll send you reset instructions.</div>
             
              {/* <h1 style={{ marginTop: "4rem" }}>Login</h1> */}
            </div>
            {
              !emailSend ?
                <div className="bottom">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="top">
                      <div className="item">
                        <Components.Common.MyInput
                          error={
                            formik.touched.email && formik.errors.email
                              ? formik.errors.email
                              : ""
                          }
                          title="Email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          placeholder="Enter your emails"
                          type="text"
                          value={formik.values.email}
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="bottom">
                        <button
                          disabled={
                            !formik.isValid || !formik.dirty || loading
                              ? true
                              : false
                          }
                        >
                          <span className="text">
                            {loading ? "Please wait..." : "Reset"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                :
                <div>
                  <div style={{ display: "flex", justifyContent: "center" , marginBottom:"50px" }}><img src={Assets.Images.sentMail} /></div>


                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ fontSize: "32px", color: "#012635", fontWeight: 600, lineHeight: "40px", marginBottom: "8px", fontFamily: ' Fellix,  "Helvetica Neue",' }}>Check your email</div>

                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 400, lineHeight: "28px", color: "#999999" }}>We sent a password reset link to</div>

                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 400, lineHeight: "28px", marginBottom: "30px", color: "#999999" }}>{formik.values.email ? formik.values.email : "omid@golden-capital.com"}</div>

                  </div>

                  <div>
                    <button style={{backgroundColor:"#00BD82" , width:"100%" , padding:"8px 12px" , borderRadius:"8px" , color:"white" , fontWeight:500 , fontSize:"16px" , lineHeight:"24px"}}

                    >
                      <span className="text">
                        Go to Email
                      </span>
                    </button>
                  </div>
                  <div style={{color:"#475467" , fontWeight:500 , fontSize:"14px" , lineHeight:"22px" , display:"flex" , justifyContent:"center" , marginTop:"30px"}}>
                  Didn’t receive the email?&nbsp; <span style={{fontSize:"16px" , lineHeight:"24px" , color:"#00BD82"}}>Click to resend</span>
                    </div>

                </div>
            }

            <div onClick={() => navigate("/Login")} style={{ color: "#012635", fontWeight: 500, fontSize: "16px", lineHeight: "24px", display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px", alignItems: "center", cursor: "pointer" }}><span style={{ display: "flex", alignItems: "center" }}><FaArrowLeft /></span><span>Back to Login</span></div>

          </div>
          <div style={{flexGrow:1}}></div>
        </section>
      </div>
    </ForgetPasswordStyled>
  );
};

export default ForgetPasswordComponent;
