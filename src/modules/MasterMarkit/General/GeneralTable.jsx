import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdMoreVert } from 'react-icons/md';
import MorePopover from './MorePopover';
import styles from "../MarkitMaster.module.css";
import SwitchButton from '@/components/common/Switch/Switch';

function createData(name, Subscription, Status, Markets, Call) {
    return { name, Subscription, Status, Markets, Call };
}

const rows = [
    createData('XYZ Solution', "I'm Serious", "Active", "Deactivate", 16),
    createData('XYZ Solution', "Time to Scale", "Deactivate", "Active", 16),
    createData('XYZ Solution', "Market Dominator", "Deactivate", "Deactivate", 16),
    createData('XYZ Solution', "Jumpstart JV", "Active", "Deactivate", 16),
    createData('XYZ Solution', "Custom", "Deactivate", "Active", 16),
    createData('XYZ Solution', "I'm Serious", "Active", "Deactivate", 16),
    createData('XYZ Solution', "Time to Scale", "Deactivate", "Active", 16),
    createData('XYZ Solution', "Market Dominator", "Deactivate", "Deactivate", 16),
    createData('XYZ Solution', "Jumpstart JV", "Active", "Deactivate", 16),
    createData('XYZ Solution', "Custom", "Deactivate", "Active", 16),
];

export default function GeneralTable({ data = [], rowHanlder }) {


    return (
        <TableContainer className={styles.custom_scrollbar} sx={{ border: "none", boxShadow: "none", borderBottom: "solid 1px #E0E0E0", flexGrow: 1 }} component={Paper}>
            <Table sx={{ minWidth: 850, border: "none", boxShadow: "none" }} aria-label="simple table">
                <TableHead style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white" }} >
                    <TableRow>
                        <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px", width: "50px" }}>ID</TableCell>

                        <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px", width: "20%" }}>Company Name</TableCell>
                        <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px", width: "20%" }} >Subscription</TableCell>
                        <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px", width: "20%" }} >10DLC Status</TableCell>
                        <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px", width: "20%" }} >Markets Status</TableCell>
                        <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px", width: "20%" }} >How Much Outbound Numbers</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data?.length ? data.map((row, index) => (
                        <TableRow
                            // key={row?.companyName}
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                            onClick={() => rowHanlder({ value: row?._id, label: row?.companyName })}
                        >
                            <TableCell style={{ color: "#777777", fontWeight: 500, fontSize: "14px", lineHeight: "22px", paddingTop: "11px", paddingBottom: "11px" }} component="th" scope="row">
                                {row?.userId || ""}
                            </TableCell>
                            <TableCell style={{ color: "#777777", fontWeight: 500, fontSize: "14px", lineHeight: "22px", paddingTop: "11px", paddingBottom: "11px" }} component="th" scope="row">
                                {row?.companyName || ""}
                            </TableCell>
                            <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }} >
                                <div style={{
                                    border: `solid 1px ${row.subscriptionId == "67445e5cf4d8d6cff7dbde85" ? "#005ABB" : row.subscriptionId == "67445d36f4d8d6cff7dbde60" ? "#00BD82" : row.subscriptionId == "6744614ba4d142ed16ea9c97" ? "#012635" : row.subscriptionId == "6744617ea4d142ed16ea9c9e" ? "#E85B79" : "#F49C17"}`,
                                    backgroundColor: row.subscriptionId == "67445e5cf4d8d6cff7dbde85" ? "#E8F0FB" : row.subscriptionId == "67445d36f4d8d6cff7dbde60" ? "#E1F3EE" : row.subscriptionId == "6744614ba4d142ed16ea9c97" ? "#D6EFF9" : row.subscriptionId == "6744617ea4d142ed16ea9c9e" ? "#FADEE4" : "#FDF5E0",
                                    color: row.subscriptionId == "67445e5cf4d8d6cff7dbde85" ? "#005ABB" : row.subscriptionId == "67445d36f4d8d6cff7dbde60" ? "#06AB78" : row.subscriptionId == "6744614ba4d142ed16ea9c97" ? "#012635" : row.subscriptionId == "6744617ea4d142ed16ea9c9e" ? "#B1264D" : "#F49C17",
                                    fontSize: "12px", fontWeight: 500, width: "fit-content", padding: "2px 8px", borderRadius: "12px",
                                }}>
                                    {row?.subscriptionName || "Not Completed"}
                                </div>
                            </TableCell>
                            <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px", }} >
                                <div style={{
                                    border: `1px solid ${row?.isTenDlcSubmit === "N/S" ? "#D0D5DD" :
                                        row?.isTenDlcSubmit === "Reject" ? "#EA3815" :
                                            row?.isTenDlcSubmit === "Accept" ? "#00724E" :
                                                "#FBBF24" // Under Review
                                        }`,
                                    backgroundColor:
                                        row?.isTenDlcSubmit === "N/S" ? "#F5F5F5" :
                                            row?.isTenDlcSubmit === "Reject" ? "#FFEEEE" :
                                                row?.isTenDlcSubmit === "Accept" ? "#C2FFEC" :
                                                    "#FFF7ED", // Under Review
                                    color:
                                        row?.isTenDlcSubmit === "N/S" ? "#777777" :
                                            row?.isTenDlcSubmit === "Reject" ? "#EA3815" :
                                                row?.isTenDlcSubmit === "Accept" ? "#00724E" :
                                                    "#B45309", // Under Review
                                    width: "fit-content",
                                    borderRadius: "12px",
                                    padding: "2px 8px",
                                    fontSize: "12px",
                                    fontWeight: 500
                                }}>
                                    {
                                        row?.isTenDlcSubmit === "N/S" ? "Not Submitted" :
                                            row?.isTenDlcSubmit === "Accept" ? "Accepted" :
                                                row?.isTenDlcSubmit === "Reject" ? "Rejected" :
                                                    "Under Review"
                                    }
                                </div>
                            </TableCell>
                            <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }} >
                                <div style={{ border: `solid 1px ${row.marketStatus ? "#5BF1B2" : "#EA3815"}  `, backgroundColor: row.marketStatus ? "#C2FFEC" : "#FFEEEE", color: row.marketStatus ? "#00724E" : "#EA3815", width: "fit-content", borderRadius: "12px", padding: "2px 8px", fontSize: "12px", fontWeight: 500 }}>
                                    {row.marketStatus ? "Active" : "Inactive"}
                                </div>

                            </TableCell>
                            <TableCell style={{ paddingTop: "11px", paddingBottom: "11px", color: "#777777", fontWeight: 500, fontSize: "14px", lineHeight: "22px" }} >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {row.countOfOutBoundNumber}

                                    {/* <MorePopover>
                                        <MdMoreVert style={{ cursor: "pointer" , fontSize:"20px" , color:"#777777" }} />
                                    </MorePopover> */}
                                </div>
                            </TableCell>
                        </TableRow>
                    )) :
                        <TableCell colSpan={5} align="center" sx={{ padding: "16px", borderBottom: "0px" }}>
                            <div style={{ fontSize: "14px", color: "#212529" }}>
                                No Record Found!
                            </div>
                        </TableCell>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
