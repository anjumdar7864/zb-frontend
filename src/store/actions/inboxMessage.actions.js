import { toast } from "react-hot-toast";

import { asyncAction } from "@/utils";
import axios from "@/api";
import {
  authConstant,
  inboxMessageConstants,
  remainderConstants,
} from "@/store/constants";
import { getToken } from "@/utils/storage";
// axios.defaults.withCredentials = true;
export const getAllInboxMessages = (params, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(`/inbox/v1/api/inboxList/get/list?`, {
        ...authHeaders,
        params,
      });
      return data;
    },
    inboxMessageConstants.getAllInboxMessages,
    onSuccess,
    onError
  );
};

export const getAllInboxMessagesFilters = (params, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(`/inbox/v1/api/inboxList/get/list?`, {
        ...authHeaders,
        params,
      });
      return data;
    },
    inboxMessageConstants.getAllInboxMessagesFilters,
    onSuccess,
    onError
  );
};

// export const getAllInboxMessages = (params, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         if (Object.keys(params).length === 0) return; // Prevent unnecessary API calls

//         const { data } = await axios.get(`/inbox/v1/api/inboxList/get/list`, {
//           ...authHeaders,
//           params,
//         });

//         if (data?.message === "Session expired") {
//           console.log("Session expired:", data?.message);
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         }

//         delete data.limit; // Ensure 'data' is mutable before deleting
//         return data;
//       } catch (error) {
//         console.error("Error fetching inbox messages:", error.response?.data?.message);
//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         }
//         // else {
//         //   dispatch({
//         //     type: inboxMessageConstants.GET_ALL_INBOX_MESSAGES_FAILURE,
//         //     payload: { err: error.response?.data?.message },
//         //   });
//         // }
//         throw error;
//       }
//     },
//     inboxMessageConstants.getAllInboxMessages,
//     onSuccess,
//     onError
//   );
// };

export const getUserInboxMessages = (params, onSuccess, onError) => {
  if (Object.keys(params).length !== 0) {
    return asyncAction(
      async (authHeaders) => {
        let { data } = await axios.get(`/inbox/v1/api/inboxList/get/detail`, {
          ...authHeaders,
          params,
        });
        if (data?.message == "Session expired") {
          console.log("check data", data?.message);
          localStorage.clear();
          dispatch({
            type: authConstant.SESSION_EXPIRE,
            payload: { err: "Session has been expired" },
          });
        }
        delete data.limit;
        return data;
      },
      inboxMessageConstants.getUserInboxMessages,
      onSuccess,
      onError
    );
  }
};

// export const getUserInboxMessages = (params, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         if (Object.keys(params).length === 0) return; // Prevent unnecessary API calls

//         const { data } = await axios.get(`/inbox/v1/api/inboxList/get/detail`, {
//           ...authHeaders,
//           params,
//         });

//         if (data?.message === "Session expired") {
//           console.log("Session expired:", data?.message);
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         }

//         delete data.limit; // Ensure 'data' is mutable before deleting
//         return data;
//       } catch (error) {
//         console.error("Error fetching inbox messages:", error.response?.data?.message);
//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.GET_SINGLE_USER_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }
//         throw error;
//       }
//     },
//     inboxMessageConstants.getUserInboxMessages,
//     onSuccess,
//     onError
//   );
// };

export const sendInboxMessage = (type, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/send/message/from/inbox/${type}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.sendInboxMessage,
    onSuccess,
    onError
  );
};

// export const sendInboxMessage = (type, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/send/message/from/inbox/${type}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error sending inbox message:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.SEND_INBOX_MESSAGE_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.sendInboxMessage,
//     onSuccess,
//     onError
//   );
// };

export const getInboxActivityList = (id, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `/inbox/v1/api/inbox/get/list/of/activity/${id}`,
        {
          ...authHeaders,
        }
      );
      return data;
    },
    inboxMessageConstants.getUserActivityList,
    onSuccess,
    onError
  );
};

// export const getInboxActivityList = (id, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.get(
//           `/inbox/v1/api/inbox/get/list/of/activity/${id}`,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error fetching inbox activity list:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.GET_USER_ACTIVITY_LIST_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.getUserActivityList,
//     onSuccess,
//     onError
//   );
// };

