import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IoMdClose } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';
import Components from '@/components';
import { PiWarningCircleFill } from 'react-icons/pi';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { commonAPICall } from '@/services/api/common';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import { getAllCompanyPopupData } from '@/store/actions/flags.action';
import { CircularLoader } from '@/components/common';
import toast from 'react-hot-toast';
import { logOut } from '@/store/actions';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,

    borderRadius: '16px',
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    //   p: 4,
};
const ReplaceModal = ({ open, setOpen, curruntNumber, tenantId, selectedNumber, refreshDetails , originalNumber }) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showMessage, setShowMessage] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const [replaceNumber, setReplaceNumber] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleReplaceOutbondNumber = async () => {

        setLoading(true)
        const out_bondNumberUpdate = replaceNumber.toString().replace("1", '');
        try {
            const { data, isError, message ,sessionExpired } = await commonAPICall(
                REQUEST_TYPES.PATCH,
                `${ENDPOINTS.REPLACE_NUMBER}`,
                {
                    originalNumber:originalNumber,
                    replacedFrom: curruntNumber,
                    replacedTo: out_bondNumberUpdate.replace(/\D/g, ""),
                }
            );
            if(sessionExpired){
   

              
                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

              }
            if (isError) {
                setLoading(false)
                // toast.error(message);
                return toast.error(message);
            }

            setLoading(false)
            setOpen(false)
            refreshDetails(selectedNumber, tenantId)
        } catch (error) {
            setLoading(false)
            toast.error(message);
            console.log(error);
        }

    }



    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", justifyContent: "space-between", height: "58px", alignItems: "center", padding: "0px 16px", borderBottom: "solid 1px #F7F7F7" }}>
                        <div style={{ color: "#012635", fontSize: "18px", fontWeight: 600 }}>Replace Outbound number</div> <div><IoMdClose style={{ cursor: "pointer" }} onClick={handleClose} size={24} /></div>
                    </div>
                    <div style={{ padding: "16px 24px" }}>
                        <div style={{ display: showMessage ? "flex" : "none", alignItems: "center", padding: "8px 16px", backgroundColor: "#D6E7FC", borderRadius: "12px" }}>
                            <div><PiWarningCircleFill size={28} color='#005ABB' /></div>
                            <div style={{ color: "#012635", fontSize: "14px", fontWeight: 500 }}>
                                The data associated with the current number would be switched to new number
                            </div>
                            <div onClick={() => setShowMessage(false)} style={{ color: "#012635", fontSize: "16px", fontWeight: 500, cursor: "pointer" }}>Accept</div>
                        </div>
                        <div style={{ padding: "16px 0px", display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div>
                                <span style={{ color: "#012635", fontWeight: 500, fontSize: "14px", paddingBottom: "4px" }}>Current outbound number</span>
                                <PhoneInput
                                    country={'us'}
                                    placeholder="Enter Mobile Number"
                                    enableSearch={true}
                                    value={`1${curruntNumber}`}
                                    inputStyle={{ fontFamily: 'fellix', color: '#777777', border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", }}
                                    maxLength={14}
                                    disabled={true}
                                    disableDropdown={true}
                                />
                            </div>
                            <div>
                                <span style={{ color: "#012635", fontWeight: 500, fontSize: "14px", paddingBottom: "4px" }}>Replace outbound number</span>
                                <PhoneInput
                                    country={'us'}
                                    placeholder="Enter Mobile Number"
                                    enableSearch={true}
                                    onChange={(phone) => setReplaceNumber(phone)}
                                    inputStyle={{ fontFamily: 'fellix', color: '#777777', border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", }}
                                    maxLength={14}

                                    disableDropdown={true}
                                />
                            </div>
                        </div>

                    </div>
                    <div style={{ height: "72px", borderTop: "solid 1px #F0F0F0", padding: "0px 16px", gap: "16px", display: "flex", justifyContent: "end", alignItems: "center" }}>
                        <div onClick={() => setOpen(false)} style={{ cursor: "pointer", border: "solid 1px #777777 ", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "#777777" }}>Cancel</div>
                        <div onClick={handleReplaceOutbondNumber} style={{ cursor: "pointer", backgroundColor: "#00BD82", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                            {
                                loading ?
                                    <CircularLoader color="white" />
                                    :
                                    "Replace"
                            }

                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    )
}

export default ReplaceModal
