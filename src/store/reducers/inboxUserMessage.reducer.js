import { inboxMessageConstants, remainderConstants } from "@/store/constants";

const initialState = {
  loading: false,
  detailLoading: false,
  activityLoading: false,
  automationLoading: false,
  errors: [],
  DetailId: null,
  data: {
    _id: null,
    userName: "",
    to: "",
    from: "",
    tags: [],
    notes: [],
    messages: [],
    isWrongNumber: false,
    isVerifiedNumber: false,
    isAddedToDNC: false,
    createdAt: "",
    campagin: "",
    batch: "",
    activityList: [],
    remainder: null,
    isNewMessage: false,
    responsePhone: [],
    dripAutomation: "",
  },
  activityList: [],
  inboxDetail: null,
  selectedPhone: 1,
  newMessagePhone: 0,
  pushDataToCRMLoading: false,
  dripFilterForInbox: [],
};

const inboxUserMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case inboxMessageConstants.PHONE_SELECTED:


      return {
        ...state,
        selectedPhone: action.payload,
      };
    case inboxMessageConstants.getUserInboxMessages.request:


      return {
        ...state,
        loading: true,
        errors: [],
      };
    case inboxMessageConstants.getProspectsDetails.request:


      return {
        ...state,
        detailLoading: true,
        inboxDetail: [],
        errors: [],
      };
    case inboxMessageConstants.getUserInboxMessages.success:



      return {
        ...state,
        data: action.payload?.results[0],
        DetailId: action.payload?.results[0]?._id,
        // inboxDetail: action.payload?.inboxDetail[0],
        loading: false,
        errors: [],
      };
    case inboxMessageConstants.DRIP_FILTER_FOR_INBOX_SUCCESS:


      return {
        ...state,
        loading: false,
        dripFilterForInbox: action?.payload,
      };
    case inboxMessageConstants.NEW_MESSAGE_RECEIVED_AGAIN:
      const shadowState = { ...state };

      if (action.payload.inboxId == state.data._id) {
        if (action.payload.phoneType == "phone1") {
          if (state.data.messages[state.data.messages.length - 1].content != action.payload.content) {
            shadowState.data.messages = [...state.data.messages, action.payload];

          }
        }

        if (action.payload.phoneType == "phone2") {
          if (state.data.messagesPhone2[state.data.messagesPhone2.length - 1].content != action.payload.content) {
            shadowState.data.messagesPhone2 = [...state.data.messagesPhone2, action.payload];

          }
        }

        if (action.payload.phoneType == "phone3") {
          if (state.data.messagesPhone3[state.data.messagesPhone3.length - 1].content != action.payload.content) {
            shadowState.data.messagesPhone3 = [...state.data.messagesPhone3, action.payload];

          }
        }
      }

      if (state.data && !action.payload.isIncoming) {


        let updatedData;
        if (
          action.payload?.status === "651ebe648042b1b3f4674ea2" &&
          (action.payload?.isVerifiedNumber ||
            action.payload?.isVerifiedNumberPhone2 ||
            action.payload?.isVerifiedNumberPhone3)
        ) {
          updatedData = {
            ...state.data,
            status: "651ebe828042b1b3f4674ea8",
          };
        } else {
          updatedData = {
            ...state.data,
            isReminderSet: false,
            reminder: undefined,
          };
        }
        return {
          ...state,
          data: updatedData,
          loading: false,
          errors: [],
        };
      }
      return state;

    case inboxMessageConstants.NEW_MESSAGE_SEND:

      console.log("check id of unread ===", action.payload);

      const newState = { ...state };
      if (state.data._id) {
        if (action.payload.type == "") {
          // if(state.data.messages[state.data.messages.length - 1].content != action.payload){
          newState.data.messages = [...state.data.messages, action.payload];

          // }
        }

        if (action.payload.type == "phone2") {
          if (state.data.messagesPhone2[state.data.messagesPhone2.length - 1].content != action.payload) {
            newState.data.messagesPhone2 = [...state.data.messagesPhone2, action.payload];

          }
        }

        if (action.payload.type == "phone3") {
          if (state.data.messagesPhone3[state.data.messagesPhone3.length - 1].content != action.payload) {
            newState.data.messagesPhone3 = [...state.data.messagesPhone3, action.payload];

          }
        }
      }
      return state;
    case inboxMessageConstants.getProspectsDetails.success:
      return {
        ...state,
        inboxDetail: action.payload[0],
        loading: false,
        detailLoading: false,
        errors: [],
      };
    case inboxMessageConstants.getProspectsDetails.error:
      return {
        ...state,
        loading: false,
        detailLoading: false,
        errors: action.payload.err,
      };
    case inboxMessageConstants.getUserInboxMessages.error:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case inboxMessageConstants.getUserActivityList.request:
      return {
        ...state,
        // loading: true,
        activityLoading: true,
        errors: [],
      };
    case inboxMessageConstants.getUserActivityList.success:
      return {
        ...state,
        activityList: action.payload,
        // loading: false,
        activityLoading: false,
        errors: [],
      };
    case inboxMessageConstants.getUserActivityList.error:
      return {
        ...state,
        // loading: false,
        activityLoading: false,
        errors: action.payload.err,
      };
    case inboxMessageConstants.sendAddToDNCNumber.request:
    case inboxMessageConstants.sendVerifiedNumber.request:
    case inboxMessageConstants.sendWrongNumber.request:
    case inboxMessageConstants.removeAddToDNCNumber.request:
    case inboxMessageConstants.removeVerifiedNumber.request:
    case inboxMessageConstants.removeWrongNumber.request:
    case inboxMessageConstants.sendUserNote.request:
    case inboxMessageConstants.deleteUserNote.request:
    case inboxMessageConstants.addTagToUserInbox.request:
    case inboxMessageConstants.removeTagToUserInbox.request:
    case inboxMessageConstants.addStatusToUserInbox.request:
    case inboxMessageConstants.removeStatusToUserInbox.request:
      // case inboxMessageConstants.changeLeadName.request:
      return {
        ...state,
        // loading: true,
        automationLoading: true,
        errors: [],
      };
    case inboxMessageConstants.sendAddToDNCNumber.success:
    case inboxMessageConstants.sendVerifiedNumber.success:
    case inboxMessageConstants.sendWrongNumber.success:
    case inboxMessageConstants.removeAddToDNCNumber.success:
    case inboxMessageConstants.removeVerifiedNumber.success:
    case inboxMessageConstants.removeWrongNumber.success:
    case inboxMessageConstants.addTagToUserInbox.success:
    case inboxMessageConstants.removeTagToUserInbox.success:
    case inboxMessageConstants.addStatusToUserInbox.success:
    case inboxMessageConstants.removeStatusToUserInbox.success:
    case inboxMessageConstants.changeLeadName.success:
      console.log("check if running" , state.inboxDetail, action.payload.userName);

      const inboxDetailShadow = state.inboxDetail;
      // inboxDetailShadow.firstName = action.payload.userName.split(" ")[0];
      // console.log("check if running 000" , inboxDetailShadow, action.payload.userName);



      const nameParts = action?.payload?.userName?.split(" ");
      console.log(nameParts?.[0] , "akdjfhak");
      inboxDetailShadow.firstName = nameParts?.[0] || "";
      inboxDetailShadow.lastName = nameParts?.length > 1 ? nameParts?.slice(1).join(" ") : "";



      return {
        ...state,
        inboxDetail: inboxDetailShadow,
        data: {
          ...state.data,
          ...action.payload,
        },
        automationLoading: false,
        // loading: false,
        errors: [],
      };
    case inboxMessageConstants.sendAddToDNCNumber.error:
    case inboxMessageConstants.sendVerifiedNumber.error:
    case inboxMessageConstants.sendWrongNumber.error:
    case inboxMessageConstants.removeAddToDNCNumber.error:
    case inboxMessageConstants.removeVerifiedNumber.error:
    case inboxMessageConstants.removeWrongNumber.error:
    case inboxMessageConstants.sendUserNote.error:
    case inboxMessageConstants.deleteUserNote.error:
    case inboxMessageConstants.addTagToUserInbox.error:
    case inboxMessageConstants.removeTagToUserInbox.error:
    case inboxMessageConstants.addStatusToUserInbox.error:
    case inboxMessageConstants.removeStatusToUserInbox.error:
      // case inboxMessageConstants.changeLeadName.error:
      return {
        ...state,
        automationLoading: false,
        // loading: false,
        errors: action.payload.err,
      };
    case inboxMessageConstants.deleteUserNote.success:
      return {
        ...state,
        data: {
          ...state.data,
          notes: action.payload,
        },
        // loading: false,
        errors: [],
      };
    case inboxMessageConstants.sendUserNote.success:


      return {
        ...state,
        data: {
          ...state.data,
          notes: action.payload.notes,
        },
        // loading: false,
        errors: [],
      };
    case inboxMessageConstants.markAsReadUserInbox.success:
      return {
        ...state,
        data: {
          ...state.data,
          isNewMessage: false,
        },
      };
    case inboxMessageConstants.pushDataIntoCRM.request:
      return {
        ...state,
        pushDataToCRMLoading: true,
      };
    case inboxMessageConstants.pushDataIntoCRM.success:
      return {
        ...state,
        data: {
          ...state.data,
          pushedToCrmDate: new Date(),
          ...action.payload,
        },
        pushDataToCRMLoading: false,
      };
    case inboxMessageConstants.pushDataIntoCRM.error:
      return {
        ...state,
        pushDataToCRMLoading: false,
      };
    case inboxMessageConstants.NEW_MESSAGE_RECEIVED_AGAIN_AGAIN:
      if (state.data?._id == action.payload.inboxId) {
        const { to, phone2, phone3 } = state.data;
        let {
          messages,
          messagesPhone2,
          messagesPhone3,
          responsePhone,
          dripAutomation,
          status,
          isAddedToDNC,
          isAddedToDNCPermanent,
          isAddedToDNCPhone2,
          isAddedToDNCPhone2Permanent,
          isAddedToDNCPhone3,
          isAddedToDNCPhone3Permanent,
          dripAutomationSchedule,
        } = state.data;
        let newMessagePhone = 0;
        if (action.payload.phone == to) {
          newMessagePhone = 1;
          responsePhone.phone1 = to;
          messages = [...state.data.messages, action.payload];
          if (action.payload.isIncoming) {
            responsePhone = {
              ...state.data.responsePhone,
              phone1: to,
            };
          }
        } else if (action.payload.phone == phone2) {
          newMessagePhone = 2;
          messagesPhone2 = [...state.data.messagesPhone2, action.payload];
          if (action.payload.isIncoming) {
            responsePhone = {
              ...state.data.responsePhone,
              phone2,
            };
          }
        } else if (action.payload.phone == phone3) {
          newMessagePhone = 3;
          messagesPhone3 = [...state.data.messagesPhone3, action.payload];
          if (action.payload.isIncoming) {
            responsePhone = {
              ...state.data.responsePhone,
              phone3,
            };
          }
        }
        if (
          action.payload?.status === "651ebe648042b1b3f4674ea2" &&
          (action.payload?.isVerifiedNumber ||
            action.payload?.isVerifiedNumberPhone2 ||
            action.payload?.isVerifiedNumberPhone3)
        ) {
          dripAutomation = "";
          status = "651ebe828042b1b3f4674ea8";
        }

        if (
          action.payload?.isAddedToDNC &&
          action.payload?.isAddedToDNCPermanent
        ) {
          isAddedToDNC = action.payload?.isAddedToDNC;
          isAddedToDNCPermanent = action.payload?.isAddedToDNCPermanent;
        } else if (
          action.payload?.isAddedToDNCPhone2 &&
          action.payload?.isAddedToDNCPhone2Permanent
        ) {
          isAddedToDNCPhone2 = action.payload?.isAddedToDNCPhone2;
          isAddedToDNCPhone2Permanent =
            action.payload?.isAddedToDNCPhone2Permanent;
        } else if (
          action.payload?.isAddedToDNCPhone3 &&
          action.payload?.isAddedToDNCPhone3Permanent
        ) {
          isAddedToDNCPhone3 = action.payload?.isAddedToDNCPhone3;
          isAddedToDNCPhone3Permanent =
            action.payload?.isAddedToDNCPhone3Permanent;
        }
        if (action.payload?.dripAutomationSchedule) {
          dripAutomationSchedule = action.payload?.dripAutomationSchedule;
          dripFilterForInboxs = [];
        }
        return {
          ...state,
          newMessagePhone,
          data: {
            ...state.data,
            isNewMessage: true,
            messages,
            messagesPhone2,
            messagesPhone3,
            responsePhone,
            dripAutomation,
            status,
            isAddedToDNC,
            isAddedToDNCPermanent,
            isAddedToDNCPhone2,
            isAddedToDNCPhone2Permanent,
            isAddedToDNCPhone3,
            isAddedToDNCPhone3Permanent,
            dripAutomationSchedule,
            dripFilterForInboxs,
          },
        };
      }
      return {
        ...state,
      };

    case remainderConstants.cancelRemainderToUser.success:
      return {
        ...state,
        data: {
          ...state.data,
          isReminderSet: false,
          reminder: null,
        },
      };
    case remainderConstants.setRemainderToUser.success:
      return {
        ...state,
        data: {
          ...state.data,
          isReminderSet: true,
          reminder: action.payload,
        },
      };
    default:
      return state;
  }
};

export default inboxUserMessageReducer;
