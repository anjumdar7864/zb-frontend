import { useMediaPredicate } from "react-media-hook";

const useResponsiveWidth = () => {
  const isLessThan768 = useMediaPredicate("(max-width: 768px)");
  const isLessThan930 = useMediaPredicate("(max-width: 930px)");
  const isLessThan600 = useMediaPredicate("(max-width: 600px)");
  const isLessThan500 = useMediaPredicate("(max-width: 500px)");
  if (isLessThan768) return 92;
  if (isLessThan500) return 92;
  if (isLessThan600) return 92;
  if (isLessThan930) return 72;
  return 102;
};

export default useResponsiveWidth;
