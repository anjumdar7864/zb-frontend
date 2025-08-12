import React, { useState } from "react";
import Popover from "@mui/material/Popover";

import styles from "../../DirectImport/DirectImport.module.css";
import { Link } from "react-router-dom";

const MorePopover = ({ children, loginAsUser, data,setUserRoll ,  setSelectedDeleteId, setIsPermissionModalOpen, isPermissionModalOpen, setUserToUpdatePermission, setAllowedPermissions, setIsEditUserOpen, isEditUserOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span onClick={handleClick}>{children}</span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div onClick={() => loginAsUser(data)} className={styles.tableDownload}>Login as Admin</div>
        <Link to={`/master_setting/AdminuserEdit?userId=${data?._id}`}>
        <div  className={styles.tableDownload}>Edit</div>
        </Link>
        <div onClick={() => {
          setAllowedPermissions(data?.permissions);
          setUserToUpdatePermission(data?._id);
          setIsPermissionModalOpen(!isPermissionModalOpen);
          setUserRoll(data.role._id)
          setAnchorEl(null)
        }} className={styles.tableDownload}>Permission</div>
        <div onClick={() => setSelectedDeleteId(data?._id, data?.active)} className={styles.tableDownload}>{data?.active ? "Deactivate" : "activate"}</div>
      </Popover>
    </div>
  );
};

export default MorePopover;