export const getInboxNotesList = (id, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(`inbox/v1/api/inbox/get/note/${id}`, {
        ...authHeaders,
      });
      delete data.limit;
      return data;
    },
    inboxMessageConstants.getUserNotesList,
    onSuccess,
    onError
  );
};

// export const getInboxNotesList = (id, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.get(
//           `inbox/v1/api/inbox/get/note/${id}`,
//           { ...authHeaders }
//         );

//         delete data.limit; // Ensure 'data' is mutable before deleting

//         return data;
//       } catch (error) {
//         console.error("Error fetching inbox notes list:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.GET_USER_NOTES_LIST_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.getUserNotesList,
//     onSuccess,
//     onError
//   );
// };

export const sendInboxNote = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders , dispatch) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/add/note/${id}`,
        body,
        {
          ...authHeaders,
        }
      );
      dispatch(getInboxActivityList(id));

      return data;
    },

    inboxMessageConstants.sendUserNote,
    onSuccess ? onSuccess : () => toast.success("Note added"),
    onError
  );
};


export const sendInboxNoteList = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders , dispatch) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/add/note/${id}`,
        body,
        {
          ...authHeaders,
        }
      );
      // dispatch(getInboxActivityList(id));

      return data;
    },

    inboxMessageConstants.sendUserNoteList,
    onSuccess ? onSuccess : () => toast.success("Note added"),
    onError
  );
};


// export const sendInboxNote = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/add/note/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error sending inbox note:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.SEND_USER_NOTE_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.sendUserNote,
//     onSuccess ? onSuccess : () => toast.success("Note added"),
//     onError
//   );
// };

export const deleteInboxNote = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders , dispatch) => {
      let { data } = await axios.patch(
        `inbox/v1/api/inbox/delete/note/${id}`,
        body,
        {
          ...authHeaders,
        }
      );
      dispatch(getInboxActivityList(id));

      return data;
    },
    inboxMessageConstants.deleteUserNote,
    onSuccess ? onSuccess : () => toast.success("Note deleted"),
    onError
  );
};

// export const deleteInboxNote = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.patch(
//           `inbox/v1/api/inbox/delete/note/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error deleting inbox note:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.DELETE_USER_NOTE_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.deleteUserNote,
//     onSuccess ? onSuccess : () => toast.success("Note deleted"),
//     onError
//   );
// };

export const sendVerifiedNumber = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/add/to/verified/number/${id}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.sendVerifiedNumber,
    onSuccess
      ? onSuccess
      : () => toast.success(`${body?.phone} was added as the Verified Number`),
    onError
  );
};

// export const sendVerifiedNumber = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/add/to/verified/number/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error sending verified number:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.SEND_VERIFIED_NUMBER_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.sendVerifiedNumber,
//     onSuccess
//       ? onSuccess
//       : () => toast.success(`${body?.phone} was added as the Verified Number`),
//     onError
//   );
// };

