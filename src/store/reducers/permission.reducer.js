import { authConstant, permissionConstant } from "../constants";

const initialState = {
  permissions: [],
  singlePermission: {},
  resetLoading: false,
  errors: [],
  loading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case permissionConstant.GET_ALL_PERMISSION_REQUEST:
    case permissionConstant.CREATE_PERMISSION_REQUEST:
    case permissionConstant.DELETE_PERMISSION_REQUEST:
    case permissionConstant.GET_SINGLE_PERMISSION_REQUEST:
    case permissionConstant.UPDATE_SINGLE_PERMISSION_REQUEST:
    case permissionConstant.UPDATE_SINGLE_USER_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case permissionConstant.RESET_PERMISSION_REQUEST:
      return {
        ...state,
        resetLoading: true,
      };
    case permissionConstant.CREATE_PERMISSION_SUCCESS:
    case permissionConstant.DELETE_PERMISSION_SUCCESS:
    case permissionConstant.UPDATE_SINGLE_PERMISSION_SUCCESS:
    case permissionConstant.UPDATE_SINGLE_USER_PERMISSION_SUCCESS:
    case permissionConstant.RESET_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        resetLoading: false,
        message: action.payload,
      };
    case permissionConstant.GET_ALL_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        permissions: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case permissionConstant.GET_SINGLE_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePermission: action.payload,
      };
    case permissionConstant.GET_ALL_PERMISSION_FAILURE:
    case permissionConstant.CREATE_PERMISSION_FAILURE:
    case permissionConstant.DELETE_PERMISSION_FAILURE:
    case permissionConstant.GET_SINGLE_PERMISSION_FAILURE:
    case permissionConstant.UPDATE_SINGLE_PERMISSION_FAILURE:
    case permissionConstant.UPDATE_SINGLE_USER_PERMISSION_FAILURE:
    case permissionConstant.RESET_PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        resetLoading: false,
        errors: action.payload.err,
      };
    case authConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading: false,
        resetLoading: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        resetLoading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        resetLoading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default permissionReducer;
