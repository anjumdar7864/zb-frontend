import React from "react";
import styles from "./CompanyA.module.css";
import { Box, Modal } from "@mui/material";
import { RxCross1 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: "0px",
  borderRadius: "12px",
  overflow: "hidden",
};
const AllGood = ({ onClose }) => {
  return (
    //   height: "348px",

    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              transition: "300ms",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #E0E0E0",
                color: "#012635",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "26px",
                padding: "24px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>All Good!</span>
              <span
                style={{
                  color: "#012635",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
                // onClick={() => {
                //   console.log("Cross icon clicked");
                // }}
              >
                <RxCross1 onClick={() => onClose()} />
              </span>
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "#073F56",
                fontSize: "16px",
                padding: "50px 16px",
                fontWeight: "400",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              Your new credit card has been validated. It is now used as your
              payment method.
            </div>
          </div>

          <div
            style={{
              border: "1px solid #E0E0E0",
              display: "flex",
              justifyContent: "end",
              padding: "10px",
              gap: "20px",
            }}
          >
            <button
              type="submit"
              //   style={{ height: "40px", color: "#F0F0F0" }}
              className={styles.CompanyInfo_save}
              onClick={() => onClose()}
            >
              {/* {isProcessing ? "Processing..." : "Confirm"} */}
              confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AllGood;
