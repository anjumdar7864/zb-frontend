import axios from "axios";
// import { getToken } from "@/utils/storage";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

// const token = getToken();
// console.log(token);

// if (token) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }


export default axios;