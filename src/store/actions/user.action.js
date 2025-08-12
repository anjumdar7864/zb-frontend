import { UsersConstant, authConstant } from "../constants";
import axios from "axios";
//axios.defaults.withCredentials = true;
export const GetSingleUser = (Id) => {
  return async (dispatch) => {
    dispatch({ type: UsersConstant.GET_SINGLE_USER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const url = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/user/${Id}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { data } = result;
      dispatch({
        type: UsersConstant.GET_SINGLE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (
        error.response.data.message === "Session expired"
      ) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: UsersConstant.GET_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};


export const UpdateSingleUser = (body, id) => {
  return async (dispatch) => {
    dispatch({ type: UsersConstant.UPDATE_SINGLE_USER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/user/${id}`,
        body, // Send the formData instead of body
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: UsersConstant.UPDATE_SINGLE_USER_SUCCESS,
        payload: "User has been updated",
      });
    } catch (error) {
      if (
        error.response.data.message === "Session expired"
      ) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: UsersConstant.UPDATE_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};