import { useEffect, useState } from "react";

import { NavLink, Outlet } from "react-router-dom";
import { MenuBarStyle, SettingsStyled } from "./styles";

const Settings = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [userRole, setUserRole] = useState(null);
  

  function hundleMenuBar() {
    setShowMenu(true);
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
    <SettingsStyled>
      <div className="left">
        {userRole != null && <MenuBar userRole={userRole} />}
        <div className="mobileMenu">
          <div
            style={{
              left: `${showMenu ? "-28rem" : "7rem"}`,
              transition: "all ease-in-out 0.3s",
            }}
          >
            <MenuBar onClick={hundleMenuBar} userRole={userRole} />
          </div>
          <button
            style={{
              left: `${showMenu ? "7rem" : "33rem"}`,
              transition: "all ease-in-out 0.3s",
            }}
            onClick={() => setShowMenu(!showMenu)}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="right">
        <Outlet />
      </div>
    </SettingsStyled>
  );
};

export default Settings;

const type = localStorage.getItem("type") ?? localStorage.getItem("type");

const MenuBar = (props) => {
  return (
    <MenuBarStyle>
      <div className="top">
        <h1>Settings</h1>
      </div>
      <div className="bottom">
        {props.userRole == "admin" && (
          <NavLink onClick={props.onClick} to="/settings/users">
            Users
          </NavLink>
        )}
        {props.userRole == "admin" && (
          <NavLink onClick={props.onClick} to="/settings/billing">
            Billing
          </NavLink>
        )}

        <NavLink onClick={props.onClick} to="/settings/market-lists">
          Markets & Limits
        </NavLink>
        {props.userRole == "admin" && (
          <NavLink onClick={props.onClick} to="/settings/do-not-calls">
            Do Not Calls
          </NavLink>
        )}

        {props.userRole == "admin" && (
          <NavLink onClick={props.onClick} to="/settings/export-prospects">
            Export Prospects
          </NavLink>
        )}

        {props.userRole == "admin" && (
          <NavLink onClick={props.onClick} to="/settings/tags">
            Tags
          </NavLink>
        )}

        <NavLink onClick={props.onClick} to="/settings/integrations">
          Integrations
        </NavLink>
      </div>
    </MenuBarStyle>
  );
};
