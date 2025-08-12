import { authConstant, roleConstant } from "../constants";

const initialState = {
  roles: [],
  singleRole: {},
  errors: [],
  loading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case roleConstant.GET_ALL_ROLE_REQUEST:
    case roleConstant.CREATE_ROLE_REQUEST:
    case roleConstant.DELETE_ROLE_REQUEST:
    case roleConstant.GET_SINGLE_ROLE_REQUEST:
    case roleConstant.UPDATE_SINGLE_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roleConstant.CREATE_ROLE_SUCCESS:
    case roleConstant.DELETE_ROLE_SUCCESS:
    case roleConstant.UPDATE_SINGLE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case roleConstant.GET_SINGLE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        singleRole: action.payload,
      };
    case roleConstant.GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case roleConstant.GET_ALL_ROLE_FAILURE:
    case roleConstant.CREATE_ROLE_FAILURE:
    case roleConstant.DELETE_ROLE_FAILURE:
    case roleConstant.GET_SINGLE_ROLE_FAILURE:
    case roleConstant.UPDATE_SINGLE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
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

export default roleReducer;
