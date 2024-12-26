import  { useEffect,useRef, useState } from "react";
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
import { messageEndpoints } from "../../../Constarints/endpoints/messageEndPoints";
import { clearCount } from "../../../redux/Slice/MessageCount";

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
  const [typingIndicator,setTypingIndicator]=useState<boolean>(false)
  
  // const [online,setOnline]=useState<boolean>(false)

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
// useLayoutEffect(()=>{
//   async function readUpdate(){
//     const response=await axiosInstance.put('http://localhost:4000/message/readUpdate',{userId: userId, receiverId: userData._id,read:true})
//   }
//   readUpdate()
// })
  useEffect(() => {
    SocketService.connect();
    SocketService.joinConversation(chatData._id);
    SocketService.emitUserOnlineStatus(`${userId}`)
    // SocketService.emitOnline(`${userId}`)
    // console.log(chatData, " chatData");
    dispatch(clearCount())
   async function fetchMessages(){
    const response = await axiosInstance.get(messageEndpoints.getMessages, {params: {userId: userId, receiverId: userData._id}})
    // console.log(response.data.data," message db response in front end") 
    if(response.data.success){
      if(response.data.data){
        response.data.data.map((val:any)=>dispatch(addMessage({message:val})))
      
      }
     }else{
      toast.error("error fetching db messages")
     } 
  }
         fetchMessages()
         
         
    return(
      // SocketService.emitUserOffline(`${userId}`),
          SocketService.disconnect()
          // setOnline(false)
          
         )
    
  }, [chatData]);

  // useLayoutEffect(()=>{
  //   async function fetchReadStatus(){
  //     const response=await axiosInstance.get()
  //   }
  //   fetchReadStatus()
  // })


  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);




   useEffect(() => {
    // Setting up the listener once when the component mounts
    // SocketService.emitFetchOnlineUsers(`${userData._id}`)
    SocketService.onGotOnlineUsers((onlineId:any)=>{
      console.log(onlineId,"hiiiii user online&&&&&&&&&&&&&&&&&&&&&")
      if(onlineId==userData._id.toString()){
        // setOnline(true)
      }
      
     })
     SocketService.onGotOfflineUsers((onlineId:any)=>{
      console.log(onlineId,"hiiiii user offline&&&&&&&&&&&&&&&&&&&&&")
      if(onlineId==userData._id.toString()){
        // setOnline(false)
      }
      
     })
  
    // Cleanup function to remove listener when the component unmounts
    return () => {
      SocketService.onUserOnlineOff(()=>{}); // Detach the listener on unmount
    };
  }, []); 

  useEffect(() => {
    // Setting up the listener once when the component mounts
    SocketService.onUserTyping(() => {
      setTypingIndicator(true);
      console.log("user is typing++++++++++++")
      setTimeout(() => setTypingIndicator(false), 3000); // Hide indicator after 3 seconds
    });
  
    // Cleanup function to remove listener when the component unmounts
    return () => {
      SocketService.onUserTypingOff(()=>{}); // Detach the listener on unmount
    };
  }, []); 

  const handleClose = () => {
    dispatch(hide());
  };
  // console.log(messages," messages in redux")

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
          {/* <span style={{ fontWeight: 'bold', marginRight: 'auto' }}>
          {online?<p>Online</p>:<p>Offline</p>}
            
          </span> */}
          <span style={{ fontWeight: 'bold', marginRight: 'auto' }}>
          {typingIndicator&&<p>typing.......</p>}
            
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
                read={messageGot.read}
                fileType={messageGot.fileType}
              />
            ) : (
              <MessageLeft
                key={index}
                message={messageGot.content || ""}
                timestamp={messageGot.updatedAt}
                photoURL={userData.profilePicture||""}
                displayName={userData.username}
                avatarDisp={true}
                read={messageGot.read}
                fileType={messageGot.fileType}
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
