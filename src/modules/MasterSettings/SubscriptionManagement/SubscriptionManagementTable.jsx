import Assets from "@/assets";
import Components from "@/components";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import styles from "./SubscriptionManagement.module.css";
import toast from "react-hot-toast";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function createData(Role, priceM, priceY, market, limit, message, Status) {
  return { Role, priceM, priceY, market, limit, message, Status };
}

const SubscriptionManagementTable = ({
  onClick,
  subscriptionData,
  fetchData,
  user
}) => {
  const [isModelOpen, setIsModelOpen] = useState();
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priorityIds = [
    "67445d36f4d8d6cff7dbde60",
    "67445e5cf4d8d6cff7dbde85",
    "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
    "67a46abcc15fce67f83fb05f"
  ]

  const reordered = [
    ...priorityIds
      .map(id => subscriptionData.find(item => item._id === id))
      .filter(Boolean), // Remove undefined if any ID not found
    ...subscriptionData.filter(item => !priorityIds.includes(item._id)),
  ];
  const deleteHandler = async (id) => {
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.DELETE,
        `${ENDPOINTS.GET_SINGLE_SUBSCRIPTION}/${id}`
      );
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      toast.success("Successfully deleted!");

      setIsModelOpen(false);
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
    >
      <Table
        sx={{ minWidth: 850, border: "none", boxShadow: "none" }}
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
          <TableRow>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "337px",
              }}
            >
              Plan Name
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                // width: "130px",
              }}
            >
              Price Monthly
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                // width: "130px",
              }}
            >
              Price Yearly
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                // width: "160px",
              }}
            >
              Market Included
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                // width: "130px",
              }}
            >
              User Limit
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                // width: "191px",
              }}
            >
              Outbound Messages
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "92px",
              }}
            >
              Status
            </TableCell>
            {(user.role === 'superAdmin' || user.permissions.includes('FC_Subscription Management')) && (
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                  // width: "288px",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {reordered.map((row , i) => (
            <>
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } ,  backgroundColor:i < 5 && "#E6FFF7" }}
              >
                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                      color:i < 5 ? "#012635": "#777777",
                      // width: "fit-content",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    {row?.title}
                  </div>
                </TableCell>
                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                      color:i < 5 ? "#012635": "#777777",
                      // width: "fit-content",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    $ {row?.monthlyPrice.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                    color:i < 5 ? "#012635": "#777777",
                      // width: "fit-content",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    $ {row?.yearlyPrice.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                      color:i < 5 ? "#012635": "#777777",
                      // width: "fit-content",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    {row?.marketIncluded}
                  </div>
                </TableCell>
                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                      color:i < 5 ? "#012635": "#777777",
                      // width: "fit-content",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    {row?.maxTenants}
                  </div>
                </TableCell>
                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                      color:i < 5 ? "#012635": "#777777",
                      // width: "fit-content",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    {row?.monthlyOutBoundNumber}
                  </div>
                </TableCell>

                <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                  <div
                    style={{
                      border: `solid 1px ${row.status === "pending"
                          ? "#F49C17"
                          : row.status === "active"
                            ? "#5BF1B2"
                            : "#EA3815"
                        }`,
                      backgroundColor:
                        row.status === "pending"
                          ? "#FFF4E5"
                          : row.status === "active"
                            ? "#C2FFEC"
                            : "#FFEEEE",
                      color:
                        row.status === "pending"
                          ? "#F49C17"
                          : row.status === "active"
                            ? "#00724E"
                            : "#EA3815",
                      width: "fit-content",
                      borderRadius: "12px",
                      padding: "0px 8px",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "22px",
                    }}
                  >
                    {row.status === "pending"
                      ? "Pending"
                      : row.status === "active"
                        ? "Active"
                        : "Inactive"}
                  </div>
                </TableCell>
                {(user.role === 'superAdmin' || user.permissions.includes('FC_Subscription Management')) && (
                  <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <img
                        style={{ cursor: "pointer", width: "18px", height: "18px" }}
                        src={Assets.Icons.editFill}
                        onClick={() => onClick(row._id)}
                      />
                      <MdDelete
                        onClick={() => {
                          setDeleteId(row._id);
                          setIsModelOpen(true);
                        }}
                        style={{ color: "#777777", cursor: "pointer", width: "18px", height: "18px", display: row._id == "67445d36f4d8d6cff7dbde60" || row._id == "67a46abcc15fce67f83fb05f" || row._id == "67445e5cf4d8d6cff7dbde85" || row._id == "6744614ba4d142ed16ea9c97" || row._id == "6744617ea4d142ed16ea9c9e" ? "none" : "block" }}
                      />
                    </div>
                  </TableCell>
                )}

              </TableRow>
              {row?._id == "67a46abcc15fce67f83fb05f" &&(
              <TableRow>
                <TableCell colSpan={8} sx={{ padding: 0 }}>
                  
                  <div style={{ paddingTop: "2px", backgroundColor: "#00BD82", width: "100%"  }}></div>

                
                </TableCell>
              </TableRow>
                )}
            </>
          ))}
        </TableBody>
      </Table>
      <Components.Common.WarningModal
        onClose={() => {
          setIsModelOpen(false);
          // setSelectedDeleteId("");
        }}
        isLoading={loading}
        // setIsLoading={setIsLoading}
        onOkay={() => {
          deleteHandler(deleteId);
          setLoading(true);
        }} // Confirm delete when "Okay" is clicked
        open={isModelOpen}
        WarningItemTitle={`Are you sure want to delete?`}
        WarningItemName="Direct Import"
        warningItemText={`Are you sure you want to  delete this ? This action cannot be undone.`}
      />
    </TableContainer>
  );
};

export default SubscriptionManagementTable;
