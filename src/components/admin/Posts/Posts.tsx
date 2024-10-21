import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Constarints/axios/adminAxios';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [removeButton,stepRemoveButton]=useState<any>(true);
 const navigate=useNavigate();
  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await axiosInstance.get("http://localhost:4000/post/adminPostData");
        if (result.data.success) {
          console.log(result.data, "data came to backend");
          setPosts(result.data.data); // Assuming the response contains an array of posts
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
    fetchPosts();
 
  }, []);
  const handleRemove=async(postId:any)=>{
   
    const result=await axiosInstance.get(`http://localhost:4000/post/admin/removePost?postId=${postId}`)
    if(result.data.success){
        toast.success("Post removed")
        navigate("/admin/login")
        stepRemoveButton(false)
    }
}

  return (

    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height="100vh"  // Set to 100vh to cover the full height of the viewport
      width="100vw"   // Set to 100vw to cover the full width of the viewport
    //   bgcolor="grey.100" // Set the background color to eliminate white background
      p={3}           // Optional padding for some spacing
    >
        
      <Grid container spacing={3} justifyContent="center"  alignItems="center" flexGrow={1}>
     
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title || 'Untitled Post'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {post.summary || 'Untitled Post'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Author Id:</strong> {post.userId||'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Genre:</strong> {post.genre || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Likes:</strong> {post.likes.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Reports:</strong> {post.reportPost.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}
                </Typography>
                {!post.isDelete&&<button onClick={()=>handleRemove(post._id)}>Remove Post</button>}
                {post.isDelete&&<button  style={{ color: 'red' }} onClick={()=>handleRemove(post._id)} disabled>Post Removed</button>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Posts;
