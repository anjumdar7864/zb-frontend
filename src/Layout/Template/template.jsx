import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./template.module.css";

const Template = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1)
  const location = useLocation();

  function hundleMenuBar(id) {
    setShowMenu(true);
    setTab(id)
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
        <div className={styles.title}>Templates</div>
        <div className={styles.tabLayout}>
        {(user.role === 'admin' || user.permissions.includes('Create Initial Template') || user.permissions.includes('Edit Initial Template') 
        || user.permissions.includes('Delete Initial Template') || user.permissions.includes('Initial Template List Table')
        ) && (
          <NavLink onClick={() => hundleMenuBar(0)} to="/templates/initial-templates" style={{ textDecoration: "none" }}>
            <div
              // style={{borderBottom:tab == 0 && "solid 2px #00BD82"}} 
              style={{ borderBottom: location.pathname == "/templates/initial-templates" && "solid 2px #00BD82" }}
              className={styles.tabItems}>Initial Templates</div>
          </NavLink>
        )}
        {(user.role === 'admin' || user.permissions.includes('Create Quick Replies') || user.permissions.includes('Edit Quick Replies') 
        || user.permissions.includes('Delete Quick Replies') || user.permissions.includes('Drag and Drop quick reply in the list to change position of quick reply')
        ) && (
          <NavLink onClick={() => hundleMenuBar(1)} to="/templates/quick-replies" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/templates/quick-replies" && "solid 2px #00BD82" }} className={styles.tabItems}>Quick Replies</div>
          </NavLink>
        )}
        {(user.role === 'admin' || user.permissions.includes('Create Follow-up Template') || user.permissions.includes('Edit Follow-up Template') 
        || user.permissions.includes('Delete Follow-up Templat') || user.permissions.includes('Follow-up Template Table') || user.permissions.includes('Follow-up Template Search')
        ) && (
          <NavLink onClick={() => hundleMenuBar(2)} to="/templates/follow-up-messages" style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/templates/follow-up-messages" && "solid 2px #00BD82" }} className={styles.tabItems}>Follow Up Templates</div>
          </NavLink>
        )}
        </div>
      </div>
      <div style={{overflow:"auto",flexGrow:1}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Template
