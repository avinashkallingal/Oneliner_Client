import Avatar from "@mui/material/Avatar";
import { deepOrange } from '@mui/material/colors';
import { styled } from "@mui/system";
import moment from 'moment';
// import CheckIcon from '@mui/icons-material/Check';
// import DoneAllIcon from '@mui/icons-material/DoneAll'; // Importing double tick icon

import { useState } from 'react';
import { IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent } from '@mui/material';




// Styled components for message box and container
const MessageRow = styled('div')({
  display: "flex",
});

const MessageRowRight = styled('div')({
  display: "flex",
  justifyContent: "flex-end",
});

// const MessageRowLeft = styled('div')({
//   display: "flex",
//   justifyContent: "flex-start",  // Aligns content to the left
// });

const MessageBlue = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  position: "relative",
  marginLeft: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#A8DDFD",
  maxWidth: "60%",
  textAlign: "right",
  fontFamily: "'Open Sans', sans-serif",
  border: "1px solid #97C6E3",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "15px solid #A8DDFD",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    left: "-15px"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "17px solid #97C6E3",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    left: "-17px"
  }
});

const MessageOrange = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  marginRight: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#f8e896",
  maxWidth: "60%",
  textAlign: "left",
  fontFamily: "'Open Sans', sans-serif",
  border: "1px solid #dfd087",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "15px solid #f8e896",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    right: "-15px"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "17px solid #dfd087",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    right: "-17px"
  }
});

const MessageTimeStampRight = styled('div')({
  fontSize: ".75em",
  fontWeight: "300",
  color: "#999",
  marginTop: "5px",
  display: "flex",
  alignItems: "center",
  gap: "2px",  // Space between timestamp and ticks
});

// const MessageTimeStampLeft = styled('div')({
//   fontSize: ".75em",
//   fontWeight: "300",
//   color: "#999",
//   marginTop: "5px",
//   display: "flex",
//   alignItems: "center",
//   gap: "2px",  // Space between timestamp and ticks
//   justifyContent: "flex-start",  // Align the timestamp to the left
// });

const DisplayName = styled('div')({
  marginLeft: "20px"
});

interface leftMsg {
  message?: string,
  timestamp?: string,
  photoURL?: string,
  displayName?: string,
  avatarDisp?: boolean,
  read?:boolean,
  fileType?:string,
}


//with modal left message
export const MessageLeft = (props: leftMsg) => {
  const { message = "no message", timestamp, photoURL = "dummy.js", displayName = "名無しさん", fileType } = props;
  // console.log(message, " message in left dialog box**************");

  const formatChatTimestamp = (timestamp1: any) => {
    const now = moment();
    const messageTime = moment(timestamp1);

    if (messageTime.isSame(now, 'day')) {
      return messageTime.fromNow();
    } else if (messageTime.isSame(now, 'year')) {
      return messageTime.format('MMM Do, h:mm A');
    } else {
      return messageTime.format('MMM Do YYYY, h:mm A');
    }
  };

  const [openModal, setOpenModal] = useState(false);
  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const renderFile = () => {
    if (fileType === 'image') {
      return <img src={message} alt="" style={{ maxWidth: '100%', cursor: 'pointer' }} onClick={handleOpenModal} />;
    } else if (fileType === 'video') {
      return (
        <video controls style={{ maxWidth: '100%', cursor: 'pointer' }} onClick={handleOpenModal}>
          <source src={message} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileType === 'pdf') {
      return (
        <a href={message} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
          View PDF
        </a>
      );
    } else {
      return <p>{message}</p>;
    }
  };

  return (
    <>
      <MessageRow>
        {/* Avatar positioned normally */}
        <Avatar
          alt={displayName}
          sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}
          src={photoURL}
        />
        <div style={{ paddingLeft: 5 }}>
          {/* Display Name */}
          <DisplayName>{displayName}</DisplayName>
          
          {/* Message content */}
          <MessageBlue>
            <div>
              {renderFile()}
            </div>
            {/* Timestamp */}
            <MessageTimeStampRight>
              {formatChatTimestamp(timestamp)}
            </MessageTimeStampRight>
          </MessageBlue>
        </div>
      </MessageRow>

      {/* Modal for Enlarged Media */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xl">
        <IconButton
          onClick={handleCloseModal}
          style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ padding: 0, backgroundColor: 'black' }}>
          {fileType === 'image' && <img src={message} alt="" style={{ width: '100%' }} />}
          {fileType === 'video' && (
            <video controls style={{ width: '100%' }}>
              <source src={message} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {fileType === 'pdf' && (
            <iframe src={message} title="PDF Viewer" style={{ width: '100%', height: '100vh' }} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};




interface rightMsg {
  message?: string,
  timestamp?: string,
  photoURL?: string,
  displayName?: string,
  avatarDisp?: boolean,
  read?:boolean,
  fileType?:string,
}



//modal right message
export const MessageRight = (props: rightMsg) => {
  const { message = "no message", fileType, timestamp } = props;
  const [openModal, setOpenModal] = useState(false);
// console.log(read,"read")
  const formatChatTimestamp = (timestamp1: any) => {
    const now = moment();
    const messageTime = moment(timestamp1);

    if (messageTime.isSame(now, 'day')) {
      return messageTime.fromNow();
    } else if (messageTime.isSame(now, 'year')) {
      return messageTime.format('MMM Do, h:mm A');
    } else {
      return messageTime.format('MMM Do YYYY, h:mm A');
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const renderFile = () => {
    if (fileType === 'image') {
      return <img src={message} alt="" style={{ maxWidth: '100%', cursor: 'pointer' }} onClick={handleOpenModal} />;
    } else if (fileType === 'video') {
      return (
        <video controls style={{ maxWidth: '100%', cursor: 'pointer' }} onClick={handleOpenModal}>
          <source src={message} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileType === 'pdf') {
      return (
        <a href={message} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
          View PDF
        </a>
      );
    } else {
      return <p>{message}</p>;
    }
  };

  return (
    <>
      <MessageRowRight>
        <MessageOrange>
          {renderFile()}
          <MessageTimeStampRight>
            {formatChatTimestamp(timestamp)}
            {/* {!read ? (
              <CheckIcon sx={{ fontSize: '0.8rem', color: '#4fc3f7' }} />
            ) : (
              <DoneAllIcon sx={{ fontSize: '0.8rem', color: '#4fc3f7', marginLeft: '2px' }} />
            )} */}
          </MessageTimeStampRight>
        </MessageOrange>
      </MessageRowRight>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xl">
        <IconButton
          onClick={handleCloseModal}
          style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ padding: 0, backgroundColor: 'black' }}>
          {fileType === 'image' && <img src={message} alt="" style={{ width: '100%' }} />}
          {fileType === 'video' && (
            <video controls style={{ width: '100%' }}>
              <source src={message} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {fileType === 'pdf' && (
            <iframe src={message} title="PDF Viewer" style={{ width: '100%', height: '100vh' }} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};