import { Outlet } from "react-router-dom";
import Redirect from "../Redirect/Redirect";

function ProtectedRoute() {
  const isLoggedIn =
    localStorage.getItem("userToken") ?? localStorage.getItem("userToken");
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Redirect to={"/"} obj={{ replace: true }} />
  );
}

export default ProtectedRoute;
