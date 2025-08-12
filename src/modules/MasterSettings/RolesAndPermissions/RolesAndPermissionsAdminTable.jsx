import Assets from "@/assets";
import Components from "@/components";
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
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";

const RolesAndPermissionsAdminTable = ({roles=[],handleWarningModal ,   deleteHandler, editHandler, user}) => {
  return (
    <TableContainer
      sx={{
        border: "none",
        boxShadow: "none",
        borderBottom: "solid 1px #E0E0E0",
      }}
    >
      <Table
        sx={{ minWidth: 850, border: "none", boxShadow: "none" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "283px",
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
                width: "837px",
              }}
            >
              Permission
            </TableCell>
            {(user.role === 'superAdmin' || user.permissions.includes('FC_Roles & Permissions -Admin')) && (
            <TableCell
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                width: "100px",
                
              }}
            >
              Actions
            </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                <div
                  style={{
                    border: `solid 1px ${
                      row.color === "#6955DA"
                        ? "#6955DA"
                        : row.color === "#FF5D3E"
                        ? "#FF5D3E"
                        : row.color === "#3086EE"
                        ? "#3086EE"
                        : "#6955DA"
                    }`,
                    backgroundColor:
                      row.color === "#6955DA"
                        ? "#EBE9F8"
                        : row.color === "#FF5D3E"
                        ? "#FFEEEE"
                        : row.color === "#3086EE"
                        ? "#E8F0FB"
                        : "#EBE9F8",

                    color:
                      row.color === "#6955DA"
                        ? "#6955DA"
                        : row.color === "#FF5D3E"
                        ? "#FF5D3E"
                        : row.color === "#3086EE"
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
                  {row.name}
                </div>
              </TableCell>
              <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    width: "837px",
                  }}
                >
                  {row?.permissions.map((permission, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <GoDotFill style={{ color: "#00bd82" }} />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#777777",
                          fontWeight: "400",
                          lineHeight: "22px",
                        }}
                      >
                        {permission}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>
              {(user.role === 'superAdmin' || user.permissions.includes('FC_Roles & Permissions -Admin')) && (
              <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  <img style={{cursor:"pointer"}} onClick={()=> editHandler(row)} src={Assets.Icons.editFill} />
                  <MdDelete onClick={()=> handleWarningModal(row?._id , row?.name)} style={{ color: "#777777", fontSize: "18px" , cursor:"pointer"}} />
                </div>
              </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </TableContainer>
  );
};

export default RolesAndPermissionsAdminTable;
