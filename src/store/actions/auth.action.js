import { asyncAction } from "@/utils";
import { authConstant } from "../constants";
import axios from "axios";
import {
  getToken,
  setUserAuth,
  setUserImpersonation,
  isRememberMeSession,
  getStorage,
  AUTH,
  getUserAuth,
} from "@/utils/storage";
import toast from "react-hot-toast";


//axios.defaults.withCredentials = true; // Include cookies in requests

const storage = getStorage();
const authUser = getUserAuth();

export const Login = (body, isRememberMe) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_REQUEST });
    try {
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/login`,
        body
      );

      if (result && result.data) {
        const { data } = result;
        setUserAuth(data, isRememberMe);
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: { message: "Login Successfully", data: data },
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
          type: authConstant.LOGIN_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const LoginWithGoogle = (body, isRememberMe) =>{
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_REQUEST });
    try {
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/social/login/with/email`,
        body
      );

      if (result && result.data) {
        const { data } = result;
        setUserAuth(data, isRememberMe);
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: { message: "Login Successfully", data: data },
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
          type: authConstant.LOGIN_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
}

export const LoginAsUser = (email, onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_AS_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/login/with/email`,
        { email },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      setUserImpersonation(data, isRememberMeSession());
      dispatch({
        type: authConstant.LOGIN_AS_USER_SUCCESS,
        payload: "Login as User Successfully",
      });
      onSuccess();
    } catch (error) {
      if (error?.status == 400) {
        toast.error(error?.response?.data?.message);
      }
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
          type: authConstant.LOGIN_AS_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const LoginAsUserMaster = (email, onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_AS_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/tenant/login/with/email`,
        { email },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      setUserImpersonation(data, isRememberMeSession());
      dispatch({
        type: authConstant.LOGIN_AS_USER_SUCCESS,
        payload: "Login as User Successfully",
      });
      onSuccess();
    } catch (error) {
      if (error?.status == 400) {
        toast.error(error?.response?.data?.message);
      }
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
          type: authConstant.LOGIN_AS_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateNewUser = (body, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.CREATE_NEW_USER_REQUEST });
    try {
      const token = getToken();
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/register`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllUser());
      dispatch({
        type: authConstant.CREATE_NEW_USER_SUCCESS,
        payload: "Invitation has been sent",
      });
      onSuccess();
    } catch (error) {
      // toast.error(error.response.data.message )
      dispatch({
        type: authConstant.CREATE_NEW_USER_FAILURE,
        payload: { err: error.response.data.message },
      });
      onError(error.response.data.message);
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
          type: authConstant.CREATE_NEW_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const signUpUser = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.CREATE_NEW_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/create/by/signup`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const signupId = result?.data?._id;
      localStorage.setItem("signupId", signupId);
      dispatch({
        type: authConstant.CREATE_NEW_USER_SUCCESS,
        payload: "Invitation has been sent",
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
          type: authConstant.CREATE_NEW_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const signUpUserCreateByAdmin = (body, adminId) => {
  return async (dispatch) => {
    // dispatch({ type: authConstant.CREATE_NEW_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/create/by/super/admin/final/step?adminId=${adminId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const signupId = result?.data?._id;
      localStorage.setItem("signupId", signupId);
      dispatch({
        type: authConstant.CREATE_NEW_USER_SUCCESS,
        payload: "Invitation has been sent",
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
          type: authConstant.CREATE_NEW_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreatePassword = (body, userId) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.CREATE_PASSWORD_REQUEST });
    try {
      const token = getToken();
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/password/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: authConstant.CREATE_PASSWORD_SUCCESS,
        payload: "Password has been created",
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
          type: authConstant.CREATE_PASSWORD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const ChangePassword = (body, userId) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.CHANGE_PASSWORD_REQUEST });
    try {
      const token = getToken();
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/reset/password/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: authConstant.CHANGE_PASSWORD_SUCCESS,
        payload: "Password has been changed",
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
          type: authConstant.CHANGE_PASSWORD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetAllUser = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_ALL_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: authConstant.GET_ALL_USER_SUCCESS,
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
          type: authConstant.GET_ALL_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetAllUserWithAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_ALL_USER_WITH_ADMIN_REQUEST });
    try {
      const token = getToken();
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }inbox/v1/api/inbox/get/user/for/inbox/search`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: authConstant.GET_ALL_USER_WITH_ADMIN_SUCCESS,
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
          type: authConstant.GET_ALL_USER_WITH_ADMIN_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeleteUser = (userId, onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.DELETE_USER_REQUEST });
    try {
      const token = getToken();
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/${userId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllUser());
      dispatch({
        type: authConstant.DELETE_USER_SUCCESS,
        payload: "User has been deleted",
      });
      onSuccess();
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
          type: authConstant.DELETE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSingleUser = (id, role , onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api${
          !role ? `/user` : ""
        }${role ? `/${role}` : ""}${id ? `/${id}` : ""}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      // onSuccess(data);
      dispatch({
        type: authConstant.GET_SINGLE_USER_SUCCESS,
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
          type: authConstant.GET_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};



export const GetSingleUserAdmin = (id, role , onSuccess) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api${
          !role ? `/user` : ""
        }${role ? `/${role}` : ""}${id ? `/${id}` : ""}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      // onSuccess(data);
      dispatch({
        type: authConstant.GET_SINGLE_USER_ADMIN_SUCCESS,
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
          type: authConstant.GET_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetAdminProfile = (id, role) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.GET_SINGLE_USER_SUCCESS,
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
          type: authConstant.GET_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetSingleUserProfile = (id, role) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api${
          role ? `/${role}` : ""
        }/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const { data } = result;
      dispatch({
        type: authConstant.GET_SINGLE_USER_SUCCESS,
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
          type: authConstant.GET_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateNewPassword = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.CREATE_NEW_PASSWORD_REQUEST });
    try {
      const token = getToken();
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/change/password`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: authConstant.CREATE_NEW_PASSWORD_SUCCESS,
        payload: "Password has been changed",
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
          type: authConstant.CREATE_NEW_PASSWORD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const UpdateSingleUser = (body, id, role, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api${
          !role ? "/user" : ""
        }${role ? `/${role}` : ""}/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.UPDATE_SINGLE_USER_SUCCESS,
        payload: "User has been updated",
      });
      onSuccess && onSuccess();
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
          type: authConstant.UPDATE_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }

      onError &&
        onError(error?.response?.data?.message ?? "Something went wrong!");
    }
  };
};

