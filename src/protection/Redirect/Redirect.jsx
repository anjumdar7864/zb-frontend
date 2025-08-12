import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ to, obj = {} }) => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    to && navigate(to, obj);
  }, [navigate, obj, to]);

  return null;
};

export default Redirect;
