import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from "../../DirectImport/DirectImport.module.css";

const MorePopover = ({ children, loginAsUser, data, setSelectedDeleteId, setIsPermissionModalOpen, isPermissionModalOpen, setUserToUpdatePermission, setAllowedPermissions, setIsEditUserOpen, isEditUserOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <span onClick={handleClick}>
                {children}
            </span>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div onClick={() => loginAsUser(data)} className={styles.tableDownload}>Login as agent</div>
                <div onClick={
                    () => {
                        setUserToUpdatePermission(data?._id);
                        setIsEditUserOpen(!isEditUserOpen);
                        setAnchorEl(null)
                    }} className={styles.tableDownload}>Edit</div>
                <div onClick={() => {
                    setAllowedPermissions(data?.permissions);
                    setUserToUpdatePermission(data?._id);
                    setIsPermissionModalOpen(!isPermissionModalOpen);
                    setAnchorEl(null)
                }} className={styles.tableDownload}>Permission</div>
                <div onClick={() => setSelectedDeleteId(data?._id, data?.active)} className={styles.tableDownload}>{data?.active ? "Deactivate" : "Active"}</div>
            </Popover>
        </div>
    );
}

export default MorePopover