export const sendAddToDNCNumber = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/add/to/dnc/number/${id}`,
        body,
        {
          ...authHeaders,
        }
      );
      return data;
    },
    inboxMessageConstants.sendAddToDNCNumber,
    onSuccess,
    onError
  );
};

// export const sendAddToDNCNumber = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/add/to/dnc/number/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error adding to DNC number:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.SEND_ADD_TO_DNC_NUMBER_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.sendAddToDNCNumber,
//     onSuccess,
//     onError
//   );
// };

export const sendWrongNumber = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/add/to/wrong/number/${id}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.sendWrongNumber,
    onSuccess,
    onError
  );
};

export const sendWrongNumberList = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/add/to/wrong/number/${id}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.sendWrongNumberList,
    onSuccess,
    onError
  );
};

// export const sendWrongNumber = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/add/to/wrong/number/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error adding to Wrong Number:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: authConstant.SEND_WRONG_NUMBER_FAILURE,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.sendWrongNumber,
//     onSuccess,
//     onError
//   );
// };

export const getProspectDetails = (phone, inboxId) => {
  return async (dispatch) => {
    dispatch({ type: inboxMessageConstants.getProspectsDetails.request });
    try {
      const token = getToken();
      let result;
      if (phone && inboxId) {
        result = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }inbox/v1/api/inbox/get/inbox/detail/${phone}/${inboxId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: inboxMessageConstants.getProspectsDetails.success,
        payload: data,
      });
    } catch (error) {
      if (error?.response?.data?.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: inboxMessageConstants.getProspectsDetails.error,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

// export const getProspectDetails = (phone, inboxId) => {
//   const checkType = typeof(inboxId)

//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         if (!phone || !inboxId) {
//           throw new Error("Phone and Inbox ID are required.");
//         }
//         if (checkType == "string" ) {
//           const { data } = await axios.get(
//             `${import.meta.env.VITE_APP_BACKEND_BASE_URL}inbox/v1/api/inbox/get/inbox/detail/${phone}/${inboxId}`,
//             { ...authHeaders }
//           );
//         }

//         return data;
//       } catch (error) {
//         console.error("Error fetching prospect details:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.getProspectsDetails.error,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.getProspectsDetails
//   );
// };

export const removeVerifiedNumber = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/remove/to/verified/number/${id}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.sendVerifiedNumber,
    onSuccess
      ? onSuccess
      : () => toast.success(`${body?.phone} was remove as the Verified Number`),
    onError
  );
};

// export const removeVerifiedNumber = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/remove/to/verified/number/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error removing verified number:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.removeVerifiedNumberFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.removeVerifiedNumber,
//     onSuccess
//       ? onSuccess
//       : () => toast.success(`${body?.phone} was removed as the Verified Number`),
//     onError
//   );
// };

export const removeAddToDNCNumber = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/remove/to/dnc/number/${id}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.removeAddToDNCNumber,

    onSuccess
      ? onSuccess
      : () => toast.error(`${body?.phone} was removed from DNC`),
    onError
  );
};

// export const removeAddToDNCNumber = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/remove/to/dnc/number/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error removing number from DNC:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.removeAddToDNCNumberFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.removeAddToDNCNumber,
//     onSuccess ? onSuccess : () => toast.error(`${body?.phone} was removed from DNC`),
//     onError
//   );
// };

export const removeWrongNumber = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.post(
        `inbox/v1/api/inbox/remove/to/wrong/number/${id}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.sendWrongNumber,
    onSuccess
      ? onSuccess
      : () => toast.success(`Removed wrong number mark for ${body?.phone}`),
    onError
  );
};

// export const removeWrongNumber = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/remove/to/wrong/number/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error removing wrong number mark:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.removeWrongNumberFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.removeWrongNumber,
//     onSuccess ? onSuccess : () => toast.error(`Removed wrong number mark for ${body?.phone}`),
//     onError
//   );
// };

export const addTagToUserInbox = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `inbox/v1/api/inbox/add/tag/${id}`,
        body,
        authHeaders
      );
      return data;
    },
    inboxMessageConstants.addTagToUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully add tag"),
    onError
  );
};

// export const addTagToUserInbox = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/add/tag/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error adding tag:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.addTagToUserInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.addTagToUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Tag added successfully"),
//     onError
//   );
// };

export const removeTagToUserInbox = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `inbox/v1/api/inbox/remove/tag/${id}`,
        body,
        authHeaders
      );
      return data;
    },
    inboxMessageConstants.removeTagToUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully remove tag"),
    onError
  );
};

// export const removeTagToUserInbox = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/remove/tag/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error removing tag:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.removeTagToUserInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.removeTagToUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Tag removed successfully"),
//     onError
//   );
// };

export const markAsRead = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `/inbox/v1/api/inbox/mark/as/read/${id}?${
          body?.phone1 ? `phone1=${body?.phone1}&` : ""
        }${body?.phone2 ? `phone2=${body?.phone2}&` : ""}${
          body?.phone3 ? `phone3=${body?.phone3}&` : ""
        }`,
        authHeaders
      );
      return data;
    },
    inboxMessageConstants.markAsReadUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully mark as read"),
    onError
  );
};

// export const markAsRead = (id, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.get(
//           `/inbox/v1/api/inbox/mark/as/read/${id}`,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error marking as read:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.markAsReadUserInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.markAsReadUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Marked as read successfully"),
//     onError
//   );
// };

