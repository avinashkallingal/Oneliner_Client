// import * as React from "react";
// import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
// import Typography from "@mui/material/Typography";
// import { blue } from "@mui/material/colors";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useState, useRef } from "react";
// import axiosInstance from "../../../Constarints/axios/userAxios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";

// const emails = ["username@gmail.com", "user02@gmail.com"];

// export interface SimpleDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// export function SimpleDialog(props: SimpleDialogProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   // Use useRef to persist debounceTimeout across renders
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value;
//     setSearchQuery(query);

//     // Clear the previous timeout if it exists
//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }

//     if (query.trim() === "") {
//       setFilteredUsers([]);
//       setLoading(false);
//       return;
//     }

//     // Set a new timeout for the debounce delay
//     debounceTimeout.current = setTimeout(async () => {
//       setLoading(true);

//       try {
//         // Replace with your backend API endpoint
//         const response = await axiosInstance.get(
//           userEndpoints.searchUsers,
//           {
//             params: { q: query },
//           }
//         );

//         // Update the filtered users with the API response
//         console.log(
//           response.data.result.user_data.data,
//           " data got in fromnt end after search $$$$$$$$$$$$$$$$$$$$$$$"
//         );
//         if (response.data.result.success) {
//           setFilteredUsers(response.data.result.user_data.data); // Assuming the backend sends { users: [...] }
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     }, 2000); // 2-second debounce delay
//   };

//   const { onClose, open } = props;

//   const handleClose = () => {
//     onClose();
//   };

//   //   const handleListItemClick = (value: string) => {
//   //     onClose();
//   //   };

//   const handleListItemClick = async (id: any) => {
//     try {
//       navigate("/userProfile", { state: { id } });
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
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
//         <TextField
//           id="standard-basic"
//           label="Search Users Here..."
//           variant="standard"
//           value={searchQuery}
//           onChange={handleSearchChange} // Attach the onChange handler
//         />
//       </Box>
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
//           <Typography variant="body2" color="textSecondary" sx={{ padding: 2 }}>
//             No match found
//           </Typography>
//         )}
//         {/* <ListItem disableGutters>
//           <ListItemButton
//             autoFocus
//             onClick={() => handleListItemClick('addAccount')}
//           >
//             <ListItemAvatar>
//               <Avatar>
//                 <AddIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Add account" />
//           </ListItemButton>
//         </ListItem> */}
//       </List>
//     </Dialog>
//   );
// }
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

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}


export function SimpleDialog(props: SimpleDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  // const [loading, setLoading] = useState(false);

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
      // setLoading(false);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      // setLoading(true);
      try {
        const response = await axiosInstance.get(userEndpoints.searchUsers, {
          params: { q: query },
        });
        if (response.data.result.success) {
          setFilteredUsers(response.data.result.user_data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        // setLoading(false);
      }
    }, 2000);
  };

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = async (id: any) => {
    try {
      navigate("/userProfile", { state: { id } });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
console.log(filteredUsers," filtererd users in search bar&&&&&&&&&&&&&&&&&")
  return (<>
 
    <Dialog
      onClose={handleClose}
      open={open}
    
      fullScreen // Makes the dialog occupy the full screen
      sx={{
        marginTop: '2.5%', // Adjust this value as needed
        '& .MuiDialog-paper': {
          marginTop: '2.5%', // Ensures the dialog content respects the margin
        },
      }}
    >
       <Navbar/>
      {/* Close Button */}
      <Button
  onClick={handleClose}
  sx={{
    position: "absolute",
    top: 20,
    right: 8,
    
    color: "white",
    fontSize: "1.5rem", // Larger font size
    width: "2vw", // Increase button size
    height: "8vh", // Increase button size
backgroundColor: "red",
    zIndex: 2,
    '&:hover': {
      backgroundColor: "darkred", // Darker red on hover
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

      {/* Users List */}
      <List sx={{ pt: 0 }}>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <ListItem disableGutters key={index}>
              <ListItemButton onClick={() => handleListItemClick(user._id)}>
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
            sx={{ padding: 2, textAlign: "center" }}
          >
            No match found
          </Typography>
        )}
      </List>
    </Dialog>
    </>
  );
}
