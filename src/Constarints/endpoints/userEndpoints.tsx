// export const API_GATEWAY_BASE_URL = 'https://mywebsite';
export const API_GATEWAY_BASE_URL = 'http://localhost:4000';


export const userEndpoints = {
    register: `${API_GATEWAY_BASE_URL}/register`,
    otpVerify: `${API_GATEWAY_BASE_URL}/verifyOtp`,
    resendOtp: `${API_GATEWAY_BASE_URL}/resendOtp`,
    login: `${API_GATEWAY_BASE_URL}/login`,
    logout: `${API_GATEWAY_BASE_URL}/logout`,
    verifyEmail: `${API_GATEWAY_BASE_URL}/verifyEmail`,
    resetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
    
}