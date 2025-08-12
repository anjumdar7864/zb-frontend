import {
  FaCogs,
  FaEdit,
  FaHandPaper,
  FaInfoCircle,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { AiFillControl } from "react-icons/ai";
import { AdminSettingsStyled } from "./styles";
import { LightTooltip } from "@/components/common";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const navigate = useNavigate();
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");

  // useEffect(() => {
  //   if (type != "admin" || type != "superAdmin") {
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <AdminSettingsStyled>
      <div className="top">
        <h1>Admin Settings</h1>
      </div>
      <div className="bottom">
        <div className="item">
          <div className="top">
            <h2>
              <span className="text">Users Management</span>
              <LightTooltip arrow placement="top" title="Users Management">
                <sup className="icon">
                  <FaInfoCircle />
                </sup>
              </LightTooltip>
            </h2>
          </div>
          <div className="bottom">
            <Link to="user-list">
              <span className="icon">
                <FaUser />
              </span>
              <span className="text">Users List</span>
            </Link>
            <Link to="user-new">
              <span className="icon">
                <FaUserEdit />
              </span>
              <span className="text">Create New User</span>
            </Link>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <h2>
              <span className="text">Roles Management</span>
              <LightTooltip arrow placement="top" title="Roles Management">
                <sup className="icon">
                  <FaInfoCircle />
                </sup>
              </LightTooltip>
            </h2>
          </div>
          <div className="bottom">
            <Link to="role-list">
              <span className="icon">
                <AiFillControl />
              </span>
              <span className="text">Roles List</span>
            </Link>
            <Link to="role-new">
              <span className="icon">
                <FaEdit />
              </span>
              <span className="text">Create New Role</span>
            </Link>
          </div>
        </div>
        {/* <div className="item">
          <div className="top">
            <h2>
              <span className="text">Permissions Management</span>
              <LightTooltip
                arrow
                placement="top"
                title="Permissions Management"
              >
                <sup className="icon">
                  <FaInfoCircle />
                </sup>
              </LightTooltip>
            </h2>
          </div>
          <div className="bottom">
            <Link to="permission-list">
              <span className="icon">
                <FaHandPaper />
              </span>
              <span className="text">Permissions List</span>
            </Link>
            <Link to="permission-new">
              <span className="icon">
                <FaCogs />
              </span>
              <span className="text">Create New Permission</span>
            </Link>
          </div>
        </div> */}
      </div>
    </AdminSettingsStyled>
  );
};

export default AdminSettings;
