import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./DripAutomation.module.css";

const Template = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1)
  const location = useLocation();
  const navigate = useNavigate();

  function hundleMenuBar(id) {
    setShowMenu(true);
    setTab(id)
  }
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
        <div className={styles.title}>Drip Automation</div>
        <button className={styles.AddNewButton} onClick={() => {
          navigate("/drip-automations/create");
        }}>
          Create New Drip Automation
        </button>
      </div>
      <div style={{overflow:"auto",flexGrow:1}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Template
