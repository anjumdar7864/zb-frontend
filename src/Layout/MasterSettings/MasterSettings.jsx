import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./MasterSettings.module.css";

const MasterSettings = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1);
  const location = useLocation();

  // console.log("Current Route:", location.pathname);

  function hundleMenuBar(id) {
    setShowMenu(true);
    setTab(id);
  }
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  useEffect(() => {
    // Retrieve the object from localStorage
    // First, try to get the user data from sessionStorage
    let userData = localStorage.getItem("user");

    // If it's not found in sessionStorage, check localStorage
    if (!userData) {
      userData = localStorage.getItem("user");
    }

    // Check if the data exists in localStorage
    if (userData) {
      // Parse the JSON string into a JavaScript object
      const userObject = JSON.parse(userData);
      // Access the role property
      const role = userObject.role;
      setUserRole(role);
      // Output the role
      console.log("User role:", role);
    } else {
      console.log(
        'No user data found in userData under the key "user".',
        userData
      );
    }
  }, [showMenu]);
  return (
    <div className={styles.container}>
      <div className={styles.top} style={{ backgroundColor: "white" }}>
        <div className={styles.title}>Settings </div>
        <div className={styles.tabLayout}>
        {(user.role === 'superAdmin' || user?.permissions?.includes('FC_Admin User') || user?.permissions?.includes('View_Admin User')) && (
          <NavLink
            onClick={() => hundleMenuBar(0)}
            to="/master_setting/Adminuser"
            style={{ textDecoration: "none" }}
          >
            <div
              // style={{borderBottom:tab == 0 && "solid 2px #00BD82"}}
              style={{
                borderBottom:
                  location.pathname == "/master_setting/Adminuser" &&
                  "solid 2px #00BD82",
              }}
              className={styles.tabItems}
            >
              Admin User
            </div>
          </NavLink>
        )}
          {(user.role === 'superAdmin' || user?.permissions?.includes('FC_Roles & Permissions -Admin') || user?.permissions?.includes('FC_Roles & Permissions -Tenant')
          || user?.permissions?.includes('View_Roles & Permissions -Admin') || user?.permissions?.includes('View_Roles & Permissions -Tenant')) && (
          <NavLink
            onClick={() => hundleMenuBar(1)}
            to="master_setting/Rols&permission"
            style={{ textDecoration: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  borderBottom:
                    location.pathname == "/master_setting/Rols&permission" &&
                    "solid 2px #00BD82",
                }}
                className={styles.tabItems}
              >
                Roles & Permissions
              </div>
            </div>
          </NavLink>
           )}
           {(user.role === 'superAdmin' || user?.permissions?.includes('FC_10Dlc Submission') || user?.permissions?.includes('View_10Dlc Submission')) && (
          <NavLink
            onClick={() => hundleMenuBar(2)}
            to="/master_setting/Subscription"
            style={{ textDecoration: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  borderBottom:
                    location.pathname ==
                      "/master_setting/Subscription" &&
                    "solid 2px #00BD82",
                }}
                className={styles.tabItems}
              >
                Subscription Management
              </div>
            </div>
          </NavLink>
           )}
          <NavLink
            onClick={() => hundleMenuBar(0)}
            to="master_setting/Billing&invoicing"
            style={{ textDecoration: "none" }}
          >
            <div
              // style={{borderBottom:tab == 0 && "solid 2px #00BD82"}}
              style={{
                borderBottom:
                  location.pathname == "/master_setting/Billing&invoicing" &&
                  "solid 2px #00BD82",
              }}
              className={styles.tabItems}
            >
              Billing & Invoicing
            </div>
          </NavLink>
          <NavLink
            onClick={() => hundleMenuBar(0)}
            to="master_setting/Security"
            style={{ textDecoration: "none" }}
          >
            <div
              // style={{borderBottom:tab == 0 && "solid 2px #00BD82"}}
              style={{
                borderBottom:
                  location.pathname == "/master_setting/Security" && "solid 2px #00BD82",
              }}
              className={styles.tabItems}
            >
              Security
            </div>
          </NavLink>
        </div>
      </div>
      <div style={{ flexGrow: 1, overflow: "auto" , }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MasterSettings;
