import theme from "@/theme";
import { useMediaQuery } from "@mui/material";
import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  isExtraSmall: false,
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isExtraLarge: false,
  isExtraExtraLarge: false,
  setIsLoaderShowing: () => {},
  isLoaderShowing: false,
  setIsToastModalOpen: () => {},
  isToastModalOpen: false,
  errorModalError: {
    title: "",
    details: "",
  },
  setErrorModalError: () => {},
  windowWidth: 0,
  setWindowWidth: () => {},
});

const GlobalContextProvider = ({ children }) => {
  const [isLoaderShowing, setIsLoaderShowing] = useState(false);
  const [isToastModalOpen, setIsToastModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [errorModalError, setErrorModalError] = useState({
    title: "",
    details: "",
  });
  const isExtraSmall = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isMedium = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const isLarge = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`);
  const isExtraLarge = useMediaQuery(`(max-width: ${theme.breakpoints.xlg}px)`);
  const isExtraExtraLarge = useMediaQuery(
    `(max-width: ${theme.breakpoints.xxlg}px)`
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(document.documentElement.clientWidth);
    };
    const interval = setInterval(() => handleResize, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isExtraSmall,
        isSmall,
        isMedium,
        isLarge,
        isExtraLarge,
        isExtraExtraLarge,
        setIsLoaderShowing,
        isLoaderShowing,
        setIsToastModalOpen,
        isToastModalOpen,
        errorModalError,
        setErrorModalError,
        windowWidth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider };
export default GlobalContext;
