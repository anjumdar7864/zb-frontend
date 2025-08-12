import { size, slice } from "lodash-es";
import { inboxMessageConstants, remainderConstants } from "@/store/constants";

const initialState = {
  results: [],
  loading: false,
  page: 1,
  totalPages: 1,
  totalResults: 0,
  errors: [],
};

const getItem = (state, id) => {
  return state.results.find((inbox) => inbox._id === id);
};

let inbox = null;
const inboxAllMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case inboxMessageConstants.getAllInboxMessages.request:
      return {
        ...state,
        loading: true,
        errors: [],
      };
    case inboxMessageConstants.getAllInboxMessages.success:


      return {
        ...state,
        // ...action.payload,
        results: [...state.results, ...action.payload.results],
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,

        loading: false,
        errors: [],
      };

    case inboxMessageConstants.getAllInboxMessagesFilters.success:


      return {
        ...state,
        ...action.payload,
        // results: [...action.payload.results, ...state.results],
        // page: action.payload.page,
        // totalPages: action.payload.totalPages,
        // totalResults: action.payload.totalResults,

        loading: false,
        errors: [],
      };
    case inboxMessageConstants.getAllInboxMessages.error:
      return {
        ...state,
        loading: false,
        errors: action.message,
      };
    // case inboxMessageConstants.markAsReadUserInbox.request:
    // case inboxMessageConstants.markAsUnReadUserInbox.request:
    //   return {
    //     ...state,
    //     loading: true,
    //     errors: [],
    //   };
    // case inboxMessageConstants.markAsReadUserInbox.error:
    // case inboxMessageConstants.markAsUnReadUserInbox.error:
    //   return {
    //     ...state,
    //     loading: false,
    //     errors: action.message,
    //   };
    case remainderConstants.cancelRemainderToUser.success:
      inbox = getItem(state, action.payload.inbox);
      if (inbox) {
        inbox.isReminderSet = false;
        inbox.reminder = null;
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case remainderConstants.setRemainderToUser.success:
      inbox = getItem(state, action.payload.inbox);
      if (inbox) {
        inbox.isReminderSet = true;
        inbox.reminder = action.payload;
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.removeVerifiedNumber.success:
    case inboxMessageConstants.sendVerifiedNumber.success:
    case inboxMessageConstants.sendAddToDNCNumber.success:
    case inboxMessageConstants.removeAddToDNCNumber.success:
    case inboxMessageConstants.sendWrongNumber.success:
    case inboxMessageConstants.sendWrongNumberList.success:
    case inboxMessageConstants.removeWrongNumber.success:
    case inboxMessageConstants.addStatusToUserInbox.success:
    case inboxMessageConstants.removeStatusToUserInbox.success:
      case inboxMessageConstants.removeStatusToUserInboxList.success:
    case inboxMessageConstants.changeLeadName.success:
      inbox = getItem(state, action.payload._id);
      if (inbox) {
        inbox.isRead = action.payload.isRead;
        inbox.isReadPhone2 = action.payload.isReadPhone2;
        inbox.isReadPhone3 = action.payload.isReadPhone3;
        inbox.isVerifiedNumber = action.payload.isVerifiedNumber;
        inbox.isWrongNumber = action.payload.isWrongNumber;
        inbox.isAddedToDNC = action.payload.isAddedToDNC;
        inbox.isReadPhone2 = action.payload.isReadPhone2;
        inbox.isVerifiedNumberPhone2 = action.payload.isVerifiedNumberPhone2;
        inbox.isWrongNumberPhone2 = action.payload.isWrongNumberPhone2;
        inbox.isAddedToDNCPhone2 = action.payload.isAddedToDNCPhone2;
        inbox.isReadPhone3 = action.payload.isReadPhone3;
        inbox.isVerifiedNumberPhone3 = action.payload.isVerifiedNumberPhone3;
        inbox.isWrongNumberPhone3 = action.payload.isWrongNumberPhone3;
        inbox.isAddedToDNCPhone3 = action.payload.isAddedToDNCPhone3;
        inbox.status = action.payload.status;
        inbox.userName = action.payload.userName;
        inbox.dripAutomation = action.payload.dripAutomation;
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.getUserInboxMessages.success:
      inbox = getItem(state, action.payload?.results[0]._id);
      if (inbox) {
        inbox = action.payload?.results[0];
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.markAsReadUserInbox.success:
      inbox = getItem(state, action.payload._id);
      if (inbox) {
        inbox.isRead = action.payload.isRead;
        inbox.isReadPhone2 = action.payload.isReadPhone2;
        inbox.isReadPhone3 = action.payload.isReadPhone3;
        inbox.messages = inbox.messages.map((message) => {
          message.isViewed = true;
          return message;
        });
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.markAsUnReadUserInbox.success:
      inbox = getItem(state, action.payload._id);
      if (inbox) {
        inbox.isRead = action.payload.isRead;
        inbox.isReadPhone2 = action.payload.isReadPhone2;
        inbox.isReadPhone3 = action.payload.isReadPhone3;
        inbox.messages = inbox.messages.map((message) => {
          message.isViewed = false;
          return message;
        });
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };


      case inboxMessageConstants.addStatusToUserInboxList.success:
      inbox = getItem(state, action.payload._id);
     
      if (inbox) {
      
        inbox.status = action.payload.status;
      }
      // return {
      //   ...state,
      //   loading: false,
      //   errors: [],
      // };





    case inboxMessageConstants.addTagToUserInbox.success:
    case inboxMessageConstants.removeTagToUserInbox.success:
      inbox = getItem(state, action.payload._id);
      if (inbox) {
        inbox.tags = action.payload.tags;
      }
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.NEW_MESSAGE_RECEIVED:

    inbox = getItem(state, action.payload.inboxId);


    if (inbox && action.payload.isIncoming) {
      const findIndex = inbox.messages.findIndex(
        (message) => message?.phone === action.payload?.phone
      );
    
      if (action.payload?.phoneType === "phone1") {
        inbox.isRead = false;
      }else if (action.payload?.phoneType === "phone2") {
        inbox.isReadPhone2 = false;

      }else if (action.payload?.phoneType === "phone3") {
        inbox.isReadPhone3 = false;

      }

      if (findIndex > -1) {
        // Update message content immutably
        const updatedMessages = [...inbox.messages];
        updatedMessages[findIndex] = {
          ...updatedMessages[findIndex],
          content: action.payload.content,
          // isViewed: false, // Uncomment if needed
        };
        inbox.messages = updatedMessages;
      } else {
        // Add new message at start, limit to 2 messages
        inbox.messages = [action.payload, ...inbox.messages.slice(0, 1)];
        // inbox.isRead = false;
      }
    }
    
    if (inbox && !action.payload.isIncoming) {
      inbox.reminder = action.payload.reminder;
    }
    
    if (
      action.payload?.status === "651ebe648042b1b3f4674ea2" &&
      (action.payload?.isVerifiedNumber ||
        action.payload?.isVerifiedNumberPhone2 ||
        action.payload?.isVerifiedNumberPhone3)
    ) {
      inbox.status = "651ebe828042b1b3f4674ea8";
    }
    
    // Force shallow state change so useEffect can detect update
    return {
      ...state,
      results: [...state.results], // Important: new reference to trigger useEffect
    };
    
    default:
      return state;
  }
};

export default inboxAllMessageReducer;
