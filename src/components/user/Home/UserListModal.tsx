// // import React, { useState } from "react";

// // import { toast } from "sonner";
// import Navbar from "./Navbar";
// import Dialog from "@mui/material/Dialog";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { useEffect, useState } from "react";
// import axiosInstance from "../../../Constarints/axios/userAxios";
// import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";
// import Avatar from "@mui/material/Avatar";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Typography from "@mui/material/Typography";
// import PersonIcon from "@mui/icons-material/Person";
// import { blue } from '@mui/material/colors';

// export interface SimpleDialogProps {
//   open: boolean;
//   onClose: () => void;
//   postId:string
// }

// function LikedUsersModal(props: SimpleDialogProps) {
//   const { onClose, open,postId } = props;
//   const [listData,setlistData]=useState([])


//   useEffect(()=>{
//    const fetchlistData=async()=>{
//     const list:any = await axiosInstance.get(postEndpoints.listData,{params:{postId},});
    
//     console.log(list.data.like_data,"llist of liked users")
//     if(list){

//       setlistData(list.data.like_data)
//     }
//     }
//     fetchlistData()
    
//   },[])
//   console.log("hiii iam like list component");
//   const handleClose = () => {
//     onClose();
//   };


//   return (
//     <Dialog onClose={handleClose} open={open}>
//       {/* <DialogTitle>Set backup account</DialogTitle> */}
//       <Box
//         component="form"
//         sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
//         noValidate
//         autoComplete="off"
//       >
//         {/* <TextField id="standard-basic" label="Search Users....." variant="standard" /> */}
//       </Box>
//       <Button
//         onClick={handleClose}
//         sx={{
//           position: "absolute",
//           top: 20,
//           right: 8,

//           color: "white",
//           fontSize: "1.5rem", // Larger font size
//           width: "2vw", // Increase button size
//           height: "8vh", // Increase button size
//           backgroundColor: "red",
//           zIndex: 2,
//           "&:hover": {
//             backgroundColor: "darkred", // Darker red on hover
//           },
//         }}
//       >
//         ✖
//       </Button>

//    <List sx={{ pt: 0 }}>
//         {listData && listData.length > 0 ? (
//           listData.map((user, index) => (
//             <ListItem disableGutters key={index}>
//               <ListItemButton >
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
//                     <PersonIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary={user.username} />
//               </ListItemButton>
//             </ListItem>
//           ))
//         ) : (
//           <Typography variant="body2" color="textSecondary" sx={{ padding: 2 }}>
//             No match found
//           </Typography>
//         )}
    
//       </List>
//       <h1>hiiiii</h1>
//     </Dialog>
//   );
// }

// export default LikedUsersModal;

// import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { blue, grey } from "@mui/material/colors";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title:string;
  listData: any;
}

function UserListModal(props: SimpleDialogProps) {
  const { onClose, open,title, listData } = props;

  const navigate=useNavigate()



  const handleClose = () => {
    onClose();
  };

  const handleUserClick = async (id: string) => {
    try {
      navigate("/userProfile", { state: { id } });
      location.href="/userProfile"
      console.log(id," this is post id %%%%%%%%%%%%")
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="xs" // Adjust modal width
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4, // Rounded corners
          backgroundColor: grey[100], // Light background
        },
      }}
    >
      <Box sx={{ position: "relative", padding: "1rem 2rem" }}>
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            fontSize: "1.2rem",
            width: "2rem",
            height: "2rem",
            backgroundColor: "red",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
        >
          ✖
        </Button>
        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
          {title}
        </Typography>
        <List sx={{ maxHeight: "50vh", overflowY: "auto", padding: 0 }}>
          {listData && listData.length > 0 ? (
            listData.map((user, index) => (
              <ListItem disableGutters key={index}>
                <ListItemButton onClick={()=>handleUserClick(user._id)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                textAlign: "center",
                marginTop: 2,
                fontStyle: "italic",
              }}
            >
              No {title} found.
            </Typography>
          )}
        </List>
      </Box>
    </Dialog>
  );
}

export default UserListModal;

