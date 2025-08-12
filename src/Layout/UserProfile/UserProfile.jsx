import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { FaChevronRight } from "react-icons/fa6";


const EditProfile = () => {
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
            <h6 onClick={() => {
              navigate("/redirect?redirect=/dashboard")
              window.location.reload();
            }} className={styles.parentBreadcrumb}>
              Dashboard
            </h6>
          </div>
          <div style={{ marginInline: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaChevronRight color='#012635' />
          </div>
          <div>
            <h6 className={styles.ChildBreadcrumb}>Edit Profile</h6>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default EditProfile
