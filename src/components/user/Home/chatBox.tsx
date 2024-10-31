import React, { useEffect,useRef } from "react";
import { Paper, IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../../../redux/Slice/ChatSlice';
import SocketService from "../../../socket/SocketService";
import { RootState } from '../../../redux/Store/Store';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "sonner";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { addMessage } from '../../../redux/Slice/MessageSlice';

const Container = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledPaper = styled(Paper)({
  width: "100vw",
  height: "100vh",
  maxWidth: "400px",
  maxHeight: "450px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
});

const MessagesBody = styled(Paper)({
  width: "calc(100% - 20px)",
  margin: 10,
  overflowY: "scroll",
  height: "calc(100% - 80px)",
});

export default function ChatBox() {
  const userId = localStorage.getItem("id");
  const messages = useSelector((state: RootState) => state.messageStore.messages)||[];
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.ChatDisplay.userData);
  const chatData = useSelector((state: any) => state.ChatDisplay.chatRoomData);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    SocketService.connect();
    console.log(chatData, " chatData");
   async function fetchMessages(){
    const response = await axiosInstance.get('http://localhost:4000/message/getmessages', {params: {userId: userId, receiverId: userData._id}})
    console.log(response.data.data," message db response in front end") 
    if(response.data.success){
      if(response.data.data){
        response.data.data.map((val:any)=>dispatch(addMessage({message:val})))
      
      }
     }else{
      toast.error("error fetching db messages")
     } 
  }
         fetchMessages()
    
  }, [chatData]);


  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleClose = () => {
    dispatch(hide());
  };
  console.log(messages," messages in redux")

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
            padding: '0 5px',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontWeight: 'bold', marginRight: 'auto' }}>
            {userData.username}
          </span>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        </div>

        <MessagesBody id="style-1">
          {messages.map((messageGot, index) =>
          
            messageGot.senderId === userId ? (
              <MessageRight
                key={index}
                message={messageGot.content || ""}
                timestamp={messageGot.updatedAt}
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="me"
                avatarDisp={true}
              />
            ) : (
              <MessageLeft
                key={index}
                message={messageGot.content || ""}
                timestamp={messageGot.updatedAt}
                photoURL={userData.profilePicture||""}
                displayName={userData.username}
                avatarDisp={true}
              />
            )
          )}
          <div ref={messagesEndRef}></div>
        </MessagesBody>
        
        <TextInput />
      </StyledPaper>
    </Container>
  );
}