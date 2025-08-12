import { asyncAction } from "@/utils";
import axios from "@/api";

import { statusConstants } from "../constants";
// axios.defaults.withCredentials = true;
export const getAllStatusList = (params, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(`/inbox/v1/api/status`,
        { ...authHeaders, params }
      );
      return data;
    },
    statusConstants.getAllStatusList,
    onSuccess,
    onError
  );
};
