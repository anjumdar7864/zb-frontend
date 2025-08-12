import { authConstant, billingConstant } from "../constants";

const initialState = {
  results: [],
  errors: [],
  paymentHistory: [],
  subscriptions: [],
  singleAdmin: {},
  loading: false,
  updateLoading: false,
  donwloadCsvLoading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const billingReducer = (state = initialState, action) => {
  switch (action.type) {
    case billingConstant.GET_ALL_BILLING_REQUEST:
    case billingConstant.CREATE_BILLING_REQUEST:
    case billingConstant.UPDATE_SINGLE_BILLING_REQUEST:
    case billingConstant.GET_SINGLE_ADMIN_BY_REQUEST:
    case billingConstant.GET_PATMENT_HISTORY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case billingConstant.UPDATE_SUBSCIPTION_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case billingConstant.DOWNLOAD_CSV_TENANT_REQUEST:
      return {
        ...state,
        donwloadCsvLoading: true,
      };
    case billingConstant.GET_ALL_BILLING_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case billingConstant.DOWNLOAD_CSV_TENANT_SUCCESS:
      return {
        ...state,
        donwloadCsvLoading: false,
      };
    case billingConstant.UPDATE_SUBSCIPTION_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        message: action.payload,
      };

    case billingConstant.GET_PATMENT_HISTORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentHistory: action.payload,
      };
    case billingConstant.GET_SINGLE_ADMIN_BY_SUCCESS:
      return {
        ...state,
        loading: false,
        singleUser: action.payload,
      };

    case billingConstant.CREATE_BILLING_SUCCESS:
    case billingConstant.UPDATE_SINGLE_BILLING_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case billingConstant.GET_ALL_BILLING_FAILURE:
    case billingConstant.CREATE_BILLING_FAILURE:
    case billingConstant.UPDATE_SINGLE_BILLING_FAILURE:
    case billingConstant.GET_SINGLE_ADMIN_BY_FAILURE:
    case billingConstant.GET_PATMENT_HISTORY_BY_ID_FAILURE:
    case billingConstant.UPDATE_SUBSCIPTION_FAILURE:
    case billingConstant.DOWNLOAD_CSV_TENANT_FAILURE:
      return {
        ...state,
        loading: false,
        updateLoading: false,
        donwloadCsvLoading: false,
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

export default billingReducer;
