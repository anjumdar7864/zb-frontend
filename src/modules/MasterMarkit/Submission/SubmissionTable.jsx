import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "../MarkitMaster.module.css";
import { FiSearch } from "react-icons/fi";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import { CircularLoader } from "@/components/common";
import Components from "@/components";
import SwitchButton from "@/components/common/Switch/Switch";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export default function SubmissionTable({
  setLoading,
  setIsModelOpen,
  isModelOpen,
  data = [],
  deleteHandler,
  editHandler,
  loading,
  setSearchValue,
  user,
  changeStatusHandler,
  changeStatusHandlerPassAccept,
  rowId,
  active,
  setActive,
  setLoading1,
  loading1,
  setPage ,
}) {
  // const [isLoading , setIsLoading]= useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
 const navigate = useNavigate();

  const getStatusStyle = ({ subscription, status, pstatus }) => {
    // Background color logic
    const backgroundColor =
      subscription === "Premium" ? "#122A4B" :
        subscription === "Basic" ? "#1E9B501A" :
          subscription === "custom" ? "#FDF5E0" :
            subscription === "canceled" ? "#FFEEEE" :
              subscription === "67445d36f4d8d6cff7dbde60" ? "#E1F3EE" :
                subscription === "6744614ba4d142ed16ea9c97" ? "#D6EFF9" :
                  subscription === "67445e5cf4d8d6cff7dbde85" ? "#E8F0FB" :
                    subscription === "6744617ea4d142ed16ea9c9e" ? "#FADEE4" :
                      status === "Suspended" ? "#FFEEEE" :
                        status === "On-Hold" ? "#D6E7FC" :
                          pstatus === "Pending" ? "#FFEEEE" :
                            "transparent";

    // Color logic
    const color =
      subscription === "Premium" ? "white" :
        subscription === "Basic" ? "#12763A" :
          subscription === "custom" ? "#F49C17" :
            subscription === "canceled" ? "#EA3815" :
              subscription === "67445d36f4d8d6cff7dbde60" ? "#06AB78" :
                subscription === "6744614ba4d142ed16ea9c97" ? "#012635" :
                  subscription === "67445e5cf4d8d6cff7dbde85" ? "#005ABB" :
                    subscription === "6744617ea4d142ed16ea9c9e" ? "#B1264D" :
                      status === "Active" ? "#012635" :
                        status === "Suspended" ? "#EA3815" :
                          status === "On-Hold" ? "#005ABB" :
                            pstatus === false ? "#EA3815" :
                              pstatus === true ? "#012635" :
                                pstatus === "Pending" ? "#EA3815" :
                                  "";

    // Border logic
    const border =
      subscription === "Basic" ? "1px solid #1E9B501A" :
        subscription === "custom" ? "1px solid #F49C17" :
          subscription === "canceled" ? "1px solid #EA3815" :
            subscription === "67445d36f4d8d6cff7dbde60" ? "1px solid #06AB78" :
              subscription === "6744614ba4d142ed16ea9c97" ? "1px solid #012635" :
                subscription === "67445e5cf4d8d6cff7dbde85" ? "1px solid #005ABB" :
                  subscription === "6744617ea4d142ed16ea9c9e" ? "1px solid #E85B79" :
                    status === "Active" ? "1px solid #D3D7DD" :
                      status === "Suspended" ? "1px solid #EA3815" :
                        status === "On-Hold" ? "1px solid #005ABB" :
                          pstatus === "Pending" ? "1px solid #FFAB9680" :
                            pstatus === "Up-to-date" ? "1px solid #D3D7DD" :
                              "1px solid #D3D7DD";

    return {
      backgroundColor,
      color,
      border,
      borderRadius: "100px",
      display: "inline-block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      padding: "0px 7px",
      maxWidth: "150px",
      width: "auto",
      fontSize: "12px",
    };
  };


  return (
    <TableContainer
      className={styles.custom_scrollbar}
      sx={{
        border: "none",
        boxShadow: "none",
        borderBottom: "solid 1px #E0E0E0",
        flexGrow: 1,
      }}
      component={Paper}
    >
      <Table
        sx={{ minWidth: 1150, border: "none", boxShadow: "none" }}
        aria-label="simple table"
      >
        <TableHead
          style={{
            position: "sticky",
            top: "0px",
            zIndex: 100,
            backgroundColor: "white",
          }}
        >
          <TableRow style={{ padding: "0px" }}>
            <TableCell style={{ padding: "0px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: 600,
                  color: "#012635",
                  paddingLeft: "16px",

                  minWidth: "200px",
                }}
              >
                10DLC Request
              </h2>
            </TableCell>

            <TableCell colSpan={7} style={{ padding: "0px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  alignItems: "center",
                  padding: "16px",
                    fontSize:"12px" , fontWeight:"500"
                }}
              >
                    <span style={{color:"#777777"}}>Inactive</span>
                <SwitchButton

                  active={active}
                  // row={arr}
                  handleActive={() => {
                    setActive(!active)
                    setPage(1);
                  }}
                />
                   <span style={{color:"#00BD82"}}>Active</span>
                <div className={styles.searchContainer}>
                  <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
                  <form onSubmit={(e) => {
                    e.preventDefault(); // ✅ Prevent page refresh
                  }} autoComplete="off">
                    <input
                      onChange={(e) => setSearchValue(e?.target?.value)}
                      className={styles.SearchInput}
                      placeholder="Search"
                    />
                  </form>
                </div>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "50px",
                maxWidth: "150px",
              }}
            >
              {/* <div>Legal Company</div> */}
              <div>ID</div>
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "20%",
              }}
            >
              {/* <div>Legal Company</div> */}
              <div>Company Name</div>
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "40%",
              }}
            >
              {/* <div>DBA or Brand Name</div> */}
              <div>Name / Email</div>
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "20%",
              }}
            >
              {/* <div>EIN</div> */}
              <div>Tenant Status</div>
            </TableCell>
     
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "20%",
              }}
            >
              <div>Status</div>
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "20%",
              }}
            >
              <div>Actions</div>
            </TableCell>

            {(user.role === "superAdmin" ||
              user.permissions.includes("FC_10Dlc Submission")) && (
                <TableCell
                  style={{
                    color: "#012635",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    width: "20%",
                  }}
                ></TableCell>
              )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <div style={{ padding: "10px" }}>
              <CircularLoader />
            </div>
          )}
          {data && data?.length ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell
                  style={{
                    color: "#777777",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    paddingTop: "11px",
                    paddingBottom: "11px",
                    maxWidth: "150px",
                    width: "1%",
                  }}
                  component="th"
                  scope="row"
                >
                  {row?.userId}
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    paddingTop: "11px",
                    paddingBottom: "11px",
                  }}
                >
                  <NavLink
                   to={`/market/General?id=${row?._id}&company=${row?.companyName}` }
                   style={{ textDecoration: "none" ,  cursor: "pointer"  }}
            
                   >
                    {row?.companyName}
                  </NavLink>

                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    paddingTop: "11px",
                    paddingBottom: "11px",
                  }}
                >
                  {row?.fullName} - {row?.email}
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    paddingTop: "11px",
                    paddingBottom: "11px",
                  }}
                >
                  <div style={getStatusStyle({
                    subscription: "",
                    status: row?.status,
                    pstatus: ""
                  })}>
                    {row?.status}
                    </div>

                </TableCell>
             
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      backgroundColor:
                     row?.isTenDlcSubmit === "Accept" 
                          ?  "#C2FFEC" : row?.isTenDlcSubmit === "Reject" ? "#FFF4E5" : row?.isTenDlcSubmit === "N/A"  ? "#fdf5e0" 
                          : row?.isTenDlcSubmit === "N/S"  ? "#F5F5F5" : "#FFEEEE",
                      color:
                       row?.isTenDlcSubmit === "Accept" 
                          ?  "#00724E" : row?.isTenDlcSubmit === "Reject" ? "#EA3815" : row?.isTenDlcSubmit === "N/A"  ? "#B45309" 
                          : row?.isTenDlcSubmit === "N/S"  ? "#777777" : "#FFEEEE",
                      fontWeight: 500,
                      fontSize: "12px",
                      width: "100px",
                      lineHeight: "20px",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border:
                      
                        `1px solid ${  row?.isTenDlcSubmit === "Accept" 
                          ?  "#00724E" : row?.isTenDlcSubmit === "Reject" ? "#EA3815" : row?.isTenDlcSubmit === "N/A"  ? "#B45309" 
                          : row?.isTenDlcSubmit === "N/S"  ? "#777777" : "#FFEEEE"}`
                          
                    }}
                  >
                    {/* {row?.tenantId && row?.tenantId?.isTenDlcSubmit === "Accept"
                      ? "Accept"
                      : "Inactive"} */}
                      {row?.isTenDlcSubmit === "Accept" ? "Approved" : row?.isTenDlcSubmit === "Reject" ? "Rejected" : row?.isTenDlcSubmit === "N/A" ? "Under Review" : row?.isTenDlcSubmit === "N/S" ? "Not Submitted"  : "Pending"}
                  </div>
                </TableCell>
                {(user.role === "superAdmin" ||
                  user.permissions.includes("FC_10Dlc Submission")) && (
                    <TableCell component="th" scope="row">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                          gap: "4px",
                          fontSize: "18px",
                          color: "#777777",
                        }}
                      >
                        <div style={{ display: !row?.tenDlcId && "none" }}>
                          {row?.isTenDlcSubmit === "Accept" ? (
                            <button
                              style={{
                                height: "32px",
                                color: "white",
                                backgroundColor: "#EA3815",
                                borderRadius: "8px",
                                padding: "0 4px",
                                marginRight: "4px",
                                fontSize: "14px",
                                fontWeight: 500,
                                minWidth: "56px",

                              }}
                              onClick={() =>
                                changeStatusHandler(row?.tenDlcId?._id, {
                                  adminId: row?.tenDlcId?.tenantId,
                                  status: "Reject",
                                })
                              }
                            >
                              Decline
                            </button>
                          ) : (
                            <button
                              style={{
                                height: "32px",
                                color: "white",
                                backgroundColor: "#06AB78",
                                borderRadius: "8px",
                                padding: "0 4px",
                                marginRight: "4px",
                                fontSize: "14px",
                                fontWeight: 500,
                                minWidth: "56px",
                              }}
                              onClick={() =>{
                                if( !row?.carrierType ){
                                  toast.error("Please assign a career type first.");
                                  return;
                                }
                                changeStatusHandlerPassAccept(row?.tenDlcId?._id, {
                                  adminId: row?.tenDlcId?.tenantId,
                                  status: "Accept",

                                })}
                              }
                            >
                              {
                                loading1 && rowId === row?.tenDlcId?._id
                                  ? <CircularLoader color="white" /> :
                                  "Accept"
                              }

                            </button>
                          )}
                        </div>

                        <MdDelete
                          style={{ display: !row?.tenDlcId && "none" }}
                          onClick={() => {
                            // deleteHandler(row?._id)
                            setIsModelOpen(true);
                            setSelectedDeleteId(row?.tenDlcId?._id);
                          }}
                        />
                        <MdOutlineRemoveRedEye style={{ display: !row?.tenDlcId && "none" }} onClick={() => editHandler(row?.tenDlcId)} />
                      </div>
                    </TableCell>
                  )}
              </TableRow>
            ))
          ) : (
            <TableCell
              colSpan={5}
              align="center"
              sx={{ padding: "16px", borderBottom: "0px" }}
            >
              <div style={{ fontSize: "14px", color: "#212529" }}>
                No Record Found!
              </div>
            </TableCell>
          )}
        </TableBody>
      </Table>
      <Components.Common.WarningModal
        onClose={() => {
          setIsModelOpen(false);
          setSelectedDeleteId("");
        }}
        isLoading={loading}
        // setIsLoading={setIsLoading}
        onOkay={() => {
          deleteHandler(selectedDeleteId);
          setLoading(true);
        }} // Confirm delete when "Okay" is clicked
        open={isModelOpen}
        WarningItemTitle={`Are you sure want to delete?`}
        WarningItemName="Direct Import"
        warningItemText={`Are you sure you want to  delete this ? This action cannot be undone.`}
      />
    </TableContainer>
  );
}