export const markAsUnRead = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `inbox/v1/api/inbox/mark/as/un/read/${id}?${
          body?.phone1 ? `phone1=${body?.phone1}&` : ""
        }${body?.phone2 ? `phone2=${body?.phone2}&` : ""}${
          body?.phone3 ? `phone3=${body?.phone3}&` : ""
        }`,
        authHeaders
      );
      return data;
    },
    inboxMessageConstants.markAsUnReadUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully mark as unread"),
    onError
  );
};

// export const markAsUnRead = (id, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.get(
//           `/inbox/v1/api/inbox/mark/as/un/read/${id}`,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error marking as unread:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.markAsUnReadUserInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.markAsUnReadUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Marked as unread successfully"),
//     onError
//   );
// };

export const addStatusToInbox = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `inbox/v1/api/inbox/add/status/${id}`,
        body,
        authHeaders
      );
      return data;
    },
    inboxMessageConstants.addStatusToUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully status updated"),
    onError
  );
};


export const addStatusToInboxList = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `inbox/v1/api/inbox/add/status/${id}`,
        body,
        authHeaders
      );
      return data;
    },
    inboxMessageConstants.addStatusToUserInboxList,
    onSuccess ? onSuccess : () => toast.success("Successfully status updated"),
    onError
  );
};
// export const addStatusToInbox = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `/inbox/v1/api/inbox/add/status/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error updating status:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.addStatusToUserInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.addStatusToUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Status updated successfully"),
//     onError
//   );
// };

// export const assignDripToInbox = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders , dispatch) => {
//       const { data } = await axios.patch(
//         `inbox/v1/api/dripAutomation/assign/to/inbox/${id}`,
//         body,
//         authHeaders
//       );
//       console.log("chul rha hai");
      
//             dispatch(DripFilterForInbox(id));
            
//       return data;
//     },
//     inboxMessageConstants.addStatusToUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Successfully status updated"),
//     onError
    
    
//   );
// };

export const assignDripToInbox = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      try {
        const { data } = await axios.patch(
          `inbox/v1/api/dripAutomation/assign/to/inbox/${id}`,
          body,
          authHeaders
        );
        
        console.log("Request successful");

        dispatch(DripFilterForInbox(id));
        return data;
      } catch (error) {
        console.error("Request failed", error);

        // Call error handler if provided
        if (onError) {
          onError(error);
        } else {
          toast.error(
            error?.response?.data?.message || "Something went wrong"
          );
        }

        // Important: Rethrow or return a rejected promise to ensure error is captured by asyncAction if needed
        throw error;
      }
    },
    inboxMessageConstants.addStatusToUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully status updated"),
    null // we already handled error above
  );
};


// export const assignDripToInbox = (id, body, onSuccess, onError) => {

//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.patch(
//           `/inbox/v1/api/dripAutomation/assign/to/inbox/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error assigning drip automation:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.assignDripToInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.assignDripToInbox,
//     onSuccess ? onSuccess : () => toast.success("Drip automation assigned successfully"),
//     onError
//   );
// };

export const removeStatusToInbox = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `inbox/v1/api/inbox/delete/status/${id}`,
        body,
        {
          ...authHeaders,
        }
      );
      return data;
    },
    inboxMessageConstants.removeStatusToUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully status removed"),
    onError
  );
};

export const removeStatusToInboxList = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `inbox/v1/api/inbox/delete/status/${id}`,
        body,
        {
          ...authHeaders,
        }
      );
      return data;
    },
    inboxMessageConstants.removeStatusToUserInboxList,
    onSuccess ? onSuccess : () => toast.success("Successfully status removed"),
    onError
  );
};

// export const removeStatusToInbox = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.patch(
//           `/inbox/v1/api/inbox/delete/status/${id}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error removing status:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.removeStatusToUserInboxFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.removeStatusToUserInbox,
//     onSuccess ? onSuccess : () => toast.success("Status removed successfully"),
//     onError
//   );
// };

export const UnAssignDripToInbox = (id, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.delete(
        `inbox/v1/api/dripAutomation/un/assign/to/inbox/${id}`,
        {
          ...authHeaders,
        }
      );
      data["dripAutomation"] = "";
      return data;
    },
    inboxMessageConstants.removeStatusToUserInbox,
    onSuccess ? onSuccess : () => toast.success("Successfully status removed"),
    onError
  );
};

