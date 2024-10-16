import React, { useState } from "react";
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

//icon import
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
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'; // Example: All icon
import { toast } from "sonner";
import ChatBox from "../../../Components/user/Home/chatBox";

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

  const handleGenre = (genre: string) => {
    setFetchGenre(genre);
  };
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
      {/* <TopBar/> */}
      <Box
        sx={{ display: "flex", alignItems: "flex-start", gap: 2 }} // Use flexbox for layout
      >
        {/* Left Box */}
        <Paper
          sx={{
            position: "fixed", // Set position to fixed
            top: "10%", // Adjust as needed
            left: 20, // Adjust for desired horizontal spacing
            boxShadow: 15,
            background: "white", // Shadow for the left box
            padding: 2,
            borderRadius: 2,
            width: 200, // Set width for the left box
            height: "85vh", // Adjust height as needed (changed to 80vh for a better view)
            overflowY: "scroll", // Enable vertical scrolling
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
          }}
        >
          <List>
            {/* <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <HomeIcon />
                </ListItemDecorator>
                <ListItemContent>Home</ListItemContent>
                <KeyboardArrowRight />
              </ListItemButton>
            </ListItem> */}
            {genres.map(({ name, icon }) => (
              <ListItem key={name}>
                <ListItemButton onClick={() => handleGenre(name)}>
                  <ListItemDecorator>{icon}</ListItemDecorator>
                  <ListItemContent>{name}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Main Box */}
        <Box
          sx={{
            boxShadow: 15, // Shadow for the main box
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Home fetchGenre={fetchGenre} />
        </Box>

        {/* Right Box */}
        {/* <Paper 
          sx={{ 
            marginTop:10,
            boxShadow: 3, // Shadow for the right box
            padding: 2,
            borderRadius: 2,
            width: "fit-content", // Set width for the right box
            height: 'fit-content' // Adjust height as needed
          }}
        >
          
          <ChatBox/>
        </Paper> */}
      </Box>
    </div>
  );
}

export default Home1;
