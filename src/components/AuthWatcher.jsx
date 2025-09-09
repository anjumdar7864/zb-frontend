import { logOut } from "@/store/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export function AuthWatcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    const publicRoots = ["/login", "/signup", "/forget-password", "/create-password", "/change-password"];

    const goLoginIfNeeded = () => {
      const userStr = localStorage.getItem("user");
      const onPublic = publicRoots.some((p) => location.pathname.startsWith(p));
      if (!userStr && !onPublic) {
        dispatch(logOut());
        navigate("/login", { replace: true });
      }
    };

    // initial check
    goLoginIfNeeded();

    // other tabs
    const onStorage = (e) => {
      if (!e.key || e.key === "user") goLoginIfNeeded();
    };

    // this tab (from the patch)
    const onLocal = () => goLoginIfNeeded();

    window.addEventListener("storage", onStorage);
    window.addEventListener("ls-changed", onLocal);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ls-changed", onLocal);
    };
  }, [navigate, location.pathname]);

  return null;
}
