import React, { useEffect, useState } from "react";

import Box from "@mui/joy/Box";

import axiosInstance from "../../../Constarints/axios/userAxios";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePostCard from "./ProfilePostCard";
import Grid from "@mui/material/Grid";

import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";
import { IUser } from "../../../Interfaces/Iuser";

import Navbar from "./Navbar";

function TagPage() {
 
  const location=useLocation()  
  const searchParams = new URLSearchParams(location.search);
  const searchTag = location.state?.tag || searchParams.get("tag") || ""; // Handle null case
console.log(searchTag," searchTag ")

  const defaultUser: IUser = {
    _id: undefined,
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    gender: "",
    language: "",
    profilePicture: "",
    followers: [],
    followings: [],
    isOnline: false,
    isAdmin: false,
    desc: "",
    isBlocked: false,
    created_at: undefined,
  };

  
  const [post, setPost] = useState<any[]>([]);
 
 

 

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Adjust the number of posts per page as needed
  // Get posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    const fetchData = async () => {     

      await fetchPosts();
    };

    fetchData();
  }, []);

  const fetchPosts = async () => {
    const resultPost = await axiosInstance.get(postEndpoints.getTagPosts(searchTag));
    console.log(resultPost.data.data, "data on regullar fetch !!!!!!!!");
    if (resultPost.data.success) {
      setPost(resultPost.data.data);
      console.log("555555555555555555555555555");
    }
  };

  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
  // Handle page changes
  const totalPages = Math.ceil(post.length / postsPerPage);

 









  return (
    <>
      <Box
  sx={{
    width: "100%",
    position: "relative",
    marginTop: "12vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers everything inside the Box
  }}
>
  <Navbar />

  {/* Buttons for toggling posts */}
  <Box sx={{ display: "flex", gap: 2, my: 2 }}>
    {/* Pagination Controls */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        gap: "15px",
      }}
    >
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: currentPage === 1 ? "#ccc" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "background 0.3s ease",
        }}
      >
        Previous
      </button>

      <span
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#333",
          backgroundColor: "#d0d0d0",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: currentPage === totalPages ? "#ccc" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "background 0.3s ease",
        }}
      >
        Next
      </button>
    </div>
  </Box>

  <h1 style={{ textAlign: "center" }}>Similar posts for {searchTag}</h1>

  {/* Centered Grid for Posts */}
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="stretch"
      sx={{ width: "80%" }} // Limits width to keep posts centered
    >
      {currentPosts?.map((post1, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ProfilePostCard posts={post1} />
        </Grid>
      ))}
    </Grid>
  </Box>
</Box>

    </>
  );
}
// Wrap with React.memo and export as default
export default React.memo(TagPage);
