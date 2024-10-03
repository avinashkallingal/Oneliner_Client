import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import { TextField, Button, MenuItem, InputAdornment } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utilities/CropImage"; // A utility function to crop the image
import { Card, CardContent, Typography, Box } from "@mui/material";
import axiosInstance from "../../../Constarints/axios/adminAxios";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const steps = ["Add synopsis", "Add PDF", "Upload Photo", "Preview"];

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [photoFile, setPhotoFile] = React.useState<File | Blob | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [stepDisable, setStepDisable] = React.useState(false);

  const genres = ["Fiction", "Non-Fiction", "Science", "Technology"];

  // for denouncing
  //  const [userlist, setUserlist] = React.useState("");
  // React.useEffect(() => {
  //   const getData = setTimeout(() => {
  //     axiosInstance
  //       .get(`http://localhost:4000/admin/userList`)
  //       .then((response) => {
  //         console.log(response.data.userData," USERDATAS  -----");
  //         setUserlist(response.data.userData)
  //       });
  //   }, 2000);

  //   return () => clearTimeout(getData);
  // }, [userlist]);

  React.useEffect(() => {
    console.log(
      location.state.post,
      "hiiiiiiiiiii++++++++++++++++++++++++++++"
    );
    setPost(location.state.post);
    // setTitle(location.state.post.title)
    // setSummary(location.state.post.summary)
    // setGenre(location.state.post.genre)
    console.log(post, "hellowwww++++++++++++++++++++++++++++");
  });
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
    //  setUserlist(event.target.value);
  };

  const stepperVlidation = () => {};

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPdfFile(file);
  };

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
      setImageSrc(""); // Reset the imageSrc after cropping
    }
  };

  //  // Handle input changes
  //  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  const validateStep = () => {
    let newErrors: { [key: string]: string } = {};

    switch (activeStep) {
      case 0:
        if (!title) newErrors.title = "Title is required.";
        if (!summary) newErrors.summary = "Summary is required.";
        // if (tags.length === 0) newErrors.tags = 'At least one tag is required.';
        if (!genre) newErrors.genre = "Genre is required.";
        setStepDisable(true);
        break;
      case 1:
        if (!pdfFile) newErrors.pdf = "Please upload a PDF file.";
        break;
      case 2:
        if (!photoFile) newErrors.photo = "Please upload a photo.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const userId = localStorage.getItem("id");
  const postId=location.state.post._id
  const submitPost = async () => {
    const response = await axios.post(
      "http://localhost:4000/post/editPost",
      { userId, title, summary, tags, genre, pdfFile, photoFile,postId },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    if (response.data.success == true) {
      toast.info("Post created");
      navigate("/home");
    }
  };

  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField
              label={location.state.post.title}
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label={location.state.post.summary}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              error={!!errors.summary}
              helperText={errors.summary}
            />
            <TextField
              label="Tags"
              fullWidth
              margin="normal"
              value={tagInput}
              onChange={handleTagChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleAddTag}>Add</Button>
                  </InputAdornment>
                ),
              }}
              error={!!errors.tags}
              helperText={errors.tags}
            />
            {tags.length > 0 && (
              <div>
                {tags.map((tag, index) => (
                  <span key={index} style={{ marginRight: 10 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <TextField
              label={location.state.post.genre}
              select
              fullWidth
              margin="normal"
              value={genre}
              placeholder={location.state.post.genre}
              onChange={(e) => setGenre(e.target.value)}
              error={!!errors.genre}
              helperText={errors.genre}
            >
              {genres.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </div>
        );
      case 1:
        return (
          <div>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {pdfFile && <p>{pdfFile.name}</p>}
            {errors.pdf && <p style={{ color: "red" }}>{errors.pdf}</p>}
            <Button
              variant="contained"
              onClick={() => {
                setStepDisable(true);
                if (!(activeStep <= 0)) {
                  setActiveStep(activeStep - 1);
                }
              }}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <div
              style={{
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "10px",
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9", // Optional background color
              }}
            >
              <img
                src={location.state.post.imageUrl[0]} // Replace with your image URL or path
                alt="Thumbnail"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensures the image covers the box area
                }}
              />
            </div>
            {imageSrc && (
              <div style={{ position: "relative", height: 400, width: "100%" }}>
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
            {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
            <Button
              variant="contained"
              onClick={() => {
                setStepDisable(true);
                if (!(activeStep <= 0)) {
                  setActiveStep(activeStep - 1);
                }
              }}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </div>
        );
      case 3:
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // minHeight: '100vh', // Full viewport height for vertical centering
              backgroundColor: "#f0f0f0", // Optional: background for contrast
            }}
          >
            <Card variant="outlined" sx={{ maxWidth: 550, padding: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Preview
                </Typography>

                <Typography variant="body1">
                  <strong>Title:</strong> {title}
                </Typography>
                {photoFile && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(photoFile)}
                    alt="Cropped Preview"
                    sx={{ maxWidth: "100%", marginTop: 2 }}
                  />
                )}
                <Typography variant="body1">
                  <strong>Genre:</strong> {genre}
                </Typography>

                <Typography variant="body1">
                  <strong>Tags:</strong> {tags.join(", ")}
                </Typography>

                <Typography variant="body1">
                  <strong>Summary:</strong> {summary}
                </Typography>

                {pdfFile && (
                  <Typography variant="body1">
                    <strong>PDF File:</strong> {pdfFile.name}
                  </Typography>
                )}

                <Box mt={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setStepDisable(true);
                      if (!(activeStep <= 0)) {
                        setActiveStep(activeStep - 1);
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={submitPost}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Stepper sx={{alignItems:"center" ,width: "80%", marginTop: "10vh",marginLeft:32 }}>
        {steps.map((step, index) => (
          <Step
            key={step}
            indicator={
              <StepIndicator
                variant={activeStep <= index ? "soft" : "solid"}
                color={activeStep < index ? "neutral" : "primary"}
              >
                {activeStep <= index ? index + 1 : <Check />}
              </StepIndicator>
            }
            sx={[
              activeStep > index &&
                index !== 3 && { "&::after": { bgcolor: "primary.solidBg" } },
            ]}
          >
            <StepButton
              onClick={() => {
                if (stepDisable) {
                  stepperVlidation();
                  setActiveStep(index);
                }
              }}
              disabled={stepDisable}
            >
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div
        style={{
          marginLeft:"36vw",
          marginTop: 55,
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "70vw",
          margin: "auto",
          color: "black",
          height: "500px",
          minHeight: "300px",
          maxHeight: "500px",
          overflowY: "auto",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          flexDirection: "column", // Align items inside the card properly
        }}
      >
        {renderStepContent(activeStep)}
      </div>
    </div>
  );
}
