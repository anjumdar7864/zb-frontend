import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  Dropdown,
  DropdownItem,
  QABox,
  EffectStyle,
  BottomLoader,
  // ProgressStyled
} from "./styles";
import { getInitials } from "@/utils/helpers";
import Assets from "@/assets";
import useResponsiveWidth from "./useResponsiveWidth";
import { Flex, P } from "@/styles/CommonStyles";
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
  FaCheckCircle,
} from "react-icons/fa";
import { CgMore } from "react-icons/cg";
import { MdChecklist } from "react-icons/md";
import { CircularProgress, ClickAwayListener, styled } from "@mui/material";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Components from "@/components";
import {
  logOut,
  clearErrors,
  clearMessages,
  UpdateSingleUser,
  ChangePassword,
  getLoginHistory,
  GetReportSendAndQueue,
  GetReportOfNoStatus,
  GetReportOfReminder,
  GetReportOfUnRead,
  GetReportOfUnAnswered,
  GetSingleUser,
  countOfMessageSend,
  UpdateLoginTanent,
  getLogoutSuccess,
} from "@/store/actions";
import { passwordChangeSchema, profileUpdateSchema } from "@/schema";
import { formatDateToRelative } from "@/utils";
import { getUserAuth, removeUserImpersonation } from "@/utils/storage";
import color from "@/styles/color";
import { IoIosArrowDown } from "react-icons/io";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { DlcModel } from "@/modules/Settings/MarketLists/MarketLists";
import { IoWarning } from "react-icons/io5";
import PreviewModal from "@/modules/Notification/NotificationPopUp";

const authUser = getUserAuth();
// const user = JSON.parse(authUser.user);


const storedType =
  localStorage.getItem("type") ?? localStorage.getItem("type");
