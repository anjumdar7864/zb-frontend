import { roleConstant, authConstant } from "../constants";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const GetAllRole = () => {
  return async (dispatch) => {
    dispatch({ type: roleConstant.GET_ALL_ROLE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/role`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: roleConstant.GET_ALL_ROLE_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
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
          type: roleConstant.GET_ALL_ROLE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateRole = (body) => {
  return async (dispatch) => {
    dispatch({ type: roleConstant.CREATE_ROLE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/role`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: roleConstant.CREATE_ROLE_SUCCESS,
        payload: "Role has been created",
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
          type: roleConstant.CREATE_ROLE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeleteRole = (id) => {
  return async (dispatch) => {
    dispatch({ type: roleConstant.DELETE_ROLE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/role/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllRole());
      dispatch({
        type: roleConstant.DELETE_ROLE_SUCCESS,
        payload: "Role has been deleted",
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
          type: roleConstant.DELETE_ROLE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSingleRole = (id) => {
  return async (dispatch) => {
    dispatch({ type: roleConstant.GET_SINGLE_ROLE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/role/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: roleConstant.GET_SINGLE_ROLE_SUCCESS,
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
          type: roleConstant.GET_SINGLE_ROLE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateSingleRole = (body, id) => {
  return async (dispatch) => {
    dispatch({ type: roleConstant.UPDATE_SINGLE_ROLE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/role/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: roleConstant.UPDATE_SINGLE_ROLE_SUCCESS,
        payload: "Role has been updated",
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
          type: roleConstant.UPDATE_SINGLE_ROLE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
