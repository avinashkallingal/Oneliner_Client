import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "sonner";
import socketService from "../../../socket/SocketService";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../redux/Slice/MessageSlice";
import { RootState } from "../../../redux/Store/Store";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SvgIcon from "@mui/joy/SvgIcon";
import axiosInstance from "../../../Constarints/axios/userAxios";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import peer from "../../../service/peer";
import { useNavigate } from "react-router-dom";

import VideoChat from "./VideoChat";

const WrapForm = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: "auto",
});

const WrapText = styled(TextField)({
  width: "100%",
});

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const TextInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openVideoChat, setOpenVideoChat] = useState<boolean>(false);

  const navigate=useNavigate()

  //from rdux
  const chat = useSelector((state: any) => state.ChatDisplay.chatRoomData);
  const userId = localStorage.getItem("id");
  const receiver = useSelector((state: any) => state.ChatDisplay.userData);
  const sender = useSelector((state: any) => state.UserAuth.userData);

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = currentDate.toLocaleString("en-US", options);

  useEffect(() => {
    // socketService.joinConversation(chat._id);
    socketService.onNewMessage((newMessage) => {
      console.log(message, " message recieved on front after s3 upload");
      dispatch(addMessage({ message: newMessage }));
      if (newMessage.receiverId == receiver.receiverId) {
        toast.success("New message received");
      }
    });
    return () => {
      socketService.offNewMessage((newMessage: any) => {});
    };
  }, []);
  
  useEffect(() => {
    async function clickAccept() {
     
      socketService.incomingNotification(async (offer: any) => {
        try {
          console.log(
            offer.offer.offer,
            "hii received offer from sender%%%%%%%%%%%%"
          );
  
          const ans: any = await peer.getAnswer(offer.offer.offer);
          console.log(ans, "answer of offer############");
          socketService.acceptCall({
            chatId: chat._id,
            senderId: sender._id,
            senderName: sender.username,
            receiverId: receiver._id,
            ans: ans,
          });
        } catch (error) {
          console.error("Error handling incoming notification:", error);
        }
      });
    }
    clickAccept();
  },[]);
  

  
  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
  }
  const randomId = generateRandomId();

  const handleSendMessage = async () => {
    if (message.trim() && chat._id && userId && receiver._id) {
      socketService.sendMessage({
        chatId: chat._id,
        senderId: userId,
        receiverId: receiver._id,
        content: message,
        fileType: "",
        updatedAt: formattedDate,
        _id: randomId,
      });
      setMessage("");
    } else {
      toast.error("Error something is missing, try later");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOpen(true); // Open modal to preview selected file
    }
  };
  const handleOpenvidoChat = () => {
    // setOpenVideoChat(true);//old need to view when using classic webrtc
    navigate("/videoChat")
  
  };

  type MessageType = {
    chatId: string;
    senderId: string;
    receiverId: string;
    content: string;
    updatedAt: string;
    _id: string;
    image?: File;
    video?: File;
    pdf?: File;
  };

  // const handleSendFile = async () => {
  //   if (selectedFile && chat._id && userId && receiverId._id) {

  //     socketService.sendMessage({
  //       chatId: chat._id,
  //       senderId: userId,
  //       receiverId: receiverId._id,
  //       content: selectedFile.name,
  //       file: selectedFile,
  //       updatedAt: formattedDate,
  //     });
  //     setOpen(false);
  //     setSelectedFile(null); // Reset after sending
  //     toast.success("File sent successfully");
  //   }
  // };

  const handleSendFile = async () => {
    const maxSizeInBytes = 50 * 1024 * 1024; // 50 MB in bytes

    if (selectedFile && chat._id && userId && receiver._id) {
      // Check if file size exceeds 50MB
      if (selectedFile.size > maxSizeInBytes) {
        toast.error("File is too large. Maximum allowed size is 50 MB.");
        return; // Exit if file is too large
      }

      // Initialize variables for each file type
      let type: string | null = null;

      // Check the file type and store in corresponding field
      if (selectedFile.type.startsWith("image/")) {
        type = "image"; // Store image
      } else if (selectedFile.type.startsWith("video/")) {
        type = "video"; // Store video
      } else if (selectedFile.type === "application/pdf") {
        type = "pdf"; // Store PDF
      } else {
        toast.error(
          "Unsupported file type. Only images, videos, and PDFs are allowed."
        );
        return; // Exit if the file is not a supported type
      }

      // Send message with the respective file type

      console.log(selectedFile, "--------------------------start to send file");

      const uploadFile = async (FileData: File) => {
        try {
          // const formData = new FormData();
          // formData.append('file', File);

          const response = await axiosInstance.post(
            "http://localhost:4000/message/upload",
            { FileData },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          // const response=await axios.post("http://localhost:4000/post/addPost",{userId,title,summary,tags,genre,pdfFile,photoFile},{
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   }
          // })
          console.log(response, " ^^^^^^^^^^^^^response in s3 upload");

          // Assuming the server responds with a JSON object containing the file URL or ID
          return response.data; // e.g., { url: 'https://example.com/path/to/file' }
        } catch (error) {
          console.error("File upload error:", error);
          throw error;
        }
      };

      const sendMediaMessage = async (
        file: File,
        chatId: any,
        senderId: any,
        receiverId: any
      ) => {
        try {
          const fileData = await uploadFile(file);
          console.log(fileData, " file data in frontend");

          // Emit the media message through socket with the uploaded file's reference
          socketService.sendMessage({
            chatId,
            senderId,
            receiverId,
            content: fileData.data, // Use the URL or ID from the response
            updatedAt: new Date().toISOString(),
            _id: randomId,
            fileType: type,
          });
        } catch (error) {
          console.error("Error sending media message:", error);
        }
      };
      sendMediaMessage(selectedFile, chat._id, userId, receiver._id);

      // socketService.sendMedia({

      //   chatId: chat._id,
      //   senderId: userId,
      //   receiverId: receiverId._id,
      //   content: message,

      //   updatedAt: formattedDate,
      //   _id: randomId,
      // });

      setOpen(false);
      setSelectedFile(null); // Reset after sending
      toast.success("File sent successfully");
    } else {
      toast.error("File not selected or missing data for sending.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };
  // useEffect(()=>{
  //   socketService.incomingNotification((offer:any)=>{
  //     console.log(offer,"got sender OffscreenCanvas,just accept it^^^^^^^^^^^^^")
  //   })
  // })
  return (
    <>
      <WrapForm
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <WrapText
          id="standard-text"
          label="Type here"
          variant="standard"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socketService.onTyping(`${userId}`);
          }}
        />

        <Button component="label" variant="outlined" color="neutral">
          <AttachmentIcon />
          <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
        </Button>

        <Button
          component="label"
          variant="outlined"
          color="neutral"
          onClick={handleOpenvidoChat}
        >
          <VideoCallIcon />
        </Button>

        <Button onClick={handleSendMessage} variant="contained" color="primary">
          <SendIcon />
        </Button>
      </WrapForm>

      {/* Modal for image/video preview starts*/}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Preview Attachment</DialogTitle>
        <DialogContent>
          {selectedFile && selectedFile.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : selectedFile && selectedFile.type.startsWith("video") ? (
            <video controls style={{ maxWidth: "100%", height: "auto" }}>
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
              Your browser does not support the video tag.
            </video>
          ) : selectedFile && selectedFile.type === "application/pdf" ? (
            <embed
              src={URL.createObjectURL(selectedFile)}
              type="application/pdf"
              width="100%"
              height="500px"
            />
          ) : (
            <>File format Not supported</>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendFile} variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal for image/video preview ends */}
      {/* <VideoChat open={openVideoChat} onClose={() => setOpenVideoChat(false)} /> */}
    </>
  );
};
