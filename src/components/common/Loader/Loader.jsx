import { useGlobalContext } from "@/hooks";
import { LoaderStyled } from "./styled";
import { AnimatePresence, motion } from "framer-motion";

const MotionedLoaderStyled = motion(LoaderStyled);

const Loader = () => {
    const { isLoaderShowing } = useGlobalContext();
    return (
        <AnimatePresence>
            {isLoaderShowing ? (
                <MotionedLoaderStyled
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { ease: "linear", duration: 0.3 },
                    }}
                    exit={{
                        opacity: 0,
                        transition: { ease: "linear", duration: 0.3 },
                    }}
                />
            ) : null}
        </AnimatePresence>
    );
};

export default Loader;
