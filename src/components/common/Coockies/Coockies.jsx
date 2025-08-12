import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BiBorderAll } from 'react-icons/bi';
import Assets from '@/assets';
import styles from './Coockies.module.css'
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

export default function CoockiesModal({ handleCookiesSetting ,  open , setOpen}) {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const cookiesCheck = Cookies.get("cookies");
        if (!cookiesCheck && !localStorage.getItem("cookies")) {
            setOpen(true)
        }
    }, [])

    const handleReject = () => {
        Cookies.set("cookies", "reject", { expires: 365 });
        localStorage.setItem("cookies", "reject");
        handleClose()
    }
    const handleAccept = () => {
        Cookies.set("cookies", "accept", { expires: 365 });
        localStorage.setItem("cookies", "accept");
        handleClose()

    }
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
                    <div className={styles.title}>We use cookies<img src={Assets.Icons.cookies} width={18} height={18} /></div>
                    <div>
                        We use zeitblast’s own and third-party cookies to ensure the proper operation of this website. If you click on the "accept all cookies" button below, we will also use statistical and personalized marketing cookies. <Link className={styles.link} to={"/privacy-policy"}>Read more</Link>
                    </div>
                    <div className={styles.footer}>
                        <div>
                            <div onClick={handleCookiesSetting} className={styles.settings}>Cookies settings</div>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.reject} onClick={handleReject}>Reject all</button>

                            <button className={styles.accept} onClick={handleAccept}>Accept all</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
