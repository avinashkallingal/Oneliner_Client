import React, { useState, useEffect } from "react";
import axios from "axios";

function InfiniteScrollComponent() {
  const [posts, setPosts] = useState([]); // State to store posts
  const [page, setPage] = useState(1); // Current page for API
  const [isLoading, setIsLoading] = useState(false); // Loading status
  const [hasMore, setHasMore] = useState(true); // If more data is available

  // Fetch posts from API
  const fetchPosts = async () => {
    if (isLoading || !hasMore) return; // Avoid multiple requests
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      const newPosts = response.data;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new data
      setPage((prevPage) => prevPage + 1); // Increment page number

      if (newPosts.length === 0) {
        setHasMore(false); // Stop loading if no more data
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetchPosts on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isLoading, hasMore]);

  return (
    <div>
      <h1>Infinite Scrolling with API</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li> // Adjust key as per unique ID
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </div>
  );
}

export default InfiniteScrollComponent;
