import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./dripAutomation.module.css";

const DripAutomation = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1)
  const location = useLocation();
  function hundleMenuBar(id) {
    setShowMenu(true);
    setTab(id)
  }
  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (!userData) {
      userData = localStorage.getItem("user");
    }
    if (userData) {
      const userObject = JSON.parse(userData);
      const role = userObject.role;
      setUserRole(role);
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
      </div>
      <div style={{ overflow: "auto", flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default DripAutomation
