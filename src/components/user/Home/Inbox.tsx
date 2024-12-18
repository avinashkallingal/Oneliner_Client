import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import axiosInstance from '../../../Constarints/axios/userAxios';
import { useDispatch } from 'react-redux';
import { show as showCahatBox } from "../../../redux/Slice/ChatSlice";
import { clearMessages } from '../../../redux/Slice/MessageSlice';
import { messageEndpoints } from '../../../Constarints/endpoints/messageEndPoints';
import SocketService from '../../../socket/SocketService';

export default function Inbox() {
  const userId=localStorage.getItem("id")
  const [inboxData,setInboxData]=React.useState([])
  const [count,setCount]=React.useState<Number|null>(null)
  const dispatch = useDispatch()
  React.useEffect(()=>{
   
    async function fetchInboxData(){
      const response=await axiosInstance.get(messageEndpoints.getInboxMessages, {params: {userId: userId}})
    // console.log(response.data," response in inbox")
    if(response.data){
      console.log(response.data.data,"inbox data^^^^^^^^^^^^^^^")
    setInboxData(response.data.data)
    }else{
      console.log("error in fetching inbox messages")
    }
    }
    fetchInboxData()
  },[count])

  React.useEffect(()=>{
    SocketService.onNewMessage((newMessage) => {
   
   
      if (newMessage) {
        setCount(1)
      }
    });
  })


  const chatHandle = async (userData: any,chatId:any) => {
    try {
      
      if (userData) {
      chatId._id=chatId.chatId//did this to neglect complication here chat id need to pass other end _id field have chat id
       
        dispatch(clearMessages());
        console.log(chatId,"chat id in inbox *****************")
        dispatch(showCahatBox({ token: null, userData: userData, chatRoomData: chatId }));
      }
    } catch (error) {
      console.log("Error occurred while navigating message area", error);
    }
  };


  // console.log(inboxData," state inbox data))))))))))))))))))))))")
  return (
    <Box sx={{ width: 320 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.15rem' }}
      >
        Inbox
      </Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
        
      >
       {inboxData.map((element:any) => (
  <ListItem key={element.id}> {/* Ensure each ListItem has a unique key */}
    <ListItemDecorator>
      <Avatar src={element.sender.profilePicture} />
    </ListItemDecorator>
    <ListItemContent>
      {(element.senderId==userId)?<Typography level="title-sm"  onClick={() => chatHandle(element.sender,element.chatRoomData)}
                sx={{ cursor: 'pointer' }}>{element.sender.username}</Typography>:
      <Typography level="title-sm"  onClick={() => chatHandle(element.reciever,element.chatRoomData)}
                sx={{ cursor: 'pointer' }}>{element.reciever.username}</Typography>
      }
      {/* <Typography level="title-sm"  onClick={() => chatHandle(element.sender,element.chatRoomData)}
                sx={{ cursor: 'pointer' }}>{element.sender.username}</Typography> */}
      <Typography level="body-sm" noWrap>
        {(element.fileType=='image'||element.fileType=="pdf"||element.fileType=="video")?<p style={{
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#e0f7e9",  // light green background for a file indicator
    color: "green",
    borderRadius: "15px",
    fontSize: "0.85rem",
    fontWeight: "bold",
    margin: "5px 0"
}}>
  File
</p>:element.content}
      </Typography>
    </ListItemContent>
  </ListItem>
))}
        
      </List>
    </Box>
  );
}
