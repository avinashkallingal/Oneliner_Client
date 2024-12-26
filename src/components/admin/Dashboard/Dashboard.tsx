import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";
import { adminEndpoints } from "../../../Constarints/endpoints/adminEndpoints";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axiosInstance.get(adminEndpoints.userList);
        if (result.data.userData) {
          setUsers(result.data.userData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      try {
        const genre = "All";
        const resultPosts = await axiosInstance.get(
          postEndpoints.getPosts(genre)
        );
        setPosts(resultPosts.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchData();
  }, []);

  // Calculate user count by month
  const userCountByMonth = users.reduce((acc, user) => {
    const createdAt = new Date(user.created_at);
    const month = createdAt.toLocaleString("default", { month: "long" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const userLabels = Object.keys(userCountByMonth);
  const userData = Object.values(userCountByMonth);

  const userChartData = {
    labels: userLabels,
    datasets: [
      {
        label: "User Count",
        data: userData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Calculate post count by month
  const postCountByMonth = posts.reduce((acc, post) => {
    const createdAt = new Date(post.created_at);
    const month = createdAt.toLocaleString("default", { month: "long" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const postLabels = Object.keys(postCountByMonth);
  const postData = Object.values(postCountByMonth);

  const postChartData = {
    labels: postLabels,
    datasets: [
      {
        label: "Post Count",
        data: postData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Calculate genre-wise post count
  const genreCount = posts.reduce((acc, post) => {
    const genre = post.genre || "Unknown";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const genreLabels = Object.keys(genreCount);
  const genreData = Object.values(genreCount);

  const genreChartData = {
    labels: genreLabels,
    datasets: [
      {
        data: genreData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Calculate post count by day
  const postCountByDay = posts.reduce((acc, post) => {
    const createdAt = new Date(post.created_at);
    const day = createdAt.toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const dayLabels = Object.keys(postCountByDay);
  const dayData = Object.values(postCountByDay);

  const postByDayChartData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Posts by Day",
        data: dayData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Posts Count by Day",
      },
    },
  };

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        {/* User Count and Post Count */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              p={4}
              bgcolor="primary.light"
              borderRadius={1}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="h5">User Count</Typography>
              <Typography variant="h4">{users.length}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              p={4}
              bgcolor="secondary.light"
              borderRadius={1}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="h5">Post Count</Typography>
              <Typography variant="h4">{posts.length}</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* User Count Bar Chart */}
        <Grid item xs={12} md={6}>
          <Box p={4} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="h5" gutterBottom>
              User Creation Count by Month
            </Typography>
            <Bar
              data={userChartData}
              options={{
                ...chartOptions,
                plugins: {
                  title: {
                    display: true,
                    text: "User Creation Count",
                  },
                },
              }}
            />
          </Box>
        </Grid>

        {/* Post Count Bar Chart */}
        <Grid item xs={12} md={6}>
          <Box p={4} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="h5" gutterBottom>
              Post Creation Count by Month
            </Typography>
            <Bar
              data={postChartData}
              options={{
                ...chartOptions,
                plugins: {
                  title: {
                    display: true,
                    text: "Post Creation Count",
                  },
                },
              }}
            />
          </Box>
        </Grid>

        {/* Posts by Day Bar Chart */}
        <Grid item xs={6} md={6}>
          <Box p={4} height={500} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="h5" gutterBottom>
              Posts Count by Day
            </Typography>
            <Bar
              data={postByDayChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Posts Count by Day",
                  },
                  legend: {
                    display: false, // Set to true if you have multiple datasets and want a legend
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Days of the Week", // Customize as needed
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Number of Posts", // Customize as needed
                    },
                  },
                },
              }}
            />
          </Box>
        </Grid>

        {/* Genre-wise Pie Chart */}
        <Grid item xs={6}>
          <Box p={4} height={500} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="h5" gutterBottom>
              Genre-wise Post Distribution
            </Typography>
            <Pie
              data={genreChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Genre-wise Post Distribution",
                  },
                  legend: {
                    display: true, // Optional: Customize legend visibility
                    position: "top", // Example: Set position of legend
                  },
                },
              }}
            />
          </Box>
        </Grid>

        {/* Recent Users */}
        <Grid item xs={12}>
          <Box
            p={4}
            bgcolor="grey.100"
            borderRadius={1}
            textAlign="center"
            display="flex"
            flexDirection="column"
          >
            <Typography variant="h5" gutterBottom>
              Recent Users
            </Typography>
            <List>
              {users
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .slice(0, 5)
                .map((user, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={user.username || "Unnamed User"}
                      secondary={`Joined: ${new Date(
                        user.created_at
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
