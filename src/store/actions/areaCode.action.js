import { authConstant, areaCodeConstant } from "../constants";
import axios from "axios";

export const GetAllAreaCode = (modeType="" , tenantId="") => {
  return async (dispatch) => {
    dispatch({ type: areaCodeConstant.GET_ALL_AREACODE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}market/v1/api/areaCode?${modeType ? `mode=${modeType}`:""}${tenantId ? `&tenantId=${tenantId}`:""}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: areaCodeConstant.GET_ALL_AREACODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (
        error.response.data.message === "Session expiredd"
      ) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: areaCodeConstant.GET_ALL_AREACODE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const getTimeZoneAccordingToAreaCode = (areaCodeId) => {
  return async (dispatch) => {
    dispatch({ type: areaCodeConstant.GET_AREACODE_BY_ID_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/areaCode/${areaCodeId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: areaCodeConstant.GET_AREACODE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (
        error.response.data.message === "Session expiredd"
      ) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: areaCodeConstant.GET_AREACODE_BY_ID_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
