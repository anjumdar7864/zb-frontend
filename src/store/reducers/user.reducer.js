import { authConstant } from "../constants";

const initialState = {
  tenets: [],
  SingleUser: [],
  errors: [],
  loading: false,
  activeLoading: false,
  deActiveLoading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.GET_SINGLE_USER_REQUEST:
    case authConstant.UPDATE_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        SingleUser: action.payload,
      };
    case authConstant.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        SingleTenets: action.payload,
      };
    case authConstant.UPDATE_SINGLE_USER_FAILURE:
    case authConstant.GET_SINGLE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        activeLoading: false,
        deActiveLoading: false,
        errors: action.payload.err,
      };
    case authConstant.SESSION_EXPIRE:
     
      return {
        ...state,
        loading: false,
        activeLoading: false,
        deActiveLoading: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        activeLoading: false,
        deActiveLoading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        activeLoading: false,
        deActiveLoading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default userReducer;
