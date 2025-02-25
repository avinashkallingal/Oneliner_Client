import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Pagination,
} from "@mui/material";
import Swalert from "sweetalert2";
import axiosInstance from "../../../Constarints/axios/adminAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HttpStatus } from "../../../Interfaces/StatusCode";
import { adminEndpoints } from "../../../Constarints/endpoints/adminEndpoints";

interface User {
  id?: number;
  username?: string;
  email?: string;
  gender?: string;
  isBlocked?: boolean;
  profilePicture?:string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [block] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const usersPerPage = 5; // Limit of 5 users per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          adminEndpoints.userList
        );
        setUsers(response.data.userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [block]);

  const toggleBlockUser = async (email: string) => {
    try {
      const result = await axiosInstance.post(
       adminEndpoints.userBlock,
        { email, isBlocked: !block }
      );

      //udpating specific user only
      console.log(result.data,"result in admin usr management daata************")
      console.log(users,"user data111111111111111111111111111")
      if (result.data.user_data._id) {
        setUsers((prevUsers) => {
          const index = prevUsers.findIndex((user:any) => user._id === result.data.user_data._id);
          if (index === -1) return prevUsers; // If not found, return unchanged state
  
          // Create a new array with the updated user
          const updatedUsers = [...prevUsers];
          updatedUsers[index] = {
            ...updatedUsers[index],
            isBlocked: result.data.blocked,
          };
  
          return updatedUsers;
        });
  
        toast.info(result.data.blocked ? "Blocked" : "Unblocked");
      }


      // if (result.data.blocked) {
      //   toast.info("Blocked");
      //   setBlock(true);
      // } else {
      //   toast.info("Unblocked");
      //   setBlock(false);
      // }
    } catch (error: any) {
      if (error.response?.status !== HttpStatus.OK) {
        toast.error("Unauthorized access");
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        navigate("/admin/login");
      }
    }
  };

  const toggleViewDetails = (email: string) => {
    const userDetail = users.find((user) => user.email === email);
    if (userDetail) {
      Swalert.fire({
        title: "User Details",
        html: `
          <div style="text-align: left;">
            <p><strong>Username:</strong> ${userDetail.username}</p>
            <p><strong>Email:</strong> ${userDetail.email}</p>
            <p><strong>Gender:</strong> ${userDetail.gender ?? "Not added"}</p>
          </div>`,
        imageUrl: `${userDetail.profilePicture}`,
        imageWidth: 200,
        imageHeight: 100,
        imageAlt: "Custom image",
      });
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(users.length / usersPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box p={3} sx={{ width: "100%" }}>
      <Typography variant="h5" mb={2}>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{(currentPage - 1) * usersPerPage + index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender ?? "Not added"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleViewDetails(user.email!)}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked || block ? "error" : "secondary"}
                    onClick={() => toggleBlockUser(user.email!)}
                  >
                    {user.isBlocked || block ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UserList;
