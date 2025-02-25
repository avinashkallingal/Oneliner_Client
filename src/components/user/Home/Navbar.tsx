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

import AddBoxIcon from "@mui/icons-material/AddBox";

import NotificationsIcon from "@mui/icons-material/Notifications";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SocketService from "../../../socket/SocketService";
import { toast } from "sonner";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

import axiosInstance from "../../../Constarints/axios/userAxios";
import { SimpleDialog } from "./SearchBox";
import { recieve as recieveCall } from "../../../redux/Slice/VideoChatSlice";
import VideoChat from "./VideoChat";
import IncomingCallWindow from "./CallAccept";
import { messageEndpoints } from "../../../Constarints/endpoints/messageEndPoints";
import { Badge } from "@mui/material";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [notificationData, setNotificationData] = React.useState<any>([]);
  const [notificationFlag, setNotificationFlag] =
    React.useState<boolean>(false);
  const id = localStorage.getItem("id");
  const [readButtonFlag, setReadButtonFlag] = React.useState<boolean>(false);
  const [searchFlag, setSearchFlag] = React.useState<boolean>(false);
  const [videoChatFlag, setVideoChatFlag] = React.useState<boolean>(false);
  const [callAcceptWindowFlag, setCallAcceptWindowFlag] =
    React.useState<boolean>(false);
  const [callerName, setCallerName] = React.useState<string | null>(null);
  const [notificationCount, setNotificationCount] = React.useState<
    number | null
  >(0);

  React.useEffect(() => {
    fetchNotificationData()
    SocketService.connect();
    SocketService.emitUserOnlineStatus(`${id}`);
    SocketService.onNewNotification((notification) => {
      console.log(notification, " notification in useeffect socket fuction");
      fetchNotificationData()
      if (notification.senderId == id) {
        toast.info(notification.message);
      }
    });
    // return SocketService.disconnect();
  }, []);

  //useEffect for recieving call and showing call accept window
  React.useEffect(() => {
    // Handle incoming call
    SocketService.receiveCallUser((data) => {
      console.log(data, "data in receive user call^^^^^^^^^");
      // setReceivingCall(true);
      // setCaller(data.from);
      // setName(data.name);
      // setCallerSignal(data.signal);
      dispatch(
        recieveCall({
          receivingCall: true,
          caller: data.from,
          name: data.name,
          callerSignal: data.signal,
        })
      );
      setCallAcceptWindowFlag(true);
      setCallerName(data.name);
      //  setVideoChatFlag(true)
    });
  }, []);

  const fetchNotificationData = async () => {
    const result = await axiosInstance.get(messageEndpoints.getNotification, {
      params: { id },
    });
    console.log(result.data, " result of notification data");
    if (result.data.data) {
      setNotificationData(result.data.data);
      setNotificationCount(result.data.data.length);
      // toast.info(`${notificationCount} number`)
      setReadButtonFlag(true);
    } else {
      console.log("error fetching notification data");
      // toast.error("error fetching notification data")
      setReadButtonFlag(false);
      setNotificationData([{ message: "NO notification" }]);
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const data1 = useSelector((state: any) => state.ChatDisplay.chatBoxDisplay);

  const handleNavigate = (path: string) => {
    if (path == "/notifications") {
      console.log(path, " navbar paths");
      fetchNotificationData();
      setNotificationFlag(true);

      // dispatch(showCahatBox({token:null,userData:null}))
      console.log(data1, " selected data from redux");
    } else if (path == "/search") {
      setSearchFlag(true);
      // navigate("/search")
    } else {
      console.log(path, " navbar paths");
      navigate(path); // Navigate to the path when a button is clicked
      handleCloseNavMenu(); // Close the navigation menu (for small screens)
    }
  };

  const handleCloseUserMenu = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userRefreshToken");
    navigate("/");
    // setAnchorElUser(null);
  };

  const handleUserProfileClick = () => {
    navigate("/userProfile", { state: { id } });
  };

  const handleUserProfileClickOnNorification = (id: any) => {
    // const newId = new mongoose.Types.ObjectId(id);
    navigate("/userProfile", { state: { id } });
  };
  const readNotification = async (notificationId: any) => {
    const result = await axiosInstance.get(messageEndpoints.readNotification, {
      params: { id: notificationId },
    });
    console.log(notificationId, " read notification clicked with id");
    if (result.data) {
      toast.info("notification cleared");
      setNotificationData([]);
      setNotificationCount(0);
      //   setNotificationData((prevData) =>
      //     prevData.filter((notification) => notification.senderId !== notificationId)
      // );
    }
  };

  //


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
            <ListItemButton
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, textAlign: "center" }}
                  >
                    {notification.message}
                  </Typography>
                }
              />
              {readButtonFlag && (
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={() =>
                    handleUserProfileClickOnNorification(notification.userId)
                  }
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

  const handleCloseSearch = () => {
    setSearchFlag(false);
  };

  //ansering the video call functions starts
  const handleDecline = () => {
    setCallAcceptWindowFlag(false);
  };
  const handleAccept = () => {
    setVideoChatFlag(true);
    setCallAcceptWindowFlag(false);
  };
  const handleClose = () => {
    setCallAcceptWindowFlag(false);
  };
  //answering video call functions ends

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#D3A221" }}>
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
                  <IconButton color="inherit">{page.icon}</IconButton>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() =>
                  handleNavigate(
                    `/${page.name.toLowerCase().replace(/\s/g, "-")}`
                  )
                }
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {page.icon}
                <Typography variant="body2" sx={{ ml: 1 }}>
                 
                  {page.name === "Notifications" ? (
                    <>
                    <Badge
                      badgeContent={notificationCount || 0} // Ensure badgeContent is a number or string
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          right: -10, // Adjust position if needed
                          top: 2, // Adjust position if needed
                        },
                      }}
                    >
                      {page.name}
                    </Badge>
                    
                    </>
                  ) : (
                    page.name
                  )}
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
          
              <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {notificationFlag && (
        <>
          <div>
            {
              <React.Fragment key="top">
                {/* <Button onClick={toggleDrawer("top", true)}></Button> */}
                {/* <Drawer
            anchor="top"
            open={true}
            onClose={()=>toggleDrawer()}
            
          >
            {list("top")}
          </Drawer> */}

                <Drawer
                  anchor="top"
                  open={true}
                  onClose={() => toggleDrawer()}
                  sx={{
                    "& .MuiDrawer-paper": {
                      width: {
                        xs: "90%", // Width for small screens
                        sm: "70%", // Width for medium screens
                        md: "50%", // Width for large screens
                      },
                      margin: "0 auto", // Center it horizontally
                    },
                  }}
                >
                  {list("top")}
                </Drawer>
              </React.Fragment>
            }
          </div>
        </>
      )}

      {searchFlag && (
        <>
          <div>
            {
              <React.Fragment key="top">
                {/* <Button onClick={toggleDrawer("top", true)}></Button> */}
                <SimpleDialog open={searchFlag} onClose={handleCloseSearch} />
              </React.Fragment>
            }
          </div>
        </>
      )}
      {callAcceptWindowFlag && (
        <IncomingCallWindow
          open={callAcceptWindowFlag}
          callerName={callerName}
          onClose={handleClose}
          onDecline={handleDecline}
          onAccept={handleAccept}
        />
      )}
      {/* {videoChatFlag&&<VideoChat open={videoChatFlag} onClose={() => setVideoChatFlag(false)} />} */}
      {videoChatFlag && (
        <div style={{ zIndex: 2000, position: "relative" }}>
          <VideoChat
            open={videoChatFlag}
            onClose={() => setVideoChatFlag(false)}
          />
        </div>
      )}
    </>
  );
}
