import { marketConstants } from "../constants";

const initialState = {
  marketsData: {
    results: [],
    loading: false,
    acceptLoading: false,
    rejectLoading: false,
    totalPages: 1,
    totalResults: 1,
  },
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case marketConstants.getAllMarketsList.request:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          loading: true,
        },
      };
    case marketConstants.getAllMarketsList.success:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          loading: false,
          ...action.payload,
        },
      };
    case marketConstants.getAllMarketsList.error:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          loading: false,
        },
      };

    case marketConstants.createNewMarket.request:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          loading: true,
        },
      };
    case marketConstants.createNewMarket.request:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          loading: true,
        },
      };
    case marketConstants.accpetNewRequestOfMarket.request:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          acceptLoading: true,
        },
      };
    case marketConstants.rejectNewRequestOfMarket.request:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          rejectLoading: true,
        },
      };
    case marketConstants.accpetNewRequestOfMarket.success:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          acceptLoading: false,
        },
      };
    case marketConstants.rejectNewRequestOfMarket.success:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          rejectLoading: false,
        },
      };
    case marketConstants.accpetNewRequestOfMarket.error:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          acceptLoading: false,
        },
      };
    case marketConstants.rejectNewRequestOfMarket.error:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          rejectLoading: false,
        },
      };
    case marketConstants.createNewMarket.error:
      return {
        ...state,
        marketsData: {
          ...state.marketsData,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default marketReducer;
