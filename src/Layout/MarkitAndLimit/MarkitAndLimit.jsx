import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./MarkitAndLimit.module.css";
import { useDispatch } from 'react-redux';
import { getAllMarketsLength } from '@/store/actions/market.action';

const MarkitAndLimit = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [getData , setGetData] = useState()
  const [tab, setTab] = useState(1)
  const location = useLocation();

const dispatch = useDispatch()
 

const user = JSON.parse(
  localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
);

  const getlength = async () =>{

     await dispatch(
      getAllMarketsLength(
        {
          // You can pass any additional parameters if needed, e.g., limit, page, search, etc.
        } , (e)=>{

          if(e){
            setGetData(e)

          }
        }
      )
    );

    
  }

  useEffect(()=>{
    getlength()
  },[tab])

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

        <div className={styles.title}>Markets and Limits </div>
        <div className={styles.tabLayout}>
        {(user.role === 'superAdmin' || user.permissions.includes('FC_General') || user.permissions.includes('View_General')) && (user.role) && (
          <NavLink onClick={() => hundleMenuBar(0)} to="/market/General" style={{ textDecoration: "none" }}>
            <div
              // style={{borderBottom:tab == 0 && "solid 2px #00BD82"}} 
              style={{ borderBottom: location.pathname == "/market/General" && "solid 2px #00BD82" }}
              className={styles.tabItems}>General</div>
          </NavLink>
        )}
          {(user.role === 'superAdmin' || user.permissions.includes('FC_New Request') || user.permissions.includes('View_New Request')) && (
          <NavLink onClick={() => hundleMenuBar(1)} to="/market/NewRequest" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ borderBottom: location.pathname == "/market/NewRequest" && "solid 2px #00BD82" }} className={styles.tabItems}>New Request</div>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "white", backgroundColor: "#06AB78", borderRadius: "12px", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>{getData?.newRequestCount ? getData?.newRequestCount : 0 }</span>
            </div>
          </NavLink>)}
          {(user.role === 'superAdmin' || user.permissions.includes('FC_10Dlc Submission') || user.permissions.includes('View_10Dlc Submission')) && (
          <NavLink onClick={() => hundleMenuBar(2)} to="/market/Submission" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ borderBottom: location.pathname == "/market/Submission" && "solid 2px #00BD82" }} className={styles.tabItems}>10DLC Submission</div>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "white", backgroundColor: "#06AB78", borderRadius: "12px", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>{getData?.tenDlcCount ? getData?.tenDlcCount  : 0 }</span>

            </div>
          </NavLink>
          )}

        </div>

      </div>
      <div style={{ flexGrow: 1, overflow: "auto" }}>
        <Outlet />

      </div>
    </div>
  )
}

export default MarkitAndLimit
