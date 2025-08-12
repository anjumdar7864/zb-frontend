import { authConstant, batchConstant } from "../constants";

const initialState = {
  errors: [],
  completeBatch: [],
  pauseBatch: [],
  users: [],
  campaigns: [],
  loading: false,
  loading2: false,
  cancelLoading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
  
  totalResults: 0,
  pauseTotalPages: 1,
  pauseTotalResults: 0,
  createBatchData: {},
  createBatchDirectImport: [],
  directImportData: [],
  template: {},
  compaign: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case batchConstant.GET_COMPLETE_STATUS_BATCH_REQUEST:
    case batchConstant.GET_PAUSED_STATUS_BATCH_REQUEST:
    case batchConstant.GET_ALL_USER_FOR_BATCH_REQUEST:
    case batchConstant.GET_BATCH_BY_ID_REQUEST:
    case batchConstant.GET_CAMPAGIN_FOR_BATCH_REQUEST:
    case batchConstant.CHANGE_TEMPLATE_FOR_BATCH_REQUEST:
    case batchConstant.CREATE_BATCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case batchConstant.CANCEL_BATCH_REQUEST:
      return {
        ...state,
        cancelLoading: true,
      };
    case batchConstant.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading2: true,
      };
    case batchConstant.CHANGE_TEMPLATE_FOR_BATCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case batchConstant.GET_COMPLETE_STATUS_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        completeBatch: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
      
      };
    case batchConstant.GET_PAUSED_STATUS_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        pauseBatch: action.payload.results,
        pauseTotalResults: action.payload.pauseTotalResults,   
        pauseTotalPages: action.payload.pauseTotalPages,
      };
    case batchConstant.GET_ALL_USER_FOR_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.results,
      };
    case batchConstant.CHANGE_TEMPLATE_FOR_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case batchConstant.CREATE_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loading2: false,
        message: action.payload.message,
        createBatchData: action.payload.batch,
        createBatchDirectImport: action.payload.directImport,
        template: action.payload.template,
        compaign: action.payload.compaign,
        directImportData: action.payload.directImportData,
      };
    case batchConstant.GET_BATCH_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loading2: false,
        createBatchData: action.payload.batch,
        createBatchDirectImport: action.payload.directImport,
        template: action.payload.template,
        compaign: action.payload.compaign,
        directImportData: action.payload.directImportData,
      };
    case batchConstant.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading2: false,
        message: action.payload.message,
      };
    case batchConstant.CANCEL_BATCH_SUCCESS:
      return {
        ...state,
        cancelLoading: false,
        message: action.payload,
      };
    case batchConstant.GET_CAMPAGIN_FOR_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        campaigns: action.payload.results,
      };
    case batchConstant.GET_COMPLETE_STATUS_BATCH_FAILURE:
    case batchConstant.GET_PAUSED_STATUS_BATCH_FAILURE:
    case batchConstant.GET_ALL_USER_FOR_BATCH_FAILURE:
    case batchConstant.GET_CAMPAGIN_FOR_BATCH_FAILURE:
    case batchConstant.CHANGE_TEMPLATE_FOR_BATCH_FAILURE:
    case batchConstant.CREATE_BATCH_FAILURE:
    case batchConstant.CANCEL_BATCH_FAILURE:
      return {
        ...state,
        loading: false,
        cancelLoading: false,
        errors: action.payload.err,
      };
    case batchConstant.SEND_MESSAGE_FAILURE:
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
    case batchConstant.REMOVE_DATA_FROM_STORE:
      return {
        ...state,
        createBatchData: {},
        createBatchDirectImport: [],
        template: {},
        compaign: {},
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
