import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'sonner';
import socketService from '../../../socket/SocketService';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../redux/Slice/MessageSlice';
import { RootState } from '../../../redux/Store/Store';

// Use styled components for form and text wrapping
const WrapForm = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: "auto"
});

const WrapText = styled(TextField)({
  width: "100%"
});

// TextInput component
export const TextInput = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messageStore.messages);
  const [message, setMessage] = useState<string>("");
  // const [messages, setMessages] = useState<any[]>([]); // To store received messages

  const chat = useSelector((state: any) => state.ChatDisplay.chatRoomData);
  const userId = localStorage.getItem("id");
  const receiverId = useSelector((state: any) => state.ChatDisplay.userData);
  const currentDate = new Date();
// Custom formatted output
const options: Intl.DateTimeFormatOptions = {
  // year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
 
  hour12: true // Set to true for 12-hour format
};

const formattedDate = currentDate.toLocaleString('en-US', options);
console.log(formattedDate); // Outputs: "10/31/2024, 21:16:14"

  useEffect(() => {
    // Register the listener for receiving messages
    socketService.joinConversation(chat._id);
    socketService.onNewMessage((newMessage) => {
      console.log("New message received:", newMessage);
      dispatch(addMessage({message:newMessage}));
      if(newMessage.receiverId==receiverId){toast.success("New message received");}
      
    });

    // Clean up the listener when the component unmounts
    return () => {
      socketService.offNewMessage((newMessage) => {}); // Remove the listener
    };
  }, []);

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
}
const randomId = generateRandomId();
console.log(randomId); // Example output: "g2t5h4jkl"

  const handleSendMessage = async () => {
    try {
      if ((message.trim()) && chat._id && userId && receiverId._id) {
        socketService.sendMessage({
          chatId: chat._id,
          senderId: userId,
          receiverId: receiverId._id,
          content: message,
          updatedAt:formattedDate,
          _id:randomId,
        });
        setMessage(''); // Clear the input field after sending
      } else {
        toast.error("Error something is missing, try later");
        console.error("Missing required data for sending message:", { chatId: chat._id, userId, receiverId, message });
      }
    } catch (error) {
      console.log("Error happened sending message", error);
      toast.error("Error occurred, try later");
    }
  };

  return (
    <>
      <WrapForm component="form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
        <WrapText
          id="standard-text"
          label="Type here"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary">
          <SendIcon />
        </Button>
      </WrapForm>
      {/* Display received messages */}
      <Box mt={2}>
        {/* {messages.map((msg, index) => (
          <p key={index}><strong>{msg.senderId}:</strong> {msg.content}</p>
        ))} */}
       
      </Box>
    </>
  );
};
