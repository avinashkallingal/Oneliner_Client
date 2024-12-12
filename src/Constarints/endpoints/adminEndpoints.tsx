// export const API_GATEWAY_BASE_URL = 'https://mywebsite';
export const API_GATEWAY_BASE_URL = "http://localhost:4000";
export const adminEndpoints = {
  userList: `${API_GATEWAY_BASE_URL}/admin/userList`,
  userBlock: `${API_GATEWAY_BASE_URL}/admin/userBlock`,
  adminLogin: `${API_GATEWAY_BASE_URL}/admin/login`,
};