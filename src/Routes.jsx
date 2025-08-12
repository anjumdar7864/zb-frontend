import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Modules from "@/modules";
import Components from "./components";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import {
  HandleRedirection,
  NotFound,
  ProtectedRoutes,
  ProtectedloginRoutes,
} from "./protection";
import { useDispatch } from "react-redux";
import { useSocketEvents } from "@/hooks";
import {
  inboxMessageConstants,
  directImportConstants,
  dashboardConstant,
} from "@/store/constants";
import { GetAllTenets } from "@/store/actions/tenets.action";
import { GetCompleteStatusBatch, GetSingleUser } from "./store/actions";


const Routes = () => {
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  // console.log("user", user);
  const dispatch = useDispatch();
console.log("VITE_APP_STRIPE_PUBLISHABLE_KEY", import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY?.replace(/\/$/, ''));
  const events = [
    {
      name: "new-message",
      handler(message) {

        // if(user?.organizationName == message?.organizationName){
        //    dispatch(
        //         GetCompleteStatusBatch(
        //           1,
        //           10,

        //         "",
        //         "",
        //         "",
        //         true ,

        //         )
        //       );

        // }

        //message = JSON.parse(message);
        console.log("message", message);
        dispatch({
          type: inboxMessageConstants.NEW_MESSAGE_RECEIVED,
          payload: message,
        });
        dispatch({
          type: inboxMessageConstants.NEW_MESSAGE_RECEIVED_AGAIN,
          payload: message,
        });
        dispatch({
          type: inboxMessageConstants.NEW_MESSAGE_RECEIVED_AGAIN_AGAIN,
          payload: message,
        });
      },
    },

    {
      name: "new-notification-created",
      handler(message) {

        
        console.log("new-notification-created", message);
        dispatch({
          type: dashboardConstant.GET_NOTIFICATION_SUCCESS,
          payload:JSON.parse(message) ,
        });
 
      },
    },
    {
      name: "stripe-callback",
      handler(message) {
        console.log("message -=-=-=-=-=-=", message, user?.organizationName);

        if (message == user?.organizationName) {
          dispatch(GetSingleUser(user?._id, "admin", (data) => {
            const shadowUser = user;
            shadowUser.status = data?.status;
            shadowUser.isCanceledSubscription = data?.isCanceledSubscription;
            localStorage.setItem("user", JSON.stringify(shadowUser)
            )
          }));

        }
        // window.location.reload();



      },
    },
    //   {
    //   name: "batch-update",
    //   handler(message) {
    //     const shadowMessage = JSON.parse(message);


    //     // window.location.reload();
    //     if(user?.organizationName == shadowMessage?.data){
    //        dispatch(
    //             GetCompleteStatusBatch(
    //               1,
    //               10,
    //             "",
    //             "",
    //             "",
    //             true ,
    //             )
    //           );

    //     }


    //   },
    // },
    {
      name: "file-complete",
      handler(message) {



        const parsedMessage = JSON.parse(message);
        // console.log("file-complete message is", parsedMessage);


        //message = JSON.parse(message);
        if (parsedMessage.admin == user._id) {
          console.log("check success ...");

          dispatch({
            type: directImportConstants.file_completed,
            payload: true,  // Dispatch fileCompleted as true
          });
        } else if (parsedMessage.user == user?._id) {
          dispatch({
            type: directImportConstants.file_completed,
            payload: true,  // Dispatch fileCompleted as true
          });
        }


        console.log("dispatched");
      },
    },
    {
      name: "reset-password",
      handler(message) {

        //message = JSON.parse(message);
        let userInfo =
          localStorage.getItem("user") || localStorage.getItem("user");
        userInfo = JSON.parse(userInfo);
        if (userInfo._id == message) {
          localStorage.removeItem("userToken");
          sessionStorage.removeItem("userToken");
          window.location.href = "/";
        }
      },
    },
    {
      name: "new-tenant-created",
      handler(message) {


        console.log("new tenant message is", message);
        dispatch(GetAllTenets());
      },
    },
  ];
  useSocketEvents(user._id, events);



  const LoginProtectedRoutes = [
    // {
    //   path: "/",
    //   element: <Modules.Home />,
    //   title: "Home",
    // },
    {
      path: "/login",
      element: <Modules.Login />,
      title: "Login",
    },
    {
      path: "/",
      element: <Modules.Login />,
      title: "Login",
    },
    {
      path: "/signup/:id?",
      element: <Modules.SignUp />,
      title: "Signup",
    },
    // {
    //   path: "/pricing",
    //   element: <Modules.PricingPlans />,
    //   title: "Pricing Plans",
    // },
    // {
    //   path: "/contactus",
    //   element: <Modules.Contactus />,
    //   title: "Contact Us",
    // },
    // {
    //   path: "/careers",
    //   element: <Modules.Careers />,
    //   title: "careers",
    // },
    // {
    //   path: "/about-us",
    //   element: <Modules.About />,
    //   title: "About Us",
    // },
    // {
    //   path: "/wellcome",
    //   element: <Modules.WellComePage />,
    //   title: "Well Come",
    // },
    // {
    //   path: "/privacy-policy",
    //   element: <Modules.PrivacyPolicy />,
    //   title: "Privacy Policy",
    // },
    // {
    //   path: "/resourse-center",
    //   element: <Modules.RescourceCenter />,
    //   title: "Resource Center",
    // },
    // {
    //   path: "/real-estate",
    //   element: <Modules.RealEstate />,

    //   title: "Real Estate",
    // },
    // {
    //   path: "/Maintenance",
    //   element: <Modules.Maintenance />,
    //   title: "Maintenance",
    // },
    // {
    //   path: "/terms-and-conditions",
    //   element: <Modules.TermAndConditions />,
    //   title: "Terms and Conditions",
    // },
    {
      path: "/create-password/:id?/:token?",
      element: <Modules.PasswordReset />,
      title: "Reset Password",
    },
    {
      path: "/change-password/:id/:token?",
      element: <Modules.ChangePassword />,
      title: "Change Password",
    },
    {
      path: "/forget-password",
      element: <Modules.ForgetPassword />,
      title: "Forgot Password",
    },
    {
      path: "/not-found",
      element: <NotFound />,
      title: "Not Found",
    },
    {
      path: "*",
      element: <NotFound />,
      title: "Not Found",
    },
  ];

  const protectedRoutes = {
    Dashboard: [
      {
        path: "/dashboard",
        element: <Modules.Dashboard />,
        title: "Dashboard",
      },
    ],
    Company: [
      {
        path: "/company",
        element: <Modules.Company />,
        title: "Company",
      },
      {
        path: "/subscribe",
        element: <Modules.Subscribe />,
        title: "Subscribe",
      },
    ],
    MarkitAndLimit: [
      {
        path: "/market/General",
        element: <Modules.MasterMarkit.General />,
        title: "General",
        layout: <Layout.MarkitAndLimit />,
      },
      {
        path: "/market/NewRequest",
        element: <Modules.MasterMarkit.NewRequest />,
        title: "NewRequest",
        layout: <Layout.MarkitAndLimit />,
      },
      {
        path: "/market/Submission",
        element: <Modules.MasterMarkit.Submission />,
        title: "Submission",
        layout: <Layout.MarkitAndLimit />,
      },
    ],
    MasterSetting: [
      {
        path: "/master_setting/Adminuser",
        element: <Modules.MasterSettings.AdminUser />,
        title: "Admin user",
        layout: <Layout.MasterSettings />,
      },
      {
        path: "/master_setting/Rols&permission",
        element: <Modules.MasterSettings.RolesAndPermissions />,
        title: "Roles & Permissions",
        layout: <Layout.MasterSettings />,
      },
      {
        path: "/master_setting/Subscription",
        element: <Modules.MasterSettings.SubscriptionManagement />,
        title: "Subscription",
        layout: <Layout.MasterSettings />,
      },
      {
        path: "/master_setting/Billing&invoicing",
        // element: <Modules.MasterSettings.BillingAndInvoicing />,
        element: <Modules.MasterSettings.SecurityPage />,
        title: "Billing & Invoicing",
        layout: <Layout.MasterSettings />,
      },
      {
        path: "master_setting/Security",
        element: <Modules.MasterSettings.SecurityPage />,
        title: "Security",
        layout: <Layout.MasterSettings />,
      },
      {
        path: "/master_setting/AdminuserEdit",
        element: <Modules.MasterSettings.AdminEdit />,
        title: "EditAdmin",
        layout: <Layout.EditAdmin />,
      },

      {
        path: "/master_setting/AdminuserNotification",
        element: <Modules.MasterSettings.AdminNotification />,
        title: "EditAdmin",
        layout: <Layout.EditAdmin />,
      },
    ],
    Flags: [
      {
        path: "/flags",
        element: <Modules.Flags />,
        // element: <Modules.Company />,
        title: "Flags",
      },
     
    ],

    Notifications:[
      {
        path: "/notifications",
        element: <Modules.Notification />,
        // element: <Modules.Company />,
        title: "Notifications",
      },
      {
        path: "/notifications/create",
        element: <Modules.NotificationCreate />,
        title: "Createt notification",
      
      },
    ] , 
    Tenat: [
      {
        path: "/tenant",
        element: <Modules.Tenat />,
        // element: <Modules.Company />,
        title: "Tenant",
      },
      {
        path: "/tenant/edit/:Id",
        element: <Modules.EditTenet />,
        title: "Edit Tenant",
        layout: <Layout.EditTenat />,
      },
      {
        path: "/tenant/profile/:Id",
        element: <Modules.TenatProfile />,
        title: "Tenant Profile",
        layout: <Layout.EditProfile />,
      },

      {
        path: "/admin/profile/:Id",
        element: <Modules.AdminProfile />,
        title: "Tenant Profile",
        layout: <Layout.EditProfile />,
      },
      // {
      //   path: "/company",
      //   element: <Modules.Company />,
      //   title: "Company",
      // },
    ],

    "Direct Import": [
      {
        path: "/direct-import",
        element: <Modules.DirectImportA />,
        title: "Direct Import",
        // layout: <Layout.DirectImport/>,

      },
    ],
    User: [
      {
        path: "/User/profile/:Id",
        element: <Modules.UserProfile />,
        title: "Direct Import",
        layout: <Layout.UserProfile />,
      },
    ],
    adminRoutes: [
      {
        path: "/admin-settings/user-list",
        element: <Modules.AdminSettings.UsersList />,
        title: "Admin Settings",
      },
      {
        path: "/admin-settings",
        element: <Modules.AdminSettings.AdminSettings />,
        title: "Admin Settings",
      },
      {
        path: "/admin-settings/user-new",
        element: <Modules.AdminSettings.UserNew />,
        title: "Create New User",
      },
      {
        path: "/admin-settings/user-edit/:userId",
        element: <Modules.AdminSettings.UserEdit />,
        title: "Edit User",
      },
      {
        path: "/admin-settings/role-list",
        element: <Modules.AdminSettings.RolesList />,
        title: "Roles List",
      },
      {
        path: "/admin-settings/role-list/:roleName",
        element: <Modules.AdminSettings.SingleRoleList />,
        title: "Single Role List",
      },
      {
        path: "/admin-settings/role-new",
        element: <Modules.AdminSettings.RoleNew />,
        title: "Create New Role",
      },
      {
        path: "/admin-settings/role-edit/:roleId",
        element: <Modules.AdminSettings.RoleEdit />,
        title: "Edit Role",
      },
      {
        path: "/admin-settings/permission-list",
        element: <Modules.AdminSettings.PermissionList />,
        title: "Permissions List",
      },
      {
        path: "/admin-settings/permission-new",
        element: <Modules.AdminSettings.PermissionNew />,
        title: "Create New Permission",
      },
      {
        path: "/admin-settings/permission-edit/:permissionId",
        element: <Modules.AdminSettings.PermissionEdit />,
        title: "Edit Permission",
      },
    ],
    Campaigns: [
      {
        path: "/campaigns",
        element: <Modules.Campaigns.Campaigns />,
        title: "Campaigns",
        layout: <Layout.Campaign />,
      },
      {
        path: "/campaigns/create-follow-up",
        element: <Modules.Campaigns.CreateFollowUp />,
        title: "Create Follow Up",
        layout: <Layout.FollowupCampaign />,
      },
      {
        path: "/campaigns/:campaignId",
        element: <Modules.Campaigns.SingleCampaignDetails />,
        title: "Campaign Details",
        layout: <Layout.CampaignDetail />,
      },
    ],
    Settings: [
      // {
      //   path: "/settings",
      //   element: <Modules.Settings.Settings />,
      //   title: "Settings",
      // },
      {
        path: "/settings/billing",
        element: <Modules.Settings.Billing />,
        title: "Billing",
        layout: <Layout.Settings />,
      },
      {
        path: "/settings/update-billing",
        element: <Modules.Settings.UpdateBilling />,
        title: "Update Billing",
        layout: <Layout.Settings />,
      },
      {
        path: "/settings/users",
        element: <Modules.Settings.Users />,
        title: "Users List",
        layout: <Layout.Settings />,
      },
      {
        path: "/settings/market-lists",
        element: <Modules.Settings.MarketLists />,
        title: "Markets List",
        layout: <Layout.Settings />,
      },
      {
        path: "/settings/tags",
        element: <Modules.Settings.Tags />,
        title: "Tags",
        layout: <Layout.Settings />,
      },

      {
        path: "/settings/integrations",
        element: <Modules.Settings.Integrations />,
        title: "Integrations",
        layout: <Layout.Settings />,
      },
      {
        path: "/settings/export-prospects",
        element: <Modules.Settings.ExportProspect />,
        title: "Export Prospects",
        layout: <Layout.Settings />,
      },

      {
        path: "/settings/do-not-calls",
        element: <Modules.Settings.DoNotCalls />,
        title: "DoNotCalls",
        layout: <Layout.Settings />,
      },
    ],
    Templates: [
      {
        path: "/templates/initial-templates",
        element: <Modules.Template.InitialTemplate />,
        title: "Initial Templates",
        layout: <Layout.Template />,
      },
      {
        path: "/templates/quick-replies",
        element: <Modules.Template.QuickReplies />,
        title: "Quick Replies",
        layout: <Layout.Template />,
      },
      {
        path: "/templates/follow-up-messages",
        element: <Modules.Template.FollowUpTemplate />,
        title: "Follow Up Templates",
        layout: <Layout.Template />,
      },
      {
        path: "/templates/create-template",
        element: <Modules.Template.CreateTemplate />,
        title: "Create Template",
        layout: <Layout.CreateTemplate />,
      },
      {
        path: "/templates/create-template/:templateId",
        element: <Modules.Template.CreateTemplate />,
        title: "Edit Template",
        layout: <Layout.CreateTemplate />,
      },
      {
        path: "/templates/create-replies",
        element: <Modules.Template.CreateReplies />,
        title: "Create Reply",
        layout: <Layout.CreateTemplate />,
      },
      {
        path: "/templates/create-replies/:templateId",
        element: <Modules.Template.CreateReplies />,
        title: "Edit Reply",
        layout: <Layout.CreateTemplate />,
      },
    ],
    Inbox: [
      {
        path: "/batches",
        element: <Modules.Batches />,
        title: "Batches",
      },
    ],
    Batches: [
      {
        path: "/inbox",
        element: <Modules.Inbox />,
        title: "Inbox",
        layout: <Layout.InboxLayout />,
      },
    ],
    SkipTrace: [
      {
        path: "/skip-trace",
        element: <Modules.WellComePage />,
        title: "Skip Trace",
      },
    ],

    DripAutomations: [
      {
        path: "/drip",
        element: <Modules.DripAutomation.DripAutomation />,
        title: "Drip Automations",
        layout: <Layout.DripAutomation />,
      },
      {
        path: "/drip-automations/create",
        element: <Modules.DripAutomation.CreateDripAutomation />,
        title: "Create Drip Automation",
      },
      {
        path: "/drip-automations/:dripId",
        element: <Modules.DripAutomation.CreateDripAutomation />,
        title: "Edit Drip Automation",
      },
    ],

    ResourceCenter: [
      {
        path: "/resource-center",
        element: <Modules.WellComePage />,
        title: "Resource Center",
      },
    ],
  };


  return (
    <HashRouter>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
      <Components.Common.Loader />
      <Components.Common.ErrorModal />
      <Components.Common.ErrorModal2 />
      <Components.Common.ModalToast />
      <RouterRoutes>
        <Route path="/redirect" element={<HandleRedirection />} />
        <Route element={<ProtectedloginRoutes />}>
          {LoginProtectedRoutes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={
                <Components.Common.RouteElementWithTitle
                  element={route.element}
                  title={route.title}
                />
              }
            />
          ))}
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout.HeaderSidebar />}>
            {Object.keys(protectedRoutes).map((key, ind) =>
              protectedRoutes[key].map((route, index) =>
                ((type === "superAdmin" || type === "other" || user?.role?.permissions?.includes(key)) && route.path === "/tenant") ||
                  (route.path !== "/tenant" && (type === "admin" || type === "superAdmin" || type === "other" || user?.role?.permissions?.includes(key))) ? (
                  route.layout ? (
                    <Route key={`${ind},${index}`} element={route.layout}>
                      <Route
                        path={route.path}
                        element={
                          <Components.Common.RouteElementWithTitle
                            element={route.element}
                            title={route.title}
                          />
                        }
                      />
                    </Route>
                  ) : (
                    <Route
                      path={route.path}
                      key={`${ind},${index}`}
                      element={
                        <Components.Common.RouteElementWithTitle
                          element={route.element}
                          title={route.title}
                        />
                      }
                    />
                  )
                ) : null
              )
            )}
          </Route>
          <Route path="/company" element={<Modules.Company />} />
          <Route path="/well" element={<Modules.WellComePage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </RouterRoutes>
    </HashRouter>
  );
};

export default Routes;
