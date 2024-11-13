import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from '@mui/material/colors';
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import moment from 'moment';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Importing double tick icon

// Styled components for message box and container
const MessageRow = styled('div')({
  display: "flex",
});

const MessageRowRight = styled('div')({
  display: "flex",
  justifyContent: "flex-end",
});

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
}

// Message component for others' messages (left-aligned)
export const MessageLeft = (props: leftMsg) => {
  const { message = "no message", timestamp, photoURL = "dummy.js", displayName = "名無しさん" } = props;

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

  return (
    <MessageRow>
      <Avatar
        alt={displayName}
        sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}
        src={photoURL}
      />
      <div>
        <DisplayName>{displayName}</DisplayName>
        <MessageBlue>
          <div>
            <p>{message}</p>
          </div>
          <MessageTimeStampRight>
            {formatChatTimestamp(timestamp)}
         
          </MessageTimeStampRight>
        </MessageBlue>
      </div>
    </MessageRow>
  );
};

interface rightMsg {
  message?: string,
  timestamp?: string,
  photoURL?: string,
  displayName?: string,
  avatarDisp?: boolean,
  read?:boolean,
}

// Message component for user's own messages (right-aligned)
export const MessageRight = (props: rightMsg) => {
  const { message = "no message", timestamp,read } = props;

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

  return (
    <MessageRowRight>
      <MessageOrange>
        <p>{message}</p>
        <MessageTimeStampRight>
          {formatChatTimestamp(timestamp)}
          {!read?<CheckIcon sx={{ fontSize: '0.8rem', color: '#4fc3f7' }} />:
          <DoneAllIcon sx={{ fontSize: '0.8rem', color: '#4fc3f7', marginLeft: '2px' }} />}
        </MessageTimeStampRight>
      </MessageOrange>
    </MessageRowRight>
  );
};
