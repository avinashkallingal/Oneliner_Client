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
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { useState, useEffect } from "react";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { IUser } from "../../../Interfaces/Iuser";
import Skeleton from "@mui/joy/Skeleton";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import { toast } from "sonner";

import PostMenu from "./PostMenu";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";
// import IconButtons from "@mui/joy/IconButton";
import IconButtons from "@mui/joy/IconButton";

import { IconButtonProps } from "@mui/joy/IconButton";

import { styled } from "@mui/material/styles";


import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import moment from "moment";
import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";




export default function ViewPost({copyPostId}) {
  console.log(copyPostId,"props value passed **********");
  const location = useLocation();
  // console.log(location.state.post._id,"props value passed by redux **********");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdf, setPdf] = useState<any>(null);
  const [comment, setComment] = useState<any>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  // const [fetchGenres,setFetchGenres]=useState<any>("all");
  // const [error,setError]=useState<any>('')
  // const [chatDisplay,setChatDisplay]=useState<boolean>(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyCommentId, setReplyCommentId] = React.useState(null); // Track which comment is being replied to
  const [postRefresh, setPostRefresh] = useState<boolean>();
  // const [copyPostId1,setCopyPostId]=useState<string>("")
  const userId = localStorage.getItem("id");
let copyPostId1=location.state?.post._id||copyPostId
  {
    /* State for managing displayed comments */
  }
  const [visibleComments, setVisibleComments] = useState(5);

  

  {
    /* Function to handle showing more comments */
  }
const [loggeduser, setLoggedUser] = useState<IUser>();
console.log(replyTo,"replyto")
  useEffect(() => {
    async function fetchUser() {
      const result = await axiosInstance.post(
        userEndpoints.fetchUserData,
        { id: userId, loginUserId: "" }
      );
      // console.log(result.data.result.user_data._doc, "data from user fetch");
      if (result.data.success) {
        setLoggedUser(result.data.result.user_data._doc);
      }
      // if(copyPostId){
      //   copyPostId1=copyPostId
      // }
    }
    fetchUser();
  }, []);

  console.log(typeof(copyPostId1),"props passed+++++++++++");
  console.log(copyPostId1,"props value passed **********");
  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 10);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const formatChatTimestamp = (timestamp1: any) => {
    const now = moment();
    const messageTime = moment(timestamp1);

    if (messageTime.isSame(now, "day")) {
      return messageTime.fromNow();
    } else if (messageTime.isSame(now, "year")) {
      return messageTime.format("MMM Do, h:mm A");
    } else {
      return messageTime.format("MMM Do YYYY, h:mm A");
    }
  };

  


  // Fetch data using useEffect
  useEffect(() => {
    // console.log(
    //   location,
    //   " navigate state value in view post ++++++++++++++++"
    // );
    // console.log(
    //   location.state.post._id,
    //   " navigate state value in view post ------------------"
    // );

    setLoading(true);
    const fetchPosts = async () => {
      try {
       
        // const queryArgument=location.state.post._id||copyPostId
        // console.log(queryArgument," its the passed quey %%%%%%%%%%%%%%")
        const result = await axiosInstance.get(         
          postEndpoints.getPost(copyPostId1)
        );
        // if(result.status!==200){
        //   console.log(result.status,"hiiiiiiiiiiii")
        //   setError("No posts found for this Genre.........")
        //   setLoading(false);
        // }
        console.log(result.data.data, " fhhfixiehuihcuhleuhxuh");
        setPosts(result.data.data); // Assuming result.data.data is the posts array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //for comments
  //handling comments
  const handleComment = async (
    postId: string,
    parentCommentId?: any,
    text?: any
  ) => {
    try {
      const payload = {
        postId,
        content: comment,
        userId: loggeduser?._id,
        avatar: loggeduser?.profilePicture,
        userName: loggeduser?.username,
        parentCommentId: null,
        replayText: "",
      };

      if (parentCommentId) {
        // If replying to a comment, add parentCommentId
        payload.parentCommentId = parentCommentId;
        payload.replayText = text;
      }

      const result = await axiosInstance.post(
        postEndpoints.addComment,
        payload
      );
      console.log(result.data," data in axios result in view post %55555555555555555")
      console.log(posts," data in post state %666666666666666")
      if (result.data.success) {
        setPosts((prevPosts: any) =>
          prevPosts.map((p: any) =>
            p._id === postId
              ? {
                  ...p,
                  comments: p.comments.map((comment1: any) => {
                    if (comment1._id === parentCommentId) {
                      // If it is a reply, update the specific comment's replies array
                      return {
                        ...comment1,
                        replies: [
                          ...comment1.replies,
                          {
                            _id: result.data.commentId,
                            UserId: loggeduser._id,
                            content: comment,
                            createdAt: new Date().toISOString(),
                            avatar: loggeduser?.profilePicture,
                            userName: loggeduser?.name,
                          },
                        ],
                      };
                    }
                    return comment1;
                  }),
                }
              : p
          )
        );
        setPostRefresh(!postRefresh);
        setExpanded(true);

        // setSelectedEmoji(''); // Clear the input after posting
        toast.success("Reply added successfully");
      } else {
        toast.error("Failed to add comment/reply");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleReplyPost = (postId: any, commentId: any) => {
    handleComment(postId, commentId, replyText);
    setReplyText("");
    setReplyTo(null);
  };

  // useEffect(()=>{
  //   function chat(){
  //   const chatShow = useSelector((state:any) => state.ChatDisplay.chatBoxDisplay); // Accessing counter state
  //   setChatDisplay(chatShow)
  //   }
  //   chat();
  // })

  const viewPdf = async (postId: any) => {
    try {
      const result = await axiosInstance.post(postEndpoints.pdfUrlFetch, {
        postId,
      });

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
      const response = await axiosInstance.post(postEndpoints.likePost, {
        postId,
        userId,
        postUserId,
        likeFlag,
      });
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
  // const linkRef = React.useRef(null);
  // if(useSelector((state:any) => state.ChatDisplay.chatBoxDisplay)){
  //   return(
  //     <Chatbox/>
  //   )
  // }

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
  // const handleComment = async (postId: string, parentCommentId?: any) => {
  //   try {
  //     const payload = {
  //       postId,
  //       content: comment, // use replyText for replies, comment for normal comment
  //       userId: loggeduser?._id,
  //       avatar: loggeduser?.avatar,
  //       userName: loggeduser?.name,
  //       replayText: "",
  //       parentCommentId: "", // null if it's a normal comment
  //     };

  //     if (replyTo) {
  //       payload.parentCommentId = replyTo;
  //       payload.replayText = replyText;
  //     }

  //     const result = await axiosInstance.post("/post/comment", payload);

  //     if (result.data.success) {
  //       const newComment = {
  //         _id: result.data.commentId,
  //         UserId: loggeduser?._id,
  //         content: comment,
  //         createdAt: new Date().toISOString(),
  //         avatar: loggeduser?.avatar,
  //         userName: loggeduser?.name,
  //         replies: parentCommentId ? [] : [], // Empty replies array for a new comment
  //       };

  //       // Update state based on whether it's a reply or a new comment
  //       setPostData((prevPost) => {
  //         if (parentCommentId) {
  //           // Handle reply
  //           return {
  //             ...prevPost!,
  //             comments: prevPost!.comments.map((comment) => {
  //               if (comment._id === parentCommentId) {
  //                 return {
  //                   ...comment,
  //                   replies: [
  //                     ...comment.replies,
  //                     {
  //                       _id: result.data.commentId,
  //                       UserId: loggeduser?._id,
  //                       content: replyText,
  //                       createdAt: new Date().toISOString(),
  //                       avatar: loggeduser?.avatar,
  //                       userName: loggeduser?.name,
  //                     },
  //                   ],
  //                 };
  //               }
  //               return comment;
  //             }),
  //           };
  //         } else {
  //           // Handle new comment
  //           return {
  //             ...prevPost!,
  //             comments: [...prevPost!.comments, newComment],
  //           };
  //         }
  //       });

  //       setComment(""); // Clear the comment input field
  //       toast.success("Comment added successfully");
  //     } else {
  //       toast.error("Failed to add comment/reply");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };
  //

  return (
    <Box sx={{ marginTop: "9vh", boxShadow: 30, alignContent: "center" }}>
      <Navbar />
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
              flexDirection: "",
              marginBottom: 3,
              minWidth: 600,
              minHeight: 300,
              width: "100vw",
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

              <Typography sx={{ fontWeight: "lg" }}></Typography>
              <Typography sx={{ fontSize: "lg", ml: "auto" }}>
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
                <div>{post.comments.length} comments</div>
            {expanded && (
              <CardContent>
                {post.comments
                  .slice(0, visibleComments)
                  .map((comment1: any) => (
                    <Box
                      key={comment1._id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography sx={{ fontWeight: "lg", fontSize: "sm" }}>
                          <Link
                            component="button"
                            color="neutral"
                            sx={{ textDecoration: "none" }}
                          >
                            {comment1.userName}
                          </Link>
                        </Typography>
                        <Typography
                          sx={{ fontSize: "sm", color: "text.secondary" }}
                        >
                          {comment1.content}
                        </Typography>
                      </Box>
                      <Link
                        component="button"
                        underline="none"
                        sx={{ fontSize: "xs", color: "text.tertiary" }}
                        onClick={() => setReplyCommentId(comment1._id)}
                      >
                        Reply
                      </Link>
                      <span style={{ fontSize: "0.8rem", color: "#888" }}>
                        {formatChatTimestamp(comment1.createdAt)}
                      </span>
                      {replyCommentId === comment1._id && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          {/* Showing Replies */}
                          {comment1.replies?.map((reply: any) => (
                            <Box
                              key={reply._id}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                pl: 3,
                                my: 0.5,
                              }}
                            >
                              <Typography
                                sx={{ fontWeight: "lg", fontSize: "sm" }}
                              >
                                <Link
                                  component="button"
                                  color="neutral"
                                  textColor="text.primary"
                                  sx={{
                                    fontWeight: "lg",
                                    textDecoration: "none",
                                  }}
                                >
                                  {reply.userName}
                                </Link>
                              </Typography>
                              <Typography
                                sx={{ fontSize: "sm", color: "text.secondary" }}
                              >
                                {reply.content}
                              </Typography>
                              <span
                                style={{ fontSize: "0.8rem", color: "#888" }}
                              >
                                {formatChatTimestamp(reply.createdAt)}
                              </span>
                            </Box>
                          ))}
                          <Input
                            variant="plain"
                            size="sm"
                            placeholder="Reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            sx={{ flex: 1 }}
                          />
                          <Link
                            component="button"
                            underline="none"
                            sx={{ fontSize: "sm", color: "primary.main" }}
                            onClick={() =>
                              handleReplyPost(post._id, comment1._id)
                            }
                          >
                            Post
                          </Link>
                        </Box>
                      )}
                    </Box>
                  ))}
                {/* Show more button */}
                {visibleComments < post.comments.length && (
                  <Link
                    component="button"
                    underline="none"
                    sx={{ fontSize: "sm", color: "primary.main", mt: 1 }}
                    onClick={handleShowMoreComments}
                  >
                    Show More
                  </Link>
                )}
              </CardContent>
            )}
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
