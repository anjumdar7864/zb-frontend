import { useGlobalContext } from "@/hooks";
import { SidebarItemStyled, SidebarStyled, EffectStyle, Dropdown, DropdownItem, SidebarDropdown, QABox } from "./styles";
import { Flex, P } from '@/styles/CommonStyles';
import {
  FaBullhorn,
  FaCloudUploadAlt,
  FaCog,
  FaComments,
  FaDesktop,
  FaEdit,
  FaFileImport,
  FaLightbulb,
  FaTimes,
  FaTint,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Assets from "@/assets";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { PiUserLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getInitials } from '@/utils/helpers'
import { getUserAuth, removeUserImpersonation } from "@/utils/storage";
import Components from "@/components";
import ChangePasswordModal from "../ChangPasswordModal/ChangPasswordModal";
import { formatDateToRelative } from "@/utils";
import {
  getLoginHistory,
  logOut,

} from "@/store/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { LoginAttempsModalItemStyled, LoginAttempsModalStyled } from "../Header/styles";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { LogarithmicScale } from "chart.js";

const SidebarItem = ({ to = "", text = "", icon, iconStyle = {} }) => {


  return (
    <SidebarItemStyled to={to}>

      <div style={iconStyle} className="icon">
        {icon}
      </div>

      <span 
       className="text textPrimeryColor body3Medium"
      // className="text "
       >{text}</span>
    </SidebarItemStyled>
  );
};

const type = localStorage.getItem("type") ?? localStorage.getItem("type");
const user =
  JSON.parse(localStorage.getItem("user")) ??
  JSON.parse(localStorage.getItem("user"));

const getSettingsRoute = (user) => {

  if (user?.permissions?.includes("FC_Admin User") || user?.permissions?.includes("View_Admin User")) {
    console.log("here");
    return "/master_setting/Adminuser";
  }

  if (
    user?.permissions?.includes("FC_Roles & Permissions -Admin") ||
    user?.permissions?.includes("View_Roles & Permissions -Admin") ||
    user?.permissions?.includes("FC_Roles & Permissions -Tenant") ||
    user?.permissions?.includes("View_Roles & Permissions -Tenant")
  ) {
    return "/master_setting/Rols&permission";
  }

  if (
    user?.permissions?.includes("FC_Subscription Management") ||
    user?.permissions?.includes("View_Subscription Management")
  ) {
    return "/master_setting/Subscription";
  }

  return "/default-route"; // Default fallback route
};

const getMarketRoute = (user) => {
  if (user?.permissions?.includes("FC_General") || user?.permissions?.includes("View_General")) {

    return "/market/General";
  }

  if (
    user?.permissions?.includes("FC_New Request") ||
    user?.permissions?.includes("View_New Request")
  ) {
    return "/market/NewRequest";
  }

  if (
    user?.permissions?.includes("FC_10Dlc Submission") ||
    user?.permissions?.includes("View_10Dlc Submission")
  ) {
    return "/market/Submission";
  }

  return "/default-route"; // Default fallback route
}

const getTemplateRoute = (user) => {
  if (user.permissions.includes('Create Initial Template') || user.permissions.includes('Edit Initial Template')
    || user.permissions.includes('Delete Initial Template') || user.permissions.includes('Initial Template List Table')) {

    return "/templates/initial-templates";
  }

  if (
    user.permissions.includes('Create Quick Replies') || user.permissions.includes('Edit Quick Replies')
    || user.permissions.includes('Delete Quick Replies') || user.permissions.includes('Drag and Drop quick reply in the list to change position of quick reply')
  ) {
    return "/templates/quick-replies";
  }

  if (
    user.permissions.includes('Create Follow-up Template') || user.permissions.includes('Edit Follow-up Template')
    || user.permissions.includes('Delete Follow-up Templat') || user.permissions.includes('Follow-up Template Table') || user.permissions.includes('Follow-up Template Search')
  ) {
    return "/templates/follow-up-messages";
  }

  return ""; // Default fallback route
}

const getTenantSettingsRoute = (user) => {

  if (user.permissions.includes('Create User') || user.permissions.includes('View User')) {
    console.log("here");
    return "/settings/users";
  }

  if (
    user.permissions.includes('Request New Market') || user.permissions.includes('View Market and Limit Stats') ||
    user.permissions.includes('Search Market') || user.permissions.includes('View 10 DLC Registration Details')
  ) {
    return "/settings/market-lists";
  }

  if (
    user.permissions.includes('Create New DNC') || user.permissions.includes('Import or Drag & Drop DNC List') || user.permissions.includes('Export New DNC List') ||
    user.permissions.includes('DNC Table') || user.permissions.includes('DNC Number Edit/Delete option')
  ) {
    return "/settings/do-not-calls";
  }
  if (
    user.permissions.includes('Create New Tag') || user.permissions.includes('Edit Tag') || user.permissions.includes('Delete Tag') ||
    user.permissions.includes('Tag Table Stats')
  ) {
    return "/settings/tags";
  }
  if (
    user.permissions.includes('Export Prospect') || user.permissions.includes('Email Export Results to Admin')
  ) {
    return "/settings/export-prospects";
  }
  if (
    user.permissions.includes('Webhook Active') || user.permissions.includes('Webhook Deactive') || user.permissions.includes('Webhook Connect') ||
    user.permissions.includes('Webhook Edit')
  ) {
    return "/settings/integrations";
  }
  return ""; // Default fallback route
};
const Sidebar = ({ setSidebarOpen }) => {
  const [barWidth, setWidth] = useState("80px")
  const [imgWidth, setImgWidth] = useState("55px")
  const [leftMargin, setLeftMargin] = useState("15px")
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [expand, setExpand] = useState(false)
  const { isLarge } = useGlobalContext();
  const [userDropDown, setUserDropDown] = useState(0);
  const [marketpermission, setMarketpermission] = useState(false)
  const [settingspermission, setSettingspermission] = useState(false)
  const [isLoginAttemptsOpen, setIsLoginAttemptsOpen] = useState(false);
  const FeedbackList = [{ title: "Knowledge base" }, { title: "Training videos" }, { title: "Contact support" }, { title: "Give us your feedback" }]
  const authUser = getUserAuth();
  const user = JSON.parse(authUser.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const ref = useRef();
  const handleMouseEnter = () => {
    setExpand(true)
    setLeftMargin("20px")
    setImgWidth("150px")
  }

  const handleMouseLeave = () => {
    setExpand(false)
    setLeftMargin("15px")
    // setImgWidth("55px")
  }
  const logOutHandler = () => {
    dispatch(logOut());
    toast.success("Logout Successfully.");
    navigate("/Login", { replace: true })
  }
  useEffect(() => {
    // console.log("permission",user?.permissions );
    const hasPermissionMarket = ["FC_10Dlc Submission", "FC_New Request", "FC_General", "View_General", "View_New Request", "View_10Dlc Submission"].some(permission =>
      user?.permissions?.includes(permission)
    );
    const hasPermissionTenant = ["FC_Tenant", "View_Tenant",].some(permission =>
      user?.permissions?.includes(permission)
    );
    const hasPermissionSetting = ["FC_Roles & Permissions -Tenant", "FC_Roles & Permissions -Admin", "FC_Admin User", "View_Roles & Permissions -Tenant", "View_Roles & Permissions -Admin", "View_Admin User",
      "FC_Subscription Management", "View_Subscription Management"
    ].some(permission =>
      user?.permissions?.includes(permission)
    );

    setMarketpermission(hasPermissionMarket)
    setSettingspermission(hasPermissionSetting)

    if (hasPermissionTenant) {
      navigate("/tenant")
    } else if (hasPermissionSetting) {
      navigate(getSettingsRoute(user))
    } else if (hasPermissionMarket) {
      navigate(getMarketRoute(user))
    }
  }, [])





  useEffect(() => {
    // console.log("permission",user?.permissions );
    if(location?.pathname == "/dashboard"){

    
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
    console.log("check permission ", location ,   hasPermissionDashboard, hasPermissionInbox, hasPermissionDirectImport);

    if (hasPermissionDashboard) {
      navigate("/dashboard")
    } else if (hasPermissionInbox) {
      navigate("/inbox")
    } else if (hasPermissionDirectImport) {
      navigate("/direct-import")
    } else if (hasPermissionCampaign) {
      navigate("/campaigns")
    } else if (hasPermissionTemplate) {
      navigate("/templates/initial-templates")
    }
  }
  }, [])





  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSidebarOpen(false)
    }
  };
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SidebarStyled
      //  ref={ref}
      marginLeft={leftMargin} imgWid={imgWidth} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} width={barWidth}>
      <div className="logo"  >
        <Link className="logoLink" to={type == "superAdmin" ? "/tenant" : "/"} >
          <img className="imageOne" width={"150px"} src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />
          <img className="imageTwo" width={"40px"} src={Assets.Images.sidebar_logoA} alt="ZeitBlast" />
          <img className="imageOneDesktop" width={"150px"} src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />
          {/* {
            expand ?
              <img className="imageTwo" width={"150px"} src={Assets.Images.zeitBlast_logoA} alt="ZeitBlast" />

              :
              <img className="imageTwo" width={"40px"} src={Assets.Images.sidebar_logoA} alt="ZeitBlast" />
          } */}
        </Link>
        <img onClick={() => setSidebarOpen(false)} className="cross" width={"22px"} src={Assets.Images.cross} alt="ZeitBlast" />
      </div>
      <div className="sidebarTop" style={{ flexGrow: 1, overflow: "auto" }}>
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem to="/dashboard" text="Dashboard" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_dashboardA} alt="dashboard" />} />
        ) : user?.permissions?.includes("Dashboard") ? (
          <SidebarItem to="/dashboard" text="Dashboard" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_dashboardA} alt="dashboard" />} />
        ) : (
          ""
        )}
        {type === "superAdmin" ? (
          <SidebarItem to="/tenant" text="Tenant" icon={<PiUserLight />} />
        )
          : type === "other" && user?.permissions?.includes("FC_Tenant") || user?.permissions?.includes("View_Tenant") ? (
            <SidebarItem to="/tenant" text="Tenant" icon={<PiUserLight />} />
          ) : ""}
        {type === "admin" /* || type === "superAdmin"  */ ? (
          <SidebarItem to="/inbox" text="Inbox" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_inbox} alt="inbox" />} />
        ) : user?.permissions?.includes("Inbox") ? (
          <SidebarItem to="/inbox" text="Inbox" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_inbox} alt="inbox" />} />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem
            to="/direct-import"
            text="Direct Import"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_import} alt="import" />}
            iconStyle={{
              fontSize: "1.7rem",
            }}
          />
        ) : user?.permissions?.includes("Direct Import") ? (
          <SidebarItem
            to="/direct-import"
            text="Direct Import"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_import} alt="import" />}
            iconStyle={{
              fontSize: "1.7rem",
            }}
          />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem
            to="/skip-trace"
            text="Skip Trace"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_skip} alt="skip" />}
          />
        ) : user?.permissions?.includes("Skip Trace") ? (
          <SidebarItem
            to="/skip-trace"
            text="Skip Trace"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_skip} alt="skip" />}
          />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem to="/campaigns" text="Campaigns" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_comp} alt="comp" />} />
        ) : user?.permissions?.includes("Campaigns") ? (
          <SidebarItem to="/campaigns" text="Campaigns" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_comp} alt="comp" />} />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem to="/templates/initial-templates" text="Templates" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_template} alt="template" />} />
        ) : user?.permissions?.includes("Templates") ? (
          <SidebarItem to={getTemplateRoute(user)} text="Templates" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_template} alt="template" />} />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem to="/batches" text="Batches" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_batch} alt="batch" />} />
        ) : user?.permissions?.includes("Batches") ? (
          <SidebarItem to="/batches" text="Batches" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_batch} alt="batch" />} />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem to="/drip" text="Drip Automations" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_drop} alt="drop" />} />
        ) : user?.permissions?.includes("Drip Automations") ? (
          <SidebarItem to="/drip" text="Drip Automations" icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_drop} alt="drop" />} />
        ) : (
          ""
        )}
        {type === "admin" ? (
          <SidebarItem
            to={isLarge ? "/settings/users" : "/settings/users"}
            text="Settings"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_setting} alt="sidebar_setting" />}
          />

        ) : user?.permissions?.includes("Settings") ? (
          <SidebarItem
            to={isLarge ? getTenantSettingsRoute(user) : getTenantSettingsRoute(user)}
            text="Settings"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_setting} alt="sidebar_setting" />}
          />
        ) : (
          ""
        )}
        {type === "admin" /* || type === "superAdmin" */ ? (
          <SidebarItem
            to="/resource-center"
            text="Resource Center"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_recourse} alt="sidebar_recourse" />}
          />
        ) : user?.permissions?.includes("Resource Center") ? (
          <SidebarItem
            to="/resource-center"
            text="Resource Center"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.sidebar_recourse} alt="sidebar_recourse" />}
          />
        ) : (
          ""
        )}
        {/* {type === "superAdmin" ? (
          <SidebarItem
            to="/admin-settings"
            text="Admin Settings"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.Admin_icon} alt="sidebar_recourse" />}
          />
        ) : (
          ""
        )} */}
        {type === "superAdmin" ? (
          <SidebarItem
            to="/master_setting/Adminuser"
            text="Settings"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.Admin_icon} alt="sidebar_recourse" />}
          />
        ) : settingspermission ? (
          <SidebarItem
            to={getSettingsRoute(user)}
            text="Settings"
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.Admin_icon} alt="sidebar_recourse" />}
          // onClick={() => {
          //   console.log("obj", user);
          //   if ( user?.role === "superAdmin" ||
          //     !user?.permissions?.includes("FC_Admin User") ||
          //     !user?.permissions?.includes("View_Admin User")
          //   ) {
          //     navigate("/master_setting/Adminuser"); // Redirect to New Request page
          //   } else if ( type === "superAdmin" ||
          //     !user?.permissions?.includes("FC_Roles & Permissions -Admin") || !user?.permissions?.includes("View_Roles & Permissions -Admin") ||
          //     !user?.permissions?.includes("FC_Roles & Permissions -Tenant") || !user?.permissions?.includes("View_Roles & Permissions -Tenant")
          //   ) {
          //     navigate("/master_setting/Rols&permission"); // Redirect to 10DLC page
          //   } else if (type === "superAdmin" ||
          //     !user?.permissions?.includes("FC_10Dlc Submission") ||
          //     !user?.permissions?.includes("View_10Dlc Submission")
          //   ){
          //     navigate("/market/Submission"); // Default behavior if permissions exist
          //   }
          // }}
          />
        ) : ""}
        {type === "superAdmin" && (
          <SidebarItem
            to="/flags"
            text="Flags"
            icon={<img width={"22px"} height={"22px"} src={Assets.Icons.sideBareFlag} alt="sidebar_recourse" />}
          />
        )}
             {type === "superAdmin" && (
          <SidebarItem
            to="/notifications"
            text="Notifications"
            icon={<img width={"22px"} height={"22px"} src={Assets.Icons.Notification} alt="sidebar_recourse" />}
          />
        )}
        {type === "superAdmin" ? (
          <SidebarItem
            to="/market/General"
            text="Markets and Limits "
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.markit} alt="sidebar_recourse" />}
          />
        ) : marketpermission ? (
          <SidebarItem
            to={getMarketRoute(user)}
            text="Markets and Limits "
            icon={<img width={"22px"} height={"22px"} src={Assets.Images.markit} alt="sidebar_recourse" />}
          />
        ) : ""}
      </div>

      <div className="sidebar_bottom">
        <div>
          {type === "admin" ? (
            <SidebarItem
              to="/company"
              text="My Company"
              icon={<img width={"22px"} height={"22px"} src={Assets.Images.My_company} alt="sidebar_recourse" />}
            />
          ) : (
            ""
          )}



          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <SidebarDropdown {...bindTrigger(popupState)}>
                  <div className="icon">
                    <img width={"22px"} height={"22px"} src={Assets.Images.feedback} alt="sidebar_recourse" />
                  </div>
                  {/* <span > */}
                  <span className="text"  >Help & Feedback</span>
                  <IoIosArrowDown style={{ color: "#012635" }} size={20} />
                  {/* </span> */}

                </SidebarDropdown>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: '',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: '',
                  }}
                >
                  {
                    FeedbackList.map((list, idx) => {
                      return (

                        <Typography sx={{ p: 2 }}><span style={{ cursor: 'pointer' }}>{list.title}</span></Typography>

                      )
                    })
                  }

                </Popover>
              </div>
            )}
          </PopupState>
          <div className="userDropdown">
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <SidebarDropdown {...bindTrigger(popupState)}>
                    <div className="icon">
                      <QABox>{getInitials(`${user?.firstName} ${user?.lastName}`)}</QABox>
                      {/* user?.fullName ? user?.fullName :  */}
                    </div>
                    <span className="text"  >{`${user?.firstName} ${user?.lastName}`}</span>
                    {/* user?.fullName ? user?.fullName :   */}
                    <IoIosArrowDown style={{ color: "#012635" }} size={20} />
                  </SidebarDropdown>
                  <Popover
                    // ref={ref}
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: '',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: '',
                    }}
                  >
                    <div style={{ padding: "7px", width: "232px" }}>

                      {(authUser?.impersonation || authUser?.impersonationtwo) && (
                        <DropdownItem onClick={() => {
                          removeUserImpersonation();
                          navigate("/redirect?redirect=/dashboard");
                          window.location.reload();
                        }} >Back to my account</DropdownItem>
                      )}

                      <DropdownItem onClick={() => {
                        // removeUserImpersonation();
                        navigate(`/tenant/profile/${user?._id}`);
                        window.location.reload();
                      }} >My Profile</DropdownItem>
                      {/* <DropdownItem onClick={() => {
                        setIsChangePasswordOpen(true);
                        onClose();
                      }} >Change Password</DropdownItem> */}
                      <DropdownItem onClick={() => {
                        setIsLoginAttemptsOpen(true);
                        onClose();
                      }} >Login attempts</DropdownItem>
                      {/* <DropdownItem onClick={() => {
                        onClose();
                      }} >Download Mobile App</DropdownItem> */}
                      <DropdownItem onClick={() => logOutHandler()} color="#FF5C39">Log out</DropdownItem>
                      {/* <div style={{ backgroundColor: "#FEE4A8", color: "#8F6401", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", width: "80%", marginLeft: "8px", marginBottom: "8px", marginTop: "12px" }}>
                        🎁 Refer a friend!
                      </div> */}
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
        </div>

      </div>

      <Components.Common.ModalTop
        onClose={() => { }}
        open={isChangePasswordOpen}
      >
        <ChangePasswordModal onClose={() => setIsChangePasswordOpen(false)} />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop onClose={() => { }} open={isLoginAttemptsOpen}>
        <LoginAttempsModal onClose={() => setIsLoginAttemptsOpen(false)} />

      </Components.Common.ModalTop>
    </SidebarStyled>
  );
};

export default Sidebar;


const LoginAttempsModalItem = ({ record }) => {
  return (
    <LoginAttempsModalItemStyled>
      <div className="left">
        <div className="IconCover">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4530_176297)">
              <path d="M6 24L26 24C27.1046 24 28 23.1046 28 22L28 8C28 6.89543 27.1046 6 26 6L6 6C4.89543 6 4 6.89543 4 8L4 22C4 23.1046 4.89543 24 6 24Z" stroke="#012635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20 28H12" stroke="#012635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 19H28" stroke="#012635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 24V28" stroke="#012635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
