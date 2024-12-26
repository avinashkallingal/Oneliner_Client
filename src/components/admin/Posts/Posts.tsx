import { useState, useEffect } from 'react';
import axiosInstance from '../../../Constarints/axios/adminAxios';
import { Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { postEndpoints } from '../../../Constarints/endpoints/postEndpoints';

function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 2; // Number of posts per page
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await axiosInstance.get(postEndpoints.adminPostData);
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

  const handleRemove = async (postId: any) => {
    const result = await axiosInstance.get(postEndpoints.removePost(postId));
    if (result.data.success) {
      toast.success("Post removed");
      navigate("/admin/login");
    }
  };

  // Calculate the start and end index for slicing the posts array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page function
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height="100vh" // Set to 100vh to cover the full height of the viewport
      width="100vw" // Set to 100vw to cover the full width of the viewport
      p={3} // Optional padding for some spacing
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center" flexGrow={1}>
        {currentPosts.map((post, index) => (
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
                  <strong>Author Id:</strong> {post.userId || 'Unknown'}
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
                {!post.isDelete && <button onClick={() => handleRemove(post._id)}>Remove Post</button>}
                {post.isDelete && <button style={{ color: 'red' }} onClick={() => handleRemove(post._id)} disabled>Post Removed</button>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Posts;
