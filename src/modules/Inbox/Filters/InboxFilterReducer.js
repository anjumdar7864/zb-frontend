
export const actions = {
  FROM: "FROM",
  TO: "TO",
  USER: "USER",
  CAMPAIGN: "CAMPAIGN",
  STATUS: "STATUS",
  TAG: "TAG",
  QUICK_FILTER_ADD: "QUICK_FILTER_ADD",
  QUICK_FILTER_REMOVE: "QUICK_FILTER_REMOVE",
  QUICK_FILTER_REMOVE_ALL: "QUICK_FILTER_REMOVE_ALL",
  CRM: "CRM",
}


export const initialFilterReducer = {
  from: null,
  to: null,
  user: null,
  campaign: null,
  status: null,
  tag: null,
  noStatus1: null,
  unRead: null,
  unAnswered: true,
  pushToCrm: null,
};


export const reducer = (state, action) => {
  switch (action.type) {
    case actions.FROM:
      return {
        ...state,
        from: action.payload
      };
    case actions.TO:
      return {
        ...state,
        to: action.payload
      };
    case actions.USER:
      return {
        ...state,
        user: action.payload
      };
    case actions.CAMPAIGN:
      return {
        ...state,
        campaign: action.payload
      };
    case actions.STATUS:
     

      return {
        ...state,
        status: action.payload
      };
    case actions.TAG:
      return {
        ...state,
        tag: action.payload
      };
    case actions.QUICK_FILTER_ADD:
     
      
      return {
        ...state,
        noStatus1: null,
        unAnswered: null,
        unRead: null,
        [action.payload]: true
      };
    case actions.QUICK_FILTER_REMOVE:
   

      return {
        ...state,
        [action.payload]: null
      };
    case actions.QUICK_FILTER_REMOVE_ALL:
   
      
      return {
        ...state,
        noStatus1: null,
        unAnswered: null,
        unRead: null,
      };
      case actions.CRM:
        return {
          ...state,
          pushToCrm: action.payload
        };
    default:
      return state;
  }
};