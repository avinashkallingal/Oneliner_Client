// import * as React from "react";
// import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Dialog from "@mui/material/Dialog";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { blue } from "@mui/material/colors";
// import PersonIcon from "@mui/icons-material/Person";
// import axiosInstance from "../../../Constarints/axios/userAxios";
// import { toast } from "sonner";
// import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";
// import Navbar from "./Navbar";
// import { IUser } from "../../../Interfaces/Iuser";

// export interface SimpleDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// export const SimpleDialog = React.memo((props: SimpleDialogProps) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
//   // const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value;
//     setSearchQuery(query);

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }

//     if (query.trim() === "") {
//       setFilteredUsers([]);
//       // setLoading(false);
//       return;
//     }

//     debounceTimeout.current = setTimeout(async () => {
//       // setLoading(true);
//       try {
//         const response = await axiosInstance.get(userEndpoints.searchUsers, {
//           params: { q: query },
//         });
//         if (response.data.result.success) {
//           setFilteredUsers(response.data.result.user_data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         // setLoading(false);
//       }
//     }, 1000);
//   };

//   const { onClose, open } = props;

//   const handleClose = () => {
//     onClose();
//   };

//   const handleListItemClick = async (id: any) => {
//     toast.info("Action successful!")
//     try {
//       navigate("/userProfile", { replace: true, state: { id } });
//       location.href="/userProfile"
//     } catch (error) {

//       toast.error("Something went wrong");
//     }
//   };

// console.log(filteredUsers," filtererd users in search bar&&&&&&&&&&&&&&&&&")
//   return (<>

//     <Dialog
//       onClose={handleClose}
//       open={open}

//       fullScreen // Makes the dialog occupy the full screen
//       sx={{
//         marginTop: '2.5%', // Adjust this value as needed
//         '& .MuiDialog-paper': {
//           marginTop: '2.5%', // Ensures the dialog content respects the margin
//         },
//       }}
//     >
//        <Navbar/>
//       {/* Close Button */}
//       <Button
//   onClick={handleClose}
//   sx={{
//     position: "absolute",
//     top: 20,
//     right: 8,

//     color: "white",
//     fontSize: "1.5rem", // Larger font size
//     width: "2vw", // Increase button size
//     height: "8vh", // Increase button size
// backgroundColor: "red",
//     zIndex: 2,
//     '&:hover': {
//       backgroundColor: "darkred", // Darker red on hover
//     },
//   }}
// >
//   ✖
// </Button>

//       {/* Search Input */}
//       <Box
//         component="form"
//         sx={{
//           "& > :not(style)": { m: 1, width: "25ch" },
//           p: 2,
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <TextField
//           id="standard-basic"
//           label="Search Users Here..."
//           variant="standard"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </Box>

//       {/* Users List */}
//       <List sx={{ pt: 0 }}>
//         {filteredUsers && filteredUsers.length > 0 ? (
//           filteredUsers.map((user, index) => (
//             <ListItem disableGutters key={index}>
//               <ListItemButton onClick={() => handleListItemClick(user._id)}>
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
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             sx={{ padding: 2, textAlign: "center" }}
//           >
//             No match found
//           </Typography>
//         )}
//       </List>
//     </Dialog>
//     </>
//   );
// })

import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { toast } from "sonner";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";
import Navbar from "./Navbar";
import { IUser } from "../../../Interfaces/Iuser";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SimpleDialog = React.memo((props: SimpleDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (query.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axiosInstance.get(userEndpoints.searchUsers, {
          params: { q: query },
        });
        if (response.data.result.success) {
          setFilteredUsers(response.data.result.user_data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }, 1000);
  };

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = async (id: any) => {
    toast.info("Action successful!");
    try {
      navigate("/userProfile", { replace: true, state: { id } });
      location.href = "/userProfile";
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullScreen
        sx={{
          marginTop: "2.5%",
          "& .MuiDialog-paper": {
            marginTop: "2.5%",
          },
        }}
      >
        <Navbar />

        {/* Close Button */}
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 8,
            color: "white",
            fontSize: "1.5rem",
            width: "2vw",
            height: "8vh",
            backgroundColor: "red",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
        >
          ✖
        </Button>

        {/* Search Input */}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            p: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Search Users Here..."
            variant="standard"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        {/* Users List in Card Format */}
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="User Image"
                    height="140"
                    image={
                      user.profilePicture ||
                      "http://www.gravatar.com/avatar/?d=mp"
                    } // Fallback image if user doesn't have one
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {user.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 1, // Limits the text to 2 lines
                      }}
                    >
                      About: {user.about}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Followers: {user.followers.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Following: {user.followings.length}
                    </Typography>
                  </CardContent>
                  <Button
                    fullWidth
                    onClick={() => handleListItemClick(user._id)}
                    sx={{ backgroundColor: blue[500], color: "white" }}
                  >
                    View Profile
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ padding: 2, textAlign: "center", width: "100%" }}
            >
              No match found
            </Typography>
          )}
        </Grid>
      </Dialog>
    </>
  );
});
