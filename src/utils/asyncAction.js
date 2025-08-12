import { toast } from "react-hot-toast";
import { authConstant } from "../store/constants";

export const asyncAction = (
  cb,
  actionNames,
  onSuccess,
  onError,
  notRequest
) => {

  
  return async (dispatch, state) => {
    try {
      if (
        actionNames.request !== "GET_ALL_TEMPLATES_REQUEST" &&
        actionNames.request !== "GET_ALL_REPLY_TEMPLATE_CATEGORIES_REQUEST"
      ) {
        dispatch({ type: actionNames.request });
      }
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      const payload = await cb(
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
        dispatch,
        state
      );
      
      
      dispatch({ type: actionNames.success, payload });
      onSuccess && onSuccess(payload);
    } catch (error) {
      // console.error("chulling this ***" ,error);
      // console.log("chulling this ====" , error);
      // console.log("chulling this ____" , error?.message);
      // console.log("chulling this ++++" , error?.response?.data?.message);
      
      if (
        error?.response?.data?.message === "Session expired"
      ) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
        toast.error("Session has been expired");
      } else {
        dispatch({
          type: actionNames.error,
          payload: error?.response?.data ?? error?.message,
        });
        onError
          ? onError(error)
          : console.error(error?.response?.data?.message ?? error?.message);
      }
      console.log(error);
    }
  };
};

export default asyncAction;
