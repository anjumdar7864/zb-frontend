import { remainderConstants } from "../constants";

const initialState = {
  loading: false,
  errors: [],
  _id: "",
  prospect: "",
  from: "",
  to: "",
  note: "",
  message: "",
  date: "",
  inbox: "",
  createdAt: ""
};

const selectedRemainderReducer = (state = initialState, action) => {
  switch (action.type) {
    case remainderConstants.getRemainderToUser.request:
    return {
      ...initialState,
      loading: true,
    };
  case remainderConstants.getRemainderToUser.success:
    return {
      ...state,
      ...action.payload,
      loading: false,
      errors: [],
    };
  case remainderConstants.getRemainderToUser.error:
    return {
      ...initialState,
      errors: action.payload.err,
    };
  case remainderConstants.setRemainderToUser.request:
    return {
      ...initialState,
      loading: true,
    };
  case remainderConstants.setRemainderToUser.success:
    return {
      ...state,
      ...action.payload,
      loading: false,
      errors: [],
    };
  case remainderConstants.setRemainderToUser.error:
    return {
      ...initialState,
      errors: action.payload.err,
    };

    default:
      return state;
  }
};

export default selectedRemainderReducer;
