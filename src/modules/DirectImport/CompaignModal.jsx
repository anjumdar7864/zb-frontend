import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import styles from "./DirectImport.module.css";
import CampaignComp from "./CampaignComp";

const CompaignModal = ({ children, singleDirectImport , numberOfRowsShowing , currentPage }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    borderRadius: "16px",
    boxShadow: 24,
    // p: 1,
    maxHeight:"90vh" , 
    padding: "20px 0px",
  };
  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 20px",
            }}
          >
            <div className={styles.modalTitle}>Select A Campaign </div>
            <div>
              <IoClose
                onClick={handleClose}
                style={{
                  color: "#012635",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
            </div>
          </div>
          <div>
            <CampaignComp
              singleDirectImport={singleDirectImport}
              handleClose={handleClose}
              numberOfRowsShowing={numberOfRowsShowing}
              currentPage={currentPage}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CompaignModal;
