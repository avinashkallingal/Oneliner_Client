import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StoreIcon from "@mui/icons-material/Store";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {show as showCahatBox} from "../../../redux/Slice/ChatSlice";
import {hide as hideCahatBox} from "../../../redux/Slice/ChatSlice";
import SocketService from "../../../socket/SocketService";
import { toast } from "sonner";
import AnchorTemporaryDrawer from "./NotificationDrawer";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axiosInstance from "../../../Constarints/axios/userAxios";
import mongoose, { Mongoose } from "mongoose";
import { SimpleDialog } from "./SearchBox";



const pages = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Search", icon: <SearchIcon /> },
  // { name: "Chats", icon: <ChatIcon /> },
  { name: "Add Post", icon: <AddBoxIcon /> },
  // { name: "Find Writers", icon: <PeopleIcon /> },
  { name: "Notifications", icon: <NotificationsIcon /> },
  // { name: "Store", icon: <StoreIcon /> },
];

export default function Navbar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [notificationData,setNotificationData]=React.useState<any>([]);
  const [notificationFlag, setNotificationFlag] = React.useState<boolean>(false);
  const id=localStorage.getItem("id")
  const [readButtonFlag, setReadButtonFlag] = React.useState<boolean>(false);
  const [searchFlag,setSearchFlag] = React.useState<boolean>(false);



  React.useEffect(()=>{
    SocketService.connect()
    SocketService.emitUserOnlineStatus(`${id}`)
    SocketService.onNewNotification((notification)=>{
      console.log(notification," notification in useeffect socket fuction")
      if(notification.senderId==id){
      toast.info(notification.message)}
    
    })
    return(
     
          SocketService.disconnect()
          
         )
  },[])
  

const fetchNotificationData=async()=>{
  const result=await axiosInstance.get("http://localhost:4000/message/getNotification",{params:{id}})
  console.log(result.data," result of notification data")
  if(result.data.data){
    setNotificationData(result.data.data)
    setReadButtonFlag(true)
  }else{
    console.log("error fetching notification data")
    // toast.error("error fetching notification data")
    setReadButtonFlag(false)
    setNotificationData([{message:"NO notification"}])
  }
}



  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const data1=useSelector((state:any)=>state.ChatDisplay.chatBoxDisplay)
  const handleNavigate = (path: string) => {
    if(path=="/notifications"){
      console.log(path," navbar paths")
      fetchNotificationData()
     setNotificationFlag(true)
      
      // dispatch(showCahatBox({token:null,userData:null}))
      console.log(data1," selected data from redux")
     
    }else if(path=="/search"){
    
      setSearchFlag(true)
    }
    else{
      console.log(path," navbar paths")
      navigate(path);  // Navigate to the path when a button is clicked
      handleCloseNavMenu();  // Close the navigation menu (for small screens)
    }
   
  };

  const handleCloseUserMenu = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("email")
    localStorage.removeItem("userRefreshToken")
    navigate("/")
    // setAnchorElUser(null);
  };

  const handleUserProfileClick=()=>{
    navigate('/userProfile',{ state: { id } })
  }

  
  const handleUserProfileClickOnNorification=(id:any)=>{
    const newId = new mongoose.Types.ObjectId(id);
    navigate('/userProfile',{ state: { id } })
  }
const readNotification=async (notificationId:any)=>{
  const result=await axiosInstance.get("http://localhost:4000/message/readNotification",{params:{id:notificationId}})
  if(result.data){
    toast.info("notification cleared")
    setNotificationData([])
  //   setNotificationData((prevData) =>
  //     prevData.filter((notification) => notification.senderId !== notificationId)
  // );
  }
}

//


// const list = (anchor:"top") => (
//   <Box
//     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//     role="presentation"
//     // onClick={toggleDrawer(anchor, false)}
//     // onKeyDown={toggleDrawer(anchor, false)}
//   >
//        <List>   

//       {notificationData.map((notification: any) => (
//     <ListItem key={notification._id || notification.index} disablePadding>
//         <ListItemButton>
//             <ListItemText primary={notification.message} />
//             {readButtonFlag && (
//                 <div>
                   
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         color="secondary"
//                         onClick={() => handleUserProfileClickOnNorification(notification.userId)}
//                         style={{ marginLeft: "8px" }}
//                     >
//                         View Profile
//                     </Button>
//                 </div>
//             )}
            
//         </ListItemButton>
//     </ListItem>
    
// ))}
//     </List>
//     {readButtonFlag&&(<Button
//                         variant="contained"
//                         size="small"
//                         color="primary"
//                         onClick={() => readNotification(id)}
//                     >
//                         Mark as Read
//                     </Button>)}
//   </Box>


const list = (anchor: string) => (
  <Box
    sx={{
      width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      bgcolor: "#f9f9f9", // Subtle background color for better contrast
      padding: "16px",
      borderRadius: "4px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    }}
    role="presentation"
  >
    <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
      Notifications
    </Typography>
    <List>
      {notificationData.map((notification: any) => (
        <ListItem
          key={notification._id || notification.index}
          disablePadding
          sx={{
            mb: "8px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            bgcolor: "white",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <ListItemButton sx={{ flexDirection: "column", alignItems: "center" }}>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500, textAlign: "center" }}>
                  {notification.message}
                </Typography>
              }
            />
            {readButtonFlag && (
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => handleUserProfileClickOnNorification(notification.userId)}
                sx={{ mt: 1 }}
              >
                View Profile
              </Button>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    {readButtonFlag && (
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => readNotification(id)}
        sx={{
          display: "block",
          mx: "auto",
          mt: 2,
          paddingX: "16px",
        }}
      >
        Mark All as Read
      </Button>
    )}
  </Box>
);

const toggleDrawer = () => {
  setNotificationFlag(false);
};

const handleCloseSearch=()=>{
  setSearchFlag(false)
}

//

  return (
    <>
    <AppBar  position="fixed" sx={{ bgcolor: "#D3A221" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
        >
          Oneliner
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <IconButton color="inherit">
                  {page.icon}
                </IconButton>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => handleNavigate(`/${page.name.toLowerCase().replace(/\s/g, '-')}`)}
              sx={{ my: 2, color: "white", display: "flex", alignItems: "center" }}
             
            >
              {page.icon}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {page.name}
              </Typography>
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <IconButton onClick={handleUserProfileClick} sx={{ p: 0 }}>
              <Avatar alt="Profile" src="" />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
    {notificationFlag&&<>
      <div>
      { (
        <React.Fragment key="top">
          {/* <Button onClick={toggleDrawer("top", true)}></Button> */}
          <Drawer
            anchor="top"
            open={true}
            onClose={()=>toggleDrawer()}
            
          >
            {list("top")}
          </Drawer>
        </React.Fragment>
      )}
    </div>

    </>}
    {searchFlag&&<>
      <div>
      { (
        <React.Fragment key="top">
          {/* <Button onClick={toggleDrawer("top", true)}></Button> */}
          <SimpleDialog       
        open={searchFlag}
        onClose={handleCloseSearch}
      />
        </React.Fragment>
      )}
    </div>

    </>}
    </>
  );
}
