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
import { useDispatch } from 'react-redux';
import { show as showCahatBox } from "../../../redux/Slice/ChatSlice";
import { clearMessages } from '../../../redux/Slice/MessageSlice';
import { userEndpoints } from '../../../Constarints/endpoints/userEndpoints';
import { messageEndpoints } from '../../../Constarints/endpoints/messageEndPoints';


export default function Contacts() {
  const [contacts, setContacts] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState(''); // State for search term
  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");

  React.useEffect(() => {
    async function fetchUsers() {
      
      const result = await axiosInstance.post(userEndpoints.contactsFetch, { id: userId });

      if (result.data.success) {
        setContacts(result.data.result.contacts_data);
      } else {
        toast.info("Contacts fetching failed");
      }
    }
    fetchUsers();
  }, []);

  const chatHandle = async (userData: any) => {
    try {
      const response = await axiosInstance.post(messageEndpoints.createChatId(userId,userData._id));

      if (response.data.success) {
        const chatId = response.data.data._id;
        console.log("Chat ID from server:", chatId);
        dispatch(clearMessages());
        console.log(response.data.data,"response in contacts%%%%%%%%%%%%%")
        dispatch(showCahatBox({ token: null, userData: userData, chatRoomData: response.data.data }));
        // dispatch(showCahatBox({ token: null, userData: userData, chatRoomData: chatId }));
      }
    } catch (error) {
      console.log("Error occurred while navigating message area", error);
    }
  };

  // Handle input change and update search term
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        onChange={handleSearch} // Update search term on input change
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
        {filteredContacts.map(contact => (
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
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
