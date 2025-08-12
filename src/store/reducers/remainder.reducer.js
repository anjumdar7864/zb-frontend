import { remainderConstants } from "../constants";

const initialState = {
  results: [],
  loading: false,
  totalPages: 1,
  totalResults: 1,
  limit: 5,
  errors: [],
};

const remainderReducer = (state = initialState, action) => {
  switch (action.type) {
    case remainderConstants.getAllRemaindersList.request:
      return {
        ...state,
        loading: true,
        errors: []
      };
    case remainderConstants.getAllRemaindersList.success:
      return {
        ...state,
        ...action.payload,
        loading: false,
    };
    case remainderConstants.getAllRemaindersList.error:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default remainderReducer;
