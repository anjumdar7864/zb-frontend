import { authConstant, tenetsConstant } from "../constants";

const initialState = {
  tenets: [],
  SingleTenets: [],
  errors: [],
  loading: false,
  activeLoading: false,
  deActiveLoading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const tenetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tenetsConstant.GET_ALL_TENETS_REQUEST:
    case tenetsConstant.CREATE_TENET_ADMIN_REQUEST:
    case tenetsConstant.UPDATE_SINGLE_TENET_REQUEST:
    case tenetsConstant.GET_SINGLE_TENETS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tenetsConstant.ACTIVATE_TENET_REQUEST:
      return {
        ...state,
        activeLoading: true,
      };
    case tenetsConstant.DE_ACTIVATE_TENET_REQUEST:
      return {
        ...state,
        deActiveLoading: true,
      };
    case tenetsConstant.CREATE_TENET_ADMIN_SUCCESS:
    case tenetsConstant.UPDATE_SINGLE_TENET_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case tenetsConstant.DE_ACTIVATE_TENET_SUCCESS:
      return {
        ...state,
        loading: false,
        activeLoading: false,
        deActiveLoading: false,
        message: action.payload,
      };
    case tenetsConstant.ACTIVATE_TENET_SUCCESS:
      return {
        ...state,
        loading: false,
        activeLoading: false,
        message: action.payload,
      };
    case tenetsConstant.GET_ALL_TENETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tenets: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
      };

    case tenetsConstant.GET_SINGLE_TENETS_SUCCESS:
      return {
        ...state,
        loading: false,
        SingleTenets: action.payload,
      };
    // case permissionConstant.GET_SINGLE_PERMISSION_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     singlePermission: action.payload,
    //   };
    case tenetsConstant.GET_ALL_TENETS_FAILURE:
    case tenetsConstant.CREATE_TENET_ADMIN_FAILURE:
    case tenetsConstant.UPDATE_SINGLE_TENET_FAILURE:
    case tenetsConstant.ACTIVATE_TENET_FAILURE:
    case tenetsConstant.DE_ACTIVATE_TENET_FAILURE:
    case tenetsConstant.GET_SINGLE_TENETS_FAILURE:
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
      case authConstant.LOADER_FALSE:
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

export default tenetsReducer;
