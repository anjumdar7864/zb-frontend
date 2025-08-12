import { asyncAction } from "@/utils";
import { templateConstants, authConstant } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";
// axios.defaults.withCredentials = true;
export const createTemplate = ({ body }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate`,
        body,
        authHeaders
      );
      return data;
    },
    templateConstants.createTemplate,
    onSuccess,
    onError
  );
};

export const getAllTemplates = (
  {
    limit,
    page,
    search,
    mode,
    type,
    sortByDate,
    sortByName,
    sortByMessage,
    sortByType,
    sortByDelivery , 
    sortByResponse , 
     
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate?${
          limit ? `limit=${limit}&` : ""
        }${page ? `page=${page}&` : ""}${search ? `search=${search}&` : ""}${
          mode ? `mode=${mode}&` : ""
        }${type ? `type=${encodeURIComponent(type)}&` : ""}${
          sortByDate ? `sortByDate=${sortByDate}&` : ""
        }${sortByName ? `sortByName=${sortByName}&` : ""}${
          sortByMessage ? `sortByMessage=${sortByMessage}&` : ""
        }${sortByType ? `sortByType=${sortByType}&` : ""

        }${sortByDelivery ? `sortByDelivery=${sortByDelivery}&` : ""

        }${sortByResponse ? `sortByResponse=${sortByResponse}&` : ""
          
        }`,
        authHeaders
      );
      delete data.limit;
      return data;
    },
    templateConstants.getAllTemplates,
    onSuccess,
    onError
  );
};

export const getAllTemplatess = (
  {
    limit,
    page,
    search,
    mode,
    type,
    sortByDate,
    sortByName,
    sortByMessage,
    sortByType,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate/for/drop/down?${
          limit ? `limit=${limit}&` : ""
        }${page ? `page=${page}&` : ""}${search ? `search=${search}&` : ""}${
          mode ? `mode=${mode}&` : ""
        }${type ? `type=${encodeURIComponent(type)}&` : ""}${
          sortByDate ? `sortByDate=${sortByDate}&` : ""
        }${sortByName ? `sortByName=${sortByName}&` : ""}${
          sortByMessage ? `sortByMessage=${sortByMessage}&` : ""
        }${sortByType ? `sortByType=${sortByType}&` : ""}`,
        authHeaders
      );
      delete data.limit;
      return data;
    },
    templateConstants.getAllTemplates,
    onSuccess,
    onError
  );
};

export const getAllTemplatesWithoutLoader = (
  {
    limit,
    page,
    search,
    mode,
    type,
    sortByDate,
    sortByName,
    sortByMessage,
    sortByType,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate?${
          limit ? `limit=${limit}&` : ""
        }${page ? `page=${page}&` : ""}${search ? `search=${search}&` : ""}${
          mode ? `mode=${mode}&` : ""
        }${type ? `type=${encodeURIComponent(type)}&` : ""}${
          sortByDate ? `sortByDate=${sortByDate}&` : ""
        }${sortByName ? `sortByName=${sortByName}&` : ""}${
          sortByMessage ? `sortByMessage=${sortByMessage}&` : ""
        }${sortByType ? `sortByType=${sortByType}&` : ""}`,
        authHeaders
      );
      delete data.limit;
      return data;
    },
    templateConstants.getAllTemplatesWithoutLoader,
    onSuccess,
    onError
  );
};

export const getSingleTemplate = ({ _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate/${_id}`,
        authHeaders
      );
      console.log(data,'template not found')
      return data;
    },

    templateConstants.getSingleTemplates,
    onSuccess,
    onError
  );
};

export const updateTemplate = ({ body, _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate/${_id}`,
        body,
        authHeaders
      );
      return data;
    },
    templateConstants.createTemplate,
    onSuccess,
    onError
  );
};

export const deleteTemplate = (
  {
    limit,
    page,
    search,
    mode,
    type,
    sortByDate,
    sortByName,
    sortByMessage,
    sortByType,
    _id,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate/${_id}`,
        authHeaders
      );

      dispatch(
        getAllTemplates(
          {
            limit,
            page,
            search,
            mode,
            type,
            sortByDate,
            sortByName,
            sortByMessage,
            sortByType,
          },
          () => {
            toast.success("Successfully deleted!");
          }
        )
      );

      dispatch(getTemplateCounts({ mode }));
      return data;
    },
    templateConstants.deleteTemplate,
    onSuccess,
    onError
  );
};

export const getTemplateCounts = ({ mode }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/initialAndFollowTemplate/template/with/count/${mode}`,
        authHeaders
      );
      return data;
    },
    templateConstants.getTemplateCounts,
    onSuccess,
    onError
  );
};

export const createReplyTemplateCategory = ({ body }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate/category`,
        body,
        authHeaders
      );

      dispatch(getAllReplyTemplateCategories());
      return data;
    },
    templateConstants.createReplyTemplateCategory,
    onSuccess,
    onError
  );
};

export const getAllReplyTemplateCategories = (payload, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate/category`,
        authHeaders
      );
      return data?.results ?? [];
    },
    templateConstants.getAllReplyTemplateCategories,
    
    onSuccess,
    onError
  );
};

