import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { commonAPICall } from "@/services/api/common";
import toast from "react-hot-toast";
import { CircularLoader } from "@/components/common";
import Assets from "@/assets";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 548,
  // height: 226,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "16px",
  boxShadow: 24,
  // p: 4,
};

const reasonList = [
  "I no longer have any use for this application.",
  "The app does not function as advertized",
  "I do not believe that the app provides value for the subscription price.",
  "I found a better alternative.",
  "The app does not function as advertized.",
  "I am dissatisfied with the customer support provided",
  "Others(Please Specify).",
];

const CancelConfirmModal = ({
  open,
  setOpenCancelModal,
  handleCancel,
  setCancelReason,
  canceleReason,
  additionalCancelReason,
  setAdditionalCancelReason,
}) => {
  const [loading, setLoader] = React.useState(false);

  const isDisabled =
    canceleReason == ""
      ? true
      : canceleReason == "Others(Please Specify)." &&
        additionalCancelReason == ""
      ? true
      : false;
  return (
    <div>
      {/* <Button onClick={() => setDownGradeStep(1)}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={() => setOpenCancelModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "58px",
              alignItems: "center",
              padding: "0px 16px",
              borderBottom: "solid 1px #F0F0F0",
            }}
          >
            <div
              style={{
                width: "fit-content",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "26px",
                color: "#012635",
              }}
            >
              Cancel Subscription
            </div>
            <div
              style={{ width: "fit-content", cursor: "pointer" }}
              onClick={() => setOpenCancelModal(0)}
            >
              <IoMdClose style={{ fontSize: "24px", color: "#012635" }} />
            </div>
          </div>
          <div style={{ padding: "16px" }}>
            <div
              style={{ color: "#012635", fontSize: "16px", fontWeight: 400 }}
            >
              If you cancel now, you will no longer be charged and your learners
              will have access to their account and plan until 16 Nov 2023. You
              can renew your subscription should you change your mind
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                padding: "16px 0px",
                flexDirection: "column",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#012635",
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "0px 0px",
                  }}
                >
                  Cancellation Reason
                </div>
                <div>
                  <select
                    onClick={(e) => setCancelReason(e.target.value)}
                    style={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "8px",
                      border: "solid 1px #D3D7DD",
                      marginTop: "8px",
                      padding: "0px 12px",
                    }}
                  >
                    <option
                      style={{
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: 400,
                      }}
                      value=""
                    >
                      -Select an option-
                    </option>
                    {reasonList.map((item, index) => {
                      return (
                        <option
                          style={{
                            color: "#012635",
                            fontSize: "14px",
                            fontWeight: 400,
                          }}
                          value={item}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "#012635",
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "0px 0px",
                  }}
                >
                  Additional Information
                </div>
                <div>
                  <input
                    onChange={(e) => setAdditionalCancelReason(e.target.value)}
                    value={additionalCancelReason}
                    style={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "8px",
                      border: "solid 1px #D3D7DD",
                      marginTop: "8px",
                      padding: "0px 12px",
                    }}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "16px",
              height: "88px",
              alignItems: "center",
              padding: "0px 16px",
              borderTop: "solid 1px #F0F0F0",
            }}
          >
            <div
              onClick={() => setOpenCancelModal(false)}
              style={{
                border: "solid 1px #777777",
                cursor: "pointer",
                borderRadius: "8px",
                color: "#777777",
                width: "158px",
                height: "40px",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading == false ? (
                " Stay subscribed"
              ) : (
                <CircularLoader color={"white"} />
              )}
            </div>
            <button
              disabled={isDisabled}
              style={{
                cursor: !isDisabled && "pointer",
                borderRadius: "8px",
                backgroundColor: "#EA3815",
                color: "white",
                width: "172px",
                height: "40px",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleCancel}
            >
              Cancel Subscription
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CancelConfirmModal;
