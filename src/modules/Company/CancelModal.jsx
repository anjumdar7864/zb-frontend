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
import Assets from '@/assets';
import { useNavigate } from 'react-router-dom';

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

const list = [
    { img: <img src={Assets.Icons.cancelPhone} />, title: "Unlimited inbound calls" },
    { img: <img src={Assets.Icons.cancelSetting} />, title: "100+ integrations and API access" },
    { img: <img src={Assets.Icons.cancel_icon_3} />, title: "️ Advanced analytics and monitoring features" },
    { img: <img src={Assets.Icons.cancel_icon_4} />, title: "️Advanced support features including queue call back" },
    { img: <img src={Assets.Icons.cancel_icon_5} />, title: "️Advanced sales features including Power Dialer" },
]

const CancelModal = ({ setDownGradeStep, downGradePakage, open, setOpenCancelModal ,handleCancel}) => {


    
    const [loading, setLoader] = React.useState(false);
   

const navigate = useNavigate();
  
    return (
        <div>
            {/* <Button onClick={() => setDownGradeStep(1)}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={() => setOpenCancelModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", justifyContent: "space-between", height: "58px", alignItems: "center", padding: "0px 16px", borderBottom: "solid 1px #F0F0F0" }}>
                        <div style={{ width: "fit-content", fontSize: "18px", fontWeight: 600, lineHeight: "26px", color: "#012635" }}>Cancel Subscription</div><div style={{ width: "fit-content", cursor: "pointer" }} onClick={() => setOpenCancelModal(0)}><IoMdClose style={{ fontSize: "24px", color: "#012635" }} /></div>
                    </div>
                    <div style={{ padding: "16px" }}>
                        <div style={{ color: "#012635", fontSize: "16px", fontWeight: 500, padding: "16px" }}>
                            We're sorry to hear you'd like to cancel.<br />After the end date of your subscription, you will no longer have access to:
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {
                                list.map((item, index) => {
                                    return (
                                        <div style={{ display: "flex", gap: "12px" }}>
                                            <div style={{ width: "fit-content" }}>{item.img}</div>
                                            <div style={{ color: "#777777", fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}>{item.title}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{ padding: "16px 0px", display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ color: "#777777", fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}>Advanced sales features including Power Dialer</div>

                            <div style={{ backgroundColor: "#E1F3EE", borderRadius: "16px", padding: "16px" }}>
                                <div style={{ color: "#012635", fontSize: "16px", fontWeight: 500 }}>Talk to our Support team</div>
                                <div style={{ display: "flex", gap: "16px" }}>
                                    <div style={{ color: "#777777", fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}>
                                        Our Support team is dedicated to helping you resolve any issues you might be facing.
                                    </div>
                                    <div>
                                        <button  onClick={()=> window.open('https://zeitblast.com/#/contactus', '_blank')} style={{ backgroundColor: "#00BD82", cursor: "pointer", borderRadius: "8px", color: "white", width: "121px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            Contact us
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "#E8F0FB", borderRadius: "16px", padding: "16px" }}>
                                <div style={{ color: "#012635", fontSize: "16px", fontWeight: 500 }}>Consider a different plan</div>
                                <div style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
                                    <div style={{ color: "#777777", fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}>
                                        Learn if one of our other plans would better suit your needs.
                                    </div>
                                    <div>
                                        
                                        <button onClick={()=> window.open('https://zeitblast.com/#/pricing', '_blank')} style={{ backgroundColor: "#3086EE", cursor: "pointer", borderRadius: "8px", color: "white", width: "121px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            Check plans
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end", gap: "16px", height: "88px", alignItems: "center", padding: "0px 16px", borderTop: "solid 1px #F0F0F0" }}>
                        <div onClick={() => setOpenCancelModal(false)} style={{ border: "solid 1px #777777", cursor: "pointer", borderRadius: "8px", color: "#777777", width: "158px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {
                                loading == false ?
                                    " Stay subscribed"
                                    :
                                    <CircularLoader color={"white"} />
                            }

                        </div>
                        <div onClick={handleCancel} style={{ cursor: "pointer", borderRadius: "8px", backgroundColor: "#EA3815", color: "white", width: "172px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>Cancel Subscription</div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CancelModal
