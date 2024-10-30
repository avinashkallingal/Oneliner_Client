import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../../../Constarints/axios/userAxios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import {show as showCahatBox} from "../../../redux/Slice/ChatSlice";

export default function Contacts() {
  const [contacts, setContacts] = React.useState<any[]>([]);
  const dispatch=useDispatch()
  const userId=localStorage.getItem("id")
  // const chatRoomData=useSelector((state:any)=>state.ChatSlice.chatRoomData)
 

React.useEffect(()=>{  

async function fetchUsers(){
  console.log("hiiiiiiiii*****************")
  
const result=await axiosInstance.post("http://localhost:4000/contacts",{id:userId})

if(result.data.success){
  // console.log(result.data.result.contacts_data,"  data#############################")
setContacts(result.data.result.contacts_data)
console.log(contacts," data got from backend contacts%^&*()*&^%$%^&*(*&^%$%^&*(")
}else{
toast.info("contacts fetching failed")
}
}
fetchUsers()
},[])
console.log(contacts," contacts array go  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

const chatHandle=async(userData:any)=>{
  try {
    const response = await axiosInstance.post(`http://localhost:4000/message/createChatId?userId=${userId}&recieverId=${userData._id}`);
    
    if (response.data.success) {
      console.log(response," $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        const chatId = response.data.data._id;
        console.log("Chat ID from server:", chatId);
        // navigate(`/message/?chatId=${chatId}&recieverId=${id}`);
        dispatch(showCahatBox({token:null,userData:userData,chatRoomData:response.data.data}))
        // toast.info(chatRoomData)
        // navigate('/chats', { state: { userId: id, avatar, name, chat: response.data.data } })
        // onClose()

    }
} catch (error) {
    console.log("Error occurred while navigating message area", error);
}


}

  return (
  // <div><h1>hiiiiiiii{contacts}</h1></div>
    <Box sx={{ width: 320 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.15rem' }}
      >
        Contact
      </Typography>
      <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: 400,
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'grey.400',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
   <List
  aria-labelledby="ellipsis-list-demo"
  sx={{ '--ListItemDecorator-size': '56px' }}
>
  {contacts.map(contact => (
    <ListItem key={contact.id}>
      <ListItemDecorator>
        <Avatar src={contact.profilePicture} />
      </ListItemDecorator>
      <ListItemContent>
      <Typography 
  level="title-sm" 
  onClick={() => chatHandle(contact)}
  sx={{ cursor: 'pointer' }} // Optional: Adds pointer cursor to indicate it's clickable
>
  {contact.username}
</Typography>
        {/* <Typography level="body-sm" noWrap>
          I&apos;ll be in your neighborhood doing errands this Tuesday.
        </Typography> */}
      </ListItemContent>
    </ListItem>
  ))}
</List>

    </Box>
  );
}
