// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import CloseIcon from "@mui/icons-material/Close";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import MicIcon from "@mui/icons-material/Mic";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import peer from "../../../service/peer";
// import SocketService from "../../../socket/SocketService";
// import { useDispatch, useSelector } from "react-redux";
// import { useCallback } from 'react';
// import { toast } from "sonner";

// interface VideoChatProps {
//   open: boolean;
//   onClose: () => void;
// }

// const VideoChat: React.FC<VideoChatProps> = ({ open, onClose }) => {
//   const [myStream, setMyStream] = useState<MediaStream | null>(null); // State for user's stream
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null); // State for remote stream
//   const [isCallActive, setIsCallActive] = useState<boolean>(false); // Call state
//   const [isMicMuted, setIsMicMuted] = useState<boolean>(false); // Mic state
//   const [isVideoHidden, setIsVideoHidden] = useState<boolean>(false); // Video state

//   const chat = useSelector((state: any) => state.ChatDisplay.chatRoomData);
//   const receiver = useSelector((state: any) => state.ChatDisplay.userData);
//   const sender = useSelector((state: any) => state.UserAuth.userData);
//   const userId = localStorage.getItem("id");

//   const handleEndCall = () => {
//     // Stop all tracks of the streams
//     if (myStream) {
//       myStream.getTracks().forEach((track) => track.stop());
//     }
//     if (remoteStream) {
//       remoteStream.getTracks().forEach((track) => track.stop());
//     }

//     // Clear streams
//     setMyStream(null);
//     setRemoteStream(null);

//     // Close the dialog
//     setIsCallActive(false);
//     onClose();
//   };

//   const toggleMic = () => {
//     if (myStream) {
//       const audioTrack = myStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsMicMuted(!audioTrack.enabled);
//       }
//     }
//   };

//   const toggleVideo = () => {
//     if (myStream) {
//       const videoTrack = myStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoHidden(!videoTrack.enabled);
//       }
//     }
//   };

//   //making offer
//   useEffect(() => {
//     const startMediaStream = async () => {
//       try {
//         // Request user media for audio and video
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: true,
//         });

//         const offer = await peer.getOffer();
//         console.log(offer, " offer got in video component");
//         if (chat._id && userId && receiver._id) {
//           SocketService.sendOffer({
//             chatId: chat._id,
//             senderId: userId,
//             senderName: sender.username,
//             receiverId: receiver._id,
//             offer: offer,
//           });
//         }
//         // Set the user stream
//         setMyStream(stream);

//         // Mock a remote stream (replace with actual logic)
//         // const mockRemoteStream = new MediaStream();
//         // setRemoteStream(mockRemoteStream);
//       } catch (error) {
//         console.error("Error accessing media devices:", error);
//       }
//     };

//     if (open) {
//       setIsCallActive(true);
//       startMediaStream();
//     }

//     // Cleanup on component unmount or when the dialog closes
//     return () => {
//       if (myStream) {
//         myStream.getTracks().forEach((track) => track.stop());
//       }
//       if (remoteStream) {
//         remoteStream.getTracks().forEach((track) => track.stop());
//       }
//       setMyStream(null);
//       setRemoteStream(null);
//     };
//   },[open]);


//   const sendStreams = useCallback(() => {
//     if(myStream){
//     for (const track of myStream.getTracks()) {
//       const peerNow = peer.getPeer();
//       if (peerNow) {
//         // Safely interact with the peer object
//         peerNow.addTrack(track, myStream);
//       } else {
//         console.error("Peer is not initialized");
//       }
//     }
//   }
//   }, [myStream]);

//   useEffect(() => {
//     SocketService.getAcceptConform((ans) => {
//       peer.setRemoteDescriptionConfirm(ans.ans.ans);
//       console.log("call accepted.....^^^^^^^^^^^^^^", ans.ans.ans);
//       toast.info("call accepted");
//       sendStreams();

//     });
//   },[]);

//   //for receiving the track send to peer
//   useEffect(() => {
//     const peerNow = peer.getPeer();
//     if (peerNow) {
//     peerNow.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });}
//   }, []);

//   return (
//     <Dialog open={open} onClose={handleEndCall} maxWidth="lg" fullWidth>
//       <DialogContent
//         style={{
//           position: "relative",
//           height: "500px",
//           background: "#000",
//         }}
//       >
//         {/* Main Video (Remote Stream) */}
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             position: "relative",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             background: "#111",
//             borderRadius: "8px",
//           }}
//         >
//           {remoteStream && (
//             <video
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 borderRadius: "8px",
//               }}
//               autoPlay
//               playsInline
//               muted
//               ref={(videoElement) => {
//                 if (videoElement) {
//                   videoElement.srcObject = remoteStream; // Dynamically assign the MediaStream
//                 }
//               }}
//             ></video>
//           )}

//           {/* Small Video (User Stream) */}
//           {myStream && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "20px",
//                 right: "20px",
//                 width: "150px",
//                 height: "100px",
//                 background: "#222",
//                 border: "2px solid #fff",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//               }}
//             >
//               <video
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//                 autoPlay
//                 playsInline
//                 muted
//                 ref={(videoElement) => {
//                   if (videoElement) {
//                     videoElement.srcObject = myStream; // Dynamically assign the MediaStream
//                   }
//                 }}
//               ></video>
//             </div>
//           )}
//         </div>

//         {/* Control Buttons */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: "20px",
//             left: "20px",
//             display: "flex",
//             gap: "10px",
//           }}
//         >
//           {/* Toggle Mic Button */}
//           <Button
//             onClick={toggleMic}
//             variant="contained"
//             color={isMicMuted ? "secondary" : "primary"}
//             startIcon={isMicMuted ? <MicOffIcon /> : <MicIcon />}
//           >
//             {isMicMuted ? "Unmute" : "Mute"}
//           </Button>

//           {/* Toggle Video Button */}
//           <Button
//             onClick={toggleVideo}
//             variant="contained"
//             color={isVideoHidden ? "secondary" : "primary"}
//             startIcon={isVideoHidden ? <VideocamOffIcon /> : <VideocamIcon />}
//           >
//             {isVideoHidden ? "Show Video" : "Hide Video"}
//           </Button>
//           {/* End Call Button */}
//           <Button
//             onClick={handleEndCall}
//             variant="contained"
//             color="error"
//             startIcon={<CloseIcon />}
//           >
//             End Call
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default VideoChat;
