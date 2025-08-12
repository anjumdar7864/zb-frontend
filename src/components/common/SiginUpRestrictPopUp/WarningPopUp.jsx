import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import Assets from '@/assets';
import styles from './Warning.module.css'
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "95vw",
  maxWidth: "563px",
  borderRadius: '24px', // Fixed capitalization
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  padding: "28px"
};

export default function SignupPausedModal({ handleClose, open, setOpen }) {
  // const [open, setOpen] = React.useState(false);
 

  // React.useEffect(() => {
  //   const cookiesCheck = Cookies.get("cookies");
  //   if (!cookiesCheck && !localStorage.getItem("cookies")) {
  //     setOpen(true)
  //   }
  // }, [])

 
 
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.title}>🚧 New Sign-Ups Temporarily Paused</div>
          <div style={{fontSize:"16px" , marginTop:"24px" , }}>
            We are currently experiencing a high volume of new sign-ups. To ensure we can maintain quality and support for all users, we are temporarily pausing new registrations until next week.

          </div>
          <div style={{marginTop:"24px" , fontSize:"16px" , }}>
            Thank you for your interest and support  we’ll see you soon!<br /> <br/>
            The<strong> Zeitblast Team</strong>

          </div>

          <div className={styles.footer}>
            <div>
              {/* <div className={styles.settings}>Cookies settings</div> */}
            </div>
            <div className={styles.buttonsContainer}>
              {/* <button className={styles.reject} onClick={handleReject}>Reject all</button> */}

              <button className={styles.accept} onClick={handleClose}> Got it</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
