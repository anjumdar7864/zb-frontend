import { useMediaPredicate } from "react-media-hook";

const useResponsiveWidth = () => {
  const isLessThan600 = useMediaPredicate("(max-width: 600px)");
  const isLessThan500 = useMediaPredicate("(max-width: 500px)");

  if (isLessThan500) return 60;
  if (isLessThan600) return 55;
  return 72;
};

export default useResponsiveWidth;
