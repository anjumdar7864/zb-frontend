import { useGlobalContext } from "@/hooks";
import React from "react";
import { MUIModalStyled, ToastModalStyled } from "./styled";
import { FaCheckCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const MotionedToastModalStyled = motion(ToastModalStyled);
function ModalToast() {
  const { isToastModalOpen, setIsToastModalOpen } = useGlobalContext();
  return (
    <MUIModalStyled open={isToastModalOpen}>
      <AnimatePresence>
        {isToastModalOpen && (
          <MotionedToastModalStyled>
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
              onClick={() => setIsToastModalOpen(false)}
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
              <span className="icon">
                <FaCheckCircle color="#32CD32" size={30} />
              </span>
              <div className="textWrapper">File added successfully!</div>
              <div className="bottom">
                <div className="group">
                  <button onClick={() => setIsToastModalOpen(false)}>
                    <span className="text">Ok</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </MotionedToastModalStyled>
        )}
      </AnimatePresence>
    </MUIModalStyled>
  );
}

export default ModalToast;
