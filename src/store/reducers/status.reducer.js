import { statusConstants } from "../constants";

const initialState = {
  results: [],
  loading: false,
  totalPages: 1,
  totalResults: 1,
  errors: [],
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case statusConstants.getAllStatusList.request:
      return {
        ...state,
        loading: true,
        errors: []
      };
    case statusConstants.getAllStatusList.success:
      return {
        ...state,
        ...action.payload,
        loading: false,
    };
    case statusConstants.getAllStatusList.error:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default statusReducer;