export const UpdateLoginTanent = (body, id, role, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api${
          !role ? "/user" : ""
        }${role ? `/${role}` : ""}/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      const user = JSON?.parse(authUser?.user);
      storage.setItem(
        AUTH.USER,
        JSON.stringify({
          ...user,
          firstName: data?.firstName,
          lastName: data?.lastName,
          avatar: data?.avatar,
          timeZone: data?.timeZone,
        })
      );
      dispatch({
        type: authConstant.UPDATE_SINGLE_USER_SUCCESS,
        payload: "User has been updated",
      });
      // window.location.reload();
      onSuccess && onSuccess();
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
          type: authConstant.UPDATE_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }

      onError &&
        onError(error?.response?.data?.message ?? "Something went wrong!");
    }
  };
};

export const UpdateSingleUserAgent = (body, id, role, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_SINGLE_USER_REQUEST });
    try {
      const token = getToken();
      const result = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api${
          !role ? "/user" : ""
        }/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      const user = JSON?.parse(authUser?.user);
      storage.setItem(
        AUTH.USER,
        JSON.stringify({
          ...user,
          firstName: data?.firstName,
          lastName: data?.lastName,
          avatar: data?.avatar,
          timeZone: data?.timeZone,
        })
      );
      onSuccess(data)
      dispatch({
        type: authConstant.UPDATE_SINGLE_USER_SUCCESS,
        payload: "User has been updated",
      });
      window.location.reload();
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
          type: authConstant.UPDATE_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }

      onError &&
        onError(error?.response?.data?.message ?? "Something went wrong!");
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQUEST });
    try {
      localStorage.clear();
      sessionStorage.clear();
      dispatch({
        type: authConstant.LOGOUT_SUCCESS,
        payload: "Logout Successfully",
      });
    } catch (error) {
      if (
        error.response.data.message === "Session expiredd"
      ) {
        localStorage.clear();
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: authConstant.LOGOUT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const ForgotPassword = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.FORGOT_PASSWORD_REQUEST });
    try {
      const token = getToken();
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/forget/password`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: authConstant.FORGOT_PASSWORD_SUCCESS,
        payload: "kindly check your mail inbox for resetPassword",
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
          type: authConstant.FORGOT_PASSWORD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const TransferLeadsOfUser = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.TRANSFER_LEADS_REQUEST });
    try {
      const token = getToken();
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/user/transfer/leads`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllUser());
      dispatch({
        type: authConstant.TRANSFER_LEADS_SUCCESS,
        payload: "Leads has been transfered",
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
          type: authConstant.TRANSFER_LEADS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const VerifyPassword = (passwordBody, transferLeadBody) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.VERIFY_PASSWORD_REQUEST });
    try {
      const token = getToken();
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/verify/password`,
        passwordBody,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(TransferLeadsOfUser(transferLeadBody));
      dispatch({
        type: authConstant.VERIFY_PASSWORD_SUCCESS,
        payload: "",
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
          type: authConstant.VERIFY_PASSWORD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_ERRORS });
};

// Clearing Messages
export const clearMessages = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_MESSAGES });
};

export const getPublicAddress = (payload, onSuccess, onError) => {
  return asyncAction(
    async () => {
      const { data } = await axios.get("https://api64.ipify.org?format=json", {
       withCredentials: false, // Explicitly disable credentials for this request
      });
      return data;
    },
    {
      request: authConstant.GET_PUBLIC_IP_ADDRESS_REQUEST,
      success: authConstant.GET_PUBLIC_IP_ADDRESS_SUCCESS,
      error: authConstant.GET_PUBLIC_IP_ADDRESS_FAILURE,
    },
    onSuccess,
    onError
  );
};


export const getLoginHistory = (payload, onSuccess, onError) => {
  return asyncAction(
    async () => {
      const token = getToken();
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/login/attempt`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return { loginHistory: data };
    },
    {
      request: authConstant.GET_LOGIN_HISTORY_REQUEST,
      success: authConstant.GET_LOGIN_HISTORY_SUCCESS,
      error: authConstant.GET_LOGIN_HISTORY_FAILURE,
    },
    onSuccess,
    onError
  );
};

export const VerifyNewEmail = async (body) => {
  try {
    const result = await axios.post(
      `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }user/v1/api/admin/check/email`,
      body
    );

    let data = {
      status: true,
    };
    return data;
  } catch (error) {
    let data = {
      status: false,
      message: error?.response?.data.message,
    };
    return data;
  }
};

export const stepRecord = async (body) => {
  try {
    const result = await axios.post(
      `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }user/v1/api/admin/save/signup/step/record`,
      body
    );

    let data = {
      status: true,
    };
    return data;
  } catch (error) {
    let data = {
      status: false,
      message: error?.response?.data.message,
    };
    return data;
  }
};

export const signupFeedBackApi = async (body, signupId) => {
  try {
    const result = await axios.post(
      `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }user/v1/api/admin/take/feedBack/${signupId}`,
      body
    );

    let data = {
      status: true,
    };
    return data;
  } catch (error) {
    let data = {
      status: false,
      message: error?.response?.data.message,
    };
    return data;
  }
};
