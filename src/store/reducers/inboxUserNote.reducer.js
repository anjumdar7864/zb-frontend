import { inboxMessageConstants } from "@/store/constants";

const initialState = {
  results: [],
  loading: false,
  page: 1,
  totalPages: 1,
  totalResults: 1,
  errors: [],
};

const inboxUserMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case inboxMessageConstants.getUserNote.request:
      return {
        ...state,
        loading: true,
        errors: [],
      };
    case inboxMessageConstants.getUserNote.success:
      return {
        ...state,
        ...action.payload,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.getUserNote.error:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    default:
      return state;
  }
};

export default inboxUserMessageReducer;
