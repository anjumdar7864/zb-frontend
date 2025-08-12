import { asyncAction } from "@/utils";
import axios from "axios";
import { marketConstants, authConstant } from "../constants";
import { toast } from "react-hot-toast";
import { getToken } from "@/utils/storage";
// axios.defaults.withCredentials = true;
export const getAllMarketsList = (
  { limit, page, search, areaCode, market },
  onSuccess,
  onError , 
  sorting , 
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}market/v1/api/market?${
          limit ? `limit=${limit}&` : ""
        }${page ? `page=${page}&` : ""}${search ? `search=${search}` : ""}${
          areaCode ? `areaCode=${areaCode}` : ""
        }${market ? `&marketName=${market}` : ""}${sorting?.sort ? `&${sorting?.sort}` : ""}`,
        authHeaders
      );
      delete data.page;
      delete data.limit;
      return data;
    },
    marketConstants.getAllMarketsList,
    onSuccess,
    onError
  );
};

export const getAllMarketsLength = (
  { limit, page, search, areaCode, market },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `market/v1/api/market/count/request/Tendlc`,
        authHeaders
      );

      if (onSuccess) onSuccess(data);
      // return data;
    },
    marketConstants.getAllMarketsList,
    onSuccess,
    onError
  );
};

export const createNewMarket = (
  { body, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/request/new`,
        body,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Request has been submitted successfully!");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};
export const createNewDLC = (
  { body, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}market/v1/api/tenDlc`,
        body,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Request has been submitted successfully!");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};


export const updateNewDLC = (
  { body, limit, page, search , id },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}market/v1/api/tenDlc/action/${id}`,
        body,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Request has been submitted successfully!");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};
export const editMarketAction = (
  { _id, body, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/${_id}`,
        body,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Market have been updated successfully!");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};

export const editOutbondNumber = (
  { _id, body, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/${_id}`,
        body,
        authHeaders
      );
      // dispatch(
      //   getAllMarketsList({ limit, page, search }, () => {
      //     toast.success("Market have been updated successfully!");
      //   })
      // );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};

export const increaseMarketLimitAction = (
  { _id, body, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/increase/limit/${_id}`,
        body,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Number added successfully");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};

export const updateMarketStatus = (
  { phone, body, tennentId, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/update/Status?phone=${phone}`,
        body,
        authHeaders
      );
      toast.success("Number status has been updated!");
      // dispatch(
      //   getAllMarketsList({ limit, page, search }, () => {
      //     toast.success("Number status has been updated!");
      //   })
      // );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};

export const updateCallForwardNumber = (
  { id, body, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/update/call/forward/number/${id}`,
        body,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Number status has been updated!");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};

export const deleteOutBoundNumberAndItsRelatedData = (
  { number, limit, page, search, tenantId },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/remove/outbound/number/and/related/outbound/data/${number}?tenantId=${tenantId}`,
        authHeaders
      );
      dispatch(
        getAllMarketsList({ limit, page, search }, () => {
          toast.success("Number has been deleted!");
        })
      );
    },
    marketConstants.createNewMarket,
    onSuccess,
    onError
  );
};

export const acceptNewRequestOfMarket = (
  { marketId },
  { out_bondNumber },
  onSuccess,
  onError
) => {
  let body = { marketId: marketId, outBoundNumber: out_bondNumber };
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/accept/new/request`,
        body,
        authHeaders
      );
    },
    marketConstants.accpetNewRequestOfMarket,
    onSuccess,
    onError
  );
};

// export const acceptNewRequestOfMarket = ({ marketId }, onSuccess, onError) => {
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       const response = await axios.get(
//         `${
//           import.meta.env.VITE_APP_BACKEND_BASE_URL
//         }market/v1/api/market/accept/new/request?marketId=${marketId}`,
//         authHeaders
//       );
//       return response.data; // Return the response data
//     },
//     marketConstants.accpetNewRequestOfMarket,
//     onSuccess,
//     onError
//   );
// };

export const rejectNewRequestOfMarket = ({ marketId }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }market/v1/api/market/reject/new/request?marketId=${marketId}`,
        authHeaders
      );
    },
    marketConstants.rejectNewRequestOfMarket,
    onSuccess,
    onError
  );
};
