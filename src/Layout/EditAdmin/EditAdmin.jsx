import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./EditAdmin.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";


const EditAdmin = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(1)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
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
        {/* <div>
          <h6 onClick={() => {navigate("/tenant")}} style={{ cursor: 'pointer' }} className={styles.parentBreadcrumb}>
            Tenant Management
          </h6>
        </div> */}
        <div style={{ marginInline: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaChevronLeft color='#012635' />
        </div>
        <div>
            <Link to={"/master_setting/Adminuser"}>
          <h6 className={styles.ChildBreadcrumb}>Back to  Admin user</h6>
          </Link>
        </div>
      </div>
    </div>
    <div className={styles.top} style={{ backgroundColor: "white" }}>
      <div className={styles.title}>Edit Admin</div>
      <div className={styles.tabLayout}>
        <NavLink onClick={() => hundleMenuBar(0)} to={`/master_setting/AdminuserEdit?userId=${userId}`} style={{ textDecoration: "none" }}>
          <div
            style={{ borderBottom: location.pathname == `/master_setting/AdminuserEdit` && "solid 2px #00BD82" }}
            className={styles.tabItems}>General</div>
        </NavLink>
        <NavLink  onClick={() => hundleMenuBar(1)} style={{ textDecoration: "none" }} to={`/master_setting/AdminuserNotification?userId=${userId}`}
        
            >
          <div style={{ borderBottom: location.pathname == "/master_setting/AdminuserNotification" && "solid 2px #00BD82" }} className={styles.tabItems}>Notifications</div>
        </NavLink>
    
      </div>
    </div>
    <div style={{ overflow: "auto", flexGrow: 1 }}>
      <Outlet />
    </div>
  </div>
  )
}

export default EditAdmin
