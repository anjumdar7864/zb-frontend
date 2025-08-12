


import Assets from "@/assets";
import { DeleteModalStyled, MUIModalStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { truncate } from "lodash-es";
// import { CircularLoader } from "..";
import { CircularLoader } from "@/components/common";
const MotionedDeleteModalStyled = motion(DeleteModalStyled);

const WarningModal = ({
  open,
  onClose,
  onOkay,
  WarningItemName,
  WarningItemTitle , 
  warningItemText,
  isLoading = false , 
  setIsLoading = ()=>{} , 
}) => {
  const [isModalShow, setIsModalShow] = useState(false);
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setIsModalShow(true);
    } else {
      const timeout = setTimeout(() => {
        setIsModalShow(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    isModalShow && (
      <MUIModalStyled open={isModalShow}>
        <AnimatePresence>
          {open && (
            <MotionedDeleteModalStyled>
              <motion.div
                className="overlay"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                onClick={onClose}
              />
              <motion.div
                className="box"
                style={{ paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", overflow: "hidden" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
              >
                <div className="top">
                  <div
                    style={{
                      backgroundColor: "#FFEEEE",
                      borderRadius: "50%",
                      padding: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <span className="icon">
                      <Assets.Icons.WarningIcon />
                    </span>
                  </div>
                </div>

                <div className="bottom">
                  <h2 className="top">{WarningItemTitle}</h2>
                  <div className="bottom">
                    <p>
                 {warningItemText}
                    </p>
                    {/* <div style={{backgroundColor:"red", width:"100%"}} className="group">
                      <button onClick={onClose}>Cancel</button>
                      <button onClick={onOkay}>Okay</button>
                    </div> */}
                  </div>

                </div>
                <div style={{ width: "100%", height: "72px", borderTop: "solid 1px #F0F0F0", display: "flex", justifyContent: "end", gap: "16px", alignItems: "center", padding: "16px" }} className="group">
                  <button style={{ border: "1px solid #FF5D3E", borderRadius: "8px", width: "100px", height: "40px", color: "#FF5D3E", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }} onClick={onClose}>Cancel</button>
                  {
                    isLoading ?
                      <div style={{width:"100px" , display:"flex"  , justifyContent:"center"}}><CircularLoader/></div>
                      :
                      <button style={{ width: "100px", height: "40px", backgroundColor: "#00BD82", color: "white", fontSize: "16px", borderRadius: "8px", fontWeight: 500, lineHeight: "24px" }} onClick={() => {
                        setIsLoading(true)
                       
                        onOkay()
                      }}>Okay</button>

                  }
                </div>
              </motion.div>

            </MotionedDeleteModalStyled>
          )}
        </AnimatePresence>
      </MUIModalStyled>
    )
  );
};

export default WarningModal;

