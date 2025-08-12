import { authConstant, areaCodeConstant } from "../constants";

const initialState = {
  errors: [],
  areaCodes: [],
  timeZoneOfAreaCode: {},
  loading: false,
  message: "",
  sessionExpireError: "",
};

const areaCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case areaCodeConstant.GET_ALL_AREACODE_REQUEST:
    case areaCodeConstant.GET_AREACODE_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case areaCodeConstant.GET_ALL_AREACODE_SUCCESS:
      return {
        ...state,
        loading: false,
        areaCodes: action.payload,
      };
    case areaCodeConstant.GET_AREACODE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        timeZoneOfAreaCode: action.payload,
      };
    case areaCodeConstant.GET_ALL_AREACODE_FAILURE:
    case areaCodeConstant.GET_AREACODE_BY_ID_FAILURE:
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

export default areaCodeReducer;
