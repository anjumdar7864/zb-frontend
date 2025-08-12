import { tenetsConstant, authConstant } from "../constants";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:5000"; // Replace with your backend URL
// axios.defaults.withCredentials = true; // Include cookies in requests

export const GetAllTenets = (query = null , SesstionExpire) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.GET_ALL_TENETS_REQUEST });
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const url = `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }user/v1/api/admin${query !== null ? query : ""}${
        query !== null && query.includes("?") ? "&" : "?"
      }timeZone=${userTimeZone}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        ///withCredentials: true,
      });

      const { data } = result;
      dispatch({
        type: tenetsConstant.GET_ALL_TENETS_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        },
      });
      
    } catch (error) {
      

      if (error.response.data.message === "Session expired") {
        console.log("error", error.response.data.message);
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
        SesstionExpire()
      } else {
        dispatch({
          type: tenetsConstant.LOADER_FALSE,
          payload: "",
        });
        dispatch({
          type: tenetsConstant.GET_ALL_TENETS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateTenetAdmin = (body) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.CREATE_TENET_ADMIN_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/create/by/super/admin/first/step`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          //withCredentials: true,
        }
      );
      console.log("check");

      dispatch(GetAllTenets());
      dispatch({
        type: tenetsConstant.CREATE_TENET_ADMIN_SUCCESS,
        payload: "Email invitation has been sent",
      });
    } catch (error) {
      console.log("error", error.response.data.message);

      if (error.response.data.message === "Session expired") {
        console.log("error", error.response.data.message);

        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: tenetsConstant.CREATE_TENET_ADMIN_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const ResetTenetPaymentEmail = (body) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.CREATE_TENET_ADMIN_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/reset/email/for/payment`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          //withCredentials: true,
        }
      );
    } catch (error) {
      console.log("error", error.response.data.message);

      if (error.response.data.message === "Session expired") {
        console.log("error", error.response.data.message);

        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: tenetsConstant.CREATE_TENET_ADMIN_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

// export const UpdateSingleTenet = (body, id) => {
//   return async (dispatch) => {
//     dispatch({ type: permissionConstant.UPDATE_SINGLE_TENET_REQUEST });
//     try {
//       const token =
//         localStorage.getItem("userToken") ??
//         localStorage.getItem("userToken");
//       await axios.patch(
//         `${
//           import.meta.env.VITE_APP_BACKEND_BASE_URL
//         }/user/v1/api/admin/${id}`,
//         body,
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );
//       dispatch({
//         type: permissionConstant.UPDATE_SINGLE_TENET_SUCCESS,
//         payload: "User has been updated",
//       });
//     } catch (error) {
//       if (
//         error.response.data.message === "Session expired"
//       ) {
//         localStorage.clear();
//         dispatch({
//           type: authConstant.SESSION_EXPIRE,
//           payload: { err: "Session has been expired" },
//         });
//       } else {
//         dispatch({
//           type: permissionConstant.UPDATE_SINGLE_TENET_FAILURE,
//           payload: { err: error.response.data.message },
//         });
//       }
//     }
//   };
// };

export const UpdateSingleTenet = (body, id) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.UPDATE_SINGLE_TENET_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/admin/${id}`,
        body, // Send the formData instead of body
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data", // Set the content type
          },
        }
      );
      dispatch({
        type: tenetsConstant.UPDATE_SINGLE_TENET_SUCCESS,
        payload: "Tenant has been updated",
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
          type: tenetsConstant.UPDATE_SINGLE_TENET_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};



export const UpdateSingleTenetCarrierType = (body, id , onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.UPDATE_SINGLE_TENET_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/admin/${id}`,
        body, // Send the formData instead of body
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data", // Set the content type
          },
        }
      );


  


      // dispatch({
      //   type: tenetsConstant.UPDATE_SINGLE_TENET_SUCCESS,
      //   payload: "Tenant has been updated",
      // });
      onSuccess();
    } catch (error) {
      if (error.response.data.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: tenetsConstant.UPDATE_SINGLE_TENET_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};



export const ActiveTenant = (body, id, onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.ACTIVATE_TENET_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/admin/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      onSuccess();

      // dispatch(GetAllTenets());
      dispatch({
        type: tenetsConstant.ACTIVATE_TENET_SUCCESS,
        payload: "Tenant has been activated",
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
          type: tenetsConstant.ACTIVATE_TENET_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeActiveTenant = (body, id, onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.DE_ACTIVATE_TENET_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/v1/api/admin/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      onSuccess();
      // dispatch(GetAllTenets());
      dispatch({
        type: tenetsConstant.DE_ACTIVATE_TENET_SUCCESS,
        payload: "Tenant has been suspended",
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
          type: tenetsConstant.DE_ACTIVATE_TENET_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSingleTenets = (Id) => {
  return async (dispatch) => {
    dispatch({ type: tenetsConstant.GET_SINGLE_TENETS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const url = `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }user/v1/api/admin/${Id}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { data } = result;
      dispatch({
        type: tenetsConstant.GET_SINGLE_TENETS_SUCCESS,
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
          type: tenetsConstant.GET_SINGLE_TENETS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
