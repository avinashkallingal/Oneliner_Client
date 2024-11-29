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
import { RootState } from "../../../redux/Store/Store";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface VideoChatProps {
  open: boolean;
  onClose: () => void;
}
const VideoChat: React.FC<VideoChatProps> = ({ open, onClose }) => {
  //   const [myStream, setMyStream] = useState<MediaStream | null>(null); // State for user's stream
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null); // State for remote stream
  const [isCallActive, setIsCallActive] = useState<boolean>(false); // Call state
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false); // Mic state
  const [isVideoHidden, setIsVideoHidden] = useState<boolean>(false); // Video state

  const chat = useSelector((state: RootState) => state.ChatDisplay.chatRoomData);
  const receiver = useSelector((state: any) => state.ChatDisplay.userData);
  const sender = useSelector((state: RootState) => state.UserAuth.userData);

  //taking redux video data after accepting the call
  const callerData = useSelector((state: RootState) => state.VideoChat.caller);
  const callerSignalData = useSelector((state: RootState) => state.VideoChat.callerSignal);
  const receivingCallData = useSelector((state: RootState) => state.VideoChat.receivingCall);
  const nameData = useSelector((state: RootState) => state.VideoChat.name);

  const userId = localStorage.getItem("id");

  //new
  const [me, setMe] = useState<string>("");
  const [myStream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState<boolean|null>(false);
  const [caller, setCaller] = useState<string>("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);



  // saving data from redux to state 
  React.useEffect(()=>{   
    setReceivingCall(receivingCallData||null);
    setCaller(callerData||"");
    setName(nameData||"");
    setCallerSignal(callerSignalData); 
    // if(receivingCallData){
    //   answerCall()
    // }
  
})

  useEffect(() => {
    // Ask for socket ID and initialize media stream
    SocketService.askSocketId(userId);

    // Get media stream for video and audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("Local stream obtained:", stream);
        setStream(stream);

        // Set the stream to the video element
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // Receive socket ID
    SocketService.receiveSocketId((id) => {
      setMe(id);
      console.log(id, "id in socket receiver");
    });

    // Handle incoming call
    SocketService.receiveCallUser((data) => {
      console.log(data, "data in receive user call^^^^^^^^^");
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up...");
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
        console.log("Media stream stopped.");
      }
    };
  }, []);
 



  useEffect(() => {
    console.log(me, " state id in socket by me lister  $$$$$$$$$$$$$");
    console.log(
      myStream,
      " state stream in socket by me lister  %%%%%%%%%%%%%%%%"
    );
  }, []);

  const callUser = () => {
    // console.log(id," id stream in calluser##################")
    console.log(myStream, " mystream stream in calluser##################");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream || undefined, // Converts null to undefined
    });
    console.log("Peer instance created:", peer);
    peer.on("signal", (data) => {
      console.log(data, "data in on signal peer @@@@@@@@@@@@@@");
      SocketService.emitCalluser({
        userToCall: receiver._id,
        signalData: data,
        from: me,
        name: receiver.username,
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
    onClose();
    setIsCallActive(false);
  };

  const toggleMic = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoHidden(!videoTrack.enabled);
      }
    }
  };

  const handleEndCall = () => {
    // Stop all tracks of the streams
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    // if (remoteStream) {
    //   remoteStream.getTracks().forEach((track) => track.stop());
    // }

    // Clear streams
    setStream(null);
    setRemoteStream(null);

    // Close the dialog
    setIsCallActive(false);
   


    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    onClose();

 
  };

  // return (
  //   <>
  //     <h1 style={{ textAlign: "center" }}>Video call</h1>
  //     <div className="container">
  //       <div className="video-container">

  //         {/* user video */}
  //         <div className="video">
  //           {myStream && (
  //             <video
  //               playsInline
  //               muted
  //               ref={myVideo}
  //               autoPlay
  //               style={{ width: "300px" }}
  //             />
  //           )}

  //         </div>

  //           {/* client video */}
  //         <div className="video">
  //           {callAccepted && !callEnded ? (
  //             <video
  //               playsInline
  //               ref={userVideo}
  //               autoPlay
  //               style={{ width: "300px" }}
  //             />
  //           ) : (
  //             <h2>No connection set</h2>
  //           )}
  //         </div>

  //       </div>
  //       <div className="myId">
  //                 <div className="call-button">
  //           {callAccepted && !callEnded ? (
  //             <Button variant="contained" color="secondary" onClick={leaveCall}>
  //               End Call
  //             </Button>
  //           ) : (
  //             <IconButton
  //               color="primary"
  //               aria-label="call"
  //               onClick={() => callUser()}
  //             >
  //               <PhoneIcon fontSize="large" />
  //             </IconButton>
  //           )}

  //         </div>
  //       </div>

  //       <div>
  //         {receivingCall && !callAccepted ? (
  //           <div className="caller">
  //             <h1>{name} is calling...</h1>
  //             <Button variant="contained" color="primary" onClick={answerCall}>
  //               Answer
  //             </Button>
  //           </div>
  //         ) : null}
  //       </div>

  //     </div>
  //   </>
  // );

  return (
    <Dialog open={open} onClose={handleEndCall} maxWidth="lg" fullWidth>
      <DialogContent
        style={{
          position: "relative",
          height: "500px",
          background: "#000",
        }}
      >
        {/* Main Video (Remote Stream) */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#111",
            borderRadius: "8px",
          }}
        >
          {/* <div className="video">
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
          </div> */}
            <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1 style={{ color: "white" }}>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
          {callAccepted && !callEnded ? (
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              autoPlay
              playsInline
              ref={userVideo}
            ></video>
          ) : (
            <h2 style={{ color: "red" }}>No connection set</h2>
          )}

          {/* <div className="video">
            {myStream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          
          </div> */}
          {/* Small Video (User Stream) */}
          {myStream && (
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "150px",
                height: "100px",
                background: "#222",
                border: "2px solid #fff",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                autoPlay
                playsInline
                muted
                ref={myVideo}
              ></video>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          {/* call button or leave call button */}
          {callAccepted && !callEnded ? (
            <Button
              onClick={leaveCall}
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
            >
              End Call
            </Button>
          ) : (
            // <IconButton
            //   color="primary"
            //   aria-label="call"
            //   onClick={() => callUser()}
            // >
            //   <PhoneIcon fontSize="large" />
            // </IconButton>
            <Button
              onClick={() => callUser()}
              variant="contained"
              color="primary"
              startIcon={<PhoneIcon />}
              style={{
                backgroundColor: "#4caf50", // Green color to signify "call"
                color: "#fff", // White text
                borderRadius: "8px", // Rounded corners
                padding: "10px 20px", // Adequate spacing
                fontWeight: "bold", // Emphasized text
                fontSize: "16px", // Readable size
              }}
            >
              Call
            </Button>
          )}

          {/* Toggle Mic Button */}
          <Button
            onClick={toggleMic}
            variant="contained"
            color={isMicMuted ? "secondary" : "primary"}
            startIcon={isMicMuted ? <MicOffIcon /> : <MicIcon />}
          >
            {isMicMuted ? "Unmute" : "Mute"}
          </Button>

          {/* Toggle Video Button */}
          <Button
            onClick={toggleVideo}
            variant="contained"
            color={isVideoHidden ? "secondary" : "primary"}
            startIcon={isVideoHidden ? <VideocamOffIcon /> : <VideocamIcon />}
          >
            {isVideoHidden ? "Show Video" : "Hide Video"}
          </Button>

          {/* window close Button */}
          <Button
            onClick={handleEndCall}
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
        </div>

      


      </DialogContent>
    </Dialog>
  );
};

export default VideoChat;
