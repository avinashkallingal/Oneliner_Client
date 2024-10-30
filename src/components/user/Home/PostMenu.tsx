import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReportIcon from "@mui/icons-material/Report";
import { toast } from "sonner";
import ViewPost from "./ViewPost";
import { useState, useEffect } from "react";
import EditPost from "./EditPost";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Constarints/axios/userAxios";
import Swal from "sweetalert2";

export default function PostMenu({ postData }: any) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const handleViewPostClick = (post: any) => {
    
    navigate("/viewPost", { state: { post } });
  }
 
  // const handleEditPost=(postData:any)=>{

  //   console.log(postData," handle edit function")
  //   setEditPost(postData)

  // }
  const handlePostEdit = (post: any) => {
    toast.info("edit post clicked");
    // navigate('/componentB',{state:{id:1,name:'sabaoon'}})
    navigate("/editPost", { state: { post } });
  };
  const userCheck = (post: any) => {
    return id == post.userId;
  };
  const handleReportPost = (post: any) => {
    toast.info("report post clicked");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this POST!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.put(
            "http://localhost:4000/post/reportPost",
            { postId: post._id, reportUserId: id }
          );

          // Check if the response is successful
          if (response.data.success === true) {
            console.log(response.data," response data of report post")
            await Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
           toast.success("Reported Successfully")
          } else {
            Swal.fire({
              title: "Error!",
              text: "The post could not be deleted.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the post.",
            icon: "error",
          });
        }
      }
    });
  };

  const handlePostDelete = async (post: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this POST!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post(
            "http://localhost:4000/post/deletePost",
            { postId: post._id, imageKey: post.imageUrl, pdfKey: post.pdfUrl }
          );

          // Check if the response is successful
          if (response.data.success === true) {
            await Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            navigate("/");
          } else {
            Swal.fire({
              title: "Error!",
              text: "The post could not be deleted.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the post.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem onClick={() => handleViewPostClick(postData)}>
          <ListItemDecorator>
            <VisibilityIcon />
          </ListItemDecorator>
          View Post
        </MenuItem>

        {userCheck(postData) && (
          <MenuItem onClick={() => handlePostEdit(postData)}>
            <ListItemDecorator>
              <Edit />
            </ListItemDecorator>{" "}
            Edit post
          </MenuItem>
        )}
        {!userCheck(postData) && (
          <MenuItem onClick={() => handleReportPost(postData)}>
            <ListItemDecorator>
              <ReportIcon style={{ color: "red", cursor: "pointer" }} />
            </ListItemDecorator>{" "}
            Report post
          </MenuItem>
        )}
        <ListDivider />
        {userCheck(postData) && (
          <MenuItem
            variant="soft"
            color="danger"
            onClick={() => handlePostDelete(postData)}
          >
            <ListItemDecorator sx={{ color: "inherit" }}>
              <DeleteForever />
            </ListItemDecorator>{" "}
            Delete
          </MenuItem>
        )}
      </Menu>
    </Dropdown>
  );
}
