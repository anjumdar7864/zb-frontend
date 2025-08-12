import Assets from "@/assets";
import { ConfirmModalStyled, MUIModalStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionedConfirmModalStyled = motion(ConfirmModalStyled);

const ConfirmModal = ({ open, onClose, onOkay, content }) => {
    const [isModalShow, setIsModalShow] = useState(false);

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
                        <MotionedConfirmModalStyled>
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
                                    <span style={{paddingTop:"40px"}} className="icon">
                                        <Assets.Icons.WarningIcon />
                                    </span>
                                </div>
                                <div className="bottom">
                                    <h2 className="top">{content?.title || "Are you sure?"}</h2>
                                    <div className="bottom">
                                        <p style={{paddingBottom:"40px"}}>
                                            {content?.message || "You want to confirm this operation?"}
                                        </p>
                                        <div style={{ width:"100%" , justifyContent:"end" , height:"72px" , padding:"0 16px" , borderTop:"solid 1px #F0F0F0"}} className="group">
                                            <button style={{backgroundColor:"white" , border:"solid 1px #777777" , color:"#777777" , borderRadius:"8px" , height:"40px" , padding:"0px" , width:"100px" ,  }} onClick={onClose}>
                                                Cancel
                                            </button>
                                            <button style={{backgroundColor:"#00BD82" , height:"40px" , fontWeight:500 , fontSize:"16px" , borderRadius:"8px" , padding:"0px" , width:"100px" , height:"40px"}} onClick={onOkay}>
                                                Okay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </MotionedConfirmModalStyled>
                    )}
                </AnimatePresence>
            </MUIModalStyled>
        )
    );
};

export default ConfirmModal;
