import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/user/Home/Navbar";
import Home from "../../../Components/user/Home/Home";
import { Box, Paper } from "@mui/material"; // Import Paper for a card-like effect
import TopBar from "../../../Components/user/Home/TopBar";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
} from "@mui/joy";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// icon import
import CrimeIcon from "@mui/icons-material/Gavel"; // Suitable for Crime
import DramaIcon from "@mui/icons-material/TheaterComedy"; // Suitable for Drama
import ScienceIcon from "@mui/icons-material/Science"; // Suitable for Science
import ActionIcon from "@mui/icons-material/FlashOn"; // Suitable for Action
import AdventureIcon from "@mui/icons-material/Explore"; // Suitable for Adventure
import ComedyIcon from "@mui/icons-material/Mood"; // Suitable for Comedy
import HorrorIcon from "@mui/icons-material/EmojiPeople"; // Suitable for Horror (or consider other options)
import RomanceIcon from "@mui/icons-material/HeartBroken"; // Suitable for Romance
import SciFiIcon from "@mui/icons-material/Star"; // Suitable for Science Fiction
import FantasyIcon from "@mui/icons-material/Star"; // Use for Fantasy
import ThrillerIcon from "@mui/icons-material/StarRate"; // Suitable for Thriller
import MysteryIcon from "@mui/icons-material/Visibility"; // Suitable for Mystery
import WesternIcon from "@mui/icons-material/LocalMovies"; // Suitable for Western
import DocumentaryIcon from "@mui/icons-material/LocalMovies"; // Suitable for Documentary
import AnimationIcon from "@mui/icons-material/Animation"; // Suitable for Animation
import MusicalIcon from "@mui/icons-material/MusicNote"; // Suitable for Musical
import FictionIcon from "@mui/icons-material/Book"; // Example: Book icon for Fiction
import NonFictionIcon from "@mui/icons-material/Description"; // Example: Description icon for Non-Fiction
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"; // Science icon
import TechnologyIcon from "@mui/icons-material/Memory"; // Example: Memory/Chip icon for Technology
import AllInclusiveIcon from "@mui/icons-material/AllInclusive"; // Example: All icon
import { toast } from "sonner";
import ChatBox from "../../../Components/user/Home/ChatBox";
import { useDispatch, useSelector } from "react-redux";
import Chatbox from "../ChatBox/ChatBox";
import Contacts from "../../../Components/user/Home/Contacts";
import Inbox from "../../../Components/user/Home/Inbox";
import { useNavigate } from "react-router-dom";
import { Dialog, Fab, useMediaQuery } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Tabs, Tab } from "@mui/material";

