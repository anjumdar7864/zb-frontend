import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoMdClose } from 'react-icons/io';
import OutBoundNumberTable from './OutBoundNumberTable';
import FlagsPopupPage from './FlagsPopupPage';
import styles from './Flags.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1154,
    maxWidth:"90vw",
    maxHeight:"90vh" , 

    borderRadius: '16px',
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    display:"flex" , 
    flexDirection:"column" , 
    //   p: 4,
};

export default function CompanyPopup({open , setOpen , popupData , tenantId , selectedNumber , refreshDetails , companyName , noMessageSent , setNoMessageSent}) {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        if(noMessageSent){
            setNoMessageSent(false)
        }
    };

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
                        <div style={{ color: "#012635", fontSize: "18px", fontWeight: 600 }}>{companyName}</div> <div><IoMdClose style={{cursor:"pointer"}} onClick={handleClose} size={24} /></div>
                    </div>
                    <div className={styles.customScroll} style={{ padding: "16px" , overflow:"auto" }}>
                        <div>
                            <OutBoundNumberTable  noMessageSent={noMessageSent} refreshDetails={refreshDetails} marketId={popupData?.marketId} arr={popupData?.outBoundNumbers} tenantId={tenantId} selectedNumber={selectedNumber} />
                        </div>
                        <div>
                         { !noMessageSent &&
                            <FlagsPopupPage arr={popupData?.errorPercentages} deliveredReport={popupData?.deliveredReport}/>

                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}