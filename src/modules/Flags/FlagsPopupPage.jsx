import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneInput from 'react-phone-input-2';
import SwitchButton from '@/components/common/Switch/Switch';
import MorePopover from './MorePopover';
import { MdMoreVert } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';


function createData(name, calories, fat, carbs, protein, deliverdCount, deliverd) {
    return { name, calories, fat, carbs, protein, deliverdCount, deliverd };
}

const rows = [
    createData(' 4720', 'lorem impsum', "53.02%", 307, 579, 229, '85%'),
    createData(' 4720', 'lorem impsum', "53.02%", 307, 579, 229, '85%'),
    createData(' 4720', 'lorem impsum', "53.02%", 307, 579, 229, '85%'),
    createData(' 4720', 'lorem impsum', "53.02%", 307, 579, 229, '85%'),
    createData(' 4720', 'lorem impsum', "53.02%", 307, 579, 229, '85%'),
];


const FlagsPopupPage = ({ arr, deliveredReport }) => {
    const [addNumber, setAddNumber] = React.useState(false)
    return (
        <div>
            <TableContainer style={{ boxShadow: 0, border: "solid 1px #E0E0E0", borderRadius: "8px" }} component={Paper}>
                <Table sx={{ minWidth: 650, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }}>Flagstatus</TableCell>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }} >Description</TableCell>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }} >Flag%</TableCell>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }} >Flag Count</TableCell>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }}  >Sent Count</TableCell>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }} >Delivered Count</TableCell>
                            <TableCell style={{ color: "#012635", fontWeight: 500, fontSize: "14px", padding: "0px 16px", height: "48px" }}  >Delivered </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arr?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ padding: "0px 16px", height: "48px", color: "#777777", fontSize: "14px", fontWeight: 500, }} component="th" scope="row">
                                    {row?.errorCode}

                                </TableCell>
                                <TableCell style={{ padding: "0px 16px", color: "#777777", fontSize: "14px", fontWeight: 500, }} >{row?.description}</TableCell>
                                <TableCell style={{ padding: "0px 16px", color: "#777777", fontSize: "14px", fontWeight: 500, }}>{Math.round(row?.percentage)}</TableCell>
                                <TableCell style={{ color: "#777777", fontSize: "14px", fontWeight: 500, padding: "0px 16px" }} >{row.count}</TableCell>
                                <TableCell style={{ padding: "0px 16px", color: "#777777", fontSize: "14px", fontWeight: 500, }} >
                                    {deliveredReport?.sentCount}
                                </TableCell>
                                <TableCell style={{ padding: "0px 16px", color: "#777777", fontSize: "14px", fontWeight: 500, }} >
                                    {deliveredReport?.deliveredCount}
                                </TableCell>

                                <TableCell style={{ padding: "0px 16px" }}><div style={{ border: "solid 1px #5BF1B2", backgroundColor: "#C2FFEC", borderRadius: "12px", padding: "2px 8px", maxWidth: "fit-content" }}>{Math.round(deliveredReport?.deliveredPercentage)} %</div></TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default FlagsPopupPage
