import Assets from "@/assets";
// import { /*LoginModalStyled,*/ LoginStyled } from "./styles";
import { /*LoginModalStyled,*/ LoginStyled } from "./stylesA";
import { Link, useNavigate } from "react-router-dom";
import Components from "@/components";
import { useFormik } from "formik";
import { LoginSchema } from "@/schema";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Login,
  LoginWithGoogle,
  clearErrors,
  clearMessages,
  getPublicAddress,
} from "./../../store/actions";
import { permissionToRouteMap } from "@/utils";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useGlobalContext } from "@/hooks";

const LoginComponent = () => {
  const [isPassShow, setIsPassShow] = useState(false);
  // const [bgImage, setBgImage] = useState(Assets.Images.LoginBg);
  // const [bgImage2, setBgImage2] = useState(Assets.Images.LoginBg2);
  const [showSection, setShowSection] = useState(false); // State to manage section visibility
  const navigate = useNavigate();
  const [ipGettingLoading, setIpGettingLoading] = useState(false);
  const dispatch = useDispatch();
  const { setIsLoaderShowing } = useGlobalContext();

  const {
    message,
    errors: error,
    loading,
    ip,
    loginData,
  } = useSelector((state) => state.authReducer);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // rememberMe: false,
      // termsConditions: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { email, password, rememberMe } = values;
      const result = {
        email,
        password,
        ip: ip ?? "Ip Not Found",
        browser: navigator.userAgent ?? "No Agent Found",
      };

      dispatch(Login(result, rememberMe));
    },
  });

  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user details using the access token
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        console.log('User Info:', userInfo?.data?.email);
        dispatch(LoginWithGoogle({email:userInfo?.data?.email ,   ip: ip ?? "Ip Not Found",  browser: navigator.userAgent ?? "No Agent Found",}));
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: "#999999",
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message !== "") {
      dispatch(clearMessages());
      setTimeout(() => {
        const user = JSON.parse(
          localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
        );

        const type =
          localStorage.getItem("type") ?? localStorage.getItem("type") ?? "";

        const newsignUp =
          localStorage.getItem("NewSignUp") ??
          localStorage.getItem("NewSignUp");
          console.log(newsignUp);
          if (newsignUp !== "yes") {
            let redirectPath = "/dashboard"; // Default redirect path
          
            if (type === "admin") {
              redirectPath = "/dashboard";
            } else if (loginData?.type === "superAdmin" || type === "superAdmin") {
              redirectPath = "/tenant";
            } else if (user?.role?.permissions) {
              const firstPermission = user.role.permissions[0];
              const mappedRoute = permissionToRouteMap.get(firstPermission);
              console.log("mappedRoute",mappedRoute)
              redirectPath = mappedRoute ? `/${mappedRoute}` : "/dashboard";
            }
          
            navigate(`/redirect?redirect=${redirectPath}`);
            
          }
        localStorage.removeItem("NewSignUp");
        navigate(
          `/redirect?redirect=/${type === "admin"
            ? "dashboard"
            : loginData?.type === "superAdmin" || type === "superAdmin"
              ? "tenant"
              : user?.role?.permissions
                ? permissionToRouteMap.get(user.role.permissions[0])
                : "dashboard"
          }`
        );
        window.location.reload(), 3000;
      });
    }
  }, [error, message, navigate, dispatch]);

  useLayoutEffect(() => {
    setIpGettingLoading(true);
    dispatch(
      getPublicAddress(
        {},
        () => {
          setIpGettingLoading(false);
        },
        () => {
          setIpGettingLoading(false);
        }
      )
    );
  }, [dispatch]);

useEffect(()=>{
  setIsLoaderShowing(false)
},[])

  return (


    <LoginStyled>
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
          <div style={{ flexGrow: 1 }}></div>

          <div className="bottom">
            <div className="top">
              <Link to="https://zeitblast.com/">
                <img style={{ marginBottom: "50px", cursor: "pointer" }} width={"211px"} src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />
              </Link>

              <div style={{ fontSize: "32px", color: "#012635", fontWeight: 600, lineHeight: "40px", marginBottom: "8px", fontFamily: ' Fellix,  "Helvetica Neue",' }}>Sign in</div>
              <div style={{ fontSize: "20px", fontWeight: 400, lineHeight: "28px", marginBottom: "30px", color: "#999999" }}>Welcome back! Please enter your details.</div>
              {/* <h1 style={{ marginTop: "4rem" }}>Login</h1> */}
            </div>
            <div className="bottom">
              <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                  <div className="item">
                    <Components.Common.MyInputWithEndIcon
                      title="Password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Please type your password"
                      type={isPassShow ? "text" : "password"}
                      value={formik.values.password}
                      Icon={Assets.Icons.Eye}
                      iconCSS={{
                        color: isPassShow ? "#5867dd" : "#D8D8D8",
                      }}
                      onIconClick={() => setIsPassShow((p) => !p)}
                      name="password"
                      error={
                        formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : ""
                      }
                    />
                    <Link to="/forget-password">Forgot Password?</Link>
                  </div>
                </div>
                <div className="bottom">

                  <div className="bottom">
                    <button
                      disabled={
                        !formik.isValid ||
                        !formik.dirty ||
                        loading ||
                        ipGettingLoading
                      }
                      style={{cursor:"pointer"}}
                    >
                      <span className="extra">
                        {loading ? "Please wait..." : "Log in"}
                      </span>
                      <span className="text">
                        {loading ? "Please wait..." : "Log in"}
                      </span>
                      <span className="icon">
                        <FaArrowRight />
                      </span>
                    </button>
                    <div style={{ marginTop: "30px" }}>
                      <Root>
                        <Divider>or</Divider>
                      </Root>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <div onClick={() => login()} style={{ border: "1px solid #E0E0E0", display: "flex", justifyContent: "center", padding: "12px", borderRadius: "8px", gap: "10px", cursor: "pointer" }}><span> <img src={Assets.Images.google} alt="ZeitBlast" /></span><span style={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#012635" }}>Continue With Google</span></div>
                    </div>

                    <div style={{ color: "#475467", fontWeight: 500, fontSize: "14px", lineHeight: "22px", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                      Don’t have an account?&nbsp; <span style={{ fontSize: "16px", lineHeight: "24px", color: "#00BD82", cursor: "pointer" }}><Link to="https://zeitblast.com/">Signup</Link></span>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
          <div style={{ flexGrow: 1 }}></div>

        </section>
      </div>
    </LoginStyled>
  );
};

export default LoginComponent;


