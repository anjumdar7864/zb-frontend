import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SubscribeCom from './SubscribeComp';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // borderRadius: "16px",
    boxShadow: 24,
    p: 4,
    height:"100vh" , 
    overflow:"auto" , 
    paddingLeft:"0px" , 
    paddingRight:"0px" , 
    paddingTop:"0px"
};

const SubscribeModal = ({handleOpen , open , setOpen ,  children ,  setSubscribe , disable=false ,  selectPackage , planDetail={} ,  handleContinue=()=>{} , selectedType}) => {


const navigate = useNavigate();
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //     if(!disable){
    //         setOpen(true)

    //     }

    
    // };
    const handleClose = () => {
        navigate("/company")
        setOpen(false)
    };

    

    return (
        <div>
            <div style={{ cursor: "pointer" }} onClick={handleOpen}>{children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display:"flex" , justifyContent:"space-between" , alignItems:"center" ,   padding:"20px" ,   marginBottom:"50px" ,  borderBottom:"solid 1px #F7F7F7" }}>
                        <div style={{ color: "#012635", fontSize: "18px", fontWeight: 600  }}></div>
                        <div onClick={handleClose}><IoClose style={{ color: "#012635", fontSize: "18px", fontWeight: 600 , cursor:"pointer" ,  }} /></div>
                    </div>
                    <div style={{display:"flex" , justifyContent:"center" }}>
                        {/* <SubscribeCom/> */}
                        <SubscribeCom planDetail={planDetail} selectedType={selectedType} setSubscribeMain={ setSubscribe} handleContinue={handleContinue} selectPackageMain={selectPackage} onClose={handleClose} />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default SubscribeModal
