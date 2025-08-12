import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./TenatManagement.module.css";
import { FaChevronRight } from "react-icons/fa6";

const TenatManagement = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1)
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Removes empty strings
  const pageName = pathSegments[0];

  console.log("location...", pageName);

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



  const { Id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbsTop}>
        <div className={styles.innerBreadcrumbs}>
          <div>
            <h6 onClick={() => {
              if (pageName == "tenant") {
                navigate("/tenant")
              } else {
                navigate("/flags")
              }
            }} style={{ cursor: 'pointer' }} className={styles.parentBreadcrumb}>
              {
                pageName == "tenant" ? "Tenant Management" : "Flags"
              }
              {/* Tenant Management */}
            </h6>
          </div>
          <div style={{ marginInline: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaChevronRight color='#012635' />
          </div>
          <div>
            <h6 className={styles.ChildBreadcrumb}>Edit Tenant Profile</h6>
          </div>
        </div>
      </div>
      <div className={styles.top} style={{ backgroundColor: "white" }}>
        <div className={styles.title}>Edit Tenant</div>
        <div className={styles.tabLayout}>
          <NavLink onClick={() => hundleMenuBar(0)} to={`${pageName == "tenant" ? `/tenant/edit/${Id}}` : `/flags/edit/${Id}`}`} style={{ textDecoration: "none" }}>
            <div
              style={{ borderBottom: location.pathname == `/tenant/edit/${Id}` || location.pathname == `/flags/edit/${Id}` ? "solid 2px #00BD82" : "" }}
              className={styles.tabItems}>General</div>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/templates/quick-replies" && "solid 2px #00BD82" }} className={styles.tabItems}>Billing & Invoicing</div>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <div style={{ borderBottom: location.pathname == "/templates/follow-up-messages" && "solid 2px #00BD82" }} className={styles.tabItems}>Markets & limit</div>
          </NavLink>
        </div>
      </div>
      <div style={{ overflow: "auto", flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default TenatManagement
