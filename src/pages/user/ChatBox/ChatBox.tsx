// import React from 'react'
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import ChatBoxComponent from '../../../Components/user/Home/ChatBox';
import { Box, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../../../redux/Slice/ChatSlice';


function Chatbox() {
  const [isOpen, setIsOpen] = useState(true); // State to control visibility
  



  if (!isOpen) return null; // Don't render if closed

  return (
    <Draggable>
      <Box
        sx={{
          position: 'fixed',

          bottom: -138,
          marginLeft:"70vw",
          zIndex: 1300,
          cursor: 'move',
        }}
      >
      
       
          {/* ChatBoxComponent renders the chat content */}
          <ChatBoxComponent />
    
      </Box>
    </Draggable>
  );
}

export default Chatbox;