// export const UnAssignDripToInbox = (id, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.delete(
//           `/inbox/v1/api/dripAutomation/un/assign/to/inbox/${id}`,
//           { ...authHeaders }
//         );

//         // Ensure "dripAutomation" is reset properly
//         data.dripAutomation = "";

//         return data;
//       } catch (error) {
//         console.error("Error unassigning drip:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.unassignDripFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.unassignDripToInbox,
//     onSuccess ? onSuccess : () => toast.success("Drip automation unassigned successfully"),
//     onError
//   );
// };

// export const pushDataToCRM = (body) => {
//   return asyncAction(
//     async (authHeaders) => {
//       const { data } = await axios.post(
//         `inbox/v1/api/inbox/push/data/into/crm`,
//         body,
//         {
//           ...authHeaders,
//         }
//       );
//       return data;
//     },
//     inboxMessageConstants.pushDataIntoCRM,
//     () => toast.success("Successfully pushed data into CRM")
//   );
// };

export const pushDataToCRM = (body) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      try {
        const { data } = await axios.post(
          `/inbox/v1/api/inbox/push/data/into/crm`,
          body,
          { ...authHeaders }
        );

        return data;
      } catch (error) {
        console.error(
          "Error pushing data to CRM:",
          error.response?.data?.message
        );
        toast.error(error.response?.data?.message)
        if (error.response?.data?.message === "Session expired") {
          localStorage.clear();
          dispatch({
            type: authConstant.SESSION_EXPIRE,
            payload: { err: "Session has expired" },
          });
        } else {
          dispatch({
            type: inboxMessageConstants.pushDataIntoCRMFailure,
            payload: { err: error.response?.data?.message },
          });
        }

        throw error;
      }
    },
    inboxMessageConstants.pushDataIntoCRM,
    () => toast.success("Data successfully pushed into CRM")
  );
};

export const changeLeadName = (inbox, body) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `inbox/v1/api/inbox/change/lead/name/${inbox}`,
        body,
        { ...authHeaders }
      );
      return data;
    },
    inboxMessageConstants.changeLeadName,
    () => toast.success("Lead name has been successfully updated")
  );
};

// export const changeLeadName = (inbox, body) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.patch(
//           `/inbox/v1/api/inbox/change/lead/name/${inbox}`,
//           body,
//           { ...authHeaders }
//         );

//         return data;
//       } catch (error) {
//         console.error("Error updating lead name:", error.response?.data?.message);

//         if (error.response?.data?.message === "Session expired") {
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has expired" },
//           });
//         } else {
//           dispatch({
//             type: inboxMessageConstants.changeLeadNameFailure,
//             payload: { err: error.response?.data?.message },
//           });
//         }

//         throw error;
//       }
//     },
//     inboxMessageConstants.changeLeadName,
//     () => toast.success("Lead name successfully updated")
//   );
// };

// export const DripFilterForInbox = (id) => {
//   return async (dispatch) => {
//     try {
//       const token =
//         localStorage.getItem("userToken") ??
//         localStorage.getItem("userToken");
//       let result;
//       result = await axios.get(
//         `${
//           import.meta.env.VITE_APP_BACKEND_BASE_URL
//         }inbox/v1/api/dripAutomation/drip/filter/for/specific/inbox/${id}`,
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );
//       const { data } = result;
//       dispatch({
//         type: inboxMessageConstants.DRIP_FILTER_FOR_INBOX_SUCCESS,
//         payload: data,
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
//           type: inboxMessageConstants.DRIP_FILTER_FOR_INBOX_FAILURE,
//           payload: { err: error.response.data.message },
//         });
//       }
//     }
//   };
// };

export const DripFilterForInbox = (id) => {
  return async (dispatch) => {
    try {
      const token =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");
      if (id) {
        const { data } = await axios.get(
          `/inbox/v1/api/dripAutomation/drip/filter/for/specific/inbox/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        dispatch({
          type: inboxMessageConstants.DRIP_FILTER_FOR_INBOX_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.error("Drip filter fetch error:", error.response?.data?.message);

      if (error.response?.data?.message === "Session expired") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
        });
      } else {
        dispatch({
          type: inboxMessageConstants.DRIP_FILTER_FOR_INBOX_FAILURE,
          payload: {
            err: error.response?.data?.message || "An error occurred",
          },
        });
      }
    }
  };
};
