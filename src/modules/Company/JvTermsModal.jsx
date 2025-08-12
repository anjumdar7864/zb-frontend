import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import { commonAPICall } from '@/services/api/common';
import toast from 'react-hot-toast';
import { CircularLoader } from '@/components/common';
import styles from './CompanyA.module.css';
import Checkbox from '@mui/material/Checkbox';
import { FaSquareCheck } from 'react-icons/fa6';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    // height: 226,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: "16px",
    boxShadow: 24,
    // p: 4,
};

export default function JvTermsModal({ open, setOpen, confirmTerm }) {
    //   const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [check, setCheck] = React.useState(false)
    const [loading, setLoader] = React.useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



    return (
        <div>
            {/* <Button onClick={() => setDownGradeStep(1)}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={() => {
                    setCheck(false)
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", justifyContent: "space-between", height: "58px", alignItems: "center", padding: "0px 16px", borderBottom: "solid 1px #F0F0F0" }}>
                        <div style={{ width: "fit-content", fontSize: "18px", fontWeight: 600, lineHeight: "26px", color: "#012635" }}>Terms & Conditions</div><div style={{ width: "fit-content", cursor: "pointer" }} ><IoMdClose onClick={() => setOpen(false)} style={{ fontSize: "24px", color: "#012635" }} /></div>


                    </div>


                    <div className={styles.customScroll} style={{ maxHeight: "514px", overflow: "auto", padding: "16px" }}>
                        <div>
                            <div style={{ color: "#012635", fontSize: "14px", fontWeight: 600, lineHeight: "22px" }}>
                                Lorem ipsum:
                            </div>
                            <div style={{ color: "#777777", fontSize: 500, fontSize: "14px", lineHeight: "22px" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                        <div>
                            <div style={{ color: "#012635", fontSize: "14px", fontWeight: 600, lineHeight: "22px" }}>
                                Lorem ipsum:
                            </div>
                            <div style={{ color: "#777777", fontSize: 500, fontSize: "14px", lineHeight: "22px" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                        <div>
                            <div style={{ color: "#012635", fontSize: "14px", fontWeight: 600, lineHeight: "22px" }}>
                                Lorem ipsum:
                            </div>
                            <div style={{ color: "#777777", fontSize: 500, fontSize: "14px", lineHeight: "22px" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                        <div>
                            <div style={{ color: "#012635", fontSize: "14px", fontWeight: 600, lineHeight: "22px" }}>
                                Lorem ipsum:
                            </div>
                            <div style={{ color: "#777777", fontSize: 500, fontSize: "14px", lineHeight: "22px" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>

                    </div>

                    <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
                        <div>
                            <Checkbox
                                value={check}
                                onChange={() => setCheck(!check)}
                                {...label}
                           
                                sx={{
                                    '& .MuiSvgIcon-root': { fontSize: 24 }, borderRadius: "10px", '&.Mui-checked': {
                                        color: "#5BF1B2",
                                    },
                                }}
                            />
                        </div>
                        <div>Please Read and Accept the Terms & Conditions to continue.</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "end", gap: "16px", height: "88px", alignItems: "center", padding: "0px 16px", borderTop: "solid 1px #F0F0F0" }}>

                        <div onClick={() => {
                            setOpen(false)
                            setCheck(false)
                            }} style={{ border: "solid 1px #777777", cursor: "pointer", borderRadius: "8px", color: "#777777", width: "100px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>Cancel</div>
                        <div  onClick={()=>{
                            if(check){
                                confirmTerm()
                                setCheck(false)
                            }
                            }}  style={{ backgroundColor: "#00BD82", cursor:!check ? "no-drop" : "pointer", borderRadius: "8px", color: "white", width: "121px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center"  }}>
                            {
                                loading == false ?
                                    "Accept"
                                    :
                                    <CircularLoader color={"white"} />
                            }

                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}
