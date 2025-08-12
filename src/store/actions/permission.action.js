import { permissionConstant, authConstant } from "../constants";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const GetAllPermission = () => {
  return async (dispatch) => {
    dispatch({ type: permissionConstant.GET_ALL_PERMISSION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/permission`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: permissionConstant.GET_ALL_PERMISSION_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
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
          type: permissionConstant.GET_ALL_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreatePermission = (body) => {
  return async (dispatch) => {
    dispatch({ type: permissionConstant.CREATE_PERMISSION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/permission`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: permissionConstant.CREATE_PERMISSION_SUCCESS,
        payload: "Permission has been created",
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
          type: permissionConstant.CREATE_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeletePermission = (id) => {
  return async (dispatch) => {
    dispatch({ type: permissionConstant.DELETE_PERMISSION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/permission/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllPermission());
      dispatch({
        type: permissionConstant.DELETE_PERMISSION_SUCCESS,
        payload: "Permission has been deleted",
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
          type: permissionConstant.DELETE_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSinglePermission = (id) => {
  return async (dispatch) => {
    dispatch({ type: permissionConstant.GET_SINGLE_PERMISSION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/permission/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: permissionConstant.GET_SINGLE_PERMISSION_SUCCESS,
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
          type: permissionConstant.GET_SINGLE_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateSinglePermission = (body, id) => {
  return async (dispatch) => {
    dispatch({ type: permissionConstant.UPDATE_SINGLE_PERMISSION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/permission/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: permissionConstant.UPDATE_SINGLE_PERMISSION_SUCCESS,
        payload: "Permission has been updated",
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
          type: permissionConstant.UPDATE_SINGLE_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateSingleUserPermission = (body, id, onSuccess , onError) => {
  return async (dispatch) => {
    dispatch({
      type: permissionConstant.UPDATE_SINGLE_USER_PERMISSION_REQUEST,
    });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/individual/permissions/update/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: permissionConstant.UPDATE_SINGLE_USER_PERMISSION_SUCCESS,
        payload: "Permission has been updated",
      });
      onSuccess()

    } catch (error) {
      onError(error.response.data.message)
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
          type: permissionConstant.UPDATE_SINGLE_USER_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const ResetPermission = (id , success) => {
  return async (dispatch) => {
    dispatch({ type: permissionConstant.RESET_PERMISSION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
    const data =   await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/reset/permissions?userId=${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      success(data)
      dispatch({
        type: permissionConstant.RESET_PERMISSION_SUCCESS,
        payload: "Permission has been reseted",
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
          type: permissionConstant.RESET_PERMISSION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
