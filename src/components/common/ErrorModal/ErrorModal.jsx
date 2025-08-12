import Assets from "@/assets";
import { ErrorModalStyled } from "./styles";
import { useGlobalContext } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";

const MotionedErrorModalStyled = motion(ErrorModalStyled);

const ErrorModal = () => {
    const { errorModalError, setErrorModalError } = useGlobalContext();
    return (
        <AnimatePresence>
            {errorModalError?.title && (
                <MotionedErrorModalStyled>
                    <motion.div
                        className="overlay"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { ease: "linear", duration: 0.3 },
                        
                        }}
                        exit={{
                            opacity: 0,
                            transition: { ease: "linear", duration: 0.3 },
                        }}
                        onClick={() =>
                            setErrorModalError({ title: "", details: "" })
                        }
                    />
                    <motion.div
                        className="box"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { ease: "linear", duration: 0.3 },
                                padding:"0px" , 
                                width:"700px" , 
                                minWidth:"700px"
                        }}
                        exit={{
                            scale: 0,
                            opacity: 0,
                            transition: { ease: "linear", duration: 0.3 },
                        }}
                    >
                        <div style={{padding:"16px"}} className="top">
                            <span className="icon">
                                <Assets.Icons.ErrorClose  />
                            </span>
                        </div>
                        <div className="bottom">
                            <div style={{color:"#073F56" , fontSize:"16px" , padding:"0px 16px" ,  fontWeight:400 , lineHeight:"24px"}} className="top">{errorModalError?.title}</div>
                            <div className="bottom">
                                <p>{errorModalError?.details}</p>
                                <div>
                                <button
                                style={{backgroundColor:"#00BD82"}}
                                    onClick={() =>
                                        setErrorModalError({
                                            title: "",
                                            details: "",
                                        })
                                    }
                                >
                                    Okay
                                </button>
                                </div>
                              
                            </div>
                        </div>
                    </motion.div>
                </MotionedErrorModalStyled>
            )}
        </AnimatePresence>
    );
};

export default ErrorModal;
