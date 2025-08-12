import Assets from "@/assets";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import styles from "./AdminUser.module.css";

import { MdDelete, MdMoreVert, MdOutlineEdit } from "react-icons/md";
import MorePopover from "./MorePopover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUser,
  DeleteUser,
  // LoginAsUser,
  clearErrors,
  clearMessages,
  VerifyPassword,
  GetAllPermission,
  UpdateSinglePermission,
  LoginAsUser,
} from "./../../../store/actions";
const rows = [
  {
    "_id": "673b1cc56b274d4c1b3f11fe",
    "firstName": "alis",
    "lastName": "ahmad",
    "email": "abc@gmail.com",
    "aliasName": "ali",
    "companyName": "Freelance",
    "phoneNumber": "(997) 998-8955",
    "role": {
      "_id": "673b1b556b274d4c1b3f1199",
      "name": "Agent",
      "permissions": [
        "Dashboard",
        "What's own your plate",
        "Prospect KPI",
        "Lead Breakdown",
        "Top3 Campaigns",
        "Last 30 Minutes",
        "Average Reply Time",
        "Drip KPI",
        "Text Activity",
        "Tag KPI",
        "Flag KPI",
        "Inbox",
        "Lead Chat List",
        "Status Filter",
        "Campaigns Filter",
        "Users Filter",
        "Tags Filter",
        "Reminders",
        "Search",
        "Chat box",
        "Right Panel Prospect Details",
        "Direct Import",
        "Import or Drag & Drop File",
        "Assign to Campaign",
        "Download File",
        "Delete",
        "View Table stats",
        "Search",
        "Campaign",
        "Create Initial Campaign",
        "Edit Initial Campaign",
        "Create Follow-up Campaign",
        "Edit Follow-up Campaign",
        "Campaign List Table",
        "Search Campaign",
        "Campaign Details",
        "Select Campaign",
        "Delete Initial Campaign",
        "Delete Follow-up Campaign",
        "Template",
        "Create Initial Template",
        "Edit Initial Template",
        "Initial Template List Table",
        "Initial Template Search",
        "Create Quick Replies",
        "Edit Quick Replies",
        "Quick Replies List Table",
        "Quick Replies Search",
        "Drag and Drop quick reply in the list to change position of quick reply",
        "Create Follow-up Template",
        "Edit Follow-up Template",
        "Follow-up Template Table",
        "Follow-up Template Search",
        "Delete Initial Template",
        "Delete Quick Replies",
        "Delete Follow-up Template",
        "Batch",
        "Create Batch",
        "In-progress Batch",
        "Complete Batch",
        "Filter by User"
      ],
      "createdAt": "2024-11-18T10:47:49.414Z"
    },
    "permissions": [
      "Dashboard",
      "What's on your plate",
      "Prospect KPI",
      "Lead Breakdown",
      "Top 3 Campaigns",
      "Last 30 Minutes",
      "Average Reply Time",
      "Drip KPI",
      "Text Activity",
      "Tag KPI",
      "Flag KPI",
      "Inbox",
      "Lead Chat List",
      "Status Filter",
      "Campaigns Filter",
      "Users Filter",
      "Tags Filter",
      "Reminders",
      "Search",
      "Chat Box",
      "Right Panel Prospect Details",
      "Direct Import",
      "Import or Drag & Drop File",
      "Assign to Campaign",
      "Download File",
      "Delete",
      "View Table Stats",
      "Campaign",
      "Create Initial Campaign",
      "Edit Initial Campaign",
      "Create Follow-up Campaign",
      "Edit Follow-up Campaign",
      "Campaign List Table",
      "Search Campaign",
      "Campaign Details",
      "Select Campaign",
      "Delete Initial Campaign",
      "Delete Follow-up Campaign",
      "Template",
      "Create Initial Template",
      "Edit Initial Template",
      "Initial Template List Table",
      "Initial Template Search",
      "Create Quick Replies",
      "Edit Quick Replies",
      "Quick Replies List Table",
      "Quick Replies Search",
      "Drag and Drop Quick Reply in the list to change position of Quick Reply",
      "Create Follow-up Template",
      "Edit Follow-up Template",
      "Follow-up Template Table",
      "Follow-up Template Search",
      "Delete Initial Template",
      "Delete Quick Replies",
      "Delete Follow-up Template",
      "Batch",
      "Create Batch",
      "In-progress Batch",
      "Complete Batch",
      "Filter by User"
    ],
    "status": "Active",
    "changePasswordOnLogin": false,
    "verifyEmail": false,
    "active": true,
    "timeZone": "US/Pacific",
    "organizationId": "673b1b556b274d4c1b3f1193",
    "organizationName": "Ishmam_7",
    "resetPasswordToken": "7f34aa13f40ec2e183e5cfcac295626408e85aa5",
    "resetPasswordExpires": "2024-11-18T11:08:57.043Z",
    "createdAt": "2024-11-18T10:53:57.078Z",
    "avatar": "https://s3.eu-north-1.amazonaws.com/launch.server/avatar-1731974557785.jpg"
  }
];
const AdminUserTable = ({ users = [], setUserRoll, deleteHandler, selectedDeleteId, setSelectedDeleteId, allowedPermissions, userToUpdatePermission, isPermissionModalOpen, setIsPermissionModalOpen, setAllowedPermissions, setUserToUpdatePermission, isEditUserOpen, setIsEditUserOpen, userObj }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString(undefined, {
      month: "numeric",
      day: "numeric",
      // year: "2-digit",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    });

    return formattedDate;
  };
  const loginAsUser = (user) => {
    const { email } = user;
    dispatch(
      LoginAsUser(email, () => {
        navigate("/redirect?redirect=/tenant");
        window.location.reload();
      })
    );
  };

  console.log(users, 'asasdsa')

  return (
    <>
      <TableContainer
        className={styles.custom_scrollbar}
        sx={{
          border: "none",
          boxShadow: "none",
          borderBottom: "solid 1px #E0E0E0",
          flexGrow: 1
        }}
      >
        <Table
          sx={{ minWidth: 850, border: "none", boxShadow: "none" }}
          aria-label="simple table"
        >
          <TableHead style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white" }}>
            <TableRow>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                  width: "494px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                  width: "230px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                  width: "230px",
                }}
              >
                Role
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                  width: "230px",
                }}
              >
                Created Date
              </TableCell>
              {(userObj.role === 'superAdmin' || userObj.permissions.includes('FC_Admin User')) && (
                <TableCell
                  style={{
                    color: "#012635",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    width: "74px",
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>

            {users.length > 0 ?
              users?.map((data) => (
                <TableRow
                  key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                    {
                      data?.avatar ? 
                      <div
                      style={{
                        color: "#777777",
                        // width: "fit-content",
                        borderRadius: "12px",
                        padding: "2px 8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "22px",
                        display: "flex",
                        alignItems: "center"
                      }}
                      >
                          <img
                          src={data?.avatar}
                          alt="avatar"
                          style={{
                            width: "22px",
                            height: "22px",
                            border: "solid 1px #777777",
                            fontSize: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            marginRight: "5px",
                          }}
                        />
                      {data?.firstName || ""} {data?.lastName || ""}
                      </div>
                      

                      :
                        <div
                          style={{
                            color: "#777777",
                            // width: "fit-content",
                            borderRadius: "12px",
                            padding: "2px 8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "22px",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ width: "22px", height: "22px", border: "solid 1px #777777", fontSize: "10px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px", marginRight: "5px" }} >{data?.firstName[0] || ""} {data?.lastName[0] || ""}</div>   {data?.firstName || ""} {data?.lastName || ""}
                          </div>
                        </div>
                    }

                  </TableCell>
                  <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                    <div
                      style={{
                        border: `solid 1px ${data.active ? "#5BF1B2" : "#EA3815"
                          }`,
                        backgroundColor:
                          data.active ? "#C2FFEC" : "#FFEEEE",

                        color: data.active ? "#00724E" : "#EA3815",
                        width: "fit-content",
                        borderRadius: "13px",
                        padding: "0px 8px",
                        fontSize: "12px",
                        fontWeight: "500",
                        lineHeight: "22px",
                      }}
                    >
                      {data?.active && data?.active ? "Active" : "Inactive"}
                    </div>
                  </TableCell>

                  <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px", // Set a 4px gap between the role and the edit icon
                      }}
                    >
                      <div
                        // style={{ backgroundColor: data?.role?.name == "Agent" ? "#FFF2CC" : data?.role?.name == "Admin" ? "#E1DDF8" : "", borderRadius: "18px", padding: '2px 8px', color: data?.role?.name == "Agent" ? "#F49C17" : data?.role?.name == "Admin" ? "#6955DA" : "", border: data?.role?.name == "Agent" ? "solid 1px #FFE185" : data?.role?.name == "Admin" ? "#A69FEA" : "" }}
                        style={{
                          border: `solid 1px ${data?.role?.color === "#6955DA"
                              ? "#6955DA"
                              : data?.role?.color === "#FF5D3E"
                                ? "#FF5D3E"
                                : data?.role?.color === "#3086EE"
                                  ? "#3086EE"
                                  : "#6955DA"
                            }`,
                          backgroundColor:
                            data?.role?.color === "#6955DA"
                              ? "#EBE9F8"
                              : data?.role?.color === "#FF5D3E"
                                ? "#FFEEEE"
                                : data?.role?.color === "#3086EE"
                                  ? "#E8F0FB"
                                  : "#EBE9F8",

                          color:
                            data?.role?.color === "#6955DA"
                              ? "#6955DA"
                              : data?.role?.color === "#FF5D3E"
                                ? "#FF5D3E"
                                : data?.role?.color === "#3086EE"
                                  ? "#3086EE"
                                  : "#6955DA",
                          width: "fit-content",
                          borderRadius: "12px",
                          padding: "0px 8px",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "22px",
                        }}
                      >
                        {data?.role?.name && data?.role?.name}
                      </div>
                      {(userObj.role === 'superAdmin' || userObj.permissions.includes('FC_Admin User')) && (
                        <Link to={`/master_setting/AdminuserEdit?userId=${data._id}`}>
                          <img src={Assets.Icons.pencilIcon} />
                        </Link>
                      )}
                      {/* <MdOutlineEdit /> */}
                    </div>
                  </TableCell>

                  <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                    <div
                      style={{
                        color: "#777777",
                        // width: "fit-content",
                        borderRadius: "12px",
                        padding: "2px 8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "22px",
                      }}
                    >
                      {data?.createdAt && formatDate(data.createdAt)}
                    </div>
                  </TableCell>
                  {(userObj.role === 'superAdmin' || userObj.permissions.includes('FC_Admin User')) && (
                    <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <MorePopover setUserRoll={setUserRoll} loginAsUser={loginAsUser} setSelectedDeleteId={deleteHandler} isPermissionModalOpen={isPermissionModalOpen} setIsPermissionModalOpen={setIsPermissionModalOpen} setAllowedPermissions={setAllowedPermissions} setUserToUpdatePermission={setUserToUpdatePermission} setIsEditUserOpen={setIsEditUserOpen} isEditUserOpen={isEditUserOpen} data={data}
                        >
                          <MdMoreVert
                            style={{
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "#777777",
                              textAlign: "right",
                            }}
                          />
                        </MorePopover>
                        {/* <img src={Assets.Icons.editFill} />
                  <MdDelete style={{ color: "#777777", fontSize: "18px" }} /> */}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )) :
              <TableCell colSpan={5} align="center" sx={{ padding: "16px", borderBottom: "0px" }}>
                <div style={{ fontSize: "14px", color: "#212529" }}>
                  No Record Found!

                </div>
              </TableCell>

            }
          </TableBody>
        </Table>

      </TableContainer>
    </>


  );
};

export default AdminUserTable;
