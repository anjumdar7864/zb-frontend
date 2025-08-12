import { billingConstant, authConstant } from "../constants";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const GetAllSubscription = (query = null) => {
  return async (dispatch) => {
    dispatch({ type: billingConstant.GET_ALL_BILLING_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/subscription${
          query ? query : ""
        }`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: billingConstant.GET_ALL_BILLING_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
      });
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: billingConstant.GET_ALL_BILLING_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSingleAdminUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: billingConstant.GET_SINGLE_ADMIN_BY_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/admin/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      // alert("##############")
      const { data } = result;
      dispatch({
        type: billingConstant.GET_SINGLE_ADMIN_BY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        //localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: billingConstant.GET_SINGLE_ADMIN_BY_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSingleAdminUserForSignup = (id) => {
  return async (dispatch) => {
    dispatch({ type: billingConstant.GET_SINGLE_ADMIN_BY_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/admin/get/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      // alert("##############")
      const { data } = result;
      dispatch({
        type: billingConstant.GET_SINGLE_ADMIN_BY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        //localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: billingConstant.GET_SINGLE_ADMIN_BY_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetPaymentHistoryById = () => {
  return async (dispatch) => {
    dispatch({ type: billingConstant.GET_PATMENT_HISTORY_BY_ID_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const user =
        JSON.parse(localStorage.getItem("user")) ??
        JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/payment/history/${user?._id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: billingConstant.GET_PATMENT_HISTORY_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: billingConstant.GET_PATMENT_HISTORY_BY_ID_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateSubscription = (body) => {
  return async (dispatch) => {
    dispatch({ type: billingConstant.UPDATE_SUBSCIPTION_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      // const result = await axios.patch(body, {
      //   headers: {
      //     Authorization: token ? `Bearer ${token}` : "",
      //   },
      // });

      const result = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/update/subscription`,
        body, // Assuming `body` contains the data you want to send
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: billingConstant.UPDATE_SUBSCIPTION_SUCCESS,
        payload: "Subscription has been updated",
      });

      dispatch(GetSingleAdminUser(body?.adminId));
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: billingConstant.UPDATE_SUBSCIPTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const downloadCsvAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: billingConstant.DOWNLOAD_CSV_TENANT_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Make the API request
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/download/admin/csv?timeZone=${userTimeZone}`,
        {
          responseType: "blob", // Important to specify response type as blob
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });

      // Create a link element
      const link = document.createElement("a");

      // Set the URL using the Blob object
      const url = URL.createObjectURL(blob);
      link.href = url;

      // Set the download attribute with the desired file name
      link.setAttribute("download", "downloaded_data.csv");

      // Append the link to the document body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      dispatch({
        type: billingConstant.DOWNLOAD_CSV_TENANT_SUCCESS,
        payload: "Exported",
      });
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: billingConstant.DOWNLOAD_CSV_TENANT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
