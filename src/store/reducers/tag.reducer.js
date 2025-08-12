import { tagConstants } from "../constants";

const initialState = {
  results: [],
  loading: false,
  totalPages: 1,
  totalResults: 1,
  errors: [],
  success: []
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    // case tagConstants.getAllTagsList.request:
    //   console.log("request");
      
    //   return {
    //     ...state,
    //     loading: true,
    //     errors: []
    //   };
    case tagConstants.getAllTagsList.success:
      console.log("success");
      return {
        ...state,
        ...action.payload,
        loading: false,
    };
    case tagConstants.getAllTagsList.error:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
      case tagConstants.addNewTag.request:
        return {
          ...state,
          loading: true,
          errors: []
        };
      case tagConstants.addNewTag.success:
        let newAllTags = state
        newAllTags['results']=[...state['results'],action.payload]
        return {
          ...newAllTags,
          ...action.payload,
          loading: false,
      };
      case tagConstants.addNewTag.error:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };  
        case tagConstants.deleteTag.request:
        return {
          ...state,
          loading: true,
          errors: []
        };
      case tagConstants.deleteTag.success:
        let newAllTagsAfterDelete = state
        let newResults = newAllTagsAfterDelete['results'].filter(obj => obj._id !== action.payload['_id'])
        newAllTagsAfterDelete['results'] = newResults
        return {
          ...newAllTagsAfterDelete,
          ...action.payload,
          loading: false,
          success:'Deleted Successfully'
      };
      case tagConstants.deleteTag.error:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };  
        

        case tagConstants.updateTag.request:
          return {
            ...state,
            loading: true,
            errors: []
          };
        case tagConstants.updateTag.success:
          let newAllTagsAfterUpdate = state
          let index = newAllTagsAfterUpdate['results'].findIndex(obj => obj._id === action.payload['_id'])
          newAllTagsAfterUpdate['results'][index] = action.payload
          return {
            ...newAllTagsAfterUpdate,
            ...action.payload,
            loading: false,
            success:'Deleted Successfully'
        };
        case tagConstants.updateTag.error:
          return {
            ...state,
            loading: false,
            errors: action.payload
          };  
    default:
      return state;
  }
};

export default tagReducer;
