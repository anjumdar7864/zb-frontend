import React, { useState } from "react";
import styles from "./RolesAndPermissions.css";
import { FiSearch } from "react-icons/fi";
import RolesAndPermissionsAdmin from "./RolesAndPermissionsAdmin";
import RolesAndPermissionsTenant from "./RolesAndPermissionsTenant";

import Components from "@/components";
import RolesAndPermissionsModal from "./RolesAndPermissionsModal";

const RolesAndPermissions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );


  return (
    <div className="tabContainer">
       {(user.role === 'superAdmin' || user.permissions.includes('FC_Roles & Permissions -Admin') || user.permissions.includes('View_Roles & Permissions -Admin')) && (
      <div
        className="RoleAndPermissionBottom"
        style={{ display: "grid", gap: "16px" }}
      >
        
        <RolesAndPermissionsAdmin user={user} />
        {/* <RolesAndPermissionsTenant /> */}
      </div>
       )}
       {(user.role === 'superAdmin' || user.permissions.includes('FC_Roles & Permissions -Tenant') || user.permissions.includes('View_Roles & Permissions -Tenant')) && (
      <div
        className="RoleAndPermissionBottom"
        style={{ display: "grid", gap: "16px" }}
      >
        {/* <RolesAndPermissionsAdmin /> */}
        <RolesAndPermissionsTenant user={user} />
      </div>
       )}
    </div>
  );
};

export default RolesAndPermissions;
