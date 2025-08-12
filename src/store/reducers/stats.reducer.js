import { statsConstants } from "../constants";

const initialState = {
  loading: false,
  error: "",
  unRead: 0,
  unAnswered: 0,
  status: 0,
  reminder: 0,
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case statsConstants.getBasicStats.request:
      return {
        ...state,
        loading: true,
        errors: []
      };
    case statsConstants.getBasicStats.success:
      return {
        ...state,
        ...action.payload,
        loading: false,
    };
    case statsConstants.getBasicStats.error:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default statsReducer;
