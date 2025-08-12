import { asyncAction } from "@/utils";
import axios from "@/api";

import { statsConstants } from "../constants";
// axios.defaults.withCredentials = true;
export const getStats = (
  params,
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(`/dashboard/report/of/basic/stats`,
        { ...authHeaders, params }
      );
      return data;
    },
    statsConstants.getBasicStats,
    onSuccess,
    onError
  );
};
