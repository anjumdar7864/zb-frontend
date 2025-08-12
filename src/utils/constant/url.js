import Maintenance from "@/modules/Maintenance/Maintenance";

export const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
export const REQUEST_TYPES = {
  DELETE: "DELETE",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
};
export const ENDPOINTS = {
  COMPANY_INFO: `${API_BASE_URL}/user/v1/api/admin/company/info`,
  GET_PLAN: `${API_BASE_URL}user/v1/api/subscription`,
  GET_ROLES_AND_PERMISSIONS: `${API_BASE_URL}user/v1/api/role/tenant/permission/list`,
  GET_BILLING_INFO: `${API_BASE_URL}user/v1/api/admin/billing/info`,
  UPDATE_BILLING_INFO: `${API_BASE_URL}user/v1/api/admin/update/billing/info`,
  SEND_INVOICE: `${API_BASE_URL}user/v1/api/admin/send/invoice`,
  UPDATE_SUBSCRIPTION: `${API_BASE_URL}user/v1/api/admin/update/subscription`,
  USERS: `${API_BASE_URL}user/v1/api/user`,
  GET_TENANt_ROLES: `${API_BASE_URL}user/v1/api/role/tenant/list`,
  GET_MASTER_ROLES: `${API_BASE_URL}user/v1/api/role`,
  GET_SINGLE_SUBSCIPTION: `${API_BASE_URL}user/v1/api/subscription`,
  CANCEL_SUBSCIPTION: `${API_BASE_URL}user/v1/api/admin/cancel/subscription`,
  GET_ALL_COMPANIES: `${API_BASE_URL}market/v1/api/market/list/company`,
  GET_ALL_MARKET_TENANT: `${API_BASE_URL}market/v1/api/market/of/tenant`,
  GET_ALL_NEW_REQUEST_MARKETS: `${API_BASE_URL}market/v1/api/market/request/new`,
  GET_ALL_ADMIN: `${API_BASE_URL}user/v1/api/admin`,
  CREATE_NEW_MARKET: `${API_BASE_URL}market/v1/api/market`,
  // GET_ALL_MARKET: `${API_BASE_URL}all/for/drop/down`,
  GET_ALL_MARKET: `${API_BASE_URL}market/v1/api/market/all/for/drop/down`,
  GET_ALL_PERMISSION_MASTER: `${API_BASE_URL}user/v1/api/permission/for/master`,
  GET_ALL_SUBSCRIPTION: `${API_BASE_URL}user/v1/api/subscription`,
  GET_SINGLE_SUBSCRIPTION: `${API_BASE_URL}user/v1/api/subscription/`,
  CHECK_SUBSCRIPTION: `${API_BASE_URL}user/v1/api/admin/check/subscription/upgrade/downgrade`,
  DOWNGRADE_SUBSCRIPTION: `${API_BASE_URL}user/v1/api/admin/request/subscription/downgrade`,
  GET_FLAGS_LIST: `${API_BASE_URL}dashboard/v1/api/dashboard/report/of/flags`,
  GET_FLAGS_DETAILS: `${API_BASE_URL}dashboard/v1/api/dashboard/report/of/flags/status`,
  ACTIVE_STATUS: `${API_BASE_URL}market/v1/api/market/update/Status`,
  REPLACE_NUMBER: `${API_BASE_URL}market/v1/api/market/replace/outbound/number`,
  PASSWORD_VERIFY: `${API_BASE_URL}user/v1/api/admin/verify/password`,
  DELETE_NUMBER: `${API_BASE_URL}market/v1/api/market/delete/outbound/number`,
  REQUEST_DEMO: `${API_BASE_URL}user/v1/api/user/request/demo/email`,
  Contact_US: `${API_BASE_URL}user/v1/api/user/contact/us/email`,
  Maintenance: `${API_BASE_URL}user/v1/api/user/check/maintenance/status`,

  UPDATE_CALL_FORWARD_MASTER: `${API_BASE_URL}market/v1/api/market/update/call/forward/number/by/master`,
  GET_SINGLE_DIC_BY_TENANTID: `${API_BASE_URL}market/v1/api/tenDlc`,
  UPDATE_SINGLE_DIC_BY_TENANTID: `${API_BASE_URL}market/v1/api/tenDlc/action`,
  GET_ALL_TENDLC: `${API_BASE_URL}market/v1/api/tenDlc`




}
export const companyInfoUrl = (id = "") => {
  return `${API_BASE_URL}user/v1/api/admin/company/info/${id}`;
};

export const getAdminById = (id = "") => {
  return `${API_BASE_URL}user/v1/api/admin/${id}`;
};
export const getDLCById = (id = "") => {
  return `${API_BASE_URL}market/v1/api/tenDlc/${id}`;
};
export const getPaymentHistoryById = (id = "") => {
  return `${API_BASE_URL}user/v1/api/admin/payment/history/${id}`;
};
export const deleteCompanyLogo = (id = "") => {
  return `${API_BASE_URL}user/v1/api/admin/delete/company/logo/${id}`;
};
export const addSecurity = (id = "") => {
  return `${API_BASE_URL}user/v1/api/admin/add/security/${id}`;
};

export const addNotification = (id = "") => {
  return `${API_BASE_URL}user/v1/api/admin/master/notification
`;
};
