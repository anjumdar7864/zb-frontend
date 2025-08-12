import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Redirect from "../Redirect/Redirect";
import { permissionToRouteMap } from "@/utils";

function ProtectedLoginRoute() {
  const isLoggedIn =
    localStorage.getItem("userToken") ?? localStorage.getItem("userToken");

  useEffect(() => {
    if (isLoggedIn) {
      window.location.reload();
    }
  },[isLoggedIn]);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const type =
    localStorage.getItem("type") ?? localStorage.getItem("type") ?? "";

  return isLoggedIn ? (
    <Redirect
      to={`/${
        type === "admin"
          ? "dashboard"
          : user?.role?.permissions
          ? permissionToRouteMap.get(user.role.permissions[0])
          : "dashboard"
      }`}
      obj={{ replace: true }}
    />
  ) : (
    <Outlet />
  );
}

export default ProtectedLoginRoute;
