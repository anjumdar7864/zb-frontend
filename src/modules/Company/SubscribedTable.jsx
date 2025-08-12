import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Assets from '@/assets';

function createData(Created, plan, cost, Total) {
    return { Created, plan, cost, Total };
}

export default function SubscribedTable({subscribePackage = {}}) {
    const {price, maxTenants,  countOfOutBoundNumber ,tenantSubscriptionType ,  monthlyOutBoundNumber ,extraNumber ,yearlyPrice ,   monthlyPrice ,  marketIncluded } = subscribePackage;
    const rows = [
        createData('Messages', `${monthlyOutBoundNumber}/monthly`, `$ ${tenantSubscriptionType == "monthly" ? monthlyPrice : yearlyPrice} / ${tenantSubscriptionType}`, `$ ${tenantSubscriptionType == "monthly" ? monthlyPrice : yearlyPrice} /${tenantSubscriptionType}`),
        createData('Markets', `${countOfOutBoundNumber} created / ${marketIncluded} included`, `${extraNumber != 0 ?`$${tenantSubscriptionType == "monthly" ? extraNumber * 500 : (extraNumber * 500)*12 }  / ${tenantSubscriptionType}` :""}`,   `${extraNumber != 0 ?`$${tenantSubscriptionType == "monthly" ? extraNumber * 500 : (extraNumber * 500)*12 }  / ${tenantSubscriptionType}` :""}`),
        createData('Users', maxTenants, "", ""),
        createData('Total', "", "", `$ ${(tenantSubscriptionType == "monthly" ? monthlyPrice : yearlyPrice) +(tenantSubscriptionType == "monthly" ?  (extraNumber * 500) :  (extraNumber * 500)*12)}/${tenantSubscriptionType}`),
    
    ];

    console.log("subscribePackage", subscribePackage);
    
    return (
        <TableContainer sx={{ border: "solid 1px #E0E0E0", boxShadow: "none", borderRadius: "8px" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ width: "25%" }}
                            style={{
                                color: "#012635",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                            }}
                        >Created</TableCell>
                        <TableCell
                            sx={{ width: "25%" }}
                            style={{
                                color: "#012635",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                            }}
                        >Created / Included in plan</TableCell>
                        <TableCell
                            sx={{ width: "25%" }}
                            style={{
                                color: "#012635",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                            }}
                        >Plan cost</TableCell>
                        <TableCell
                            sx={{ width: "25%" }}
                            style={{
                                color: "#012635",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                            }}
                        >Total cost</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.Created}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                style={{
                                    color: "#777777",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    // lineHeight: "22px",
                                }} component="th" scope="row">
                                <div style={{ display: 'flex', alignItems: "center", gap: "3px" }}>
                                    <div style={{ width: "28px", display: "flex", justifyContent: "center" }}>
                                        {
                                            row.Created == "Messages" ?
                                                <img width={"22px"} height={"22px"} src={Assets.Images.message_icon} />
                                                :
                                                row.Created == "Markets" ?
                                                    <img width={"22px"} height={"22px"} src={Assets.Images.phone_icon} />
                                                    : row.Created == "Users" ?
                                                        <img width={"22px"} height={"22px"} src={Assets.Images.user_icon} />
                                                        : row.Created == "Total" ?
                                                            <img width={"22px"} height={"22px"} src={Assets.Images.total_icon} />
                                                            :
                                                            ""


                                        }
                                    </div>

                                    {row.Created}

                                </div>
                            </TableCell>
                            <TableCell
                                style={{
                                    color: "#777777",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    // lineHeight: "22px",
                                }}
                            >


                                {row.plan}


                            </TableCell>
                            <TableCell
                                style={{
                                    color: "#777777",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    // lineHeight: "22px",
                                }}
                            >
                                {row.cost}
                            </TableCell>
                            <TableCell
                                style={{
                                    color: "#012635",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "22px",
                                }}
                            >{row.Total}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}