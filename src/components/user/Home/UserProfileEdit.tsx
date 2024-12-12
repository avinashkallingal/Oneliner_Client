import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utilities/CropImage'; // A utility function to crop the image
import { HttpStatus } from "../../../Interfaces/StatusCode";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";

const defaultTheme = createTheme();

export default function UserProfile() {
  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [user, setUser] = React.useState<User>({
    username: "",
    about: "",
    gender: "",
    language: "",
  });
  const [photoFile, setPhotoFile] = React.useState<File | Blob | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  interface User {
    id?: number;
    username?: string;
    email?: string;
    gender?: string;
    about?: string;
    language?: string;
    isBlocked?: boolean;
    followers?: string[];
    followings?: string[];
    profilePicture?: string;
  }

  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("id");

  React.useEffect(() => {
    const fetchData = async () => {
      console.log(email, "email from localstorage");
      const result = await axiosInstance.post(
               userEndpoints.fetchUserData,
        { id: id }
      );
      // console.log(result.data.result.user_data, "data from user fetch");
      if (result.data.success) {
        setUser(result.data.result.user_data._doc);
        console.log(user,"state in user state")
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle file change for avatar
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
//crop
const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    setPhotoFile(file);
  }
};

const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
  setCroppedAreaPixels(croppedAreaPixels);
};

const handleCrop = async () => {
  if (imageSrc && croppedAreaPixels) {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setPhotoFile(croppedImage);
    setImageSrc(''); // Reset the imageSrc after cropping
  }
};


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append fields to the FormData object
    // formData.append('email', email || '');  // Attach email from local storage
    formData.append("username", user.username || "");
    formData.append("about", user.about || "");
    formData.append("gender", user.gender || "");
    formData.append("language", user.language || "");

    // If a file is selected, append it as 'avatar'
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    if(photoFile){
      formData.append("avatar", photoFile);
    }
    // Console log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`, " consoling form data");
    }

    try {
      // Make the API call to update profile
      const response = await axiosInstance.put(
       userEndpoints.updateUserProfile(id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response," response 23456789")
     
        // Handle the response
        if (response.data.success) {
          console.log("Profile updated successfully:", response.data);
          // Redirect or show success message
          navigate("/userProfile",{state:{id}});
        } else {
          console.log("Error updating profile:", response.data.message);
       
      
       
        }
    } catch (error:any) {
      console.error("Error while updating profile:", error);
      if (error.response.status != HttpStatus.OK) {
        toast.error("unauthorized access");
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          p: 2,
          overflowY: "auto",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            width: isSmallScreen ? "90%" : "500px",
            backgroundColor: "rgba(256, 256, 256, 0.8)",
            boxShadow: "0px 4px 50px rgba(0,0,0, 0.6)",
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>

          <Grid item>
            
             {photoFile ? (
              <Avatar
              src={              
                URL.createObjectURL(photoFile)               
              }
              style={{ width: 96, height: 96, borderRadius: "50%" }}
            /> ):<Avatar
              src={
                previewUrl ||
                user?.profilePicture               
              }
              style={{ width: 96, height: 96, borderRadius: "50%" }}
            />}
            {/* <Button
              variant="contained"
              color="secondary"
              component="label"
              style={{ marginTop: 10, marginLeft: -25 }}
            >
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button> */}


            <input type="file" name='image' accept="image/*" onChange={handlePhotoChange} />
            {imageSrc && (
              <div style={{ position: 'relative', height: 400, width: '100%' }}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                />
                <Button variant="contained" onClick={handleCrop}>
                  Crop
                </Button>
              </div>
            )}
            
          </Grid>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={user.username || ""}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="about"
                  label="About"
                  name="about"
                  value={user.about || ""}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="language"
                  label="Language"
                  name="language"
                  value={user.language || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#D3A221" }}
            >
              Save Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
