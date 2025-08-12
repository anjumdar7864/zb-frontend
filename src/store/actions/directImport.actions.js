import { asyncAction } from "@/utils";
import axios from "axios";
import { authConstant, directImportConstants } from "../constants";
import { toast } from "react-hot-toast";
// axios.defaults.withCredentials = true;
export const getAllDirectImport = (
  { limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport?${limit ? `limit=${limit}&` : ""}${page ? `page=${page}&` : ""
        }${search ? `search=${search}` : ""}
                `,
        authHeaders
      );
      delete data.limit;

      if (data?.results && (!page || page === 1)) {
        let isNotChange = true;
        for (const singleDirectImport of data?.results ?? []) {
          if (singleDirectImport?.status === "pending") {
            dispatch(continueQueueLoadingAfterPageLoad(true));
            isNotChange = false;
            break;
          }
        }

        if (isNotChange) {
          dispatch(continueQueueLoadingAfterPageLoad(false));
        }
      }

      return data;
    },
    directImportConstants.getAllDirectImport,
    onSuccess,
    onError
  );
};

export const deleteDirectImport = (
  { _id, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport/${_id}`,
        authHeaders
      );

      dispatch(
        getAllDirectImport({ limit, page, search }, () => {
          toast.success("Deleted Successfully!");
        })
      );
      return data;
    },
    directImportConstants.deleteDirectImport,
    onSuccess,
    onError
  );
};

export const orignalDirectImport = async (
  body,
  onSuccess,
  onError
) => {
  console.log("data... 0000");


  try{
    const token =
      localStorage.getItem("userToken") ?? localStorage.getItem("userToken");
    const authHeaders = { Authorization: `Bearer ${token}` };
    console.log("headers", authHeaders);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL
      }directImport/v1/api/directImport/original/download`,
      body,
      { headers: authHeaders }
    );
    
    const link = document.createElement("a");
    link.href = response.data.downloadUrl;
    link.setAttribute("target", "_blank");
    link.setAttribute("download", "original");
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    onSuccess && onSuccess(response.data.downloadUrl);
  } catch (error) {
    onError && onError(error);
    toast.error(error?.response?.data?.message ?? error?.message);
  }
  
  // return asyncAction(
  //   async (authHeaders, dispatch) => {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_APP_BACKEND_BASE_URL
  //       }directImport/v1/api/directImport/original/download`,
  //       body,
  //       authHeaders
  //     );

  //     dispatch(
  //       getAllDirectImport({ limit, page, search }, () => {
  //         // toast.success("Deleted Successfully!");
  //       })
  //     );
  //     return response.data;
  //   },
  //   directImportConstants.getOrignal,
  //   onSuccess,
  //   onError
  // );
};




// export const addNewDirectImports = (
//   { body, limit, page, search },
//   onSuccess,
//   onError
// ) => {
//   const user = JSON.parse(
//     localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
//   );
//   return asyncAction(
//     async (authHeaders, dispatch) => {
//       const { data } = await axios.post(
//         `${
//           import.meta.env.VITE_APP_BACKEND_BASE_URL
//         }directImport/v1/api/directImport?userId=${user._id}`,
//         body,
//         authHeaders
//       );
//    console.log("check data", data);
//       localStorage.setItem("directImport", "yes");
//       dispatch(
//         getAllDirectImport({ limit, page, search }, () => {
//           toast.success("Added!");
//         })
//       );
//       return data;
//     },
//     directImportConstants.addNewDirectImports,
//     onSuccess,
//     onError
//   );
// };


export const addNewDirectImports = (
  { body, limit, page, search },
  onSuccess,
  onError , 
  check , 
  optIn , 
  leadSource
) => {
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  return asyncAction(
    async (authHeaders, dispatch) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }directImport/v1/api/directImport?userId=${user._id}${check ? `&dncIncluded=${check}` : ""}${optIn != null ? `&optIn=${optIn}` : ""}${leadSource != null && optIn ? `&optFormvalue=${leadSource}` : ""}`,
          body,
          authHeaders
        );
        localStorage.setItem("directImport", "yes");

        dispatch(
          getAllDirectImport({ limit, page, search }, () => {
            // toast.success("Added!");
          })
        );
        console.log("check data", data);
        return data;
      } catch (error) {
        console.log("check data", error.response?.data?.message);
        if (error.response?.data?.message == "Session expiredd") {
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
    directImportConstants.addNewDirectImports,
    onSuccess,
    onError
  );
};

export const downloadFile = async ({ name, _id }, onSuccess, onError) => {
  try {
    const token =
      localStorage.getItem("userToken") ?? localStorage.getItem("userToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios({
      url: `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport/download/csv/${_id}`,
      method: "GET",
      responseType: "blob",
      headers,
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("target", "_blank");
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    onSuccess && onSuccess(blob);
  } catch (error) {
    onError && onError(error);
    toast.error(error?.response?.data?.message ?? error?.message);
  }
};

export const downloadFilterProspect = async (
  { name, _id },
  onSuccess,
  onError
) => {
  try {
    const token =
      localStorage.getItem("userToken") ?? localStorage.getItem("userToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios({
      url: `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport/download/filter/prospect/${_id}`,
      method: "GET",
      responseType: "blob",
      headers,
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("target", "_blank");
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    onSuccess && onSuccess(blob);
  } catch (error) {
    onError && onError(error);
    toast.error(error?.response?.data?.message ?? error?.message);
  }
};

export const directImportAssignCampaign = (
  { body, _id, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport/assign/campaign/${_id}`,
        body,
        authHeaders
      );

      dispatch(
        getAllDirectImport({ limit, page, search }, () => {
          toast.success("Assigned Successfully!");
        })
      );
      return data;
    },
    directImportConstants.directImportAssignCampaign,
    onSuccess,
    onError
  );
};

export const directImportUnAssignCampaign = (
  { _id, limit, page, search },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport/delete/campaign/${_id}`,
        authHeaders
      );

      dispatch(
        getAllDirectImport({ limit, page, search }, () => {
          toast.success("Unassigned Successfully!");
        })
      );
      return data;
    },
    directImportConstants.directImportAssignCampaign,
    onSuccess,
    onError
  );
};

export const patchDirectImport = ({ _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }directImport/v1/api/directImport/update/csv/${_id}`,
        {},
        authHeaders
      );
      return data;
    },
    directImportConstants.patchDirectImport,
    onSuccess,
    onError
  );
};

export const continueQueueLoadingAfterPageLoad = (payload) => ({
  type: directImportConstants.continueQueueLoadingAfterPageLoad,
  payload,
});
