import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';
import axiosInstance from '../../../Constarints/axios/userAxios';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

export default function ProfilePostCard({ posts }: any) {
const navigate=useNavigate()

  // const handleUserClick = async (id: any) => {
  //   try {
  //     navigate("/userProfile", { state: { id } });
  //     console.log(id,"  id in handle user click")
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };
  const handlePostViewClick = (post: any) => {
    console.log(post,"post in post view function")
    
    navigate("/viewPost", { state: { post } });
  }
  
  return (
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',        // Ensures the cards wrap into rows
      gap: 2,                  // Adds space between cards
      justifyContent: 'space-around', // Distributes cards evenly across the row
      width: '100%',           // Ensures the Box takes up the full width
      alignItems: 'center', height: '100%'
    }}
  >
    {posts.map((post: any, index: number) => (
      <Card
        key={index}
       
        variant="outlined"
        sx={{
          flexGrow: 1,          // Allows the card to grow within available space
          flexBasis: 'calc(33% - 20px)',  // Adjust this percentage for 3 cards per row
          maxWidth: '320px',    // Maximum width constraint
          minWidth: '280px',    // Minimum width constraint to avoid being too small
          margin: '10px',       // Adds margin between cards
        }}
      >
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src={post.imageUrlS3}
              srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">{post.title}</Typography>
          <Typography level="body-sm">California</Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: 'md' }}
            >
              {posts.length} likes
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: 'md' }}
            >
              1 hour ago
            </Typography>
            <button  onClick={() => handlePostViewClick(post)}>View post</button>
          </CardContent>
        </CardOverflow>
      </Card>
    ))}
  </Box>
  
  );
}
