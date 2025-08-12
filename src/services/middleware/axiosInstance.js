import axios from "axios";
// import { logOut } from "utils/helpers";
import { getToken } from "@/utils/storage";
import { defaultConfig } from "./defaultConfig";
import { getCookie, setCookie } from "../session/cookies";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const axiosInstance = axios.create({
  ...defaultConfig(),

  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
});
axiosInstance.defaults.timeout = 4200000;

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `${config?.url === "/auth/refresh" ? getCookie("refreshToken") : "Bearer "+ getToken()}`,
    };
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      deleteAllCookies();
      // window.location.replace("/login");
      window.location.replace("/#/Login");
    }
    if (error?.response?.status === 403) {
      window.location.replace("/permission-not-allowed");
    }
    if (error?.response?.status === 401 && !originalRequest._retry && error?.config?.url !== "/auth/login") {
      originalRequest._retry = true;
      if (getCookie("refreshToken")) {
        try {
          const result = await axiosInstance.post(`/auth/refresh`);
          if (result?.data?.data?.accessToken) {
            setCookie("accessToken", result?.data?.data?.accessToken);
            setCookie("refreshToken", result?.data?.data?.refreshToken);
            axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + result?.data?.data?.accessToken;
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          // logOut();
          // window.location.replace("/login");
          window.location.replace("/#/Login");
        }
      } else {
        logOut();
        // window.location.replace("/login");
        window.location.replace("/#/Login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
