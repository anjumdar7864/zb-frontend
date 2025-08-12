import Assets from "@/assets";
import {
  DeleteModalStyled,
  MUIModalStyled,
} from "./../../../components/common/DeleteModal/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionedDeleteModalStyled = motion(DeleteModalStyled);

const DripWarningModal = ({
  open,
  onClose,
  onOkay,
  deleteItemName,
  deleteItemText,
}) => {
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
                  <span className="icon">
                    <Assets.Icons.WarningIcon />
                  </span>
                </div>
                <div className="bottom">
                  <div className="bottom">
                    <p>
                      {deleteItemText
                        ? deleteItemText
                        : `You want to permanently delete this ${deleteItemName}?`}
                    </p>
                    <div className="group">
                      <button
                        onClick={onOkay}
                        style={{ backgroundColor: "#3085d6" }}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MotionedDeleteModalStyled>
          )}
        </AnimatePresence>
      </MUIModalStyled>
    )
  );
};

export default DripWarningModal;
