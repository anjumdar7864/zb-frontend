import { authConstant, dncConstant } from "../constants";

const initialState = {
  results: [],
  singleDnc: {},
  connectedCrm: {},
  errors: [],
  loading: false,
  exportLoading: false,
  importLoading: false,
  totalResults: 1,
  totalPages: 1,
  message: "",
};

const dncReducer = (state = initialState, action) => {
  switch (action.type) {
    case dncConstant.GET_ALL_DO_NOT_CALL_REQUEST:
    case dncConstant.DELETE_DO_NOT_CALL_NUMBER_REQUEST:
    case dncConstant.ADD_DO_NOT_CALL_NUMBER_REQUEST:
    case dncConstant.GET_SINGLE_DO_NOT_CALL_NUMBER_REQUEST:
    case dncConstant.UPDATE_DO_NOT_CALL_NUMBER_REQUEST:
    case dncConstant.GET_CONNECTED_CRM_REQUEST:
    case dncConstant.UPDATE_CONNECTED_CRM_REQUEST:
    case dncConstant.CONNECT_CRM_REQUEST:
    case dncConstant.CHANGE_CRM_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dncConstant.EXPORT_DO_NOT_CALL_NUMBER_REQUEST:
    case dncConstant.EXPORT_PROSPECT_REQUEST:
      return {
        ...state,
        exportLoading: true,
      };
    case dncConstant.IMPORT_DO_NOT_CALL_NUMBER_REQUEST:
      return {
        ...state,
        importLoading: true,
      };
    case dncConstant.GET_ALL_DO_NOT_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload.results,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
      };
    case dncConstant.EXPORT_DO_NOT_CALL_NUMBER_SUCCESS:
      return {
        ...state,
        exportLoading: false,
      };
    case dncConstant.EXPORT_PROSPECT_SUCCESS:
      return {
        ...state,
        exportLoading: false,
        message: action.payload,
      };
    case dncConstant.IMPORT_DO_NOT_CALL_NUMBER_SUCCESS:
      return {
        ...state,
        importLoading: false,
        message: action.payload.message,
      };
    case dncConstant.DELETE_DO_NOT_CALL_NUMBER_SUCCESS:
    case dncConstant.ADD_DO_NOT_CALL_NUMBER_SUCCESS:
    case dncConstant.UPDATE_DO_NOT_CALL_NUMBER_SUCCESS:
    case dncConstant.UPDATE_CONNECTED_CRM_SUCCESS:
    case dncConstant.CONNECT_CRM_SUCCESS:
    case dncConstant.CHANGE_CRM_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case dncConstant.GET_CONNECTED_CRM_SUCCESS:
      return {
        ...state,
        loading: false,
        connectedCrm: action.payload,
      };
    case dncConstant.GET_SINGLE_DO_NOT_CALL_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleDnc: action.payload,
      };
    case dncConstant.GET_ALL_DO_NOT_CALL_FAILURE:
    case dncConstant.DELETE_DO_NOT_CALL_NUMBER_FAILURE:
    case dncConstant.ADD_DO_NOT_CALL_NUMBER_FAILURE:
    case dncConstant.GET_SINGLE_DO_NOT_CALL_NUMBER_FAILURE:
    case dncConstant.UPDATE_DO_NOT_CALL_NUMBER_FAILURE:
    case dncConstant.GET_CONNECTED_CRM_FAILURE:
    case dncConstant.UPDATE_CONNECTED_CRM_FAILURE:
    case dncConstant.CONNECT_CRM_FAILURE:
    case dncConstant.CHANGE_CRM_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case dncConstant.EXPORT_DO_NOT_CALL_NUMBER_FAILURE:
    case dncConstant.EXPORT_PROSPECT_FAILURE:
      return {
        ...state,
        exportLoading: false,
        errors: action.payload.err,
      };
    case dncConstant.IMPORT_DO_NOT_CALL_NUMBER_FAILURE:
      return {
        ...state,
        importLoading: false,
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

export default dncReducer;
