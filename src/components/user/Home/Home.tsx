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
import Face from "@mui/icons-material/Face";
import { useState, useEffect } from "react";
import axiosInstance from "../../../Constarints/axios/userAxios";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import SendOutlined from "@mui/icons-material/SendOutlined";

import Skeleton from "@mui/joy/Skeleton";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import { toast } from "sonner";
import PostMenu from "./PostMenu";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

// import IconButtons from "@mui/joy/IconButton";
import { styled } from "@mui/material/styles";
import { IconButtonProps } from "@mui/joy/IconButton";
import UserListModal from "./UserListModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";
import { IUser } from "../../../Interfaces/Iuser";
import ClipboardJS from "clipboard";
import { constants } from "../../../Constarints/constants/constants";
// import Loading from "./Loading";

export default function InstagramPost({ fetchGenre }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdf, setPdf] = useState<any>(null);
  const [comment, setComment] = useState<any>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  // const [fetchGenres, setFetchGenres] = useState<string>("all");
  const [error, setError] = useState<any>(null);
  // const [chatDisplay, setChatDisplay] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyCommentId, setReplyCommentId] = React.useState(null); // Track which comment is being replied to
  const [postRefresh, setPostRefresh] = useState<boolean>();
  const [likeListOpen, setLikeListOpen] = useState<boolean>(false);
  // const [postId1, setPostId1] = useState<string>("");
  const [listData, setlistData] = useState([]);
  const [copyLink, setCopyLink] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);

  const inputRef = React.useRef(null);

  const handleCopy = (postId) => {
    const link = `${constants.CLIENT_URL}?postId=${postId}`;

    // setCopyLink(`${postEndpoints.ViewPost}/${postId}`)
    setCopyLink(link);
    toast.info("link copied");
  };

  {
    /* State for managing displayed comments */
  }
  const [visibleComments, setVisibleComments] = useState(5);

  {
    /* Function to handle showing more comments */
  }
  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 10);
  };

  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  console.log(replyTo, "reply to");

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

  let genre = "All";

  //for coping to clipboard
  // Clipboard.js logic after the component is mounted
  React.useEffect(() => {
    const clipboard = new ClipboardJS(".copy-btn", {
      text: () => copyLink, // Dynamically return the copy link
    });

    // Cleanup to remove Clipboard.js instance on unmount
    return () => clipboard.destroy();
  }, [copyLink]);

  // let page=3

  // Trigger fetchPosts on scroll
  // useEffect(() => {
  //   let timeout;
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.offsetHeight - 100
  //     ) {
  //       clearTimeout(timeout);
  //       timeout = setTimeout(() => {
  //         setPageCount((prev) => prev + 1);
  //         console.log(pageCount, " page count ^^^^^^^^^^^^");
  //       }, 300); // Delay updates by 300ms
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  // //[page, isLoading, hasMore]

  // Fetch data using useEffect
  useEffect(() => {
    setLoading(true);

    if (fetchGenre) {
      genre = fetchGenre;
    }
    fetchPosts();
  }, [fetchGenre, postRefresh, pageCount]);

  //fetching post function
  const fetchPosts = async () => {
    try {
      const result = await axiosInstance.get(
        postEndpoints.getPosts(genre, pageCount)
      );
      // if(result.status!==200){
      //   console.log(result.status,"hiiiiiiiiiiii")
      //   setError("No posts found for this Genre.........")
      //   setLoading(false);
      // }
      setError(null);
      console.log(result, " no genre post in fetchpost");
      const newPosts = result.data.data;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new data
      // setPosts(result.data.data); // Assuming result.data.data is the posts array
      setLoading(false);
    } catch (error) {
      if (error.status == 500) {
        setError("No posts found for this Genre.........");
        setLoading(false);
      }
      console.error("Error fetching posts:", error);
    }
  };

  console.log(posts, " posts got in the state &&&&&&&&&&&&&&");

  //fetching user data
  const [loggeduser, setLoggedUser] = useState<IUser>();
  useEffect(() => {
    async function fetchUser() {
      const result = await axiosInstance.post(userEndpoints.fetchUserData, {
        id: userId,
        loginUserId: "",
      });
      // console.log(result.data.result.user_data._doc, "data from user fetch");
      if (result.data.success) {
        setLoggedUser(result.data.result.user_data._doc);
      }
    }
    fetchUser();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSavePost = async (postId: string) => {
    try {
      const response = await axiosInstance.get(userEndpoints.savePost, {
        params: { postId, userId },
      });
      console.log(response.data, "data response of saved post");
      if (!response.data.success) {
        toast.error("Something went wrong!");
      } else {
        toast.info("post saved");
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast.error("Error while liking/unliking post.");
    }
  };


  const handleTagClick = async (tag: string) => {
    try {
      navigate("/tags", { state: { tag: tag } });
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast.error("Error while liking/unliking post.");
    }
  };

  

  // useEffect(()=>{
  //   function chat(){
  //   const chatShow = useSelector((state:any) => state.ChatDisplay.chatBoxDisplay); // Accessing counter state
  //   setChatDisplay(chatShow)
  //   }
  //   chat();
  // })

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

  const viewPdf = async (postId: any) => {
    try {
      setLoading(true);
      const result = await axiosInstance.post(postEndpoints.pdfUrlFetch, {
        postId,
      });

      if (result.data.success) {
        setPdf(result.data.pdfUrl);
        console.log(result.data.pdfUrl, " pfd fetch result fhfhj");
        setLoading(false);
        // Return the PDF URL if successful
      } else {
        toast.error("Error while viewing PDF");
      }
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };

  const checkLiked = (postLikes: any) => {
    // const userId = localStorage.getItem("id");
    return postLikes.some(
      (value: any) => value.userId.toString() === userId?.toString()
    );
  };

  const handleLike = async (postId, postUserId, likeFlag, index) => {
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
        // toast.info(likeFlag ? "Liked" : "Unliked");
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



  const handleComment = async (
    postId: string,
    parentCommentId?: string,
    text?: string
  ) => {
    if (!loggeduser) {
      throw new Error("Logged user is undefined");
    }
    try {
      const payload = {
        postId,
        content: comment,
        userId: loggeduser?._id,
        avatar: loggeduser?.profilePicture,
        userName: loggeduser?.username,
        parentCommentId: parentCommentId || null,
        replayText: text || "",
      };
      console.log(payload, " payload data in handle comment 7777777777777777");
      const result = await axiosInstance.post(
        postEndpoints.addComment,
        payload
      );
      console.log(
        result.data,
        " result data after add comment api call444444444444444"
      );
      if (result.data.success) {
        setPosts((prevPosts: any) =>
          prevPosts.map((postItem: any) => {
            if (postItem._id === postId) {
              // If the parentCommentId is provided, we are replying to an existing comment
              if (parentCommentId) {
                return {
                  ...postItem,
                  comments: postItem.comments.map((commentItem: any) => {
                    if (commentItem._id === parentCommentId) {
                      return {
                        ...commentItem,
                        replies: [
                          ...(commentItem.replies || []),
                          {
                            _id: result.data.data,
                            userId: loggeduser._id,
                            content: text, // Use `text` instead of `comment`
                            createdAt: new Date().toISOString(),
                            avatar: loggeduser.profilePicture,
                            userName: loggeduser.username,
                          },
                        ],
                      };
                    }
                    return commentItem;
                  }),
                };
              } else {
                return {
                  ...postItem,
                  comments: [
                    ...postItem.comments,
                    {
                      _id: result.data.data,
                      userId: loggeduser._id,
                      content: comment, // Use `text` for replies, `comment` for new comments
                      createdAt: new Date().toISOString(),
                      avatar: loggeduser.profilePicture,
                      userName: loggeduser.username,
                      parentCommentId: null,
                      replies: [], // Initialize empty replies for a new comment
                    },
                  ],
                };
              }
            }
            return postItem;
          })
        );

        setExpanded(true);
        toast.success(
          parentCommentId
            ? "Reply added successfully"
            : "Comment added successfully"
        );
      } else {
        toast.error("Failed to add comment/reply");
      }
      setComment("");
    } catch (error) {
      console.error("Error adding comment/reply:", error);
      toast.error("Something went wrong");
    }
  };

  const handleReplyPost = (postId: any, commentId: any) => {
    handleComment(postId, commentId, replyText);
    setReplyText("");
    setReplyTo(null);
  };

  const handleUserClick = async (id: any) => {
    try {
      navigate("/userProfile", { state: { id } });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCloseLikelist = async () => {
    setLikeListOpen(false);
  };

  //like list fetching from backend
  const handleLikeList = async (postId: string) => {
    setLikeListOpen(true);

    try {
      const response = await axiosInstance.get(postEndpoints.likeList, {
        params: { postId },
      });
      if (response?.data?.like_data) {
        setlistData(response.data.like_data);
      }
    } catch (error) {
      console.error("Error fetching liked users:", error);
    }

    // setPostId1(postId);
  };

  //opening modal if likelistopen variable is true
  if (likeListOpen) {
    return (
      <>
        <UserListModal
          open={likeListOpen}
          title="Liked Users"
          listData={listData}
          onClose={handleCloseLikelist}
        />
      </>
    );
  }

  return (
    <Box sx={{ marginTop: "9vh", boxShadow: 30 }}>
      {error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "goldenrod",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.05)", // Optional: Light background for emphasis
          }}
        >
          <h2>No post found for the genre</h2>
        </div>
      )}

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

              <Typography
                sx={{ fontWeight: "lg", cursor: "pointer" }}
                onClick={() => handleUserClick(post.user.id)} // Replace with your function
              >
                {post.user.name}
              </Typography>
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

                <IconButton variant="plain" color="neutral" size="sm">
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ModeCommentOutlined />
                  </ExpandMore>
                </IconButton>

                {/* <IconButton  size="sm"
                variant="soft"
                color="neutral"
                sx={{ ml: "auto" }}
                onClick={() => handleSharePost(post._id)}>
                  <SendOutlined />
                </IconButton> */}
                <IconButton
                  size="sm"
                  variant="soft"
                  color="neutral"
                  sx={{ ml: "auto" }}
                  className="copy-btn"
                  onClick={() => handleCopy(post._id)}
                >
                  <SendOutlined />
                </IconButton>
              </Box>
              <IconButton
                size="sm"
                variant="soft"
                color="neutral"
                sx={{ ml: "auto" }}
                onClick={() => handleSavePost(post._id)}
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
                onClick={() => handleLikeList(post._id)}
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

              {/* <Link
                component="button"
                underline="none"
                startDecorator="…"
                sx={{ fontSize: "sm", color: "text.tertiary" }}
              >
                more
              </Link> */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "text.primary", mr: 1 }}
                >
                  Tags:
                </Typography>
                {post.tags.map((tag, index) => (
                  <Box
                    key={index}
                    sx={{
                      fontSize: "14px",
                      color: "#6c757d", // Equivalent to "text.secondary"
                      backgroundColor: "#f8f9fa", // Light background for better visibility
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href="#"
                      onClick={() => handleTagClick(tag)} // Sample click handler
                      style={{
                        color: "#007BFF", // Link color (blue)
                        textDecoration: "none", // No underline
                        cursor: "pointer", // Pointer cursor on hover
                      }}
                    >
                      {tag}
                    </a>
                  </Box>
                ))}
              </Box>

              {/* <Link
                component="button"
                underline="none"
                sx={{ fontSize: "10px", color: "text.tertiary", my: 0.5 }}
              >
                2 DAYS AGO
              </Link> */}
            </CardContent>

            {/* Showing Comments */}
            <div>{post.comments.length} comments</div>
            {expanded && (
              <CardContent>
                {post.comments
                  .slice(0, visibleComments)
                  .map((commentItem: any) => (
                    <Box
                      key={commentItem._id}
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
                            {commentItem.userName}
                          </Link>
                        </Typography>
                        <Typography
                          sx={{ fontSize: "sm", color: "text.secondary" }}
                        >
                          {commentItem.content}
                        </Typography>
                      </Box>
                      <Link
                        component="button"
                        underline="none"
                        sx={{ fontSize: "xs", color: "text.tertiary" }}
                        onClick={() => setReplyCommentId(commentItem._id)}
                      >
                        {commentItem.replies.length} Reply
                      </Link>
                      <span style={{ fontSize: "0.8rem", color: "#888" }}>
                        {formatChatTimestamp(commentItem.createdAt)}
                      </span>
                      {replyCommentId === commentItem._id && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          {/* Showing Replies */}
                          {commentItem.replies?.map((reply: any) => (
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
                              handleReplyPost(post._id, commentItem._id)
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
                value={comment}
                size="sm"
                placeholder="Add a comment…"
                sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
                onChange={(e) => setComment(e.target.value)}
              />
              <Link
                underline="none"
                role="button"
                onClick={() => {
                  handleComment(post._id);
                  setComment("");
                }}
              >
                Post
              </Link>
              {/* <button onClick={()=>toast.error("post button clicked")}></button> */}
            </CardContent>
          </Card>
        ))
      )}
      {/* <button
  onClick={() => setPageCount((prev) => prev + 1)}
  disabled={loading}
  style={{
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: loading ? "#ccc" : "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease, transform 0.2s",
  }}
  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  onMouseEnter={(e) =>
    !loading && (e.currentTarget.style.backgroundColor = "#0056b3")
  }
  onMouseLeave={(e) =>
    !loading && (e.currentTarget.style.backgroundColor = "#007BFF")
  }
>
  {loading ? "Loading..." : "More Posts"}
</button> */}

      <button
        onMouseEnter={() => setPageCount((prev) => prev + 1)}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          opacity: 5, // Keeps it invisible
        }}
      >
        More Posts
      </button>
    </Box>
  );
}
