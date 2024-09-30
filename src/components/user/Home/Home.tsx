import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../Constarints/axios/userAxios';


import axios from 'axios';


import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';

import Skeleton from '@mui/joy/Skeleton';
import { toast } from 'sonner';

import { useRef } from 'react';
// import '@react-pdf-viewer/core/lib/styles/index.css';
import WebViewer from '@pdftron/webviewer'
import PdfViewer from '../../../utilities/pdfViewer';







export default function InstagramPost() {
  // State to hold an array of posts
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState<boolean>(false)
  const [pdf,setPdf]=useState<any>(null)
  const [likeFlag,setLikeFlag]=useState<boolean>(false)
 

  // // Fetch data using useEffect
  useEffect(() => {
    // Fetch posts from API
    setLoading(true)
    const fetchPosts = async () => {
      try {
        const result = await axiosInstance.get("http://localhost:4000/post/getAllPosts");
        console.log(result.data," data from all get post api")
        setPosts(result.data.data); // Assuming result.data.post_data is an array of posts
        setTimeout(()=>{
          setLoading(false)
        },2000)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const viewPdf=async (postId:any)=>{
    console.log(postId," theis is post id in front end")
    const result=await axiosInstance.post("http://localhost:4000/post/pdfUrlFetch",{postId})
    console.log(result.data," data from viewpdf backend")
    if(result.data.success==true){
      setPdf(result.data.pdfUrl)
      //
      console.log(result.data.pdfUrl," url data in fron end state")
      
      //
      
      
    }else{
      toast.error("error while viewing pdf wwww")
      console.log('error while viewing pdf')
    }
  }
  //
  if(pdf){
    return(
    <>
    <div style={{position: "absolute", top: "10vh", right: "2vw", zIndex: 2}}>
  <button onClick={() => setPdf(null)}>Back</button>
</div>
<div style={{position: "absolute", zIndex: 1, width: "100%", height: "100%"}}>
  <PdfViewer initialDoc={pdf} />
</div>
  
    </>)
  }
const handleLike=async(postId)=>{
toast.info("Liked")
const userId=localStorage.getItem("id")
const response=await axiosInstance.get("http://localhost:4000/post/like",{postId,userId,likeFlag})
if(response.data.success){
  likeFlag
}
}


  return (
    <Box sx={{ marginTop: '10vh' }}>
      {loading ? (
        <>
        {
          [1,2,3].map((value)=>(
            <Stack sx={{paddingTop:"2vh"}} spacing={2} key={value} useFlexGap>
            <Card variant="outlined" sx={{ width: 595}}>
              <CardContent orientation="horizontal">
                <Skeleton animation="wave" variant="circular" width={48} height={48} />
                <div>
                  <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    level="body-sm"
                    sx={{ width: 200 }}
                  />
                </div>
              </CardContent>
              <AspectRatio ratio="21/9">
                <Skeleton animation="wave" variant="overlay">
                  <img
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  />
                </Skeleton>
              </AspectRatio>
              <Typography sx={{ overflow: 'hidden' }}>
                <Skeleton animation="wave">
                  Lorem ipsum is placeholder text commonly used in the graphic, print, and
                  publishing industries.
                </Skeleton>
              </Typography>
              <Button>
                Read more
                <Skeleton animation="wave" />
              </Button>
            </Card>
          </Stack>
          ))
        }       
       </>
      ) : (
        posts.map((post, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ marginBottom: 3, minWidth: 600, minHeight: 300, width:"32vw", '--Card-radius': (theme) => theme.vars.radius.xs }}
          >
            <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    m: '-2px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                  },
                }}
              >
                <Avatar size="sm" src="/static/logo.png" sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }} />
              </Box>
              <Typography sx={{ fontWeight: 'lg' }}>{post.user.name}</Typography>
              <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                <MoreHoriz />
              </IconButton>
            </CardContent>

            <CardOverflow>
              <AspectRatio>
                <Box sx={{ position: 'relative' }}>
                  <img src={post.imageUrl} alt={post.title} loading="lazy" />
                  {post.pdfUrl && (
                    <Box
                      component="a"
                     
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        opacity: 0,
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <button onClick={()=>viewPdf(post._id)}>Read More</button>
                      
                    </Box>
                  )}
                </Box>
              </AspectRatio>
            </CardOverflow>
            

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
              <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                <IconButton onClick={()=>handleLike(post._id)} variant="plain" color="neutral" size="sm">
                  <FavoriteBorder />
                </IconButton>
                <IconButton variant="plain" color="neutral" size="sm">
                  <ModeCommentOutlined />
                </IconButton>
                <IconButton variant="plain" color="neutral" size="sm">
                  <SendOutlined />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={[
                      {
                        borderRadius: '50%',
                        width: `max(${6 - i}px, 3px)`,
                        height: `max(${6 - i}px, 3px)`,
                      },
                      i === 0 ? { bgcolor: 'primary.solidBg' } : { bgcolor: 'background.level3' },
                    ]}
                  />
                ))}
              </Box>

              <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                <IconButton variant="plain" color="neutral" size="sm">
                  <BookmarkBorderRoundedIcon />
                </IconButton>
              </Box>
            </CardContent>

            <CardContent>
              <Link component="button" underline="none" textColor="text.primary" sx={{ fontSize: 'sm', fontWeight: 'lg' }}>
                8.1M Likes
              </Link>
              <Typography sx={{ fontSize: 'sm' }}>
                <Link component="button" color="neutral" textColor="text.primary" sx={{ fontWeight: 'lg' }}>
                  {post.title}
                </Link>{' '}
                {post.summary}
              </Typography>
              <Link component="button" underline="none" startDecorator="…" sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
                more
              </Link>
              <Link component="button" underline="none" sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}>
                2 DAYS AGO
              </Link>
            </CardContent>

            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
              <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                <Face />
              </IconButton>
              <Input
                variant="plain"
                size="sm"
                placeholder="Add a comment…"
                sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
              />
              <Link disabled underline="none" role="button">
                Post
              </Link>
            </CardContent>
          </Card>
        ))
      )}
    </Box>

    
  );

}
