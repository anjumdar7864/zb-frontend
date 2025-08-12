import { adminUserConstant } from "../constants";


const initialState = {
   userId:"" , 
    token: localStorage.getItem('accessToken'),
  };


  const adminUserReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case authConstant.LOGIN_REQUEST:
    
    //     return {
    //       ...state,
    //       loading: true,
    //     };
    
  
      default:
        return state;
    }
  };
  
  export default adminUserReducer;
  