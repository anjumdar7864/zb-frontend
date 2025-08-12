export const inboxMessageConstants = {
  NEW_MESSAGE_RECEIVED: "NEW_MESSAGE_RECEIVED",
  NEW_MESSAGE_RECEIVED_AGAIN: "NEW_MESSAGE_RECEIVED_AGAIN",
  NEW_MESSAGE_SEND: "NEW_MESSAGE_SEND",
  NEW_MESSAGE_RECEIVED_AGAIN_AGAIN: "NEW_MESSAGE_RECEIVED_AGAIN_AGAIN",
  PHONE_SELECTED: "PHONE_SELECTED",
  getAllInboxMessages: {
    request: "GET_ALL_INBOX_MESSAGES_REQUEST",
    success: "GET_ALL_INBOX_MESSAGES_SUCCESS",
    error: "GET_ALL_INBOX_MESSAGES_FAILURE",
  },
  getAllInboxMessagesFilters: {
    request: "GET_ALL_INBOX_MESSAGES_REQUEST",
    success: "GET_ALL_INBOX_MESSAGES_SUCCESS_FILTERS",
    error: "GET_ALL_INBOX_MESSAGES_FAILURE",
  },
  getUserInboxMessages: {
    request: "GET_USER_INBOX_MESSAGES_REQUEST",
    success: "GET_USER_INBOX_MESSAGES_SUCCESS",
    error: "GET_USER_INBOX_MESSAGES_FAILURE",
  },
  sendInboxMessage: {
    request: "SEND_INBOX_MESSAGE_REQUEST",
    success: "SEND_INBOX_MESSAGE_SUCCESS",
    error: "SEND_INBOX_MESSAGE_FAILURE",
  },
  getUserActivityList: {
    request: "GET_USER_ACTIVITY_LIST_REQUEST",
    success: "GET_USER_ACTIVITY_LIST_SUCCESS",
    error: "GET_USER_ACTIVITY_LIST_FAILURE",
  },
  getUserNotesList: {
    request: "GET_USER_NOTES_LIST_REQUEST",
    success: "GET_USER_NOTES_LIST_SUCCESS",
    error: "GET_USER_NOTES_LIST_FAILURE",
  },
  getUserNote: {
    request: "GET_USER_NOTE_REQUEST",
    success: "GET_USER_NOTE_SUCCESS",
    error: "GET_USER_NOTE_FAILURE",
  },
  sendUserNote: {
    request: "SEND_USER_NOTE_REQUEST",
    success: "SEND_USER_NOTE_SUCCESS",
    error: "SEND_USER_NOTE_FAILURE",
  },
  sendUserNoteList: {
    request: "SEND_USER_NOTE_LIST_REQUEST",
    success: "SEND_USER_NOTE_LIST_SUCCESS",
    error: "SEND_USER_NOTE_LIST_FAILURE",
  },
  deleteUserNote: {
    request: "DELETE_USER_NOTE_REQUEST",
    success: "DELETE_USER_NOTE_SUCCESS",
    error: "DELETE_USER_NOTE_FAILURE",
  },
  sendVerifiedNumber: {
    request: "SEND_VERIFIED_NUMBER_REQUEST",
    success: "SEND_VERIFIED_NUMBER_SUCCESS",
    error: "SEND_VERIFIED_NUMBER_FAILURE",
  },
  sendAddToDNCNumber: {
    request: "SEND_ADD_TO_DNC_NUMBER_REQUEST",
    success: "SEND_ADD_TO_DNC_NUMBER_SUCCESS",
    error: "SEND_ADD_TO_DNC_NUMBER_FAILURE",
  },
  sendWrongNumber: {
    request: "SEND_WRONG_NUMBER_REQUEST",
    success: "SEND_WRONG_NUMBER_SUCCESS",
    error: "SEND_WRONG_NUMBER_FAILURE",
  },
  sendWrongNumberList: {
    request: "SEND_WRONG_NUMBER_LIST_REQUEST",
    success: "SEND_WRONG_NUMBER_LIST_SUCCESS",
    error: "SEND_WRONG_NUMBER_LIST_FAILURE",
  },
  removeVerifiedNumber: {
    request: "REMOVE_VERIFIED_NUMBER_REQUEST",
    success: "REMOVE_VERIFIED_NUMBER_SUCCESS",
    error: "REMOVE_VERIFIED_NUMBER_FAILURE",
  },
  removeAddToDNCNumber: {
    request: "REMOVE_ADD_TO_DNC_NUMBER_REQUEST",
    success: "REMOVE_ADD_TO_DNC_NUMBER_SUCCESS",
    error: "REMOVE_ADD_TO_DNC_NUMBER_FAILURE",
  },
  removeWrongNumber: {
    request: "REMOVE_WRONG_NUMBER_REQUEST",
    success: "REMOVE_WRONG_NUMBER_SUCCESS",
    error: "REMOVE_WRONG_NUMBER_FAILURE",
  },
  addTagToUserInbox: {
    request: "ADD_TAG_TO_USER_INBOX_REQUEST",
    success: "ADD_TAG_TO_USER_INBOX_SUCCESS",
    error: "ADD_TAG_TO_USER_INBOX_FAILURE",
  },
  removeTagToUserInbox: {
    request: "REMOVE_TAG_TO_USER_INBOX_REQUEST",
    success: "REMOVE_TAG_TO_USER_INBOX_SUCCESS",
    error: "REMOVE_TAG_TO_USER_INBOX_FAILURE",
  },
  markAsReadUserInbox: {
    request: "MARK_AS_READ_USER_INBOX_REQUEST",
    success: "MARK_AS_READ_USER_INBOX_SUCCESS",
    error: "MARK_AS_READ_USER_INBOX_FAILURE",
  },
  markAsUnReadUserInbox: {
    request: "MARK_AS_UNREAD_USER_INBOX_REQUEST",
    success: "MARK_AS_UNREAD_USER_INBOX_SUCCESS",
    error: "MARK_AS_UNREAD_USER_INBOX_FAILURE",
  },
  addStatusToUserInbox: {
    request: "ADD_STATUS_TO_USER_INBOX_REQUEST",
    success: "ADD_STATUS_TO_USER_INBOX_SUCCESS",
    error: "ADD_STATUS_TO_USER_INBOX_FAILURE",
  },
  addStatusToUserInboxList: {
    request: "ADD_STATUS_TO_USER_INBOX_LIST_REQUEST",
    success: "ADD_STATUS_TO_USER_INBOX_LIST_SUCCESS",
    error: "ADD_STATUS_TO_USER_INBOX_LIST_FAILURE",
  },
  removeStatusToUserInbox: {
    request: "REMOVE_STATUS_TO_USER_INBOX_REQUEST",
    success: "REMOVE_STATUS_TO_USER_INBOX_SUCCESS",
    error: "REMOVE_STATUS_TO_USER_INBOX_FAILURE",
  },
  removeStatusToUserInboxList: {
    request: "REMOVE_STATUS_TO_USER_INBOX_LIST_REQUEST",
    success: "REMOVE_STATUS_TO_USER_INBOX_LIST_SUCCESS",
    error: "REMOVE_STATUS_TO_USER_INBOX_LIST_FAILURE",
  },
  pushDataIntoCRM: {
    request: "PUSH_DATA_INTO_CRM_REQUEST",
    success: "PUSH_DATA_INTO_CRM_SUCCESS",
    error: "PUSH_DATA_INTO_CRM_FAILURE",
  },
  changeLeadName: {
    request: "CHANGE_LEAD_NAME_REQUEST",
    success: "CHANGE_LEAD_NAME_SUCCESS",
    error: "CHANGE_LEAD_NAME_FAILURE",
  },
  getProspectsDetails: {
    request: "GET_PROSPECT_DETAIL_REQUEST",
    success: "GET_PROSPECT_DETAIL_SUCCESS",
    error: "GET_PROSPECT_DETAIL_FAILURE",
  },
  DRIP_FILTER_FOR_INBOX_SUCCESS: "DRIP_FILTER_FOR_INBOX_SUCCESS",
  DRIP_FILTER_FOR_INBOX_FAILURE: "DRIP_FILTER_FOR_INBOX_FAILURE",
};
