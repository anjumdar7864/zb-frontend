import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: "16px"



};

export default function MarkAsReadModall({ open, setOpen, handleSubmit, read, message }) {
    //   const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [obj, setObj] = React.useState({
        phone1: false,
        phone2: false,
        phone3: false,
    }
    )

    const handleClick = (num) => {
        let objCopy = { ...obj, [num]: !obj[num] }

        setObj(objCopy)


    }

    // useEffect(()=>{
      
    //         setObj({
    //             phone1: true,
    //             phone2: true,
    //             phone3: true,
    //         })
        
    // },[])

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
                    <div style={{ display: "flex", justifyContent: "space-between", height: "58px", padding: "0 16px", alignItems: "center", fontSize: "18px", fontWeight: 600, color: "#012635", borderBottom: "solid 1px #F7F7F7" }}><span>Select a Phone </span><span><IoCloseOutline style={{ cursor: "pointer" }} onClick={handleClose} size={24} /></span></div>
                    <div style={{ padding: "0px 16px", display: "flex", flexDirection: "column", paddingTop: "20px" }}>

                        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                            {
                                message?.responsePhone?.phone1 &&
                                <button onClick={() => handleClick("phone1")} style={{ maxWidth:"212px" ,  backgroundColor: obj?.phone1 ? "#00BD82" : "#F0F0F0", color: obj?.phone1 ? "white" : "#012635", height: "48px", width: "100%", borderRadius: "8px", fontSize: "16px", fontWeight: 500, textAlign: "center" }} >Phone 1</button> 

                            }
                            {
                                message?.responsePhone?.phone2 &&
                                <button onClick={() => handleClick("phone2")} style={{maxWidth:"212px" , backgroundColor: obj?.phone2 ? "#00BD82" : "#F0F0F0", color: obj?.phone2 ? "white" : "#012635", height: "48px", width: "100%", borderRadius: "8px", fontSize: "16px", fontWeight: 500, textAlign: "center" }} >Phone 2</button> 

                            }
                            {
                                message?.responsePhone?.phone3 &&
                                <button onClick={() => handleClick("phone3")} style={{maxWidth:"212px" , backgroundColor: obj?.phone3 ? "#00BD82" : "#F0F0F0", color: obj?.phone3 ? "white" : "#012635", height: "48px", width: "100%", borderRadius: "8px", fontSize: "16px", fontWeight: 500, textAlign: "center" }} >Phone 3</button>

                            }
                        </div>



                    </div>
                    <div style={{ display: "flex", justifyContent: "end", height: "72px", padding: "0 16px", alignItems: "center", fontSize: "18px", fontWeight: 600, color: "#012635", borderTop: "solid 1px #F7F7F7", marginTop: "20px" }}>
                        <button onClick={() => handleSubmit(obj)} style={{ backgroundColor: "#00BD82", height: "48px", width: "120px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, textAlign: "center", color: "white" }}>Save</button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
