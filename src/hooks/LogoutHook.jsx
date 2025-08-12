import React from 'react'
import { useNavigate } from 'react-router-dom';


const LogoutHook = () => {

  const navigate = useNavigate();

  const logout = () => {
    // Clear user data from local storage or session storage
    sessionStorage.clear(); // or sessionStorage.removeItem('user')
    
    // Navigate to the login page
    navigate("/Login" , { replace: true });
  };

  return logout;
}

export default LogoutHook
