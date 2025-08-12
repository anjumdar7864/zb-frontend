import { inboxMessageConstants } from "@/store/constants";

const initialState = {
  results: [],
  loading: false,
  page: 1,
  totalPages: 1,
  totalResults: 1,
  errors: [],
};

const sendInboxMessage = (state = initialState, action) => {
  switch (action.type) {
    case inboxMessageConstants.sendInboxMessage.request:
      return {
        ...state,
        loading: true,
        errors: [],
      };
    case inboxMessageConstants.sendInboxMessage.success:
      return {
        ...state,
        ...action.payload,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.sendInboxMessage.error:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    default:
      return state;
  }
};

export default sendInboxMessage;
