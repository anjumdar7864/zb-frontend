// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { UpdateBilling } from '../Settings';
// import PaymentCard from './PaymentCard';
// import styles from "./CompanyA.module.css";
// import { BiBorderRadius } from 'react-icons/bi';
// import { BackgroundColor, Success } from '@/styles/color';
// import { FaCheckCircle } from 'react-icons/fa';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 520,
//   bgcolor: 'background.paper',
//   // border: '1px solid #000',
//   boxShadow: 24,
//   p: 4,
//   padding: "0px",
//   borderRadius: "12px",
//   overflow: "hidden"

// };
// const PaymentModal = ({ children , handleUpdate }) => {
//   const [open, setOpen] = React.useState(false);
//   const [complete, setComplete] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleSuccess = () => {
//     setComplete(true)
//     // handleUpdate()
//     setTimeout(() => {
//       setOpen(false)
//       setComplete(false)
//     }, 2000);
//   }
//   return (
//     <div style={{ width: "fit-content" }}>
//       <div onClick={handleOpen}>{children}</div>
//       <Modal
//         open={open}
//         onClose={handleClose}
    
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <div style={{height:complete && "100px"}}  className={styles.PaymentModal_height}>
//             {
//              complete ?
//                 <div style={{fontSize:"20px" , display:"flex" , alignItems:"center"}} className={styles.company_logo}><FaCheckCircle style={{marginRight:"10px" , color:"#00BD82" , fontSize:"32px" }} /><span>card updated successfully</span></div>
//                 :
//                 <div>
//                   <div style={{ borderBottom: "1px solid #E0E0E0 " }} className={styles.company_logo}>
//                     Edit Credit Card
//                   </div>
//                   <PaymentCard handleClose={handleClose} handleSuccess={handleSuccess} />
//                   {/* <div onClick={()=>setComplete(true)}>cleck me</div> */}
//                 </div>

//             }
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   )
// }

// export default PaymentModal




import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { UpdateBilling } from "../Settings";
import PaymentCard from "./PaymentCard";
import styles from "./CompanyA.module.css";
import { BiBorderRadius } from "react-icons/bi";
import { BackgroundColor, Success } from "@/styles/color";
import { FaCheckCircle } from "react-icons/fa";
// import ProcessingModal from "./ProcessingModal";
import AllGood from "./AllGood";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  padding: "0px",
  borderRadius: "12px",
  overflow: "hidden",
};
const PaymentModal = ({ children, handleUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setComplete(false);
    setProcessing(false);
  };
  const handleSuccess = () => {
    setComplete(true);
    handleUpdate()
  };
  return (
    <div style={{ width: "fit-content" }}>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!complete ? (
            <div
              style={{ height: complete && "100px" }}
              className={styles.PaymentModal_height}
            >
              <div>
                <div
                  style={{ borderBottom: "1px solid #E0E0E0 " }}
                  className={styles.company_logo}
                >
                  {processing
                    ? "Processing your payment details"
                    : "Edit Credit Card"}
                </div>
                <PaymentCard
                  handleClose={handleClose}
                  handleSuccess={handleSuccess}
                  setProcessing={setProcessing}
                />
              </div>
            </div>
          ) : (
            <AllGood onClose={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentModal;