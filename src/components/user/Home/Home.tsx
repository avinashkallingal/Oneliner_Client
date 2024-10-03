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

export default function InstagramPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdf, setPdf] = useState<any>(null);

  // Fetch data using useEffect
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const result = await axiosInstance.get(
          "http://localhost:4000/post/getAllPosts"
        );
        setPosts(result.data.data); // Assuming result.data.data is the posts array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const viewPdf = async (postId: any) => {
    try {
      const result = await axiosInstance.post(
        "http://localhost:4000/post/pdfUrlFetch",
        { postId }
      );
      if (result.data.success) {
        setPdf(result.data.pdfUrl);
      } else {
        toast.error("Error while viewing PDF");
      }
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };

  if (pdf) {
    return (
      <>
        <div
          style={{ position: "absolute", top: "10vh", right: "2vw", zIndex: 2 }}
        >
          <button onClick={() => setPdf(null)}>Back</button>
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <PdfViewer initialDoc={pdf} />
        </div>
      </>
    );
  }

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

  return (
    <Box sx={{ marginTop: "10vh" }}>
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
                  <img src={post.imageUrl} alt={post.title} loading="lazy" />
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

                <IconButton variant="soft" color="neutral" size="sm">
                  <ModeCommentOutlined />
                </IconButton>
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

            <CardContent orientation="horizontal" sx={{ gap: 1 ,padding:1 }}>
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
