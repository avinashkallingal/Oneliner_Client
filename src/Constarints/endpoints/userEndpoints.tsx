// export const API_GATEWAY_BASE_URL = 'https://mywebsite';
export const API_GATEWAY_BASE_URL = "http://localhost:4000";

export const userEndpoints = {
  // register: `${API_GATEWAY_BASE_URL}/register`,
  // otpVerify: `${API_GATEWAY_BASE_URL}/verifyOtp`,
  // resendOtp: `${API_GATEWAY_BASE_URL}/resendOtp`,
  // login: `${API_GATEWAY_BASE_URL}/login`,
  // logout: `${API_GATEWAY_BASE_URL}/logout`,
  // verifyEmail: `${API_GATEWAY_BASE_URL}/verifyEmail`,
  // resetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
  register: `${API_GATEWAY_BASE_URL}/register`,
  otpVerify: `${API_GATEWAY_BASE_URL}/verifyOtp`,
  resendOtp: `${API_GATEWAY_BASE_URL}/resendOtp`,
  login: `${API_GATEWAY_BASE_URL}/login`,
  logout: `${API_GATEWAY_BASE_URL}/logout`,
  verifyEmail: `${API_GATEWAY_BASE_URL}/verifyEmail`,
  resetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
  googleLogin: `${API_GATEWAY_BASE_URL}/googleLogin`,
  fetchUserData: `${API_GATEWAY_BASE_URL}/fetchUserData`,
//   userProfileUpdate: `${API_GATEWAY_BASE_URL}/userProfile/update/:id`,
  updateUserProfile: (id:string|null) => 
    `${API_GATEWAY_BASE_URL}/userProfile/update/${encodeURIComponent(id)}`,
  follow: `${API_GATEWAY_BASE_URL}/follow`,
  unFollow: `${API_GATEWAY_BASE_URL}/unFollow`,
  contactsFetch: `${API_GATEWAY_BASE_URL}/contacts`,
  searchUsers: `${API_GATEWAY_BASE_URL}/search`,
  refreshToken: `${API_GATEWAY_BASE_URL}/refresh-token`,
};