import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Home1() {
  const genres = [
    { name: "All", icon: <AllInclusiveIcon /> }, // "All" option
    { name: "Crime", icon: <CrimeIcon /> },
    { name: "Drama", icon: <DramaIcon /> },
    { name: "Science", icon: <ScienceIcon /> },
    { name: "Action", icon: <ActionIcon /> },
    { name: "Adventure", icon: <AdventureIcon /> },
    { name: "Comedy", icon: <ComedyIcon /> },
    { name: "Horror", icon: <HorrorIcon /> },
    { name: "Romance", icon: <RomanceIcon /> },
    { name: "Sci-Fi", icon: <SciFiIcon /> },
    { name: "Fantasy", icon: <FantasyIcon /> }, // Using StarIcon for Fantasy
    { name: "Thriller", icon: <ThrillerIcon /> },
    { name: "Mystery", icon: <MysteryIcon /> },
    { name: "Western", icon: <WesternIcon /> },
    { name: "Documentary", icon: <DocumentaryIcon /> },
    { name: "Animation", icon: <AnimationIcon /> },
    { name: "Musical", icon: <MusicalIcon /> },
    { name: "Fiction", icon: <FictionIcon /> },
    { name: "Non-Fiction", icon: <NonFictionIcon /> },
    { name: "Science", icon: <EmojiObjectsIcon /> }, // Using Lightbulb for Science as a placeholder
    { name: "Technology", icon: <TechnologyIcon /> },
  ];
  const [fetchGenre, setFetchGenre] = useState<any>("All");
  const [activeTab, setActiveTab] = useState<Number>(0);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog visibility
  const isMobile = useMediaQuery("(max-width:600px)"); // Media query for mobile view

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev); // Toggle dialog visibility
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: Number
  ) => {
    setActiveTab(newValue);
  };

  const data1 = useSelector((state: any) => state.ChatDisplay.chatBoxDisplay);

  const handleGenre = (genre: string) => {
    setFetchGenre(genre);
  };
  useEffect(() => {
    const id = localStorage.getItem("userToken");
    if (!id) {
      navigate("/");
    }
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#D3D3D3",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      {data1 && <Chatbox />}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          justifyContent: "space-between", // Space between left, main, and right components
          width: "100%",
        }}
      >
        {/* Left Box old*/}
        {/* <Paper
          sx={{
            position: "fixed",
            top: "10%",
            left: 20,
            boxShadow: 15,
            background: "white",
            padding: 2,
            borderRadius: 2,
            width: 290,
            height: "85vh",
            overflowY: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <List>
            {genres.map(({ name, icon},index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => handleGenre(name)}>
                  <ListItemDecorator>{icon}</ListItemDecorator>
                  <ListItemContent>{name}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper> */}
        {/* Responsive Left Box */}
        {/* Mobile View: Hamburger Icon */}
        {isMobile && (
          <IconButton
            sx={{ position: "fixed", top: 16, left: 16, zIndex: 1000 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Sidebar for Mobile: Drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              width: 290, // Sidebar width
            },
          }}
        >
          <List>
            {genres.map(({ name, icon }, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => handleGenre(name)}>
                  <ListItemDecorator>{icon}</ListItemDecorator>
                  <ListItemContent>{name}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Desktop View: Permanent Sidebar */}
        {!isMobile && (
          <Paper
            sx={{
              position: "fixed",
              top: "10%",
              left: 20,
              boxShadow: 15,
              background: "white",
              padding: 2,
              borderRadius: 2,
              width: 290,
              height: "85vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <List>
              {genres.map(({ name, icon }, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => handleGenre(name)}>
                    <ListItemDecorator>{icon}</ListItemDecorator>
                    <ListItemContent>{name}</ListItemContent>
                    <KeyboardArrowRight />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Main Box */}
        <Box
          sx={{
            boxShadow: 15,
            padding: 2,
            zIndex: 500,
            borderRadius: 2,
            flexGrow: 50, // To center the main box between left and right components
            marginLeft: "25%", // Offset to center between left and right
            marginRight: "80%",
          }}
        >
          <Home fetchGenre={fetchGenre} />
        </Box>

        {/* Right Box old*/}
        {/* <Paper
      sx={{
        position: "fixed",
        top: "10%",
        right: 20,
        boxShadow: 3,
        padding: 2,
        borderRadius: 2,
        width: 370,
        height: "fit-content",
      }}
    >
      
      <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
        <Tab label="Inbox" />
        <Tab label="Contacts" />
      </Tabs>

  
      <Box sx={{ paddingTop: 2 }}>
        {activeTab === 0 && <Inbox />}
        {activeTab === 1 && <Contacts />}
      </Box>
    </Paper> */}

        {/* responsive rightbox */}
        {/* Floating Action Button for Mobile */}
        {isMobile && (
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            onClick={toggleDialog}
          >
            <ChatIcon />
          </Fab>
        )}

        {/* Desktop Version */}
        {!isMobile && (
          <Paper
            sx={{
              position: "fixed",
              top: "10%",
              right: 20,
              boxShadow: 3,
              padding: 2,
              borderRadius: 2,
              width: 370,
              height: "fit-content",
            }}
          >
            {/* Tab headers */}
            <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
              <Tab label="Inbox" />
              <Tab label="Contacts" />
            </Tabs>

            {/* Tab content */}
            <Box sx={{ paddingTop: 2 }}>
              {activeTab === 0 && <Inbox />}
              {activeTab === 1 && <Contacts />}
            </Box>
          </Paper>
        )}

        {/* Fullscreen Dialog for Mobile */}
        <Dialog fullScreen open={isDialogOpen} onClose={toggleDialog}>
          {/* Tab headers */}
          <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
            <Tab label="Inbox" />
            <Tab label="Contacts" />
          </Tabs>

          {/* Tab content */}
          <Box sx={{ padding: 2 }}>
            {activeTab === 0 && <Inbox />}
            {activeTab === 1 && <Contacts />}
          </Box>
        </Dialog>
      </Box>
    </div>
  );
}

export default Home1;
