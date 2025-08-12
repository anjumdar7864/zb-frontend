import { authConstant, dripAutomationConstant } from "../constants";

const initialState = {
  drips: [],
  errors: [],
  loading: false,
  message: "",
  singleMessage: "",
  singleDrip: {},
  totalResults: 0,
  totalPages: 0,
};

const dripAutomationReducer = (state = initialState, action) => {
  switch (action.type) {
    case dripAutomationConstant.GET_ALL_DRIP_FOR_INBOX_REQUEST:
    case dripAutomationConstant.CREATE_DRIP_REQUEST:
    case dripAutomationConstant.DELETE_DRIP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dripAutomationConstant.GET_ALL_DRIP_FOR_INBOX_SUCCESS:
      return {
        ...state,
        loading: false,
        drips: action.payload.results,
        totalResults: action.payload.totalResults,
        totalPages: action.payload.totalPages,
      };
    case dripAutomationConstant.CREATE_DRIP_SUCCESS:
    case dripAutomationConstant.DELETE_DRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.results,
      };
    case dripAutomationConstant.GET_ALL_DRIP_FOR_INBOX_FAILURE:
    case dripAutomationConstant.CREATE_DRIP_FAILURE:
    case dripAutomationConstant.DELETE_DRIP_FAILURE:
    case dripAutomationConstant.UPDATE_DRIP_FAILURE:
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
    case dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_SUCCESS:
      return {
        ...state,
        loading: false,
        singleDrip: action.payload.mainData,
        singleMessage: action.payload.singleMessage,
      };
    case dripAutomationConstant.GET_ONE_DRIP_FOR_INBOX_FAILURE:
    case dripAutomationConstant.UPDATE_DRIP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dripAutomationConstant.UPDATE_DRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.results,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
        singleMessage: "",
      };
    default:
      return state;
  }
};

export default dripAutomationReducer;
