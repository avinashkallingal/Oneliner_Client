// export const API_GATEWAY_BASE_URL = 'https://mywebsite';
export const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_BASE_URL;
export const messageEndpoints = {
    
    getMessages: `${API_GATEWAY_BASE_URL}/message/getmessages`,
    getInboxMessages: `${API_GATEWAY_BASE_URL}/message/getInboxMessages`,
    readUpdate: `${API_GATEWAY_BASE_URL}/message/readUpdate`,
    upload: `${API_GATEWAY_BASE_URL}/message/upload`,
    getNotification: `${API_GATEWAY_BASE_URL}/message/getNotification`,
    readNotification: `${API_GATEWAY_BASE_URL}/message/readNotification`,
    sendImage: `${API_GATEWAY_BASE_URL}/message/sendImage`,
    sendVideo: `${API_GATEWAY_BASE_URL}/message/sendVideo`,
    
    createChatId: (userId:any, receiverId:any) => 
        `${API_GATEWAY_BASE_URL}/message/createChatId?userId=${encodeURIComponent(userId)}&receiverId=${encodeURIComponent(receiverId)}`,
  };