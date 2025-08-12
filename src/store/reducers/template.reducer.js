import { templateConstants } from "../constants";

const initialState = {
  loading: false,
  quickReplyLoading: false,
  templatesData: {
    results: [],
    page: 1,
    totalPages: 1,
    totalResults: 1,
  },
  quickReplytemplatesData: {
    results: [],
    page: 1,
    totalPages: 1,
    totalResults: 1,
  },
  replyTemplateCategories: [],
  countData: {
    countWithType: [],
    totalCount: 0,
  },
  singleTemplate: {},
};

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case templateConstants.createTemplate.request:
      return {
        ...state,
        loading: true,
      };
    case templateConstants.createTemplate.success:
    case templateConstants.createTemplate.error:
      return {
        ...state,
        loading: false,
      };

    case templateConstants.getAllTemplates.request:
      return {
        ...state,
        loading: true,
      };
    case templateConstants.getAllTemplates.success:
      return {
        ...state,
        loading: false,
        templatesData: { ...action.payload },
      };
    case templateConstants.getAllTemplates.error:
      return {
        ...state,
        loading: false,
        templatesData: { ...initialState.templatesData },
      };
    case templateConstants.getAllReplyTemplates.request:
      return {
        ...state,
        quickReplyLoading: true,
      };
    case templateConstants.getAllReplyTemplates.success:
      return {
        ...state,
        quickReplyLoading: false,
        quickReplytemplatesData: { ...action.payload },
      };
    case templateConstants.getAllReplyTemplates.error:
      return {
        ...state,
        quickReplyLoading: false,
        quickReplytemplatesData: { ...initialState.templatesData },
      };
    case templateConstants.getAllTemplatesWithoutLoader.request:
    case templateConstants.getAllTemplatesWithoutLoader.error:
      return {
        ...state,
        loading: false,
      };
    case templateConstants.getAllTemplatesWithoutLoader.success:
      return {
        ...state,
        loading: false,
        templatesData: { ...action.payload },
      };

    case templateConstants.getSingleTemplates.request:
      return {
        ...state,
        loading: true,
      };
    case templateConstants.getSingleTemplates.success:
      return {
        ...state,
        loading: false,
        singleTemplate: { ...action.payload },
      };
    case templateConstants.getSingleTemplates.error:
      return {
        ...state,
        loading: false,
        singleTemplate: { ...initialState.singleTemplate },
      };

    case templateConstants.deleteTemplate.request:
      return {
        ...state,
        loading: true,
      };
    case templateConstants.deleteTemplate.success:
    case templateConstants.removeTemplates.remove:
      return {
        ...state,
        singleTemplate: {},
      };
    case templateConstants.deleteTemplate.error:
      return {
        ...state,
        loading: false,
      };

    case templateConstants.createReplyTemplateCategory.request:
      return {
        ...state,
        loading: true,
      };
    case templateConstants.createReplyTemplateCategory.success:
      return {
        ...state,
        loading: true, // for next call
      };
    case templateConstants.createReplyTemplateCategory.error:
      return {
        ...state,
        loading: false,
      };
  
    case templateConstants.getAllReplyTemplateCategories.request:
      return {
        ...state,
        loading: true,
      };
    case templateConstants.getAllReplyTemplateCategories.success:
      return {
        ...state,
        loading: false,
        replyTemplateCategories: action.payload,
      };
      case templateConstants.setAllReplyTemplateCategoriesEmpty.success:
        console.log("checkkkk ");
        
        return {
          ...state,
          replyTemplateCategories: [],
        };
    case "UPDATE_REPLY_TEMPLATE_CATEGORIES":
      return {
        ...state,
        loading: false,
        replyTemplateCategories: action.payload,
      };
      
    case templateConstants.getAllReplyTemplateCategories.error:
      return {
        ...state,
        loading: false,
        replyTemplateCategories: [],
      };

    case templateConstants.getTemplateCounts.request:
      return {
        ...state,
        loading: false,
      };
    case templateConstants.getTemplateCounts.success:
      return {
        ...state,
        loading: false,
        countData: { ...action.payload },
      };
    case templateConstants.getTemplateCounts.error:
      return {
        ...state,
        loading: false,
        countData: { ...initialState.countData },
      };

    default:
      return state;
  }
};

export default templateReducer;
