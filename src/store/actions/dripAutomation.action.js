import { authConstant, dripAutomationConstant } from "../constants";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const GetAllDripForInbox = (value, page, limit , sorting) => {
  return async (dispatch) => {
    dispatch({ type: dripAutomationConstant.GET_ALL_DRIP_FOR_INBOX_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      if (value) {
        result = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }batch/v1/api/dripAutomation?search=${value}&page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
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
          }batch/v1/api/dripAutomation?page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      // console.log(data,"tahsdsdja")
      dispatch({
        type: dripAutomationConstant.GET_ALL_DRIP_FOR_INBOX_SUCCESS,
        payload: {
          results: data.results,
          totalResults: data.totalResults,
          totalPages:data?.totalPages,
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
          type: dripAutomationConstant.GET_ALL_DRIP_FOR_INBOX_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetOneDripForInbox = (id) => {
  return async (dispatch) => {
    dispatch({ type: dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/dripAutomation/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_SUCCESS,
        payload: { mainData: data, singleMessage: "" },
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
          type: dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateOneDripForInbox = (body, id) => {
  return async (dispatch) => {
    dispatch({ type: dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/dripAutomation/update/single/message/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_SUCCESS,
        payload: { mainData: data, singleMessage: "Data has been fetched" },
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
          type: dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const createDrip = (body) => {
  return async (dispatch) => {
    dispatch({ type: dripAutomationConstant.CREATE_DRIP_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/dripAutomation`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDripForInbox());
      dispatch({
        type: dripAutomationConstant.CREATE_DRIP_SUCCESS,
        payload: {
          results: "Drip has been created",
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
          type: dripAutomationConstant.CREATE_DRIP_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const updateDrip = (body, id, drag) => {
  return async (dispatch) => {
    dispatch({ type: dripAutomationConstant.UPDATE_DRIP_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/dripAutomation/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDripForInbox());
      if (!drag) {
        dispatch({
          type: dripAutomationConstant.UPDATE_DRIP_SUCCESS,
          payload: {
            results: "Drip has been Updated",
          },
        });
      }
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
          type: dripAutomationConstant.UPDATE_DRIP_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const deleteDrip = (id) => {
  return async (dispatch) => {
    dispatch({ type: dripAutomationConstant.DELETE_DRIP_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/dripAutomation/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllDripForInbox());
      dispatch({
        type: dripAutomationConstant.DELETE_DRIP_SUCCESS,
        payload: {
          results: "Drip has been deleted",
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
          type: dripAutomationConstant.DELETE_DRIP_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};


// export const updateDripAutomationPosition = () =>{
//   return async (dispatch) => {
//     // dispatch({ type: dripAutomationConstant.UPDATE_DRIP_POSITION_REQUEST });
//     try {
//       const token =
//         localStorage.getItem("userToken") ??
//         localStorage.getItem("userToken");
//       await axios.patch(
//         `${
//           import.meta.env.VITE_APP_BACKEND_BASE_URL
//         }batch/v1/api/dripAutomation/update/template/position `,
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );
//       // dispatch(GetAllDripForInbox());
//       // dispatch({
//       //   type: dripAutomationConstant.UPDATE_DRIP_POSITION_SUCCESS,
//       //   payload: {
//       //     results: "Drip position has been updated",
//       //   },
//       // });
//     } catch (error) {
//       if (
//         error.response.data.message === "Session expiredd"
//       ) {
//         localStorage.clear();
//         dispatch({
//           type: authConstant.SESSION_EXPIRE,
//           payload: { err: "Session has been expired" },
//         });
//       }
//       //  else {
//       //   dispatch({
//       //     type: dripAutomationConstant.UPDATE_DRIP_POSITION_FAILURE,
//       //     payload: { err: error.response.data.message },
//       //   });
//       // }
//     }
//   };
// }


export const updateDripAutomationPosition = (body) => {
  const token =
  localStorage.getItem("userToken") ??
  localStorage.getItem("userToken");
  return async (dispatch) => {
    await axios.patch(
      `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }batch/v1/api/dripAutomation/update/template/position`,
      body , 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token here
        },
      }
    );
  };
};