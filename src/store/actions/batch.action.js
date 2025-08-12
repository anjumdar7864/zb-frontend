import { authConstant, batchConstant } from "../constants";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const GetCompleteStatusBatch = (page, limit, userId, userType , sorting , refresh) => {
  return async (dispatch) => {
    if(!refresh){
      dispatch({ type: batchConstant.GET_COMPLETE_STATUS_BATCH_REQUEST });
    }
    
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      if (userId) {
        result = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }batch/v1/api/mainBatches/by/status/completed?${userType}=${userId}&page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }batch/v1/api/mainBatches/by/status/completed?page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: batchConstant.GET_COMPLETE_STATUS_BATCH_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
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
          type: batchConstant.GET_COMPLETE_STATUS_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetPausedStatusBatch = (userId, userType , page , limit , sorting) => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.GET_PAUSED_STATUS_BATCH_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      if (userId) {
        result = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }batch/v1/api/mainBatches?status=paused&${userType}=${userId}&page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }batch/v1/api/mainBatches?status=paused&page=${page}&limit=${limit}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
    
      
      dispatch({
        type: batchConstant.GET_PAUSED_STATUS_BATCH_SUCCESS,
        payload: {
          results: data.results,
          pauseTotalResults: data.totalResults,
          pauseTotalPages: data.totalPages , 
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
          type: batchConstant.GET_PAUSED_STATUS_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetAllUserForBatch = () => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.GET_ALL_USER_FOR_BATCH_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/mainBatches/get/combine`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: batchConstant.GET_ALL_USER_FOR_BATCH_SUCCESS,
        payload: {
          results: data.results,
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
          type: batchConstant.GET_ALL_USER_FOR_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const GetBatchById = (batchId) => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.GET_BATCH_BY_ID_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/mainBatches/${batchId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: batchConstant.GET_BATCH_BY_ID_SUCCESS,
        payload: {
          batch: data.finalBatch,
          directImport: data.directImport,
          template: data?.finalTemplate[0],
          compaign: data?.finalCampaign,
          directImportData: data?.directImportData,
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
          type: batchConstant.GET_BATCH_BY_ID_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetCampaignForBatch = () => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.GET_CAMPAGIN_FOR_BATCH_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}campaign/v1/api/compaign`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: batchConstant.GET_CAMPAGIN_FOR_BATCH_SUCCESS,
        payload: {
          results: data.results,
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
          type: batchConstant.GET_CAMPAGIN_FOR_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateBatch = (body, showProcessingBatchModal) => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.CREATE_BATCH_REQUEST });


    console.log(`Create batch`, body)

    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}batch/v1/api/mainBatches`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      console.log("res 22===", res);
      // dispatch(GetCompleteStatusBatch(1, 10));
      // dispatch(GetPausedStatusBatch());
      if (res) {
        showProcessingBatchModal();
      }
      dispatch({
        type: batchConstant.CREATE_BATCH_SUCCESS,
        payload: {
          message: "Batch has been created",
          batch: res.data.finalBatch,
          directImport: res.data.directImport,
          template: res?.data?.finalTemplate[0],
          compaign: res?.data?.finalCampaign,
          directImportData: res?.data?.finalDirectImportData,
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
          type: batchConstant.CREATE_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CheckCompaignWorkingHour = (
  body,
  handleCloseCompaignModal,
  item
) => {
  return async (dispatch) => {
    // dispatch({ type: batchConstant.CREATE_BATCH_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/check/working/hour`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (res) {
        handleCloseCompaignModal(item);
      }
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
          type: batchConstant.CREATE_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const ChangeTemplate = (body, id) => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.CHANGE_TEMPLATE_FOR_BATCH_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/mainBatches/change/template/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log(res,body, id,'asdasda')
      dispatch({
        type: batchConstant.CHANGE_TEMPLATE_FOR_BATCH_SUCCESS,
        payload: { message: "Template Change Successfully" },
      });
      dispatch(GetCompleteStatusBatch(1, 10));
      dispatch(GetPausedStatusBatch());
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
          type: batchConstant.SEND_MESSAGE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const SendMessage = (body, onClose) => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.SEND_MESSAGE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/mainBatches/send/message`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: batchConstant.SEND_MESSAGE_SUCCESS,
        payload: { message: "Message Sent Successfully" },
      });

      return res
      // if(body?.completed && res?.status === 200){
      //   onClose()
      // }
      // dispatch(GetBatchById(body.batchId));
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
          type: batchConstant.SEND_MESSAGE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};




export const UpdateDailyCount = (body, onClose) => {
  return async (dispatch) => {
   
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/mainBatches/update/daily/count/of/old/batch`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
    
      // if(body?.completed && res?.status === 200){
      //   onClose()
      // }
      // dispatch(GetBatchById(body.batchId));
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
          type: batchConstant.SEND_MESSAGE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};


export const CancelBatch = (batchId) => {
  return async (dispatch) => {
    dispatch({ type: batchConstant.CANCEL_BATCH_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }batch/v1/api/mainBatches/cancel/resume/batch/${batchId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: batchConstant.CANCEL_BATCH_SUCCESS,
        payload: "Batch has been cancelled",
      });
    } catch (error) {
      console.log("error is", error);
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
          type: batchConstant.CANCEL_BATCH_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
