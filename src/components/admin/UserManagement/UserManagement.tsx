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
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import Swalert from "sweetalert2";
import axiosInstance from "../../../Constarints/axios/adminAxios";
import { useNavigate } from "react-router-dom";

interface User {
  id?: number;
  username?: string;
  email?: string;
  gender?: string;
  isBlocked?: boolean;
}

const initialUsers: User[] = [
  { id: 1, email: "user1@example.com", gender: "Male", isBlocked: false },
  { id: 2, email: "user2@example.com", gender: "Female", isBlocked: false },
  { id: 3, email: "user3@example.com", gender: "Male", isBlocked: false },
  { id: 4, email: "user4@example.com", gender: "Female", isBlocked: false },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [block, setBlock] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:4000/admin/userList"
        );
        console.log(response.data.userData, "hiiii avi  this response");
        setBlock(response.data.userData.isBlocked);
        console.log(response.data.userData.isBlocked, " block response");
        console.log(block, " block state variable");
        setUsers(response.data.userData); // Update rows with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // } finally {
        //   setSpinner(false);
      }
    };

    fetchData();

    //
  }, [block]);

  const toggleBlockUser = async (email: string) => {
  try{
    const result = await axiosInstance.post("http://localhost:4000/admin/userBlock", {
      email: email,
      isBlocked: !users.isBlocked,
    });
    console.log(result, " result from backend");
    console.log(result.error,"result from token auth")
    if(result.error==401){
      console.log(" token expired");
      toast.info(result.data.message);
      navigate("/admin/login")
    }
    if (result.data.blocked) {
      console.log(" user blocked");
      toast.info("Blocked");
      setBlock(true);
    } else {
      setBlock(false);
      console.log(" user unblocked");
      toast.info("Unblocked");
    }
    if (!result.data.message) {
      console.log("error in user blocking");
      toast.error(result.data.message);
    }
  }catch(error:any){
    //
   
      if (error.response.status != 200) {
        console.error("Error while updating profile:", error);
        toast.error("unauthorized access");
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
      }
    //
  }
  };

  const toggleViewDetails = async (email: string) => {
    console.log(email, "email from button");
    console.log(users, "user list in react sta");
    const userDetail = users.filter((user) => user.email === email);
    console.log(userDetail, " filter user details");
    Swalert.fire({
      title: "User Details",
      html: `
      <div style="text-align: left;">
        <p><strong>Username:</strong> ${userDetail[0].username}</p>
        <p><strong>Email:</strong> ${userDetail[0].email}</p>
        <p><strong>Gender:</strong> ${userDetail[0]?.gender ?? "not added"}</p>
      </div>`,

      imageUrl: `${userDetail[0].profilePicture}`,
      imageWidth: 200,
      imageHeight: 100,
      imageAlt: "Custom image",
    });
  };
  //

  //

  return (
    <Box p={3} sx={{ width: "100vh" }}>
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
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender??"Not added"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleViewDetails(`${user.email}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked || block ? "error" : "secondary"}
                    onClick={() => toggleBlockUser(`${user.email}`)}
                    // onClick={() => toggleBlockUser(user.id)}
                  >
                    {user.isBlocked || block ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
