import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IoMdClose } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';
import Components from '@/components';
import { useDispatch } from 'react-redux';
import { logOut, VerifyPassword } from '@/store/actions';
import { commonAPICall } from '@/services/api/common';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import { CircularLoader } from '@/components/common';
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 548,

    borderRadius: '16px',
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    //   p: 4,
};

export default function DeleteModal({ open, setOpen, curruntNumber, handleDelete, }) {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordValue, setPasswordValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );



    const handleSubmit = async () => {

setLoading(true)
        try {
            const { data, isError, message, sessionExpired } = await commonAPICall(
                REQUEST_TYPES.POST,
                `${ENDPOINTS.PASSWORD_VERIFY}`,
                {
                    email: user?.email,
                    password: passwordValue

                }
            );
            if (sessionExpired) {



                // sessionStorage.clear()
                dispatch(logOut());

                navigate("/Login");

            }
            if (isError) {
                return toast.error(message);
            }

            handleDelete()
            setPasswordValue('')
            setLoading(false)
            setOpen(false)
        } catch (error) {
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
                        <div style={{ color: "#012635", fontSize: "18px", fontWeight: 600 }}>Warning</div> <div><IoMdClose style={{ cursor: "pointer" }} onClick={handleClose} size={24} /></div>
                    </div>
                    <div style={{ paddingTop: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <div style={{ width: "85px", height: "85px", borderRadius: "100%", backgroundColor: "#FFEEEE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <IoWarningOutline style={{ color: "#EA3815", }} size={35} />
                            </div>
                        </div>
                        <div style={{ fontSize: "16px", color: "#012635", fontWeight: 400, padding: "16px" , textAlign:"center" }}>
                           Are you sure you want to proceed with this action? This may be irreversible.
                        </div>
                        <div style={{ padding: "16px" }}>
                            <Components.Common.MyInput
                                type={showPassword ? "text" : "password"}
                                // type="password"
                                name="password"
                                // disable={true}
                                placeholder="**********"
                                setShowPassword={setShowPassword}
                                showPassword={showPassword}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                password={true}
                                // onBlur={formikPassword.handleBlur}
                                value={passwordValue}
                                autocomplete="new-password"
                            // error={
                            //     formikPassword.touched.password && formikPassword.errors.password
                            //         ? formikPassword.errors.password
                            //         : ""
                            // }
                            // disabled
                            />
                        </div>
                    </div>
                    <div style={{ height: "72px", borderTop: "solid 1px #F0F0F0", padding: "0px 16px", gap: "16px", display: "flex", justifyContent: "end", alignItems: "center" }}>
                        <div onClick={() => setOpen(false)} style={{ cursor: "pointer", border: "solid 1px #EA3815 ", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "#EA3815" }}>Cancel</div>
                        <div onClick={handleSubmit} style={{ cursor: "pointer", backgroundColor: "#00BD82", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                            {
                                loading ?
                                    <CircularLoader color="white" />
                                    :
                                    "Continue"
                            }
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}