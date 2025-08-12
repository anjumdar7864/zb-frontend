import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Assets from "@/assets";
import styles from "./CompanyA.module.css";
import { styled } from "@mui/material/styles";
import { commonAPICall } from "@/services/api/common";
import {
  REQUEST_TYPES,
  ENDPOINTS,
} from "@/utils/constant/url";
import { logOut } from "@/store/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }
function createData(Resource, Owner, Admin, Supervisor, Agent) {
  return { Resource, Owner, Admin, Supervisor, Agent };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const rows = [
  createData("Numbers", "#D9D9D9", "#00724E", "#D9D9D9", "#C2FFEC"),
  createData("Team", "#D9D9D9", "#00724E", "#D9D9D9", "#C2FFEC"),
  createData("Users", "#D9D9D9", "#00724E", "#D9D9D9", "#C2FFEC"),
  createData(
    "Users Management",
    "Owner",
    ["Owner", "Admin", "Agent"],
    "#D9D9D9",
    "#C2FFEC"
  ),
  createData("Status", "#00724E", "#00724E", "#00724E", "#C2FFEC"),
  createData("Activity Feed", "#D9D9D9", "#00724E", "#00724E", "#C2FFEC"),
  createData("Call Setting", "#D9D9D9", "#00724E", "#00724E", "#C2FFEC"),
  createData("Integration", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#C2FFEC"),
  createData("Company General", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#C2FFEC"),
  createData("Company Plan", "#00724E", "#D9D9D9", "#D9D9D9", "#C2FFEC"),
  createData("Company Billing", "#00724E", "#D9D9D9", "#D9D9D9", "#C2FFEC"),
  createData("Company Security", "#00724E", "#D9D9D9", "#D9D9D9", "#C2FFEC"),
  createData("Company Roles", "#00724E", "#00724E", "#00724E", "#C2FFEC"),
  createData("Conversation Center", "#D9D9D9", "#00724E", "#00724E", "#C2FFEC"),
];
const PermissionTable = () => {
  const [data, setData] = useState([]);
  const [headings, setHeading] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      setLoader(true);
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        ENDPOINTS.GET_ROLES_AND_PERMISSIONS
      );
      setLoader(false);
      if(sessionExpired){
   

        navigate("/Login");
      
        // sessionStorage.clear()
        dispatch(logOut());
      }
      if (isError) {
        return toast.error(message);
      }
      const headings = data?.map(x=> x.rolename);
      const permissions = data ? Object.keys(data[0].permissions): [];


      console.log("permisssions",permissions);
      console.log("heading", headings);


      setData(data || {});
      setPermissions(permissions || []);
      setHeading(headings || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ borderTop: "solid 1px #E0E0E0" }}>
            <TableRow>
              <TableCell
                sx={{ width: "20%" }}
                style={{
                  color: "#012635",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "22px",
                }}
              >
                Resource
              </TableCell>
              {
                headings.map(name=>(
                <TableCell
                // sx={{ width: "20%" }}
                style={{
                  color: "#012635",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "22px",
                }}
                align="center"
              >
                {name}
              </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permissionName, index) => (
              <TableRow key={permissionName} sx={{ "": { border: 0 } }}>
                <TableCell
                  style={{
                    border: 0,
                    color: "#999999",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                  component="th"
                  scope="row"
                >
                  {permissionName}
                </TableCell>
                {headings.map((item, ind) => {
                  return (
                    <TableCell
                      key={`${permissionName}-${ind}`}
                      style={{
                        border: 0,
                        color: "#999999",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                      align="center"
                    >
                      <div
                        style={{
                          height: "18px",
                          width: "18px",
                          backgroundColor: data[ind].permissions[permissionName]
                            ? "#00724E"
                            : "#D9D9D9",
                          borderRadius: "100%",
                          position: "relative",
                          margin: "auto",
                        }}
                      ></div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PermissionTable;
