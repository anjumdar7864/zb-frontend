import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BadgeStyledUnRead,
  BadgeStyledUnAnswerd,
  BadgeStyledReminder,
  BadgeStyledStatus,
  ChangePasswordModalStyled,
  CircularProgressbarStyled,
  HeaderStyled,
  LightTooltip,
  LimitDropdownStyled,
  LoginAttempsModalItemStyled,
  LoginAttempsModalStyled,
  MyProfileModalStyled,
  ProfileDropDownStyled,
  ProfileTooltipStyled,
  HeaderWrapper,
  TopHeader,
  ReferLink,
  HeaderMenu,
  ScrollingContainer,
  ScrollingContent,
  // ProgressStyled
} from "./styles";
import Assets from "@/assets";
import useResponsiveWidth from "./useResponsiveWidth";
import { Progress } from "react-sweet-progress";
import { buildStyles } from "react-circular-progressbar";
import {
  FaCog,
  FaInfoCircle,
  FaMobileAlt,
  FaSave,
  FaTimes,
  FaUserCircle,
  FaReply,
  FaCloudDownloadAlt,
  FaCode,
  FaTag,
  FaStar,
} from "react-icons/fa";
import { CgMore } from "react-icons/cg";
import {
  MdAddBusiness,
  MdBrowserUpdated,
  MdBusinessCenter,
  MdChecklist,
  MdOutlineDialpad,
  MdOutlineSlowMotionVideo,
} from "react-icons/md";
import { CircularProgress, ClickAwayListener, styled } from "@mui/material";
import { useState, useEffect, useLayoutEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Components from "@/components";
import {
  ContainerFluid,
  FlexCol,
  FlexRow,
  SpaceY,
  Flex,
  Paragraph,
  P,
} from "@/styles/CommonStyles";
import {
  logOut,
  clearErrors,
  clearMessages,
  UpdateSingleUser,
  ChangePassword,
  getLoginHistory,
  getStats,
  GetReportSendAndQueue,
} from "@/store/actions";
import { passwordChangeSchema, profileUpdateSchema } from "@/schema";
import { formatDateToRelative } from "@/utils";
import { getUserAuth, removeUserImpersonation } from "@/utils/storage";
import color from "@/styles/color";
import {
  hubspot,
  intercom,
  ms,
  pipedrive,
  salesforce,
  speaker,
  zendesk,
} from "@/assets/images";
import {
  WhyZietblast1,
  WhyZietblast2,
  WhyZietblast3,
  WhyZietblast4,
  WhyZietblast5,
  WhyZietblast6,
} from "@/assets/icons";
import {
  BiSolidMessageDetail,
  BiSolidMessageSquareDetail,
  BiSolidPhoneCall,
} from "react-icons/bi";
import { TbCreditCardFilled, TbWorld } from "react-icons/tb";
import { RiCustomerServiceFill, RiVoiceprintFill } from "react-icons/ri";
import { BsAwardFill } from "react-icons/bs";
import { PiHeartHalfFill } from "react-icons/pi";
import { HiSpeakerphone } from "react-icons/hi";
import { IoLayers, IoSettings } from "react-icons/io5";
import { FaFolderClosed, FaPenToSquare } from "react-icons/fa6";
import { IoIosContact, IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TiUserAdd } from "react-icons/ti";
import { ImHome } from "react-icons/im";
import { Cross, Cross as Hamburger } from "hamburger-react";
import SidebarComponent from "./Sidebar";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";

const authUser = getUserAuth();
const user = JSON.parse(authUser.user);

const debounce = (func, wait = 1000) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const Header = ({ onPricingButtonClick }) => {
  const width = useResponsiveWidth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLoginAttemptsOpen, setIsLoginAttemptsOpen] = useState(false);
  const [cookiesSettingOpen, setCookiesSettingOpen] = useState(false)
  const [cookiesgOpen, setCookiesgOpen] = useState(false)
  const { unRead, unAnswered, status, reminder } = useSelector(
    (state) => state.statsReducer
  );
  const { inboxDetail } = useSelector((s) => s.inboxUserMessageReducer);

  // useEffect(() => {
  //   dispatch(getStats());
  // }, [location]);

  // useEffect(() => {
  //   dispatch(GetReportSendAndQueue());
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     onPricingButtonClick();
  //   }, 1500);
  // }, []);

  const handleCookiesSetting = () => {
    // console.log("chulling", cookiesSettingOpen);

    setCookiesSettingOpen(true)
  }

  const menuData = [
    {
      title: "Why ZeitBlast",
      url: "/home",
      subMenuItems: [
        {
          title: "WHY ZEITBLAST",
          dis: "Powerful SMS lead generation for real estate and beyond",
          items: [
           
            {
             
              title: "Overview of Zeitblast",
            },
            {
             
              title: "How It Works",
            },
            {
             
              title: "Built-in Auto Compliance",
            },
            {
             
              title: "Success Stories",
            },
          ],
        },
        {
          title: "WHY ZEITBLAST",
          dis: "Why top professionals trust our platform",
          items: [
            "High Deliverability and Response Rates",
            "Effortless CRM Integration",
            "Built-in Auto Compliance",
            "Data-Driven Insights" , 
           
          ],
        },
        {
          title: "FEATURES",
          items: [
            {
              logo: WhyZietblast1,
              url: "",
              title: "Drip Campaigns",
            },
            {
              logo: WhyZietblast2,
              url: "",
              title: "Quick Replies",
            },

            {
              logo: WhyZietblast3,
              url: "",
              title: "Custom Tagging",
            },
            {
              logo: WhyZietblast4,
              url: "",
              title: "Multi-Market Outreach",
            },
            {
              logo: WhyZietblast5,
              title: "High-Impact Templates",
            },
            {
              logo: WhyZietblast6,
              url: "",
              title: "Number Validation",
            },
          ],
        },
      ],
    },
    {
      title: "Solutions",
      url: "",
      subMenuItems: [
        {
          title: "By Team",
          dis:"Solutions tailored to your team’s needs." , 
          items: [
            {
              logo: <BiSolidMessageSquareDetail size={20} />,
              url: "",
              title: "Sales Teams",
            },
            {
              logo: <TbWorld size={20} />,
              url: "",
              title: "Marketing Teams",
            },
            {
              logo: <RiCustomerServiceFill size={20} />,
              url: "",
              title: "Customer Service & Support",
            },
          ],
        },
        {
          title: "By Business size",
          dis:"Solutions that scale with you." , 
          items: [
            {
              logo: <MdAddBusiness size={20} />,
              url: "",
              title: "Small Businesses",
            },
            {
              logo: <MdBusinessCenter size={20} />,
              url: "",
              title: "Growing Teams",
            },
            {
              // logo: <MdBusinessCenter size={20} />,
              url: "",
              title: "Enterprise-Level Businesses",
            },
          ],
        },
        {
          title: "REAL ESTATE EDUCATION",
          dis:"Essential strategies to grow your business." , 
          items: [
            {
              logo: <BiSolidPhoneCall size={20} />,
              url: "",
              title: "Novation Agreements",
            },
            {
              logo: <MdOutlineDialpad size={20} />,
              url: "",
              title: "Subject-To Deals",
            },
            {
              logo: <RiVoiceprintFill size={20} />,
              url: "",
              title: "Wholesaling",
            },
            {
              logo: <RiVoiceprintFill size={20} />,
              url: "",
              title: "Joint Ventures",
            },
          ],
        },
        {
          title: "BY INDUSTRY",
          dis: "Solutions for your industry.",
          items: [
            {
              logo: <BsAwardFill size={20} />,
              url: "",
              title: "Real Estate",
            },
            {
              logo: <TbCreditCardFilled size={20} />,
              url: "",
              title: "Financial Services",
            },

            {
              logo: <PiHeartHalfFill size={20} />,
              url: "",
              title: "Healthcare",
            },
            {
              logo: <HiSpeakerphone size={20} />,
              url: "",
              title: "Marketing & Advertising",
            },
          ],
        },

      ],
    },
    {
      title: "Pricing",
      url: "/pricing",
      subMenuItems: [],
    },
    {
      title: "Resources",
      url: "",
      subMenuItems: [
        {
          title: "Product",
          items: [
            {
              logo: <FaCloudDownloadAlt size={20} />,
              url: "",
              title: "Drip Campaigns",
            },
            {
              logo: <FaCode size={20} />,
              url: "",
              title: "Multi-Market Outreach",
            },
            {
              logo: <MdBrowserUpdated size={20} />,
              url: "",
              title: "Quick Replies",
            },
            {
              logo: <FaTag size={20} />,
              url: "",
              title: "High-Impact Templates",
            },
            {
              logo: <FaTag size={20} />,
              url: "",
              title: "Custom Tagging",
            },
            {
              logo: <FaTag size={20} />,
              url: "",
              title: "Number Validation",
            },
            {
              logo: <FaTag size={20} />,
              url: "",
              title: "Auto Compliance",
            },
            {
              logo: <FaTag size={20} />,
              url: "",
              title: "CRM Integration",
            },
          ],
        },
        {
          title: "Learning",
          
          items: [
            {
              logo: <IoLayers size={20} />,
              url: "",
              title: "Guides",
            },
            {
              logo: <FaFolderClosed size={20} />,
              url: "",
              title: "Tutorial Videos",
            },
            {
              logo: <AiOutlineExclamationCircle size={20} />,
              url: "",
              title: "Glossary",
            },
            {
              logo: <TiUserAdd size={20} />,
              url: "",
              title: "Help Center",
            },
            {
              logo: <ImHome size={20} />,
              url: "",
              title: "Real Estate Education",
            },
            // {
            //   logo: <MdOutlineSlowMotionVideo size={20} />,
            //   url: "",
            //   title: "Videos",
            // },
          ],
        },
        {
          title: "Blog",
          items: [
            {
              logo: "",
              url: "",
              title: "Lead Generation Tips",
            },
            {
              logo: "",
              url: "",
              title: "SMS Marketing Trends",
            },
            {
              logo: "",
              url: "",
              title: "Compliance Insights",
            },
            {
              logo: "",
              url: "",
              title: "Customer Success Stories",
            },
            {
              logo: "",
              url: "",
              title: "Feature Updates",
            },
          ],
        },
      ],
    },
  ];

  const topHeaderData = [
    {
      title: "Real Estate Education",
      url: "/real-estate",
      subMenuItems: [
        {
          title: "PARTNERS",
          items: [
            {
              logo: <BiSolidMessageDetail size={20} />,
              url: "",
              title: "Integration Partners",
            },
            {
              logo: <IoSettings size={20} />,
              url: "",
              title: "Channel Partner",
            },
            {
              logo: <FaStar size={20} />,
              url: "",
              title: "Partner Stories",
            },
          ],
        },
      ],
    },
    {
      title: "About us",
      url: "/aboutus",
      subMenuItems: [],
      // subMenuItems: [
      //   {
      //     title: "ZEITBLAST",
      //     items: [
      //       {
      //         logo: <IoIosContact size={20} />,
      //         url: "",
      //         title: "About us",
      //       },
      //       {
      //         logo: <FaStar size={20} />,
      //         url: "",
      //         title: "Brand",
      //       },
      //     ],
      //   },
      //   {
      //     title: "LIFE AT ZEITBLAST",
      //     items: [
      //       {
      //         logo: <TiUserAdd size={20} />,
      //         url: "",
      //         title: "Careers",
      //       },
      //       {
      //         logo: <HiSpeakerphone size={20} />,
      //         url: "",
      //         title: "Events",
      //       },
      //       {
      //         logo: <FaPenToSquare size={20} />,
      //         url: "",
      //         title: "Press",
      //       },
      //     ],
      //   },
      // ],
    },
    // {
    //   title: "+1 888 240-6923",
    //   url: "",
    //   subMenuItems: [],
    // },
    {
      title: "Contact Us",
      url: "/contactus",
      subMenuItems: [],
    },
    {
      title: "Login",
      url: "/Login",
      subMenuItems: [],
    },
    {
      title: "EN",
      url: "",
      subMenuItems: [
        { title: "English (GB)", url: "" },
        { title: "Francais", url: "" },
        { title: "Deutsch", url: "" },
        { title: "Espanol", url: "" },
      ],
    },
  ];
  const topHeaderDataShort = [
    {
      title: "Become a partner",
      url: "/becomeapartner",
      subMenuItems: [
        {
          title: "PARTNERS",
          items: [
            {
              logo: <BiSolidMessageDetail size={20} />,
              url: "",
              title: "Integration Partners",
            },
            {
              logo: <IoSettings size={20} />,
              url: "",
              title: "Channel Partner",
            },
            {
              logo: <FaStar size={20} />,
              url: "",
              title: "Partner Stories",
            },
          ],
        },
      ],
    },
    {
      title: "Company",
      url: "/company",
      subMenuItems: [
        {
          title: "ZEITBLAST",
          items: [
            {
              logo: <IoIosContact size={20} />,
              url: "",
              title: "About us",
            },
            {
              logo: <FaStar size={20} />,
              url: "",
              title: "Brand",
            },
          ],
        },
        {
          title: "LIFE AT ZEITBLAST",
          items: [
            {
              logo: <TiUserAdd size={20} />,
              url: "",
              title: "Careers",
            },
            {
              logo: <HiSpeakerphone size={20} />,
              url: "",
              title: "Events",
            },
            {
              logo: <FaPenToSquare size={20} />,
              url: "",
              title: "Press",
            },
          ],
        },
      ],
    },
    {
      title: "Contact Us",
      url: "/contactus",
      subMenuItems: [],
    },
  ];

  const { reportSendAndQueue } = useSelector((state) => state.dashboardReducer);
  const [isOpen, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
 
  
 
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = debounce(() => {
    const scrollPosition = window.scrollY > 1;
    if (scrollPosition !== isScrolled) {
      setIsScrolled(scrollPosition);
    }
  }, 50); // Adjust the debounce delay as needed

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  

 const fetchData = async (type = "monthly") => {
  try {
  
    const { data, isError, message , sessionExpired } = await commonAPICall(
      REQUEST_TYPES.GET,
      `${ENDPOINTS.Maintenance}`
    );
  
    
    if (isError) {
      return toast.error(message);
    }
    console.log("check maintenance", data);
   if (data?.isMaintenanceModeOpen == true) {
  
    navigate("/Maintenance");
   }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchData()
}, [])
  return (
    <HeaderWrapper>
      <TopHeader>
        <Flex
          xxlPadding="0 0 0 112px"
          xlPadding="0 0 0 112px"
          lgPadding="0 0 0 112px"
          mdPadding={"0"}
          smPadding={"0"}
          items="center"
          justify="center"
          BB="1px solid rgba(255,255,255,0.3)"
          lgBB="none"
          direction="row"
          mdDirection="column"
          smDirection="column"
          lgDirection="column"
          xlDirection="column"
        >
          <ScrollingContainer height={isScrolled}>
            <ScrollingContent>
              <ReferLink>
                <img src={speaker} alt="" width={24} height={24} />
                <Paragraph fontSize="14px" lineHeight="22px" weight="400">
                  Get started generating leads for as low as just $199/month
                </Paragraph>
              </ReferLink>
            </ScrollingContent>

            {/* Repeated content to ensure seamless scrolling */}
            {/* <ScrollingContent>
              <ReferLink>
                <img src={speaker} alt="" width={24} height={24} />
                <Paragraph fontSize="14px" lineHeight="22px" weight="400">
                  ZeitBlast Customers! Refer A Friend to ZeitBlast by
                  <Link
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      paddingLeft: "2px",
                      paddingRight: "2px",
                    }}
                  >
                    sending them this form to fill out
                  </Link>
                  and earn $100!
                </Paragraph>
              </ReferLink>
            </ScrollingContent> */}
          </ScrollingContainer>
        </Flex>
        <Flex lgDisplay="none" width="100%" items="center" justify="center">
          <div
            style={{
              width: `100%`,
              backgroundColor: "#ffffff8c",
            }}
          ></div>
        </Flex>

        <Flex
          align="end"
          justify="flex-end"
          lgWidth="auto"
          width="100%"
          xxlPadding="0 112px 0 112px"
          xlPadding="0 112px 0 0"
          lgPadding="0 112px 0 0"
          mdPadding={"12px 16px"}
          smPadding={"12px 16px"}
          style={{ borderTop: isSmallScreen ? "1px solid #FFFFFF" : "none" }}
        >
          <HeaderMenu height={isScrolled}>
            {topHeaderData.map((item, index) => (
              <Components.Common.TopHeaderMenu key={index} item={item} />
            ))}
          </HeaderMenu>
        </Flex>
      </TopHeader>

      <Flex
        xxlPadding="0 112px 0 112px"
        xlPadding="0 112px 0 112px"
        lgPadding="0 112px 0 112px"
        mdPadding={"16px"}
        smPadding={"16px"}
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <ContainerFluid>
          <HeaderStyled height={isScrolled}>
            <div className="left">
              <Link to="/">
                <img src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />
              </Link>
            </div>
            <div className="right">
              <div className="left">
                <nav className="nav">
                  {menuData.map((item, index) => (
                    <Components.Common.MenuItem key={index} item={item} />
                  ))}
                </nav>
              </div>
              <div className="right">
                <div className="left">
                  <Components.Common.Button
                    onClick={location.pathname == "/" ? onPricingButtonClick : () => navigate("/pricing")}
                    text="Get Started"
                  />{" "}
                </div>
                <div className="mobileMenu">
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid #00BD82",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    <Cross
                      color="#00BD82"
                      toggled={isOpen}
                      toggle={setOpen}
                      size={20}
                    />
                  </div>
                </div>
                {isOpen && (
                  <SidebarComponent
                    isOpen={isOpen}
                    items={menuData}
                    topItems={topHeaderDataShort}
                  />
                )}
              </div>
            </div>

            <Components.Common.ModalTop
              onClose={() => { }}
              open={isMyProfileModalOpen}
            >
              <MyProfileModal onClose={() => setIsMyProfileModalOpen(false)} />
            </Components.Common.ModalTop>
            <Components.Common.ModalTop
              onClose={() => { }}
              open={isChangePasswordOpen}
            >
              <ChangePasswordModal
                onClose={() => setIsChangePasswordOpen(false)}
              />
            </Components.Common.ModalTop>
            <Components.Common.ModalTop
              onClose={() => { }}
              open={isLoginAttemptsOpen}
            >
              <LoginAttempsModal
                onClose={() => setIsLoginAttemptsOpen(false)}
              />
            </Components.Common.ModalTop>
          </HeaderStyled>
        </ContainerFluid>
      </Flex>
      <Components.Common.CoockiesModal open={cookiesgOpen} setOpen={setCookiesgOpen} handleCookiesSetting={handleCookiesSetting} />
      <Components.Common.CookiesSetting open={cookiesSettingOpen} setOpen={setCookiesSettingOpen} setCookiesgOpen={setCookiesgOpen} />
    </HeaderWrapper>
  );
};

export default Header;

const ProfileDropDownItem = ({ onClick = () => { }, text, icon }) => {
  return (
    <button className="item" onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </button>
  );
};

const ProfileDropDown = ({
  onClose,
  setIsMyProfileModalOpen,
  setIsChangePasswordOpen,
  setIsLoginAttemptsOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const userType =
    localStorage.getItem("type") ?? localStorage.getItem("type") ?? "";

  const { message, errors: error } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      onClose();
      navigate("/");
    }
  }, [error, message]);

  return (
    <ProfileDropDownStyled>
      <div className="top">
        <span>{user?.fullName && user.fullName}</span>
      </div>
      <div className="bottom">
        <div className="top">
          {authUser?.impersonation && (
            <ProfileDropDownItem
              icon={<FaReply />}
              text={"Back to my account"}
              onClick={() => {
                removeUserImpersonation();
                navigate("/redirect?redirect=/dashboard");
                window.location.reload();
              }}
            />
          )}
          {/* {userType !== "admin" && ( */}
          <ProfileDropDownItem
            icon={<FaCog />}
            text={"My Profile"}
            onClick={() => {
              setIsMyProfileModalOpen(true);
              onClose();
            }}
          />
          {/* )} */}
          <ProfileDropDownItem
            icon={<CgMore />}
            text={"Change Password"}
            onClick={() => {
              setIsChangePasswordOpen(true);
              onClose();
            }}
          />
          <ProfileDropDownItem
            icon={<MdChecklist />}
            text={"Login attempts"}
            onClick={() => {
              setIsLoginAttemptsOpen(true);
              onClose();
            }}
          />{" "}
          <ProfileDropDownItem
            icon={<FaMobileAlt />}
            text={"Download Mobile App"}
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="bottom">
          <button
            onClick={() => {
              dispatch(logOut());
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </ProfileDropDownStyled>
  );
};

const LimitDropdown = ({ month }) => {
  return (
    <LimitDropdownStyled>
      <h3>{month ? "Month" : "Daily"} Message Limit Reached</h3>
      <div className="group">
        <p>
          You&apos;ve sent 0/ 0 Batch messages {month ? "this month" : "today"}{" "}
          <a href="#">Learn more</a> about the limits
        </p>
        <Link>Upgrage Now</Link>
      </div>
    </LimitDropdownStyled>
  );
};

const ModifiedLightTooltip = styled(LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 95vw;
  }
`;

const MyProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    loading,
    message,
    errors: err,
  } = useSelector((state) => state.authReducer);
  // const timezones = moment.tz.names();
  const timezones = ["US/Pacific", "US/Eastern", "US/Central", "US/Mountain"];

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      aliasRepName: user.aliasName ?? "",
      companyName: user.companyName ?? "",
      phoneNumber: user.phoneNumber ?? "",
      timeZone: user.timeZone ?? "",
    },
    validationSchema: profileUpdateSchema,
    onSubmit: (values) => {
      values = { ...values, aliasName: values.aliasRepName };
      delete values.aliasRepName;
      dispatch(
        UpdateSingleUser(values, user?._id, () => {
          user.firstName = values?.firstName;
          user.lastName = values?.lastName;
          user.aliasName = values?.aliasName;
          user.companyName = values?.companyName;
          user.phoneNumber = values?.phoneNumber;
          user.timeZone = values?.timeZone;
          if (localStorage.getItem("user")) {
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            localStorage.setItem("user", JSON.stringify(user));
          }
          window.location.reload();
          onClose();
        })
      );
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

  useEffect(() => {
    if (err.length > 0) {
      toast.error(err);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [err, message]);
  let role;
  if (user?.role?.name) {
    role = user?.role?.name;
  } else {
    role = user.role;
  }

  return (
    <MyProfileModalStyled ChevronDown={Assets.Images.SortDefault}>
      <div className="top">
        <h2>My Profile</h2>
        <button type="button" onClick={onClose} disabled={loading}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={formik.handleSubmit} className="bottom">
        <div className="top">
          <label className="input">
            <div className="top">
              <h6 className="text">
                First Name <span>*</span>
              </h6>
            </div>
            <div className="bottom">
              <input
                type="text"
                placeholder="Enter First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="firstName"
                value={formik.values.firstName}
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
                placeholder="Enter Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="lastName"
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p>{formik.errors.lastName}</p>
              )}
            </div>
          </label>
          <label className="input">
            <div className="top">
              <h6 className="text">
                Email address <span>*</span>
              </h6>
            </div>
            <div className="bottom">
              <input
                type="email"
                placeholder="example@domain.com"
                disabled
                value={user?.email}
              />
              {/* <p>This is my error.</p> */}
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
          <label className="input">
            <div className="top">
              <h6 className="text">
                Role <span>*</span>
              </h6>
            </div>
            <div className="bottom">
              <input type="text" placeholder="Role" disabled value={role} />
              {/* <p>This is my error.</p> */}
            </div>
          </label>

          <label className="input">
            <div className="top">
              <h6 className="text">
                Alias/Rep Name
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
                Company Name
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
        </div>
        <div className="bottom">
          <button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            disabled={loading || !formik.dirty || !formik.isValid}
            text={loading ? "Please wait..." : "Save"}
            icon={<FaSave />}
            type="submit"
          />
        </div>
      </form>
    </MyProfileModalStyled>
  );
};

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

const LoginAttempsModalItem = ({ record }) => {
  return (
    <LoginAttempsModalItemStyled>
      <div className="left">
        <img src={Assets.Images.Avatar} alt="AVATAR" />
      </div>
      <div className="right">
        <div className="item">
          <h6>IP address</h6>
          <p>{record?.ip ?? "IP Not Found"}</p>
        </div>
        <div className="item">
          <h6>Browser</h6>
          <p>{record?.browser ?? "No Agent Found"}</p>
        </div>
        <div className="item">
          <h6>Time</h6>
          <p>{formatDateToRelative(record?.createdAt ?? Date.now())}</p>
        </div>
      </div>
    </LoginAttempsModalItemStyled>
  );
};

const LoginAttempsModal = ({ onClose }) => {
  const { loginHistory, loading } = useSelector((s) => s.authReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getLoginHistory());
  }, [dispatch]);

  return (
    <LoginAttempsModalStyled>
      <div className="top">
        <h2>Login attempts</h2>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      {loading ? (
        <div className="bottom loading">
          <div>
            <CircularProgress />
          </div>
          <div>LOADING...</div>
        </div>
      ) : (
        <div className="bottom data">
          {loginHistory?.results?.length === 0 && <p>No Record Found</p>}
          {loginHistory?.results?.map((record, i) => (
            <LoginAttempsModalItem key={i} record={record} />
          ))}
        </div>
      )}
    </LoginAttempsModalStyled>
  );
};