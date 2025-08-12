import { authConstant } from "../constants";

const initialState = {
  errors: [],
  users: [],
  usersWithAdmin: [],
  singleUser: {},
  singleAdminUser: {},
  loginData: {},
  loading: false,
  logoutLoading: false,
  logoutMessage: "",
  message: "",
  singleMessage: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
  ip: "",
  loginHistory: [],
  token: localStorage.getItem('accessToken'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
    case authConstant.CREATE_NEW_USER_REQUEST:
    case authConstant.CREATE_PASSWORD_REQUEST:
    case authConstant.CHANGE_PASSWORD_REQUEST:
    case authConstant.GET_ALL_USER_REQUEST:
    case authConstant.GET_ALL_USER_WITH_ADMIN_REQUEST:
    case authConstant.DELETE_USER_REQUEST:
    case authConstant.GET_SINGLE_USER_REQUEST:
    case authConstant.UPDATE_SINGLE_USER_REQUEST:
    case authConstant.FORGOT_PASSWORD_REQUEST:
    case authConstant.CREATE_NEW_PASSWORD_REQUEST:
    case authConstant.GET_LOGIN_HISTORY_REQUEST:
    case authConstant.LOGIN_AS_USER_REQUEST:
    case authConstant.TRANSFER_LEADS_REQUEST:
    case authConstant.VERIFY_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.LOGOUT_REQUEST:
      localStorage.removeItem('userToken');  // Clear token from storage
      sessionStorage.removeItem('userToken');
      return {
        ...state,
        logoutLoading: true,
      };
    case authConstant.LOGOUT:
      localStorage.removeItem('userToken');  // Clear token from storage
      sessionStorage.removeItem('userToken');
      console.log("Logging out, redirecting to login page");
      window.location.href = '/#/Login';  // Redirect to login
      return {
          ...state,
        };
    case authConstant.GET_PUBLIC_IP_ADDRESS_SUCCESS:
    case authConstant.GET_LOGIN_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case authConstant.GET_PUBLIC_IP_ADDRESS_REQUEST:
    case authConstant.GET_PUBLIC_IP_ADDRESS_FAILURE:
    case authConstant.GET_LOGIN_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case authConstant.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case authConstant.GET_ALL_USER_WITH_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        usersWithAdmin: action.payload,
      };
    case authConstant.CREATE_NEW_USER_SUCCESS:
    case authConstant.CREATE_PASSWORD_SUCCESS:
    case authConstant.CHANGE_PASSWORD_SUCCESS:
    case authConstant.DELETE_USER_SUCCESS:
    case authConstant.UPDATE_SINGLE_USER_SUCCESS:
    case authConstant.FORGOT_PASSWORD_SUCCESS:
    case authConstant.CREATE_NEW_PASSWORD_SUCCESS:
    case authConstant.TRANSFER_LEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case authConstant.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutMessage: action.payload,
      };
    case authConstant.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        loginData: action.payload.data,
      };
    case authConstant.VERIFY_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case authConstant.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleUser: action.payload,
      };

    case authConstant.GET_SINGLE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        singleAdminUser: action.payload,
      };

    case authConstant.LOGIN_FAILURE:
    case authConstant.CREATE_NEW_USER_FAILURE:
    case authConstant.CREATE_PASSWORD_FAILURE:
    case authConstant.CHANGE_PASSWORD_FAILURE:
    case authConstant.GET_ALL_USER_FAILURE:
    case authConstant.GET_ALL_USER_WITH_ADMIN_FAILURE:
    case authConstant.DELETE_USER_FAILURE:
    case authConstant.LOGOUT_FAILURE:
    case authConstant.GET_SINGLE_USER_FAILURE:
    case authConstant.UPDATE_SINGLE_USER_FAILURE:
    case authConstant.FORGOT_PASSWORD_FAILURE:
    case authConstant.CREATE_NEW_PASSWORD_FAILURE:
    case authConstant.LOGIN_AS_USER_FAILURE:
    case authConstant.TRANSFER_LEADS_FAILURE:
    case authConstant.VERIFY_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        logoutLoading: false,
        errors: action.payload.err,
      };
    case authConstant.SESSION_EXPIRE:

      return {
        ...state,
        loading: false,
        logoutLoading: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
        singleMessage: "",
        logoutMessage: "",
        logoutLoading: false,
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default authReducer;
