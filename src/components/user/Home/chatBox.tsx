import React, { useEffect } from "react";
import { Paper,IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../../../redux/Slice/ChatSlice';
import SocketService from "../../../socket/SocketService.js";

import CloseIcon from '@mui/icons-material/Close';
import { toast } from "sonner";

// Define styled components using the `styled` API
const Container = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  maxWidth: "400px",
  maxHeight: "450px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
}));

const MessagesBody = styled(Paper)(({ theme }) => ({
  width: "calc(100% - 20px)",
  margin: 10,
  overflowY: "scroll",
  height: "calc(100% - 80px)",
}));

export default function ChatBox() {
  const dispatch=useDispatch()
  const userData=useSelector((state:any)=>state.ChatDisplay.userData)
  const chatData=useSelector((state:any)=>state.ChatDisplay.chatRoomData)



  // const data1 = useSelector((state: any) => state.ChatDisplay.chatBoxDisplay);

  useEffect(()=>{
    SocketService.connect()
    console.log(chatData," cgaaatdhshfkhfj")
    // toast.info(chatData)
  },[])
  const handleClose = () => {
    dispatch(hide())
    // setIsOpen(false); // Close the chat box
  };
  return (
    <Container>
      <StyledPaper elevation={2}>
      <div
      style={{
        width: '100vw',
        maxWidth: '400px',
        maxHeight: '800px',
        height: '50px',
        backgroundColor: '#D3A221',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5px', // Adds space inside the container
        justifyContent: 'space-between', // Pushes the icon to the right
      }}
    >
      <span style={{ fontWeight: 'bold', marginRight: 'auto' }}>{userData.username}<br/>chatId:{chatData._id}</span>
      <IconButton size="small" onClick={handleClose}>
        <CloseIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
        
        <MessagesBody id="style-1">
          <MessageLeft
            message="Hellofjkdshgjkhfgjkfhgjkhfsdjkgfkjhkjghf"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          />
          <MessageLeft
            message="How are you"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="aaaaa"
            avatarDisp={false}
          />
          <MessageRight
            message="Hai"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={true}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageRight
            message="iam fine thanku"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />

        </MessagesBody>
        <TextInput />
      </StyledPaper>
    </Container>
  );
}