const Header = ({ setSidebarOpen }) => {
  const width = useResponsiveWidth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLoginAttemptsOpen, setIsLoginAttemptsOpen] = useState(false);
  const [userDropDown, setUserDropDown] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [loadingWarning, setIsLoadingWarning] = useState(false)
  const [tenantAgent, setTenantAgent] = useState(false)
  const [isdlcModelOpen, setIsDlcModelOpen] = useState(false)
  const [isNotificationOpen, setisNotificationOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user")) ?? JSON.parse(localStorage.getItem("user")) ?? {};

  const FeedbackList = [
    { title: "Knowledge base" },
    { title: "Training videos" },
    { title: "Contact support" },
    { title: "Give us your feedback" },
  ];
  const UserList = [{ title: "Edit profile" }, { title: "Log out" }];
  const dropdownRef = useRef(null);
  const createdropdownRef = useRef(null);
  // const { unRead, unAnswered, status, reminder } = useSelector(
  //   (state) => state.statsReducer
  // );
  const [searchParams] = useSearchParams();
  const isMonday = new Intl.DateTimeFormat("en-US", {
    timeZone: user?.timeZone ? user?.timeZone : "America/New_York", // Change to your desired time zone
    weekday: "long",
  }).format(new Date()) === "Monday";


  const {
    reportSendAndQueue,
    noStatusCount,
    reminderCount,
    unReadCount,
    unAnsweredCount,
    messageSendData,
    NotificationData,
  } = useSelector((state) => state.dashboardReducer);




  const {

    sessionExpireError
  } = useSelector((state) => state.authReducer);
  const { singleUser, loading } = useSelector((state) => state.authReducer);
  const pathSegments = location.pathname;
  // console.log("singleUser", pathSegments);
  useEffect(() => {
    if (storedType != "superAdmin") {
      dispatch(GetReportOfNoStatus());
      dispatch(GetReportOfReminder());
      dispatch(GetReportOfUnRead());
      dispatch(GetReportOfUnAnswered());
      dispatch(countOfMessageSend());
    }

    if (storedType == "admin") {
      dispatch(GetSingleUser(user?._id, "admin"));

    }
  }, [location]);



  useEffect(() => {
    dispatch(GetReportSendAndQueue());
  }, []);

  useEffect(() => {
    if (NotificationData != null && storedType != "superAdmin" ) {
      setisNotificationOpen(true)
    }
  }, [NotificationData])
  // console.log("sessionExpireError", sessionExpireError);
  const { inboxDetail } = useSelector((s) => s.inboxUserMessageReducer);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setUserDropDown(0);
    }
    if (
      createdropdownRef.current &&
      !createdropdownRef.current.contains(event.target)
    ) {
      // setCreateUserDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  // useEffect(() => {
  //   dispatch(getStats());
  // }, [location]);

  // useEffect(() => {
  //   dispatch(GetReportSendAndQueue());
  // }, []);

  const logOutHandler = () => {
    dispatch(logOut());
    toast.success("Logout Successfully.");
    navigate("/Login");
  };
  useEffect(() => {

    if (sessionExpireError) {
      dispatch(getLogoutSuccess());
      // localStorage.clear();
      dispatch(logOut());
      toast.success("Logout Successfully.");
      navigate("/Login");
      window.location.reload()
    }
  }, [sessionExpireError]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     toast.success("Logout Successfully.");
  //     dispatch(logOut());

  //     navigate("/Login");
  //     window.location.reload()
  //   }, 20000); // 60000ms = 1 minute

  //   return () => clearTimeout(timer); // Cleanup on unmount
  // }, []);
  useEffect(() => {
    dispatch(
      GetSingleUser(
        user?._id,
        user?.role == "superAdmin"
          ? "admin"
          : user?.role == "admin"
            ? "admin"
            : "user"
      )
    );
  }, []);

  // useEffect(() => {

  //   if (singleUser?.marketAndLimitStatus == false && pathSegments == "/settings/market-lists" && !searchParams.get("form")) {


  //     setIsModelOpen(true)


  //   } else if (singleUser?.loginDlcStatus == false && pathSegments == "/dashboard" && isMonday) {
  //     setIsModelOpen(true)


  //   }



  // }, [singleUser, pathSegments])


  useEffect(() => {
    // console.log("isTenDlcSubmit", singleUser?.isTenDlcSubmit);


    if (singleUser?.marketAndLimitStatus == false && singleUser?.isTenDlcSubmit != undefined && pathSegments == "/dashboard") {

      setIsModelOpen(true)

      // setIsDlcModelOpen(true)

    } else if (singleUser?.marketAndLimitStatus == false && singleUser?.isTenDlcSubmit != undefined && pathSegments == "/settings/market-lists" && !searchParams.get("form")) {
      setIsModelOpen(true)

    }



  }, [singleUser, pathSegments])

  const handleDLCWarning = () => {
    // console.log("adsfadfasdfasdfadsfasdfas");
    if (pathSegments == "/dashboard") {
      const payload = { loginDlcStatus: true }
      dispatch(UpdateLoginTanent(payload, user?._id, "admin"));

    } else if (pathSegments == "/settings/market-lists") {
      const payload = { marketAndLimitStatus: true, marketAndLimitStatusDate: new Date().toLocaleDateString() }
      dispatch(UpdateLoginTanent(payload, user?._id, "admin"));
    }

    setIsLoadingWarning(false)
    setIsModelOpen(false);
    navigate("/settings/market-lists?form=true")
  }
  const fetchData = async (type = "monthly") => {
    try {

      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.Maintenance}`
      );

      if (sessionExpired) {




        // sessionStorage.clear()
        dispatch(logOut());
        toast.success("Logout Successfully.");
        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
      console.log("check maintenance", data);
      if (data?.isMaintenanceModeOpen == true) {
        dispatch(logOut());
        navigate("/Maintenance");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    // if(location?.pathname == "/dashboard"){
    // console.log("permission",user?.permissions );
    const hasPermissionDashboard = ["Dashboard", "What's own your plate", "Prospect KPI", "Lead Breakdown", "Top3 Campaigns", "Last 30 Minutes", "Average Reply Time", "Drip KPI", "Text Activity", "Tag KPI", "Flag KPI"].some(permission =>
      user?.permissions?.includes(permission)
    );

    const hasPermissionInbox = ["Inbox", "Inbox Module Access", "Inbox Module Access", "Status Filter", "Campaigns Filter", "Users Filter", "Tags Filter", "Reminders", "Chat box", "Right Panel Prospect Details"].some(permission =>
      user?.permissions?.includes(permission)
    );

    const hasPermissionDirectImport = ["Direct Import", "Import or Drag & Drop File", "Assign to Campaign", "Download File",].some(permission =>
      user?.permissions?.includes(permission)
    );

    const hasPermissionCampaign = ["Campaigns", "Create Initial Campaign", "Edit Initial Campaign", "Delete Initial Campaign", "Campaign List Table", "Search Campaign", "Campaign Details", "Select Campaign"].some(permission =>
      user?.permissions?.includes(permission)
    );
    const hasPermissionTemplate = ["Templates", "Create Initial Template", "Edit Initial Template", "Delete Initial Template", "Initial Template List Table", "Initial Template Search", "Create Quick Replies", "Edit Quick Replies"].some(permission =>
      user?.permissions?.includes(permission)
    );

    // console.log("check permission", user?.permissions, hasPermissionDashboard, hasPermissionInbox, hasPermissionDirectImport, hasPermissionCampaign, hasPermissionTemplate);

    if (hasPermissionDashboard || hasPermissionInbox || hasPermissionDirectImport || hasPermissionCampaign || hasPermissionTemplate) {
      setTenantAgent(true)
    }
    // }
  }, [])



  function getRemainingTimeFrom24Hours(givenTime) {
    const givenDate = new Date(givenTime);
    const now = new Date();

    const msIn24Hours = 24 * 60 * 60 * 1000;
    const timeElapsed = now - givenDate;
    const timeRemaining = msIn24Hours - timeElapsed;

    if (timeRemaining <= 0) {
      return "0h 0m 0s";
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }


  return (
    <div style={{ borderBottom: "solid 1px #E0E0E0" }}>
      <HeaderStyled>
        <div className="left">
          <Link
            style={{ display: "flex", height: "65px", alignItems: "center" }}
          >
            <img
              onClick={() => setSidebarOpen(true)}
              src={Assets.Images.BurgerIcon}
              width={"40px"}
              alt="ZeitBlast"
            />
            {/* <div style={{ paddingTop: "58px" }}></div> */}
          </Link>
        </div>
        <div className="right">
          <div className="left">
            {
              user?.permissions?.includes("Inbox") || type === "admin" ?
                <LightTooltip
                  arrow
                  title="Unread"
                  onClick={() => navigate("/inbox?unread=true")}
                >
                  <BadgeStyledUnRead badgeContent={unReadCount}>
                    <div style={{ backgroundColor: "#FFF2CC" }} className="item">
                      <div className="img">
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src={Assets.Images.icon_1A}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </BadgeStyledUnRead>
                </LightTooltip>
                : ""
            }
            {
              type === "superAdmin" ?
                <div style={{ fontWeight: 700, color: "#012635", fontSize: "32px" }}  >Admin</div>
                : ""
            }

            {
              user?.permissions?.includes("Inbox") || type === "admin" ?
                <LightTooltip
                  arrow
                  title="Unanswered"
                  onClick={() => navigate("/inbox?unanswered=true")}
                >
                  <BadgeStyledUnAnswerd badgeContent={unAnsweredCount}>
                    <div style={{ backgroundColor: "#FFEEEE" }} className="item">
                      <div className="img">
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src={Assets.Images.icon_2AA}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </BadgeStyledUnAnswerd>
                </LightTooltip>
                :
                ""
            }

            {
              user?.permissions?.includes("Inbox") || type === "admin" ?
                <LightTooltip
                  arrow
                  title="Reminders"
                  onClick={() => navigate("/inbox?showReminders=true")}
                >
                  <BadgeStyledReminder badgeContent={reminderCount}>
                    <div style={{ backgroundColor: "#E8F0FB" }} className="item">
                      <div className="img">
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src={Assets.Images.icon_3AA}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </BadgeStyledReminder>
                </LightTooltip>
                :
                ""
            }
            {
              user?.permissions?.includes("Inbox") || type === "admin" ?
                <LightTooltip
                  arrow
                  title="No Status"
                  onClick={() => navigate("/inbox?noStatus=true")}
                >
                  <BadgeStyledStatus badgeContent={noStatusCount}>
                    <div style={{ backgroundColor: "#EBE9F8" }} className="item">
                      <div className="img">
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src={Assets.Images.icon_4AA}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </BadgeStyledStatus>
                </LightTooltip>
                :
                ""
            }

          </div>
          {
            // type === "admin"     && <div className="dlcWarning" style={{  alignItems: "center" , backgroundColor: user?.isTenDlcSubmit != "Accept"  ? "#fdecea" :  "#F0FFFC" , padding:"5px 10px" , borderRadius:"5px" , fontSize:"16px"}}>{user?.isTenDlcSubmit == "Accept" ? <FaCheckCircle style={{ color: "#00BD82" , marginRight:"5px" }} /> : <IoWarning style={{ color: "#d93025" , marginRight:"5px" }} />}10DLC Registration Status:<span style={{ color: user?.isTenDlcSubmit == "Accept" ? "#00BD82" : "#c62828" , fontWeight:500}}>{user?.isTenDlcSubmit == "Accept" ? "Complete" : "Incomplete"}</span> </div>

            type === "admin" && <div className="dlcWarning body4Regular"
              style={{ alignItems: "center", backgroundColor: user?.isTenDlcSubmit == "Accept" ? "#F0FFFC" : user?.marketAndLimitStatus && user?.isTenDlcSubmit != "Rejected " ? "#FFF4E5" : "#fdecea", padding: "5px 10px", borderRadius: "5px" }} >{user?.isTenDlcSubmit == "Accept" ? <FaCheckCircle style={{ color: "#00BD82", marginRight: "5px" }} /> : <IoWarning style={{ color: user?.marketAndLimitStatus && user?.isTenDlcSubmit != "Rejected " ? "#D17B0F" : "#d93025", marginRight: "5px" }} />}10DLC Registration Status :&thinsp;<span style={{ color: user?.isTenDlcSubmit == "Accept" ? "#00BD82" : user?.marketAndLimitStatus && user?.isTenDlcSubmit != "Rejected " ? "#D17B0F" : "#c62828", fontWeight: 500 }}>{user?.isTenDlcSubmit == "N/S" && user?.marketAndLimitStatus == false ? " Not Submitted" : user?.isTenDlcSubmit == "Accept" ? " Approved" : user?.marketAndLimitStatus && user?.isTenDlcSubmit == "N/A" ? " Under Review" : " Rejected"}</span> </div>

          }

          <div className="right">
            {
              type === "admin" || tenantAgent ?
                <div className="left">
                  <section>
                    <LightTooltip
                      title={"Total initial messages sent count today"}
                      arrow
                    >
                      <div style={{ height: "36px" }} id="item">
                        <div
                          style={{
                            // fontWeight: 700,
                            // fontSize: "16px",
                            // lineHeight: "19.2px",
                            height: "24px",
                          }}
                          className="body4Medium"
                        >
                          {reportSendAndQueue?.totalMessagesSent || 0}
                        </div>
                        <div
                          style={{
                            backgroundColor: " #D9D9D9",
                            width: "58px",
                            borderRadius: "100px",
                          }}
                        >
                          <div
                            style={{
                              paddingTop: "5px",
                              width: `${reportSendAndQueue?.totalMessagesSent / messageSendData?.dailyMessageLimit * 100}%`,
                              backgroundColor: "#00BD82",
                              borderRadius: "100px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </LightTooltip>
                  </section>
                  <section>
                    <LightTooltip
                      title={
                        "Initial messages are scheduled to be sent today on Phone 2 or Phone 3."
                      }
                      arrow
                    >
                      <div style={{ height: "36px" }} id="item">
                        <div
                          style={{
                            // fontWeight: 700,
                            // fontSize: "16px",
                            // lineHeight: "19.2px",
                            height: "24px",
                          }}
                          className="body4Medium"
                        >
                          {reportSendAndQueue?.totalMessagesInQueue || 0}
                        </div>
                        <div
                          style={{
                            backgroundColor: " #D9D9D9",
                            width: "58px",
                            borderRadius: "100px",
                          }}
                        >
                          <div
                            style={{
                              paddingTop: "5px",
                              width: `${reportSendAndQueue?.totalMessagesScheduled == 0 ? 0 : ((reportSendAndQueue?.totalMessagesScheduled - reportSendAndQueue?.totalMessagesInQueue) / reportSendAndQueue?.totalMessagesScheduled) * 100}%`,
                              backgroundColor: "#00BD82",
                              borderRadius: "100px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </LightTooltip>
                  </section>
                  <section>
                    <LightTooltip
                      title={<LimitDropdown messageSendData={messageSendData} />}
                      arrow
                    >
                      <div style={{ height: "36px" }} id="item">
                        <div
                          style={{
                            // fontWeight: 700,
                            // fontSize: "16px",
                            // lineHeight: "19.2px",
                            height: "24px",
                          }}
                          className="body4Medium"
                        >
                          {messageSendData?.dailyMessagePercentage}
                        </div>
                        <div
                          style={{
                            backgroundColor: " #D9D9D9",
                            width: "58px",
                            borderRadius: "100px",
                          }}
                        >
                          <div
                            style={{
                              paddingTop: "5px",
                              width: `${messageSendData?.dailyMessagePercentage}`,
                              backgroundColor: "#00BD82",
                              borderRadius: "100px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </LightTooltip>
                  </section>
                  <section>
                    <LightTooltip
                      title={
                        <LimitDropdown month messageSendData={messageSendData} />
                      }
                      arrow
                    >
                      <div style={{ height: "36px" }} id="item">
                        <div
                          style={{
                            // fontWeight: 700,
                            // fontSize: "16px",
                            // lineHeight: "19.2px",
                            height: "24px",
                          }}
                          className="body4Medium"
                        >
                          {messageSendData?.monthlyMessagePercentage}
                        </div>
                        <div
                          style={{
                            backgroundColor: " #D9D9D9",
                            width: "58px",
                            borderRadius: "100px",
                          }}
                        >
                          <div
                            style={{
                              paddingTop: "5px",
                              width: `${messageSendData?.monthlyMessagePercentage}`,
                              backgroundColor: "#00BD82",
                              borderRadius: "100px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </LightTooltip>
                  </section>
                </div>
                : ""
            }

            <div
              style={{ width: "100%", justifyContent: type === "admin" && "end" }}
              className="right"
            >
              <div ref={dropdownRef}>
                <Flex>
                  <div
                    style={{
                      position: "relative",
                      minWidth: "190px",

                      // paddingLeft: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <EffectStyle>
                      <Flex
                        onClick={() => {
                          userDropDown != 2
                            ? setUserDropDown(2)
                            : setUserDropDown(0);
                        }}
                        align="center"
                        gap="5px"
                      >
                        <QABox>
                          {!user?.avatar ? (
                            <>
                              {getInitials(
                                `${user.firstName}.`
                              )}
                            </>
                          ) : (
                            //  user?.fullName ? user?.fullName :
                            <img
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "7px",
                              }}
                              src={user?.avatar}
                            />
                          )}
                        </QABox>
                        <div style={{ display: "block" }}>
                          {/* <P
                            className="name"
                            style={{
                              fontSize: "16px",
                              cursor: "pointer",
                              fontWeight: 500,
                            }}
                            color="#012635"
                            fontSize="16px"
                            fontweight="500"
                          >{`${user.firstName} ${user.lastName}`}</P> */}
                          <P
                            className="name"
                            style={{
                              fontSize: "16px",
                              cursor: "pointer",
                              fontWeight: 500,
                            }}
                            color="#012635"
                            fontSize="16px"
                            fontweight="500"
                          >{`${user.firstName} ${user.lastName[0]}.`}</P>
                        </div>
                        <IoIosArrowDown size={20} />
                      </Flex>
                    </EffectStyle>
                    {userDropDown == 2 && (
                      <Dropdown width="100%" left="0%" top="110%">
                        {(authUser?.impersonation ||
                          authUser?.impersonationtwo) && (
                            <DropdownItem
                              onClick={() => {
                                removeUserImpersonation();
                                navigate("/redirect?redirect=/dashboard");
                                window.location.reload();
                              }}
                            >
                              Back to my account
                            </DropdownItem>
                          )}
                        <DropdownItem
                          onClick={() => {
                            if (user?.role?.name == "Agent") {
                              setUserDropDown(0);
                              navigate(`/User/profile/${user?._id}`);
                            } else if (user?.tenanentUser == undefined) {
                              navigate(`/tenant/profile/${user?._id}`);
                            } else if (user?.tenanentUser) {
                              setUserDropDown(0);
                              navigate(`/admin/profile/${user?._id}`);
                            } else if (!user?.tenanentUser) {
                              setUserDropDown(0);
                              navigate(`/admin/profile/${user?._id}`);
                            } else {
                              setUserDropDown(0);
                              navigate(`/tenant/profile/${user?._id}`);
                            }
                          }}
                        >
                          My Profile
                        </DropdownItem>

                        {/* <DropdownItem onClick={() => {
                          setIsChangePasswordOpen(true);
                          onClose();
                        }} >Change Password</DropdownItem> */}

                        <DropdownItem
                          onClick={() => {
                            setIsLoginAttemptsOpen(true);
                            onClose();
                          }}
                        >
                          Login attempts
                        </DropdownItem>
                        {/* <DropdownItem onClick={() => {
                          onClose();
                        }} >Download Mobile App</DropdownItem> */}

                        {/* <DropdownItem onClick={() => {
                        setIsMyProfileModalOpen(true);
                        onClose();
                      }}  >Edit profile</DropdownItem> */}
                        <DropdownItem
                          onClick={() => logOutHandler()}
                          color="#FF5C39"
                        >
                          Log out
                        </DropdownItem>
                        {/* {
                        UserList.map((list, idx) => {
                          return (
                            <DropdownItem  key={idx} >{list.title}</DropdownItem>
                          )
                        })
                      } */}

                        {/* <div style={{ backgroundColor: "#FFEEEE", color: "#B1264D", fontWeight: 500, fontSize: "16px", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", width: "100%", marginBottom: "8px", marginTop: "12px" }}>
                          <img style={{ marginRight: "5px" }} src={Assets.Images.gift_icon} alt="icon" />  Refer a friend!
                        </div> */}
                      </Dropdown>
                    )}
                  </div>
                </Flex>

                <div></div>
              </div>
            </div>
          </div>
        </div>


        <Components.Common.ModalTop
          open={isdlcModelOpen}
          onClose={() => {
            setIsDlcModelOpen(true);
          }}
        >
          <DlcModel
            open={isdlcModelOpen}
            onClose={() => setIsDlcModelOpen(false)}
          // isAlertVisible={isAlertVisible}
          // setIsAlertVisible={setIsAlertVisible}
          />
        </Components.Common.ModalTop>

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
          <ChangePasswordModal onClose={() => setIsChangePasswordOpen(false)} />
        </Components.Common.ModalTop>

        <Components.Common.ModalTop
          onClose={() => { }}
          open={isLoginAttemptsOpen}
        >
          <LoginAttempsModal onClose={() => setIsLoginAttemptsOpen(false)} />
        </Components.Common.ModalTop>
        <Components.Common.WarningModal

          onClose={() => {
            setIsModelOpen(false);

          }}
          isLoading={loadingWarning}

          onOkay={() => {
            handleDLCWarning()

          }} // Confirm delete when "Okay" is clicked
          open={isModelOpen}

          WarningItemTitle={``}
          WarningItemName="DLC"
          warningItemText={`${user?.isTenDlcSubmit == "Reject" ? `The 10DLC form you submitted was rejected. To continue using the platform without interruption, please resubmit the form within the next ${getRemainingTimeFrom24Hours(user?.marketAndLimitStatusDate)}.` : "The 10DLC form needs to be filled out to avoid any disruptions in your journey!"} `}

        />
      </HeaderStyled>
      <div>
        <BottomLoader>
          <section>
            <LightTooltip
              title={"Total initial messages sent count today"}
              arrow
            >
              <div id="item">
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "19.2px",
                  }}
                >
                  {reportSendAndQueue?.totalMessagesSent || 0}
                </div>
                <div
                  style={{
                    backgroundColor: " #D9D9D9",
                    width: "79px",
                    borderRadius: "100px",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "8px",
                      width: `${reportSendAndQueue?.totalMessagesSent / messageSendData?.dailyMessageLimit * 100}%`,
                      backgroundColor: "#00BD82",
                      borderRadius: "100px",
                    }}
                  ></div>
                </div>
              </div>
            </LightTooltip>
          </section>
          <section>
            <LightTooltip
              title={
                "Initial messages are scheduled to be sent today on Phone 2 or Phone 3."
              }
              arrow
            >
              <div id="item">
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "19.2px",
                  }}
                >
                  {reportSendAndQueue?.totalMessagesInQueue || 0}
                </div>
                <div
                  style={{
                    backgroundColor: " #D9D9D9",
                    width: "79px",
                    borderRadius: "100px",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "8px",
                      width: "0%",
                      backgroundColor: "#00BD82",
                      borderRadius: "100px",
                    }}
                  ></div>
                </div>
              </div>
            </LightTooltip>
          </section>
          <section>
            <LightTooltip
              title={<LimitDropdown messageSendData={messageSendData} />}
              arrow
            >
              <div id="item">
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "19.2px",
                  }}
                >
                  {messageSendData?.dailyMessagePercentage}
                </div>
                <div
                  style={{
                    backgroundColor: " #D9D9D9",
                    width: "79px",
                    borderRadius: "100px",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "8px",
                      width: `${messageSendData?.dailyMessagePercentage}`,
                      backgroundColor: "#00BD82",
                      borderRadius: "100px",
                    }}
                  ></div>
                </div>
              </div>
            </LightTooltip>
          </section>
          <section>
            <LightTooltip
              title={<LimitDropdown month messageSendData={messageSendData} />}
              arrow
            >
              <div id="item">
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "19.2px",
                  }}
                >
                  {messageSendData?.monthlyMessagePercentage}
                </div>
                <div
                  style={{
                    backgroundColor: " #D9D9D9",
                    width: "79px",
                    borderRadius: "100px",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "8px",
                      width: `${messageSendData?.monthlyMessagePercentage}`,
                      backgroundColor: "#00BD82",
                      borderRadius: "100px",
                    }}
                  ></div>
                </div>
              </div>
            </LightTooltip>
          </section>
        </BottomLoader>
      </div>

      <PreviewModal
        isOpen={isNotificationOpen}
        onClose={() => setisNotificationOpen(false)}
        // form={form}
        previewText={NotificationData?.title}
        previewSub={NotificationData?.description}
        category={NotificationData?.category}
      />
    </div>
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
          {(authUser?.impersonation || authUser?.impersonationtwo) && (
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

const LimitDropdown = ({ month, messageSendData }) => {
  return (
    <LimitDropdownStyled>
      <h3>{month ? "Month" : "Daily"} Message Limit Reached</h3>
      <div className="group">
        <p>
          You&apos;ve sent{" "}
          {month
            ? messageSendData?.totalSendMonthlyMessageCount
            : messageSendData?.totalSendDailyMessageCount}
          /{" "}
          {month
            ? messageSendData?.monthlyMessageLimit
            : messageSendData?.dailyMessageLimit}{" "}
          Batch messages {month ? "this month" : "today"}{" "}
          <a href="#">Learn more</a> about the limits
        </p>
        <Link to="/company?plan=true" style={{ backgroundColor: "#00BD82" }}>Upgrage Now</Link>
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
      if (message !== "Session expired") {
        toast.success(message);

      }
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
      if (message !== "Session expired") {
        toast.success(message);

      }
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
        <div className="IconCover">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4530_176297)">
              <path
                d="M6 24L26 24C27.1046 24 28 23.1046 28 22L28 8C28 6.89543 27.1046 6 26 6L6 6C4.89543 6 4 6.89543 4 8L4 22C4 23.1046 4.89543 24 6 24Z"
                stroke="#012635"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 28H12"
                stroke="#012635"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 19H28"
                stroke="#012635"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 24V28"
                stroke="#012635"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_4530_176297">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
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
