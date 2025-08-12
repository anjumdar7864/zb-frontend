import { asyncAction } from "@/utils";
import axios from "axios";
import { marketConstants, authConstant, flagsConstants } from "../constants";
import { toast } from "react-hot-toast";
import { getToken } from "@/utils/storage";
// axios.defaults.withCredentials = true;
export const getAllCompanyPopupData = (
  {  tenantId, selectedNumber },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
     console.log("check flags data====" , tenantId , selectedNumber);

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}dashboard/v1/api/dashboard/report/of/flags/status?${tenantId ? `tenantId=${tenantId}&` : ""}${selectedNumber ? `outBoundNumber=${selectedNumber}` : ""}`,
        authHeaders
      );
    //   delete data.page;
    //   delete data.limit;
      return data;
    },
  //  flagsConstants.getAllFlags.success,
    onSuccess,
    onError
  );
};
