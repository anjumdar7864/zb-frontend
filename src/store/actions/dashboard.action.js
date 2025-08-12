import toast from "react-hot-toast";
import { authConstant, dashboardConstant } from "../constants";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const GetLeadsBreakDown = (mode) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_Lead_BreakDown_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/lead/breakdown?${mode}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_Lead_BreakDown_SUCCESS,
        payload: {
          leads: data.result,
          totalLeads: data.totalRecords,
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
          type: dashboardConstant.GET_Lead_BreakDown_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const resetavgTimeReply = (reset , success) => {
  return async (dispatch) => {
    try {
      const token =
      localStorage.getItem("userToken") ??
      localStorage.getItem("userToken");
      const result = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/reset/average/reply/date`,
        {
          mode: reset
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },

        }
      )
      success()
      toast.success("Reset successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
};

export const GetTopThreeCampaigns = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_TOP_CAMPAIGNS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/top/three/campagins?today=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_TOP_CAMPAIGNS_SUCCESS,
        payload: {
          topCampaigns: data,
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
          type: dashboardConstant.GET_TOP_CAMPAIGNS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

const handleDecimal = (str) => {
  const decimalRegex = /\d+\.\d+/;
  const decimalMatch = str?.match(decimalRegex);
  if (decimalMatch) {
    const decimalNumber = parseFloat(decimalMatch[0]);
    const roundedNumber = decimalNumber.toFixed(2);
    const roundedTimeString = str?.replace(decimalRegex, roundedNumber);
    return roundedTimeString;
  } else {
    return str;
  }
};

export const GetAvgReplyTime = (date) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_AVG_REPLY_TIME_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/average/reply/time?${date}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_AVG_REPLY_TIME_SUCCESS,
        payload: {
          avgReplyTime: data,
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
          type: dashboardConstant.GET_AVG_REPLY_TIME_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSavedAvgReplyTime = (mode) => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/saved/average/reply?${mode}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_SAVED_AVG_REPLY_TIME_SUCCESS,
        payload: {
          savedAvgReplyTime: data,
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
          type: dashboardConstant.GET_SAVED_AVG_REPLY_TIME_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

// export const GetReportMessage = (mode, startDate, endDate) => {
//   console.log("here coming")
//   return async (dispatch) => {
//     dispatch({ type: dashboardConstant.GET_REPORT_MESSAGE_REQUEST });
//     try {
//       const token =
//         localStorage.getItem("userToken") ??
//         localStorage.getItem("userToken");
//       const url =
//         startDate && endDate
//           ? `dashboard/v1/api/dashboard/count/of/messages?startDate=${formattedDate}&endDate=${endDateformattedDate}`
//           : `dashboard/v1/api/dashboard/count/of/messages?${mode}=true`;
//       let result;
//       result = await axios.get(
//         `${import.meta.env.VITE_APP_BACKEND_BASE_URL}${url}`,
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );
//       const { data } = result;
//       console.log("avg res", result);
//       dispatch({
//         type: dashboardConstant.GET_REPORT_MESSAGE_SUCCESS,
//         payload: {
//           reportMessage: data,
//         },
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
//           type: dashboardConstant.GET_REPORT_MESSAGE_FAILURE,
//           payload: { err: error.response.data.message },
//         });
//       }
//     }
//   };
// };

export const GetReportMessage = (mode, startDate, endDate) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_REPORT_MESSAGE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

      // Ensure formattedDate and endDateformattedDate are defined correctly
      const formattedDate = startDate; // Update this to your actual date formatting
      const endDateformattedDate = endDate; // Update this to your actual date formatting

      const url =
        startDate && endDate
          ? `dashboard/v1/api/dashboard/count/of/messages?startDate=${formattedDate}&endDate=${endDateformattedDate}`
          : `dashboard/v1/api/dashboard/count/of/messages?${mode}=true`;

      let result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}${url}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_MESSAGE_SUCCESS,
        payload: {
          reportMessage: data,
        },
      });
    } catch (error) {
      console.error("Error in GetReportMessage:", error);
      if (error.response && error.response.data.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        dispatch({
          type: dashboardConstant.GET_REPORT_MESSAGE_FAILURE,
          payload: { err: errorMessage },
        });
      }
    }
  };
};

export const GetReportTags = (mode) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_REPORT_TAGS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/count/of/tags?${mode}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_TAGS_SUCCESS,
        payload: {
          reportTags: data,
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
          type: dashboardConstant.GET_REPORT_TAGS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetReportMessagesInLast30 = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_REPORT_MESSAGE_LAST_30_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/count/of/messages/in/thirty/minutes`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_MESSAGE_LAST_30_SUCCESS,
        payload: {
          reportMessageLast30: data,
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
          type: dashboardConstant.GET_REPORT_MESSAGE_LAST_30_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetReportSendAndQueue = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_REPORT_SEND_QUEUE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/sent/que/messages`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_SEND_QUEUE_SUCCESS,
        payload: {
          reportSendAndQueue: data[0],
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
          type: dashboardConstant.GET_REPORT_SEND_QUEUE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetProspectsLeads = (mode) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_PROSPECTS_LEADS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/prospect/leads?${mode}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_PROSPECTS_LEADS_SUCCESS,
        payload: {
          prospectLeads: data,
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
          type: dashboardConstant.GET_PROSPECTS_LEADS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetFlagStatus = (mode) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_FLAG_STATUS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/flag/status?${mode}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_FLAG_STATUS_SUCCESS,
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
          type: dashboardConstant.GET_FLAG_STATUS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetMarket = (phone, mode , page , limit) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_MARKET_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/list/of/number/by/flag/status/${phone}?page=${page}&limit=${limit}&${mode}=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      let marketData = [];
      data?.forEach((resultItem) => {
        marketData.push({
          _id: resultItem._id,
          deliveredPercentage: resultItem.deliveredPercentage,
        });
      });
      const updatedMarketData = [
        { _id: "all", deliveredPercentage: 100 },
        ...marketData,
      ];

      dispatch({
        type: dashboardConstant.GET_MARKET_SUCCESS,
        payload: updatedMarketData,
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
          type: dashboardConstant.GET_MARKET_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetOutbounds = (number, mode, page, limit) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_OUTBOUNDS_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let res;
      if (number === "all") {
        res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }dashboard/v1/api/dashboard/report/of/flag/status/by/number/${number}?${mode}=true&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }dashboard/v1/api/dashboard/report/of/flag/status/by/number/+1${number}?${mode}=true&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      dispatch({
        type: dashboardConstant.GET_OUTBOUNDS_SUCCESS,
        payload: res.data,
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
          type: dashboardConstant.GET_OUTBOUNDS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetTopDrip = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_TOP_DRIP_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/top/drip`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_TOP_DRIP_SUCCESS,
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
          type: dashboardConstant.GET_TOP_DRIP_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetReportOfDripSchedule = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstant.GET_DRIP_SCHEDULE_REQUEST });
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/drip/schedule`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_DRIP_SCHEDULE_SUCCESS,
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
          type: dashboardConstant.GET_DRIP_SCHEDULE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const getLogoutSuccess = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstant.SESSION_EXPIRE,
      payload: "",
    });
  }
}
export const GetReportOfNoStatus = () => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/no/status`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;

      dispatch({
        type: dashboardConstant.GET_REPORT_NO_STATUS_SUCCESS,
        payload: data?.status,
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
          type: dashboardConstant.GET_REPORT_NO_STATUS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetReportOfReminder = () => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/reminder`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_OF_REMINDER_SUCCESS,
        payload: data?.reminder,
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
          type: dashboardConstant.GET_REPORT_OF_REMINDER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetReportOfUnRead = () => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/un/read`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_OF_UNREAD_SUCCESS,
        payload: data?.unRead,
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
          type: dashboardConstant.GET_REPORT_OF_UNREAD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetReportOfUnAnswered = () => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }dashboard/v1/api/dashboard/report/of/un/answered`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_REPORT_OF_UNANSWERED_SUCCESS,
        payload: data?.unAnswered,
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
          type: dashboardConstant.GET_REPORT_OF_UNANSWERED_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const countOfMessageSend = () => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      let result;
      result = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/count/message/send/data`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_COUNT_OF_MESSAGE_SEND_SUCCESS,
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
          type: dashboardConstant.GET_COUNT_OF_MESSAGE_SEND_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
