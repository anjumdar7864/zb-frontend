import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./inbox.module.css";
import { IoSearchOutline } from "react-icons/io5";

const InboxLayout = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1);
  const location = useLocation();

  function hundleMenuBar(id) {
    setShowMenu(true);
    setTab(id);
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
    }
  }, [showMenu]);
  return (
    <div className={styles.container}>
      {/* <div className={styles.top} style={{ backgroundColor: "white" }}>
        <div className={styles.title}>Inbox</div>
        <div style={{ position: 'relative' }}>
          <div style={{position:'absolute',top:10,left:10}}>
            <IoSearchOutline color='#012635' size={22}/>
          </div>
          <input type='text' className={styles.SearchBar} placeholder='Search for a user'/>
        </div>
      </div> */}
      <div style={{ overflow: "auto", flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default InboxLayout;
