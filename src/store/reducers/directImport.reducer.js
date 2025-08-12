import { act } from "react";
import { directImportConstants } from "../constants";

const initialState = {
  directImportData: {
    results: [],
    loading: false,
    page: 1,
    totalPages: 1,
    totalResults: 1,
    loadingDelete:null , 
  },
  fileCompleted: false,
  queueLoading: false,
};

const directImportReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case directImportConstants.getAllDirectImport.request:
      return {
        ...state,
        directImportData: {
          ...state.directImportData,
          loading: true,
        },
      };
    case directImportConstants.getAllDirectImport.success:
      return {
        ...state,
        directImportData: {
          ...state.directImportData,
          loading: false,
          loadingDelete: null,
          ...action.payload,
        },
      };
    case directImportConstants.file_completed:
      
      return {
        ...state,
        fileCompleted: true,
        queueLoading: false,
      };
    case directImportConstants.getAllDirectImport.error:
      return {
        ...state,
        directImportData: {
          ...state.directImportData,
          loading: false,
        },
      };

    case directImportConstants.addNewDirectImports.request:
    case directImportConstants.directImportAssignCampaign.request:
    case directImportConstants.deleteDirectImport.request:
      return {
        ...state,
        directImportData: {
          ...state.directImportData,
          loading: true,
          loadingDelete: "pending",

        },
      };

    case directImportConstants.deleteDirectImport.error:
      case directImportConstants.deleteDirectImport.success:
    case directImportConstants.directImportAssignCampaign.error:
    case directImportConstants.addNewDirectImports.error:
      return {
        ...state,
        directImportData: {
          ...state.directImportData,
          loading: false,
          loadingDelete: "completed",
        },
      };

    case directImportConstants.patchDirectImport.request:
      return {
        ...state,
        queueLoading: true,
      };
    case directImportConstants.patchDirectImport.success:
    case directImportConstants.patchDirectImport.error:
      return {
        ...state,
        fileCompleted: false,
        queueLoading: false,
      };

    case directImportConstants.continueQueueLoadingAfterPageLoad:
      return {
        ...state,
        queueLoading: action.payload ?? true,
      };
    default:
      return state;
  }
};

export default directImportReducer;
