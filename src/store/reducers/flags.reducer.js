import { act } from "react";
import { flagsConstant } from "../constants";

const initialState = {
  flagsData: {
    results: [],
    loading: false,
    page: 1,
    totalPages: 1,
    totalResults: 1,
    loadingDelete:null , 
  },
  fileCompleted: false,
  queueLoading: false,
};

const flagsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case flagsConstant.getAllFlags.success:
      return {
        ...state,
        flagsData: {
          ...state.flagsData,
          results: action.payload,
        },
      };
  
     

    
   

   
    default:
      return state;
  }
};

export default flagsReducer;
