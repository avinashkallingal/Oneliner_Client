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

export default function PostMenu({ postData }: any) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const navigate=useNavigate()

  const handleViewPostClick = (postData: any) => {
    setSelectedPost(postData); // Set the selected post
  };
  if (selectedPost) {
  }
  // const handleEditPost=(postData:any)=>{

  //   console.log(postData," handle edit function")
  //   setEditPost(postData)

  // }
  const handlePostEdit=(post:any)=>{
    toast.info("edit post clicked");
    // navigate('/componentB',{state:{id:1,name:'sabaoon'}})
    navigate('/editPost',{state:{post}})
    
  }
  
  const handlePostDelete=async(post:any)=>{
    
    console.log(post," posts in front end")
    
    // const result:any=await axiosInstance.post("http://localhost:4000/post/deletePost",{post._id})
    const result = await axiosInstance.post("http://localhost:4000/post/deletePost", { postId: post._id });
    if(result.data.success){

      toast.info("post deleted ");
      navigate('/')
      
    }

    

    // navigate('/editPost',{state:{post}})
    
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        {/* <MenuItem onClick={() => handleViewPostClick(postData)}>
          <ListItemDecorator>
            <VisibilityIcon />
          </ListItemDecorator>
          View Post
        </MenuItem> */}
        <MenuItem onClick={() => handlePostEdit(postData)}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{" "}
          Edit post
        </MenuItem>
        {/* <MenuItem>
          <ListItemDecorator>
            <ReportIcon style={{ color: "red", cursor: "pointer" }} />
          </ListItemDecorator>{" "}
          Report post
        </MenuItem> */}

        <ListDivider />
        <MenuItem variant="soft" color="danger" onClick={() => handlePostDelete(postData)}>
          <ListItemDecorator sx={{ color: "inherit" }}>
            <DeleteForever />
          </ListItemDecorator>{" "}
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
