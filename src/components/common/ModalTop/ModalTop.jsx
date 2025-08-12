import { useEffect, useState } from "react";
import { ModalTopStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";

const ModalTop = ({ children, open, onClose }) => {
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
      <ModalTopStyled open={isModalShow}>
        <AnimatePresence>
          {open && (
            <motion.div className="container">
              <motion.div
                className="overlay"
                onClick={onClose}
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
              ></motion.div>
              <motion.div
                className="box"
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalTopStyled>
    )
  );
};

export default ModalTop;
