import { asyncAction } from "@/utils";
import axios from "axios";
import { authConstant, campaignConstants } from "../constants";
import { toast } from "react-hot-toast";
import { getToken } from "@/utils/storage";
// axios.defaults.withCredentials = true;
export const getAllCompaignsWithFollowUps = (
  { limit, page, search, sortByName, sortByDate },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/concat/data?${
          limit ? `limit=${limit}&` : ""
        }${page ? `page=${page}&` : ""}${search ? `search=${search}&` : ""}${
          sortByName ? `sortByName=${sortByName}&` : ""
        }${sortByDate ? `sortByDate=${sortByDate}&` : ""}
                `,
        authHeaders
      );
      delete data.limit;
      return data;
    },
    campaignConstants.getAllCompaigns,
    onSuccess,
    onError
  );
};

export const getAllCompaignsForInbox = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    let result;
    if (search) {
      result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/for/inbox?search=${search}
        `,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
    } else {
      result = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/for/inbox
                `,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
    }
    const { data } = result;
    dispatch({
      type: campaignConstants.getAllCompaignsForInbox.success,
      payload: data,
    });
  };
};

// export const getAllCompaigns = (
//   { limit, page, search, sortByName, sortByDate, directImport },
//   onSuccess,
//   onError
// ) => {
//   return asyncAction(
//     async (authHeaders) => {
     
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_APP_BACKEND_BASE_URL
//         }campaign/v1/api/compaign?directImport=${directImport}${
//           limit ? `limit=${limit}&` : ""
//         }${page ? `page=${page}&` : ""}${search ? `search=${search}` : ""}${
//           sortByName ? `sortByName=${sortByName}&` : ""
//         }${sortByDate ? `sortByDate=${sortByDate}&` : ""}
//                 `,
//         authHeaders
//       );
//       console.log("check data", data);
      
//       delete data.limit;
//       return data;
//     },
//     campaignConstants.getAllCompaigns,
//     onSuccess,
//     onError
//   );
// };

export const getAllCompaigns = (
  { limit, page, search, sortByName, sortByDate, directImport },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }campaign/v1/api/compaign?directImport=${directImport}${
            limit ? `limit=${limit}&` : ""
          }${page ? `page=${page}&` : ""}${search ? `search=${search}` : ""}${
            sortByName ? `sortByName=${sortByName}&` : ""
          }${sortByDate ? `sortByDate=${sortByDate}&` : ""}
                  `,
          authHeaders
        );
        console.log("check data", data);
        // if (data == "Session expired") {
        //   console.log("check data ==", data);
        //   localStorage.clear();
        //   dispatch({
        //     type: authConstant.SESSION_EXPIRE,
        //     payload: { err: "Session has been expired" },
        //   });
        // }
        delete data.limit;
        return data;
      } catch (error) {
        console.log("check data", error.response?.data?.message);
        if (error.response?.data?.message == "Session expired") {
          console.log("check data ==", error.response?.data?.message);
          localStorage.clear();
          dispatch({
            type: authConstant.SESSION_EXPIRE,
            payload: { err: "Session has been expired" },
          });
        } else {
          dispatch({
            type: authConstant.GET_SINGLE_USER_FAILURE,
            payload: { err: error.response?.data?.message },
          });
        }
        throw error;
      }
    },
    campaignConstants.getAllCompaigns,
    onSuccess,
    onError
  );
};

export const getAllFollowUpCompaigns = (
  { limit, page, search, sortByName, sortByDate },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/followCompaign?${limit ? `limit=${limit}&` : ""}${
          page ? `page=${page}&` : ""
        }${search ? `search=${search}` : ""}${
          sortByName ? `sortByName=${sortByName}&` : ""
        }${sortByDate ? `sortByDate=${sortByDate}&` : ""}
                `,
        authHeaders
      );
      delete data.limit;
      return data;
    },
    campaignConstants.getAllCompaigns,
    onSuccess,
    onError
  );
};

