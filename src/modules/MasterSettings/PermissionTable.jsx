import { MyCheckbox } from "@/components/common";
import { CustomScroll } from "@/modules/Settings/MarketLists/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";

const RolesAndPermissionsModalTable = ({ permissionData, handleCheckboxChange , allowedPermissions }) => {
    const rows = [
        { Role: "DashBoard", id: 1 },
        { Role: "Inbox", id: 2 },
        { Role: "Direct Import", id: 3 },
        { Role: "Skip Trace", id: 4 },
        { Role: "Campaigns", id: 5 },
        { Role: "Template", id: 6 },
        { Role: "Batches", id: 7 },
        { Role: "Drip Automations", id: 8 },
        { Role: "Security", id: 9 },
    ];
    const [checkboxStates, setCheckboxStates] = useState(
        rows.map(() => ({ fullControl: false, viewOnly: false }))
    );

 
    return (
        <TableContainer
            sx={{
                border: "none",
                boxShadow: "none",
                borderBottom: "solid 1px #E0E0E0",
            }}
        >
            <Table
                sx={{ border: "none", boxShadow: "none" }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "3fr 1fr 1fr",
                        }}
                    >
                        <TableCell
                            sx={{
                                color: "#012635",
                                fontWeight: "500",
                                fontSize: "14px",
                                lineHeight: "22px",
                                textAlign: "left",
                            }}
                        >
                            Permissions
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#012635",
                                fontWeight: "500",
                                fontSize: "14px",
                                lineHeight: "22px",
                                textAlign: "left",
                            }}
                        >
                            Full Control
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#012635",
                                fontWeight: "500",
                                fontSize: "14px",
                                lineHeight: "22px",
                                textAlign: "left",
                            }}
                        >
                            View Only
                        </TableCell>
                    </TableRow>
                </TableHead>
                <CustomScroll style={{ maxHeight: "512px", overflow: "auto" }}>
                    <TableBody
                        sx={{
                            display: "block",
                            maxHeight: "368px",
                            // overflow: "auto",
                            width: "100%",
                        }}
                    >
                        {permissionData?.map((row, index) => {
                          
                            
                            return (
                                <TableRow
                                    key={row._id}
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "3fr 1fr 1fr",
                                        "&:last-child td, &:last-child th": { border: 0 },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            paddingTop: "11px",
                                            paddingBottom: "11px",
                                            color: "#777777",
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                        }}
                                    >
                                        <p>{row.name}</p>
                                    </TableCell>
                                    <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                                        <MyCheckbox
                                            isChecked={allowedPermissions?.includes(`FC_${row?.name}`)}
                                            // isChecked={row?.control === 'full'}
                                            // onClick={() => handleCheckboxChange(index, "full")}
                                            onClick={() => handleCheckboxChange(index, `FC` , row?.name)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ paddingTop: "11px", paddingBottom: "11px" }}>
                                        <MyCheckbox
                                            // isChecked={row?.control === "view"}
                                            isChecked={allowedPermissions?.includes(`View_${row?.name}`)}
                                            // onClick={() => handleCheckboxChange(index, "view")}
                                            onClick={() => handleCheckboxChange(index, `View` , row?.name)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </CustomScroll>
            </Table>
        </TableContainer>
    );
};

export default RolesAndPermissionsModalTable;