export const setAllReplyTemplateCategoriesEmpty = () => ({
  type: templateConstants.setAllReplyTemplateCategoriesEmpty.success, // Ensure this constant exists.
});

export const createReplyTemplate = ({ body }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate`,
        body,
        authHeaders
      );
      return data;
    },
    templateConstants.createTemplate,
    onSuccess,
    onError
  );
};

export const updateReplyTemplate = ({ body, _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate/${_id}`,
        body,
        authHeaders
      );
      return data;
    },
    templateConstants.createTemplate,
    onSuccess,
    onError
  );
};

export const getAllRepliesTemplates = (
  {
    limit,
    page,
    search,
    searchByCategory,
    sortByTitle,
    sortByCategory,
    sortByReply,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate?${limit ? `limit=${limit}&` : ""}${
          page ? `page=${page}&` : ""
        }${search ? `search=${search}&` : ""}${
          searchByCategory ? `searchByCategory=${searchByCategory}&` : ""
        }${
          sortByTitle ? `sortByTitle=${encodeURIComponent(sortByTitle)}&` : ""
        }${sortByCategory ? `sortByCategory=${sortByCategory}&` : ""}${
          sortByReply ? `sortByReply=${sortByReply}&` : ""
        }`,
        authHeaders
      );
      dispatch(getAllReplyTemplateCategories());
      delete data.limit;
      return data;
    },
    templateConstants.getAllReplyTemplates,
    onSuccess,
    onError
  );
};


export const getAllRepliesTemplatesQuickReply = (
  {
    limit,
    page,
    search,
    searchByCategory,
    sortByTitle,
    sortByCategory,
    sortByReply,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate?${limit ? `limit=${limit}&` : ""}${
          page ? `page=${page}&` : ""
        }${search ? `search=${search}&` : ""}${
          searchByCategory ? `searchByCategory=${searchByCategory}&` : ""
        }${
          sortByTitle ? `sortByTitle=${encodeURIComponent(sortByTitle)}&` : ""
        }${sortByCategory ? `sortByCategory=${sortByCategory}&` : ""}${
          sortByReply ? `sortByReply=${sortByReply}&` : ""
        }`,
        authHeaders
      );
      // dispatch(getAllReplyTemplateCategories());
      delete data.limit;
      return data;
    },
    templateConstants.getAllReplyTemplates,
    onSuccess,
    onError
  );
};

export const getAllRepliesTemplatesWithoutLoader = (
  {
    limit,
    page,
    search,
    searchByCategory,
    sortByTitle,
    sortByCategory,
    sortByReply,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate?${limit ? `limit=${limit}&` : ""}${
          page ? `page=${page}&` : ""
        }${search ? `search=${search}&` : ""}${
          searchByCategory ? `searchByCategory=${searchByCategory}&` : ""
        }${
          sortByTitle ? `sortByTitle=${encodeURIComponent(sortByTitle)}&` : ""
        }${sortByCategory ? `sortByCategory=${sortByCategory}&` : ""}${
          sortByReply ? `sortByReply=${sortByReply}&` : ""
        }`,
        authHeaders
      );
      delete data.limit;
      return data;
    },
    templateConstants.getAllTemplatesWithoutLoader,
    onSuccess,
    onError
  );
};

export const deleteReplyTemplate = (
  {
    limit,
    page,
    search,
    searchByCategory,
    sortByTitle,
    sortByCategory,
    sortByReply,
    _id,
  },
  onSuccess,
  onError
) => {
  return asyncAction(
    async (authHeaders, dispatch) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate/${_id}`,
        authHeaders
      );

      dispatch(
        getAllRepliesTemplates(
          {
            limit,
            page,
            search,
            searchByCategory,
            sortByTitle,
            sortByCategory,
            sortByReply,
          },
          () => {
            toast.success("Successfully deleted!");
          }
        )
      );

      dispatch(getAllReplyTemplateCategories());

      return data;
    },
    templateConstants.deleteTemplate,
    onSuccess,
    onError
  );
};

export const getSingleReplyTemplate = ({ _id }, onSuccess, onError) => {
  return asyncAction(
    async (authHeaders) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }template/v1/api/quickReplyTemplate/${_id}`,
        authHeaders
      );
      return data;
    },
    templateConstants.getSingleTemplates,
    onSuccess,
    onError
  );
};

export const updateQuickReplyTemplatePosition = (body) => {
  const token =
  localStorage.getItem("userToken") ??
  localStorage.getItem("userToken");
  return async (dispatch) => {
    await axios.patch(
      `${
        import.meta.env.VITE_APP_BACKEND_BASE_URL
      }template/v1/api/quickReplyTemplate/update/template/position`,
      body , 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token here
        },
      }
    );
  };
};
