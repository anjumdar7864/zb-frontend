import { campaignConstants } from "../constants";

const initialState = {
  campaignData: {
    results: [],
    loading: false,
    page: 1,
    totalPages: 1,
    totalResults: 1,
  },
  markets: [],
  singleCampaign: {
    compaign: {},
    directImport: [],
    statuses:[],
    totalLeads:{}
  },
  compaignBatchReport: {
    result: [],
    page: 1,
    totalPages: 1,
    totalResults: 1,
  },
  followUpCampaign: {},
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case campaignConstants.getAllCompaigns.request:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: true,
        },
      };
    case campaignConstants.getAllCompaigns.success:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
          ...action.payload,
        },
      };
    case campaignConstants.getAllCompaignsForInbox.success:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
          results: action.payload,
        },
      };
    case campaignConstants.getAllCompaigns.error:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
        },
      };

    case campaignConstants.deleteCampaign.request:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: true,
        },
      };
    case campaignConstants.deleteCampaign.error:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
        },
      };

    case campaignConstants.getAllMarkets.request:
      return state;
    case campaignConstants.getAllMarkets.success:
      return { ...state, markets: action.payload };
    case campaignConstants.getAllMarkets.error:
      return state;

    case campaignConstants.createCampaign.request:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: true,
        },
      };
    case campaignConstants.createCampaign.error:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
        },
      };

    case campaignConstants.getSingleCampaign.request:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: true,
        },
      };
    case campaignConstants.getSingleCampaign.success:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
        },
        singleCampaign: action.payload,
      };
    case campaignConstants.getSingleCampaign.error:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
        },
      };
    case campaignConstants.getBatchReportForSingleCampaign.request:
      return state;
    case campaignConstants.getBatchReportForSingleCampaign.success:
      return { ...state, compaignBatchReport: action.payload };
    case campaignConstants.getBatchReportForSingleCampaign.error:
      return state;
    case campaignConstants.getFollowUpCampaign.request:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: true,
        },
      };
    case campaignConstants.getFollowUpCampaign.success:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
          ...action.payload,
        },
      };
    case campaignConstants.getFollowUpCampaign.error:
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          loading: false,
        },
      };
    default:
      return state;
  }
};

export default campaignReducer;
