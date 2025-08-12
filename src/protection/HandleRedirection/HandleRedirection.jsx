import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HandleRedirection = () => {
  const redirect = new URLSearchParams(useLocation().search).get("redirect");
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = Boolean(
      localStorage.getItem("user") || localStorage.getItem("user")
    );

    if (isUserLoggedIn) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  return null;
};

export default HandleRedirection;
