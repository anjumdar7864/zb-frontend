import { asyncAction } from "@/utils";
import axios from "@/api";

import { tagConstants } from "../constants";
// axios.defaults.withCredentials = true;
export const getAllTagsList = (
  params,
  onSuccess,
  onError,
  sorting
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(`/inbox/v1/api/tag${sorting?.sort ? `?${sorting?.sort}` : ""}`,
        { ...authHeaders, params }
      );
      return data;
    },
    tagConstants.getAllTagsList,
    onSuccess,
    onError
  );
};
export const addTag = (
  body,
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(`/inbox/v1/api/tag`,body,
        { ...authHeaders }
      );
      return data;
    },
    tagConstants.addNewTag,
    onSuccess,
    onError
  );
};
export const deleteTag = (
  tagId,
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.delete(`/inbox/v1/api/tag/${tagId}`,
        { ...authHeaders }
      );
      return data;
    },
    tagConstants.deleteTag,
    onSuccess,
    onError
  );
};
export const  updateTag = (
  id,
  body,
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(`/inbox/v1/api/tag/${id}`,body,
        { ...authHeaders }
      );
      return data;
    },
    tagConstants.updateTag,
    onSuccess,
    onError
  );
};



// export const updateTagPosition = (body) => {
//   const token =
//   localStorage.getItem("userToken") ??
//   localStorage.getItem("userToken");
//   return async (dispatch) => {
//     await axios.patch(
//       `${
//         import.meta.env.VITE_APP_BACKEND_BASE_URL
//       }inbox/v1/api/tag/update/tag/position`,
//       body , 
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add token here
//         },
//       }
//     );
//   };
// };


export const updateTagPosition = (body,  sorting) => {
  const token =
    localStorage.getItem("userToken") ?? localStorage.getItem("userToken");

  return async (dispatch) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}inbox/v1/api/tag/update/tag/position`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        }
      );

      // After successful update, fetch the updated tag list
      dispatch(getAllTagsList("", "", "" , sorting));
    } catch (error) {
      console.error("Error updating tag position:", error);
      if (onError) onError(error);
    }
  };
};