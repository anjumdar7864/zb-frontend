import { dashboardConstant } from "../constants";

const initialState = {
  LeadBreakDown: [],
  totalLeads: 0,
  noStatusCount: 0,
  reminderCount: 0,
  unReadCount: 0,
  unAnsweredCount: 0,
  loading: false,
  topThreeCampaigns: [],
  avgReplyTime: {},
  savedAvgReplyTime: [],
  reportMessage: [],
  reportTags: [],
  reportMessageLast30: [],
  reportSendAndQueue: [],
  loadingMessage: false,
  prospectLeads: [],
  flagStatus: {},
  messageSendData: {},
  market: {},
  loadingOutBound: false,
  topDrip: [],
  dripSchedule: {},
  NotificationData:null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstant.GET_Lead_BreakDown_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_Lead_BreakDown_SUCCESS:
      return {
        ...state,
        LeadBreakDown: action.payload.leads,
        totalLeads: action.payload.leads.reduce((acc, obj) => {
          if (
            ["Hot", "Drip", "Nurture", "Warm", "No Status"].includes(
              obj.status[0]
            )
          ) {
            acc = acc + obj.value;
          }
          return acc;
        }, 0),
      };
    case dashboardConstant.GET_FLAG_STATUS_SUCCESS:
      return {
        ...state,
        flagStatus: action.payload,
      };
    case dashboardConstant.GET_Lead_BreakDown_FAILURE:
    case dashboardConstant.GET_FLAG_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
      };

      case dashboardConstant.GET_NOTIFICATION_SUCCESS:

      return {
        ...state,
        NotificationData: action.payload,
      };

    case dashboardConstant.GET_TOP_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_TOP_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        topThreeCampaigns: action.payload.topCampaigns,
      };
    case dashboardConstant.GET_TOP_CAMPAIGNS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_TOP_DRIP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_TOP_DRIP_SUCCESS:
      return {
        ...state,
        topDrip: action.payload,
      };
    case dashboardConstant.GET_COUNT_OF_MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        messageSendData: action.payload,
      };
    case dashboardConstant.GET_REPORT_NO_STATUS_SUCCESS:
      return {
        ...state,
        noStatusCount: action.payload,
      };
    case dashboardConstant.GET_REPORT_OF_REMINDER_SUCCESS:
      return {
        ...state,
        reminderCount: action.payload,
      };
    case dashboardConstant.GET_REPORT_OF_UNREAD_SUCCESS:
      return {
        ...state,
        unReadCount: action.payload,
      };
    case dashboardConstant.GET_REPORT_OF_UNANSWERED_SUCCESS:
      return {
        ...state,
        unAnsweredCount: action.payload,
      };
    case dashboardConstant.GET_TOP_DRIP_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_DRIP_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_DRIP_SCHEDULE_SUCCESS:
      return {
        ...state,
        dripSchedule: action.payload,
      };
    case dashboardConstant.GET_DRIP_SCHEDULE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_AVG_REPLY_TIME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_AVG_REPLY_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        avgReplyTime: action.payload.avgReplyTime,
      };
    case dashboardConstant.GET_SAVED_AVG_REPLY_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        savedAvgReplyTime: action.payload.savedAvgReplyTime,
      };
    case dashboardConstant.GET_AVG_REPLY_TIME_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_REPORT_MESSAGE_REQUEST:
      return {
        ...state,
        loadingMessage: true,
      };
    case dashboardConstant.GET_REPORT_MESSAGE_SUCCESS:
      return {
        ...state,
        reportMessage: action.payload.reportMessage,
        loadingMessage: false,
      };
    case dashboardConstant.GET_REPORT_MESSAGE_FAILURE:
      return {
        ...state,
        loadingMessage: false,
      };
    case dashboardConstant.GET_REPORT_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_REPORT_TAGS_SUCCESS:
      return {
        ...state,
        reportTags: action.payload.reportTags,
      };
    case dashboardConstant.GET_REPORT_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_REPORT_MESSAGE_LAST_30_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_REPORT_MESSAGE_LAST_30_SUCCESS:
      return {
        ...state,
        reportMessageLast30: action.payload.reportMessageLast30,
      };
    case dashboardConstant.GET_REPORT_MESSAGE_LAST_30_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_REPORT_SEND_QUEUE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_REPORT_SEND_QUEUE_SUCCESS:
      return {
        ...state,
        reportSendAndQueue: action.payload.reportSendAndQueue,
      };
    case dashboardConstant.GET_REPORT_SEND_QUEUE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_PROSPECTS_LEADS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_PROSPECTS_LEADS_SUCCESS:
      return {
        ...state,
        prospectLeads: action.payload.prospectLeads,
      };
    case dashboardConstant.GET_PROSPECTS_LEADS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_MARKET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_MARKET_SUCCESS:
      return {
        ...state,
        loading: false,
        market: action.payload,
      };
    case dashboardConstant.GET_MARKET_FAILURE:
    case dashboardConstant.GET_REPORT_NO_STATUS_FAILURE:
    case dashboardConstant.GET_REPORT_OF_REMINDER_FAILURE:
    case dashboardConstant.GET_REPORT_OF_UNREAD_FAILURE:
    case dashboardConstant.GET_REPORT_OF_UNANSWERED_FAILURE:
    case dashboardConstant.GET_COUNT_OF_MESSAGE_SEND_FAILURE:
    case dashboardConstant.GET_SAVED_AVG_REPLY_TIME_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case dashboardConstant.GET_OUTBOUNDS_REQUEST:
      return {
        ...state,
        loadingOutBound: true,
      };
    case dashboardConstant.GET_OUTBOUNDS_SUCCESS:
      return {
        ...state,
        loadingOutBound: false,
        flagStatus: action.payload,
      };
    case dashboardConstant.GET_OUTBOUNDS_FAILURE:
      return {
        ...state,
        loadingOutBound: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
