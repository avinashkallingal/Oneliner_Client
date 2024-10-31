import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from '@mui/material/colors';
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Use styled components for message box and container
const MessageRow = styled('div')({
  display: "flex",
});

const MessageRowRight = styled('div')({
  display: "flex",
  justifyContent: "flex-end",
});

const MessageBlue = styled('div')({
  position: "relative",
  marginLeft: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#A8DDFD",
  minwidth: "60%",
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
  position: "relative",
  marginRight: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#f8e896",
  minWidth: "10%",
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
  position: "absolute",
  fontSize: ".85em",
  fontWeight: "300",
  marginTop: "10px",
  bottom: "-3px",
  right: "5px"
});

const DisplayName = styled('div')({
  marginLeft: "20px"
});

interface leftMsg{
    message?:string,
    timestamp?:string,
    photoURL?:string,
    displayName?:string,
    avatarDisp?:boolean
}

// avatarが左にあるメッセージ（他人）
export const MessageLeft = (props:leftMsg) => {
  const message = props.message || "no message";
  const timestamp = props.timestamp || "";
  const photoURL = props.photoURL || "dummy.js";
  const displayName = props.displayName || "名無しさん";

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
          {/* <MessageTimeStampRight>{timestamp}</MessageTimeStampRight> */}
        </MessageBlue>
      </div>
    </MessageRow>
  );
};

interface rightMsg{
    message?:string,
    timestamp?:string,
    photoURL?:string
    displayName?:string,
    avatarDisp?:boolean
}
// avatarが右にあるメッセージ（自分）
export const MessageRight = (props:rightMsg) => {
  const message = props.message || "no message";
  const timestamp = props.timestamp || "";

  return (
    <MessageRowRight>
      <MessageOrange>
        <p>{message}</p>
        {/* <MessageTimeStampRight>{timestamp}</MessageTimeStampRight> */}
      </MessageOrange>
    </MessageRowRight>
  );
};