export const deleteCampaign = (
  { _id, limit, page, search, sortByName, sortByDate },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/${_id}`,
        authHeaders
      );

      dispatch(
        getAllCompaignsWithFollowUps(
          { limit, page, search, sortByName, sortByDate },
          () => {
            toast.success("Deleted Successfully!");
          }
        )
      );
      return data;
    },
    campaignConstants.deleteCampaign,
    onSuccess,
    onError
  );
};

export const deleteFollowUpCampaign = (
  { _id, limit, page, search, isShowOnlyFollowUp, sortByName, sortByDate },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/followCompaign/${_id}`,
        authHeaders
      );

      isShowOnlyFollowUp
        ? dispatch(
            getAllFollowUpCompaigns(
              { limit, page, search, sortByName, sortByDate },
              () => {
                toast.success("Deleted Successfully!");
              }
            )
          )
        : dispatch(
            getAllCompaignsWithFollowUps(
              { limit, page, search, sortByName, sortByDate },
              () => {
                toast.success("Deleted Successfully!");
              }
            )
          );
      return data;
    },
    campaignConstants.deleteCampaign,
    onSuccess,
    onError
  );
};

export const getAllMarkets = (payload, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}market/v1/api/market`,
        authHeaders
      );
      return data?.results ?? [];
    },
    campaignConstants.getAllMarkets,
    onSuccess,
    onError
  );
};

export const createCampaign = (
  { body, limit, page, search, sortByName, sortByDate },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}campaign/v1/api/compaign`,
        body,
        authHeaders
      );

      dispatch(
        getAllCompaignsWithFollowUps(
          { limit, page, search, sortByName, sortByDate },
          () => {
            toast.success("Created Successfully!");
          }
        )
      );
      return data;
    },
    campaignConstants.createCampaign,
    onSuccess,
    onError
  );
};

export const editSingleCampaign = (
  { body, limit, page, search, _id, sortByName, sortByDate },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/${_id}`,
        body,
        authHeaders
      );

      dispatch(
        getAllCompaignsWithFollowUps(
          { limit, page, search, sortByName, sortByDate },
          () => {
            toast.success("Updated Successfully!");
          }
        )
      );
      return data;
    },
    campaignConstants.createCampaign,
    onSuccess,
    onError
  );
};

export const createFollowUpCampaign = ({ body }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/followCompaign`,
        body,
        authHeaders
      );
      return data;
    },
    campaignConstants.createCampaign,
    onSuccess,
    onError
  );
};

export const getSingleFollowUpCampaign = ({ _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/followCompaign/${_id}`,
        authHeaders
      );
      return data;
    },
    campaignConstants.getSingleCampaign,
    onSuccess,
    onError
  );
};

export const getBtachReportForSingleCompaign = (
  { _id, currentPage, numberOfRowsShowing },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/batch/get/${_id}?page=${currentPage}&limit=${numberOfRowsShowing}`,
        authHeaders
      );
      return data;
    },
    campaignConstants.getBatchReportForSingleCampaign,
    onSuccess,
    onError
  );
};

export const editSingleFollowUpCampaign = (
  { body, limit, page, search, sortByName, sortByDate, _id },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/followCompaign/${_id}`,
        body,
        authHeaders
      );

      dispatch(
        getAllCompaignsWithFollowUps(
          { limit, page, search, sortByName, sortByDate },
          () => {
            toast.success("Updated Successfully!");
          }
        )
      );
      return data;
    },
    campaignConstants.createCampaign,
    onSuccess,
    onError
  );
};

export const getSingleCampaign = ({ _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/${_id}`,
        authHeaders
      );
      return data;
    },
    campaignConstants.getSingleCampaign,
    onSuccess,
    onError
  );
};

export const getFollowUpCompaign = (onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }campaign/v1/api/compaign/get/for/followup`,
        authHeaders
      );
      return data?.result;
    },
    campaignConstants.getFollowUpCampaign,
    onSuccess,
    onError
  );
};
