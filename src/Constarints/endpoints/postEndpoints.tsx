// export const API_GATEWAY_BASE_URL = 'https://mywebsite';
export const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_BASE_URL;
export const postEndpoints = {
    addPost: `${API_GATEWAY_BASE_URL}/post/addPost`,
    editPost: `${API_GATEWAY_BASE_URL}/post/editPost`,
    // getPosts: `${API_GATEWAY_BASE_URL}/getPosts`,
    getPosts: (genre:string) => `${API_GATEWAY_BASE_URL}/post/getPosts?genre=${encodeURIComponent(genre)}`,
    // getUserPosts: `${API_GATEWAY_BASE_URL}/getUserPosts`,
    getUserPosts: (id:any) => `${API_GATEWAY_BASE_URL}/post/getUserPosts?id=${encodeURIComponent(id)}`,
    // getPost: `${API_GATEWAY_BASE_URL}/post/getPost`,
    getPost: (postId:any) => 
        `${API_GATEWAY_BASE_URL}/post/getPost?id=${encodeURIComponent(postId)}`,
    

    pdfUrlFetch: `${API_GATEWAY_BASE_URL}/post/pdfUrlFetch`,
    imageUrlFetch: `${API_GATEWAY_BASE_URL}/post/imageUrlFetch`,
    likePost: `${API_GATEWAY_BASE_URL}/post/likePost`,
    likeList: `${API_GATEWAY_BASE_URL}/post/likeList`,
    deletePost: `${API_GATEWAY_BASE_URL}/post/deletePost`,
    addComment: `${API_GATEWAY_BASE_URL}/post/addComment`,
    reportPost: `${API_GATEWAY_BASE_URL}/post/reportPost`,
    adminPostData: `${API_GATEWAY_BASE_URL}/post/adminPostData`,
    ViewPost: `${API_GATEWAY_BASE_URL}/post/viewPost`,
    // removePostAdmin: `${API_GATEWAY_BASE_URL}/admin/removePost`,
    removePost: (postId:any) => `${API_GATEWAY_BASE_URL}/post/admin/removePost?postId=${encodeURIComponent(postId)}`,
    
  };