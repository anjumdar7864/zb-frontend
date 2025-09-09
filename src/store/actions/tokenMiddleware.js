import axios from "axios";
import { authConstant } from "../constants";
// axios.defaults.withCredentials = true;
const tokenMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // Always pass the action to the next middleware or reducer
    next(action); // This allows the action to continue regardless of token validation.

    const token =
      localStorage.getItem("userToken") ?? localStorage.getItem("userToken");

    // If there is no token, return immediately and don't block other actions
    if (!token) {
      return;
    }

    try {
      // Call the token expiry API to validate the token
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/check/token`,
        { token }
      );

      // If the token is invalid (403), dispatch the LOGOUT action
      if (response.status === 403) {
        console.log("Token is expired or invalid, logging out...");
        dispatch({ type: authConstant.LOGOUT });
      }
    } catch (error) {
      // Handle 403 error explicitly or other errors
      if (error.response && error.response.status === 403) {
        console.error(
          "Error: Token is expired or unauthorized (403), logging out..."
        );
        dispatch({ type: authConstant.LOGOUT });
      } else {
        console.error("Error checking token:", error);
        // Optional: Dispatch logout or other error-handling actions
        dispatch({ type: authConstant.LOGOUT });
      }
    }
  };

export default tokenMiddleware;
