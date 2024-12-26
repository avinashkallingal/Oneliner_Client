
import Draggable from 'react-draggable';
import ChatBoxComponent from '../../../Components/user/Home/ChatBox';
import { Box } from '@mui/material';



function Chatbox() {
  // const [isOpen, setIsOpen] = useState(true); // State to control visibility
  



  // if (!isOpen) return null; // Don't render if closed

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
