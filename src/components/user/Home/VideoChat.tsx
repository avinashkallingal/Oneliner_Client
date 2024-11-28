import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import peer from "../../../service/peer";
import SocketService from "../../../socket/SocketService";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import Peer from "simple-peer";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface VideoChatProps {
  open: boolean;
  onClose: () => void;
}

const VideoChat = () => {
//   const [myStream, setMyStream] = useState<MediaStream | null>(null); // State for user's stream
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null); // State for remote stream
  const [isCallActive, setIsCallActive] = useState<boolean>(false); // Call state
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false); // Mic state
  const [isVideoHidden, setIsVideoHidden] = useState<boolean>(false); // Video state

  const chat = useSelector((state: any) => state.ChatDisplay.chatRoomData);
  const receiver = useSelector((state: any) => state.ChatDisplay.userData);
  const sender = useSelector((state: any) => state.UserAuth.userData);
  const userId = localStorage.getItem("id");

  //new
  const [me, setMe] = useState<string>("");
  const [myStream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState<boolean>(false);
  const [caller, setCaller] = useState<string>("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [idToCall, setIdToCall] = useState<string>("");
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    SocketService.askSocketId(userId);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("Local stream obtained:", stream);
        setStream(stream);

        // myVideo.current.srcObject = stream
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
    console.log(myStream, " streem data ********************");
    SocketService.receiveSocketId((id) => {
      setMe(id);
      console.log(id, " id in socket reciever");
    //   console.log(me, " state id in socket by me lister  $$$$$$$$$$$$$");
      
    });

    SocketService.receiveCallUser((data) => {
      console.log(data, " data in receive user calll^^^^^^^^^");
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    console.log(myStream, " streem data ********************");
    
  }, []);

  useEffect(()=>{
    console.log(me, " state id in socket by me lister  $$$$$$$$$$$$$");
    console.log(myStream, " state stream in socket by me lister  %%%%%%%%%%%%%%%%");
  },[])


  const callUser = (id: any) => {
    console.log(id," id stream in calluser##################")
    console.log(myStream," mystream stream in calluser##################")
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream || undefined, // Converts null to undefined
    });
    console.log("Peer instance created:", peer);
    peer.on("signal", (data) => {
        console.log(data,"data in on signal peer @@@@@@@@@@@@@@")
      SocketService.emitCalluser({
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    SocketService.recieveCallAccepted((signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };


  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream || undefined, // Converts null to undefined
    });
    peer.on("signal", (data) => {
      SocketService.emitAnswerCall({ signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    // peer.signal(callerSignal)
    if (callerSignal) {
      peer.signal(callerSignal);
    } else {
      console.error("Caller signal is null or undefined");
    }

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    // Close the dialog
    setIsCallActive(false);
  };


  return (
    <>
      <h1 style={{ textAlign: "center" }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {myStream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
            hiii
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : (
              <h2>No connection set</h2>
            )}
          </div>
        </div>
        <div className="myId">
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                <PhoneIcon fontSize="large" />
              </IconButton>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default VideoChat;
