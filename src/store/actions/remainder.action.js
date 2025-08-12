import { asyncAction } from "@/utils";
import axios from "@/api";

import { authConstant, remainderConstants } from "../constants";
// axios.defaults.withCredentials = true;
export const getAllRemainders = (params, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(`inbox/v1/api/inbox/get/all/reminder`, {
        ...authHeaders,
        params,
      });
      return data;
    },
    remainderConstants.getAllRemaindersList,
    onSuccess,
    onError
  );
};

export const getUserReminder = (id, onSuccess) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `inbox/v1/api/inbox/get/reminder/${id}`,
        authHeaders
      );
      return data;
    },
    remainderConstants.getRemainderToUser,
    onSuccess,
    () => {}
  );
};

export const setUserReminder = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `inbox/v1/api/inbox/set/reminder/${id}`,
        body,
        authHeaders
      );
      return data;
    },
    remainderConstants.setRemainderToUser,
    onSuccess,
    onError
  );
};


// export const setUserReminder = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.post(
//           `inbox/v1/api/inbox/set/reminder/${id}`,
//           body,
//           authHeaders
//         );
//         console.log("check data", data);

//         return data;
//       } catch (error) {
//         console.log("check data", error.response?.data?.message);
//         if (error.response?.data?.message == "Session expiredd") {
//           console.log("check data ==", error.response?.data?.message);
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has been expired" },
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
//     remainderConstants.setRemainderToUser,
//     onSuccess,
//     onError
//   );
// };


export const updateUserReminder = (id, body, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `inbox/v1/api/inbox/update/reminder/${id}`,
        body,
        authHeaders
      );
      return data;
    },
    remainderConstants.setRemainderToUser,
    onSuccess,
    onError
  );
};


// export const updateUserReminder = (id, body, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.patch(
//           `inbox/v1/api/inbox/update/reminder/${id}`,
//           body,
//           authHeaders
//         );
//         console.log("check data", data);
//         return data;
//       } catch (error) {
//         console.log("check data", error.response?.data?.message);
//         if (error.response?.data?.message == "Session expiredd") {
//           console.log("check data ==", error.response?.data?.message);
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has been expired" },
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
//     remainderConstants.setRemainderToUser,
//     onSuccess,
//     onError
//   );
// };

export const cancelUserReminder = (id, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.delete(
        `inbox/v1/api/inbox/delete/reminder/${id}`,
        authHeaders
      );
      return data;
    },
    remainderConstants.cancelRemainderToUser,
    onSuccess,
    onError
  );
};


// export const cancelUserReminder = (id, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       try {
//         const { data } = await axios.delete(
//           `inbox/v1/api/inbox/delete/reminder/${id}`,
//           authHeaders
//         );
//         console.log("check data", data);
//         return data;
//       } catch (error) {
//         console.log("check data ==", error.response?.data?.message);
//         if (error.response?.data?.message == "Session expiredd") {
//           console.log("check data", error.response?.data?.message);
//           localStorage.clear();
//           dispatch({
//             type: authConstant.SESSION_EXPIRE,
//             payload: { err: "Session has been expired" },
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
//     remainderConstants.cancelRemainderToUser,
//     onSuccess,
//     onError
//   );
// };
