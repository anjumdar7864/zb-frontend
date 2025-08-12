// actions/apiActions.js
import axios from 'axios';
import { authConstant } from "../constants";

export const apiCall = (endpoint, method, body) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;  // Get token from the Redux state

    try {
      // Make the API request using axios
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_APP_BACKEND_BASE_URL}${endpoint}`,
        data: body,  // Data to be sent in the request body
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Attach token in the headers
        }
      });

      // Dispatch success action with the response data
      dispatch({ type: 'API_SUCCESS', payload: response.data });

    } catch (error) {
      if (error.response?.data?.message === "Session expiredd") {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else if (error.response && error.response.status === 403) {
        console.log('Token is expired or unauthorized (403), logging out...');
        dispatch({ type: authConstant.LOGOUT });
      } else {
        // Dispatch failure action if API call fails
        console.error('API call failed:', error);
        dispatch({ type: 'API_FAILURE', payload: error.message });
      }
    }
  };
};
