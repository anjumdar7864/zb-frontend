import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./DripAutomation.module.css";
import { FaChevronRight } from "react-icons/fa6";


const Template = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1)
  const location = useLocation();

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

  const { templateId } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbsTop}>
        <div className={styles.innerBreadcrumbs}>
          <div>
            <h6 style={{cursor:'pointer'}} onClick={() => {
              navigate("/templates/initial-templates")
              window.location.reload();
            }} className={styles.parentBreadcrumb}>
              Templates
            </h6>
          </div>
          <div style={{ marginInline: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaChevronRight color='#012635' />
          </div>
          <div>
            <h6 className={styles.ChildBreadcrumb}>
              {location.pathname == "/templates/create-template" ? `Create ${location.search == "?follow=true" ? `Follow Up` : `Initial`} Template` :
                location.pathname == "/templates/create-replies" ? `Create Quick Reply` :location.pathname == `/templates/create-replies/${templateId}` ? `Edit Quick Reply` :
                location.pathname == `/templates/create-template/${templateId}` ? `Edit ${location.search == "?follow=true" ? `Follow Up` : `Initial`} Template`:
                ""}
            </h6>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Template
