import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { useState, useEffect } from "react";
import axiosInstance from "../../../Constarints/axios/userAxios";

import Skeleton from "@mui/joy/Skeleton";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import { toast } from "sonner";
import PdfViewer from "../../../utilities/pdfViewer";
import PostMenu from "./PostMenu";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

import CardContents from "@mui/joy/CardContent";
import IconButtons from "@mui/joy/IconButton";
import CircularProgress from "@mui/joy/CircularProgress";
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';

export default function InstagramPost({fetchGenre}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdf, setPdf] = useState<any>(null);
  const [comment, setComment] = useState<any>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [fetchGenres,setFetchGenres]=useState<any>("all");
  const [error,setError]=useState<any>('')


  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
let genre="All"

 
// Fetch data using useEffect
  useEffect(() => {
    setLoading(true);
    console.log(fetchGenre,"  hirr+++++++++++")
    if(fetchGenre){
     genre=fetchGenre
    }
    setFetchGenres(fetchGenre)
    const fetchPosts = async () => {
      try {
        const result = await axiosInstance.get(
          `http://localhost:4000/post/getPosts?genre=${genre}`
        );
        // if(result.status!==200){
        //   console.log(result.status,"hiiiiiiiiiiii")
        //   setError("No posts found for this Genre.........")
        //   setLoading(false);
        // }
        setPosts(result.data.data); // Assuming result.data.data is the posts array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [fetchGenre]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
};

  const viewPdf = async (postId: any) => {
    try {
      const result = await axiosInstance.post(
        "http://localhost:4000/post/pdfUrlFetch",
        { postId }
      );

      if (result.data.success) {
        setPdf(result.data.pdfUrl);
        console.log(result.data.pdfUrl, " pfd fetch result fhfhj");
        // Return the PDF URL if successful
      } else {
        toast.error("Error while viewing PDF");
      }
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };
  // if(error){
  //   return(
  //     <Box sx={{ marginTop: "9vh", boxShadow: 30 }}>
  //       <>
      
  //       {[1, 2, 3].map((value) => (
  //         <Stack
  //           sx={{ paddingTop: "2vh" }}
  //           spacing={2}
  //           key={value}
  //           useFlexGap
  //         >
  //           <Card variant="outlined" sx={{ width: 595 }}>
  //             <CardContent orientation="horizontal">
  //               <Skeleton
  //                 animation="wave"
  //                 variant="circular"
  //                 width={48}
  //                 height={48}
  //               />
  //               <div>
  //                 <Skeleton
  //                   animation="wave"
  //                   variant="text"
  //                   sx={{ width: 120 }}
  //                 />
  //                 <h1>{error}</h1>
  //                 <Skeleton
  //                   animation="wave"
  //                   variant="text"
  //                   level="body-sm"
  //                   sx={{ width: 200 }}
  //                 />
  //               </div>
  //             </CardContent>
  //             <AspectRatio ratio="21/9">
  //               <Skeleton animation="wave" variant="overlay">
  //                 <img
  //                   alt=""
  //                   src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  //                 />
  //               </Skeleton>
  //             </AspectRatio>
  //             <Typography sx={{ overflow: "hidden" }}>
  //               <Skeleton animation="wave">
  //                 Lorem ipsum is placeholder text commonly used in the
  //                 graphic, print, and publishing industries.
  //               </Skeleton>
  //             </Typography>
  //             <Button>
  //               Read more
  //               <Skeleton animation="wave" />
  //             </Button>
  //           </Card>
  //         </Stack>
  //       ))}
  //     </>
  //     </Box>)
  // }

  // if (pdf) {
  //   return (
  //     <>
  //       <div
  //         style={{ position: "absolute", top: "10vh", right: "2vw", zIndex: 2 }}
  //       >
  //         <button onClick={() => setPdf(null)}>Back</button>
  //       </div>
  //       <div
  //         style={{
  //           position: "absolute",
  //           zIndex: 1,
  //           width: "100%",
  //           height: "100%",
  //         }}
  //       >
  //         <PdfViewer initialDoc={pdf} />
  //       </div>
  //     </>
  //   );
  // }

  const checkLiked = (postLikes: any) => {
    const userId = localStorage.getItem("id");
    return postLikes.some(
      (value: any) => value.userId.toString() === userId?.toString()
    );
  };

  const handleLike = async (postId, postUserId, likeFlag, index) => {
    const userId = localStorage.getItem("id");

    // Optimistically update the UI
    const updatedPosts = [...posts];
    const targetPost = updatedPosts[index];

    // Update the like count and likes array
    if (likeFlag) {
      targetPost.likes.push({ userId }); // Add userId to likes
    } else {
      targetPost.likes = targetPost.likes.filter(
        (like) => like.userId !== userId
      ); // Remove userId from likes
    }
    setPosts(updatedPosts);

    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/post/likePost",
        { postId, userId, postUserId, likeFlag }
      );
      if (!response.data.success) {
        // Revert changes if API call fails
        if (likeFlag) {
          targetPost.likes = targetPost.likes.filter(
            (like) => like.userId !== userId
          );
        } else {
          targetPost.likes.push({ userId });
        }
        setPosts(updatedPosts);
        toast.error("Something went wrong!");
      } else {
        toast.info(likeFlag ? "Liked" : "Unliked");
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast.error("Error while liking/unliking post.");
    }
  };
  const linkRef = React.useRef(null);

  // useEffect(() => {
  //   // Check if pdf exists and the ref is attached
  //   if (pdf && linkRef.current) {
  //     linkRef.current.click(); // Programmatically trigger the click event
  //   }
  // }, [pdf]);

  if (pdf) {
    return (
      <>
        {pdf ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              marginTop: "10vh",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setPdf(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 1000,
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Close
            </button>

            {/* PDF Embed */}
            <EmbedPDF
              mode="inline"
              style={{ width: "100%", height: "100%" }}
              documentURL={pdf}
            />
          </div>
        ) : (
          <p>No PDF selected.</p>
        )}
      </>
    );
  }
  // const handleComment=async(id:any)=>{
  //   const postId=id;
  //   const userId=localStorage.getItem("id")

  //   const response = await axiosInstance.post(
  //     "http://localhost:4000/post/addComment",
  //     { postId, userId, comment}
  //   );

  // toast.info(id)
  // }
  //
  const handleComment = async (postId: string, parentCommentId?: any) => {
    try {
      const payload = {
        postId,
        content: comment, // use replyText for replies, comment for normal comment
        userId: loggeduser?._id,
        avatar: loggeduser?.avatar,
        userName: loggeduser?.name,
        replayText: "",
        parentCommentId: "", // null if it's a normal comment
      };

      if (replyTo) {
        payload.parentCommentId = replyTo;
        payload.replayText = replyText;
      }

      const result = await axiosInstance.post("/post/comment", payload);

      if (result.data.success) {
        const newComment = {
          _id: result.data.commentId,
          UserId: loggeduser?._id,
          content: comment,
          createdAt: new Date().toISOString(),
          avatar: loggeduser?.avatar,
          userName: loggeduser?.name,
          replies: parentCommentId ? [] : [], // Empty replies array for a new comment
        };

        // Update state based on whether it's a reply or a new comment
        setPostData((prevPost) => {
          if (parentCommentId) {
            // Handle reply
            return {
              ...prevPost!,
              comments: prevPost!.comments.map((comment) => {
                if (comment._id === parentCommentId) {
                  return {
                    ...comment,
                    replies: [
                      ...comment.replies,
                      {
                        _id: result.data.commentId,
                        UserId: loggeduser?._id,
                        content: replyText,
                        createdAt: new Date().toISOString(),
                        avatar: loggeduser?.avatar,
                        userName: loggeduser?.name,
                      },
                    ],
                  };
                }
                return comment;
              }),
            };
          } else {
            // Handle new comment
            return {
              ...prevPost!,
              comments: [...prevPost!.comments, newComment],
            };
          }
        });

        setComment(""); // Clear the comment input field
        toast.success("Comment added successfully");
      } else {
        toast.error("Failed to add comment/reply");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //

  return (
    <Box sx={{ marginTop: "9vh", boxShadow: 30 }}>
      {loading ? (
        <>
          {[1, 2, 3].map((value) => (
            <Stack
              sx={{ paddingTop: "2vh" }}
              spacing={2}
              key={value}
              useFlexGap
            >
              <Card variant="outlined" sx={{ width: 595 }}>
                <CardContent orientation="horizontal">
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={48}
                    height={48}
                  />
                  <div>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ width: 120 }}
                    />
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
                <Typography sx={{ overflow: "hidden" }}>
                  <Skeleton animation="wave">
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries.
                  </Skeleton>
                </Typography>
                <Button>
                  Read more
                  <Skeleton animation="wave" />
                </Button>
              </Card>
            </Stack>
          ))}
        </>
      ) : (
        posts.map((post, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              marginBottom: 3,
              minWidth: 600,
              minHeight: 300,
              width: "32vw",
              borderRadius: 5,
              "--Card-radius": (theme) => theme.vars.radius.xs,
            }}
          >
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", gap: 1 }}
            >
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    m: "-2px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  },
                }}
              >
                <Avatar
                  size="sm"
                  src="/static/logo.png"
                  sx={{
                    p: 0.5,
                    border: "2px solid",
                    borderColor: "background.body",
                  }}
                />
              </Box>

              <Typography sx={{ fontWeight: "lg" }}>
                {post.user.name}
              </Typography>
              <Typography sx={{ fontSize: "lg" ,ml: "auto"  }}>
                <b>{post.genre}</b>
              </Typography>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              >
                <PostMenu postData={post} />
              </IconButton>
            </CardContent>

            <CardOverflow>
              <AspectRatio>
                <Box sx={{ position: "relative" }}>
                  <img src={post.imageUrlS3} alt={post.title} loading="lazy" />
                  {post.pdfUrl && (
                    <Box
                      component="a"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        opacity: 0,
                        color: "white",
                        textDecoration: "none",
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <button onClick={() => viewPdf(post._id)}>
                        Read More
                      </button>
                    </Box>
                  )}
                </Box>
              </AspectRatio>
            </CardOverflow>

            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", mx: -1 }}
            >
              <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                {checkLiked(post.likes) ? (
                  <IconButton
                    onClick={() =>
                      handleLike(post._id, post.userId, false, index)
                    }
                    variant="soft"
                    color="danger"
                    size="sm"
                  >
                    <Favorite sx={{ color: "red" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      handleLike(post._id, post.userId, true, index)
                    }
                    variant="soft"
                    color="danger"
                    size="sm"
                  >
                    <FavoriteBorder />
                  </IconButton>
                )}

                <IconButtons variant="plain" color="neutral" size="sm">
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ModeCommentOutlined />
                  </ExpandMore>
                </IconButtons>             
                
                <IconButton variant="soft" color="neutral" size="sm">
                  <SendOutlined />
                </IconButton>
              </Box>
              <IconButton
                size="sm"
                variant="soft"
                color="neutral"
                sx={{ ml: "auto" }}
              >
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </CardContent>
           

            <CardContent>
              <Link
                component="button"
                underline="none"
                textColor="text.primary"
                sx={{ fontSize: "sm", fontWeight: "lg" }}
              >
                {post.likes.length} Likes
              </Link>
              {/* <Typography sx={{ fontSize: "lg" }}>
                Genre:{post.genre}
              </Typography> */}
              <Typography sx={{ fontSize: "sm" }}>
                <Link
                  component="button"
                  color="neutral"
                  textColor="text.primary"
                  sx={{ fontWeight: "lg" }}
                >
                  {post.title}
                </Link>{" "}
                {post.summary}
              </Typography>
              <Link
                component="button"
                underline="none"
                startDecorator="…"
                sx={{ fontSize: "sm", color: "text.tertiary" }}
              >
                more
              </Link>
              <Link
                component="button"
                underline="none"
                sx={{ fontSize: "10px", color: "text.tertiary", my: 0.5 }}
              >
                2 DAYS AGO
              </Link>
            </CardContent>

            <CardContent orientation="horizontal" sx={{ gap: 1, padding: 1 }}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ ml: -1 }}
              >
                <Face />
              </IconButton>
              <Input
                variant="plain"
                size="sm"
                placeholder="Add a comment…"
                sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
                onChange={(e) => setComment(e.target.value)}
              />
              <Link
                underline="none"
                role="button"
                onClick={() => handleComment(post._id)}
              >
                Post
              </Link>
              {/* <button onClick={()=>toast.error("post button clicked")}></button> */}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
