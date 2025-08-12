import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Settings.module.css";

const SettingsA = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null); // Added state for subscriptionId
  const [tab, setTab] = useState(1);
  const location = useLocation();

  console.log("Current Route:", location.pathname);

  function hundleMenuBar(id) {
    setShowMenu(true);
    setTab(id);
  }
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  useEffect(() => {
    // Retrieve the object from localStorage
    let userData = localStorage.getItem("user") || localStorage.getItem("user");

    if (userData) {
      try {
        const userObject = JSON.parse(userData);
        setUserRole(userObject.role);
        setSubscriptionId(userObject.subscriptionId); // Set subscriptionId to state
        console.log("User role:", userObject.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log('No user data found in storage under the key "user".');
    }
  }, [showMenu]);
  return (
    <div className={styles.container}>
      <div className={styles.top} style={{ backgroundColor: "white" }}>
        <div className={styles.title}>Settings</div>
        <div className={styles.tabLayout}>

        {(user.role === 'admin' || user.permissions.includes('Create User') || user.permissions.includes('View User')) && (
          <NavLink onClick={() => hundleMenuBar(0)} to="/settings/users" style={{ textDecoration: "none" }}>
            <div
              // style={{borderBottom:tab == 0 && "solid 2px #00BD82"}} 
              style={{ borderBottom: location.pathname == "/settings/users" && "solid 2px #00BD82" }}
              className={styles.tabItems}>User</div>
          </NavLink>
          )}
          {(user.role === 'admin' || user.permissions.includes('Request New Market') || user.permissions.includes('View Market and Limit Stats') || user.permissions.includes('Search Market') || user.permissions.includes('View 10 DLC Registration Details')) && (
          <NavLink onClick={() => hundleMenuBar(1)} to="/settings/market-lists" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/settings/market-lists" && "solid 2px #00BD82" }} className={styles.tabItems}>Markets & Limits</div>
          </NavLink>)}
          {(user.role === 'admin' || user.permissions.includes('Create New DNC') || user.permissions.includes('Import or Drag & Drop DNC List') || user.permissions.includes('Export New DNC List') || 
          user.permissions.includes('DNC Table') || user.permissions.includes('DNC Number Edit/Delete option') ) && (
          <NavLink onClick={() => hundleMenuBar(2)} to="/settings/do-not-calls" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/settings/do-not-calls" && "solid 2px #00BD82" }} className={styles.tabItems}>Do Not Calls</div>
          </NavLink>)}
          {(user.role === 'admin' || user.permissions.includes('Create New Tag') || user.permissions.includes('Edit Tag') || user.permissions.includes('Delete Tag') || 
          user.permissions.includes('Tag Table Stats')) && (
          <NavLink onClick={() => hundleMenuBar(3)} to="/settings/tags" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/settings/tags" && "solid 2px #00BD82" }} className={styles.tabItems}>Tags</div>
          </NavLink>
          )}
          { (user.role === 'admin' || user.permissions.includes('Export Prospect') || user.permissions.includes('Email Export Results to Admin')) && subscriptionId !== "6744617ea4d142ed16ea9c9e" && (
          <NavLink onClick={() => hundleMenuBar(4)} to="/settings/export-prospects" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/settings/export-prospects" && "solid 2px #00BD82" }} className={styles.tabItems}>Export Prospects</div>
          </NavLink>
          )}
          {(user.role === 'admin')  && subscriptionId !== "6744617ea4d142ed16ea9c9e" && (
          <NavLink onClick={() => hundleMenuBar(5)} to="/settings/integrations" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/settings/integrations" && "solid 2px #00BD82" }} className={styles.tabItems}>Integrations</div>
          </NavLink>
          )}
        </div>

      </div>
      <div style={{ flexGrow: 1 , overflow:"auto" }} className={styles.MainContainerSetting}>
        <Outlet />
      </div>
    </div>
  )
}

export default SettingsA
