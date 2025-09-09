import { authConstant, dncConstant } from "../constants";
import axios from "axios";
import fileDownload from "js-file-download";
// axios.defaults.withCredentials = true;
export const GetAllDNC = (search, page, limit , sorting) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.GET_ALL_DO_NOT_CALL_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      if (search) {
        result = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }inbox/v1/api/dnc?search=${search}&page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }inbox/v1/api/dnc?page=${page}&limit=${limit}${sorting?.sort ? `?${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: dncConstant.GET_ALL_DO_NOT_CALL_SUCCESS,
        payload: {
          results: data.results,
          totalResults: data.totalResults,
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
          type: dncConstant.GET_ALL_DO_NOT_CALL_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const deleteDNC = (id) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.DELETE_DO_NOT_CALL_NUMBER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}inbox/v1/api/dnc/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDNC("", 1, 10));
      dispatch({
        type: dncConstant.DELETE_DO_NOT_CALL_NUMBER_SUCCESS,
        payload: "Successfully deleted.",
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
          type: dncConstant.DELETE_DO_NOT_CALL_NUMBER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const addNewDnc = (body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.ADD_DO_NOT_CALL_NUMBER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}inbox/v1/api/dnc`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDNC("", 1, 10));
      dispatch({
        type: dncConstant.ADD_DO_NOT_CALL_NUMBER_SUCCESS,
        payload: "Successfully added.",
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
          type: dncConstant.ADD_DO_NOT_CALL_NUMBER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const updateDnc = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.UPDATE_DO_NOT_CALL_NUMBER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}inbox/v1/api/dnc/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDNC("", 1, 10));
      dispatch({
        type: dncConstant.UPDATE_DO_NOT_CALL_NUMBER_SUCCESS,
        payload: "Successfully updated.",
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
          type: dncConstant.UPDATE_DO_NOT_CALL_NUMBER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const getSingleDnc = (id) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.GET_SINGLE_DO_NOT_CALL_NUMBER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}inbox/v1/api/dnc/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      let { data } = result;
      dispatch({
        type: dncConstant.GET_SINGLE_DO_NOT_CALL_NUMBER_SUCCESS,
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
          type: dncConstant.GET_SINGLE_DO_NOT_CALL_NUMBER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const exportDnc = () => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.EXPORT_DO_NOT_CALL_NUMBER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/dnc/export/data`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      let { data } = result;
      fileDownload(data, `dnc_${new Date().getTime()}.csv`);
      dispatch({
        type: dncConstant.EXPORT_DO_NOT_CALL_NUMBER_SUCCESS,
        payload: "Exported",
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
          type: dncConstant.EXPORT_DO_NOT_CALL_NUMBER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const importDnc = (body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.IMPORT_DO_NOT_CALL_NUMBER_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/dnc/import/data`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDNC("", 1, 10));
      dispatch({
        type: dncConstant.IMPORT_DO_NOT_CALL_NUMBER_SUCCESS,
        payload: { message: "File has been imported" },
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
          type: dncConstant.IMPORT_DO_NOT_CALL_NUMBER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const exportProspect = (body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.EXPORT_PROSPECT_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/inboxList/export/prospects`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      let { data } = result;
      fileDownload(data, `prospect_export_${new Date().getTime()}.csv`);
      dispatch({
        type: dncConstant.EXPORT_PROSPECT_SUCCESS,
        payload: "Prospect export completed",
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
          type: dncConstant.EXPORT_PROSPECT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const getConnectedCrm = () => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.GET_CONNECTED_CRM_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/inboxList/integrate/crm`,

        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      let { data } = result;
      dispatch({
        type: dncConstant.GET_CONNECTED_CRM_SUCCESS,
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
          type: dncConstant.GET_CONNECTED_CRM_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const updateConnectedCrm = (body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.UPDATE_CONNECTED_CRM_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/inboxList/integrate/crm`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(getConnectedCrm());
      dispatch({
        type: dncConstant.UPDATE_CONNECTED_CRM_SUCCESS,
        payload: "CRM has been updated",
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
          type: dncConstant.UPDATE_CONNECTED_CRM_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const connectCrm = (body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.CONNECT_CRM_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/inboxList/integrate/crm`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(getConnectedCrm());
      dispatch({
        type: dncConstant.CONNECT_CRM_SUCCESS,
        payload: "CRM has been connected",
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
          type: dncConstant.CONNECT_CRM_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const changeCrmStatus = (body) => {
  return async (dispatch) => {
    dispatch({ type: dncConstant.CHANGE_CRM_STATUS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/inboxList/change/crm/status`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(getConnectedCrm());
      dispatch({
        type: dncConstant.CHANGE_CRM_STATUS_SUCCESS,
        payload: "CRM status has been updated",
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
          type: dncConstant.CHANGE_CRM_STATUS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
