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
import axiosInstance from "../../../Constarints/axios/userAxios";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import Navbar from "./Navbar";
import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";

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
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [stepDisable, setStepDisable] = React.useState(false);
  const [pdf, setPdf] = React.useState<any>(null);

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

  const viewPdf = async (postId: any) => {
    try {
      const result = await axiosInstance.post(postEndpoints.pdfUrlFetch, {
        postId,
      });

      if (result.data.success) {
        setPdf(result.data.pdfUrl);
        console.log(result.data.pdfUrl, " pfd fetch result fhfhj");
        // Return the PDF URL if successful
      } else {
        toast.error("Error while viewing PDF");
        setErrors({ pdfError: "Error while viewing PDF" });
      }
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };

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
    console.log(croppedArea, "croped area");
    setCroppedAreaPixels(croppedAreaPixels);
  };
  if (
    location.state &&
    location.state.post &&
    Array.isArray(location.state.post.imageUrlS3)
  ) {
    console.log(
      location.state?.post?.imageUrlS3?.[0],
      " image url in edit post++++++++++"
    );
  }

  const handleCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage: any = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      setPhotoFile(croppedImage);
      setThumbnail(URL.createObjectURL(croppedImage));
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

  // const validateStep = () => {
  //   let newErrors: { [key: string]: string } = {};

  //   switch (activeStep) {
  //     case 0:
  //       if (!title) newErrors.title = "Title is required.";
  //       if (!summary) newErrors.summary = "Summary is required.";
  //       // if (tags.length === 0) newErrors.tags = 'At least one tag is required.';
  //       if (!genre) newErrors.genre = "Genre is required.";
  //       setStepDisable(true);
  //       break;
  //     case 1:
  //       if (!pdfFile) newErrors.pdf = "Please upload a PDF file.";
  //       break;
  //     case 2:
  //       if (!photoFile) newErrors.photo = "Please upload a photo.";
  //       break;
  //     default:
  //       break;
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // Return true if no errors
  // };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const userId = localStorage.getItem("id");
  const postId = location.state.post._id;
  const submitPost = async () => {
    const response = await axios.post(
      postEndpoints.editPost,
      { userId, title, summary, tags, genre, pdfFile, photoFile, postId },
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

  if (pdf) {
    return (
      <>
        <Navbar />
        {pdf ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              marginTop: "10vh",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setPdf(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 1000,
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Close
            </button>

            {/* PDF Embed */}
            <EmbedPDF
              mode="inline"
              style={{ width: "100%", height: "100%" }}
              documentURL={pdf}
            />
          </div>
        ) : (
          <p>No PDF selected.</p>
        )}
      </>
    );
  }

  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField
              label={"Title"}
              fullWidth
              margin="normal"
              value={title || location.state.post.title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label={"Summary"}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={summary || location.state.post.summary}
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
        // return (
        //   <div>
        //      <button style={{flexFlow:"column"}} onClick={() => viewPdf(location.state?.post?._id)}>
        //                 Preview PDF
        //               </button>
        //     <input
        //       type="file"
        //       name="pdf"
        //       accept="application/pdf"
        //       onChange={handleFileChange}
        //     />
        //     {pdfFile && <p>{pdfFile.name}</p>}
        //     {errors.pdf && <p style={{ color: "red" }}>{errors.pdf}</p>}
        // <Button
        //   variant="contained"
        //   onClick={() => {
        //     setStepDisable(true);
        //     if (!(activeStep <= 0)) {
        //       setActiveStep(activeStep - 1);
        //     }
        //   }}
        // >
        //   Back
        // </Button>
        // <Button variant="contained" onClick={handleNext}>
        //   Next
        // </Button>
        //   </div>
        // );
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh", // Center vertically in viewport
              backgroundColor: "#f8f9fa", // Light background
              overflow: "hidden", // Prevent scrolling
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#fff", // White card
                width: "400px", // Limit box width
                textAlign: "center", // Center text and content
              }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "10px 0",
                  marginBottom: "15px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (pdfFile) {
                    window.open(URL.createObjectURL(pdfFile), "_blank");
                  } else if (location.state?.post?._id) {
                    viewPdf(location.state?.post?._id);
                  }
                }}
              >
                {pdfFile ? "Preview Selected PDF" : "Preview PDF"}
              </button>
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{
                  display: "block",
                  margin: "10px auto",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
              {pdfFile && (
                <p
                  style={{
                    marginTop: "10px",
                    color: "#555",
                    fontSize: "14px",
                    wordBreak: "break-word", // Ensure long filenames wrap
                  }}
                >
                  {pdfFile.name}
                </p>
              )}
              {errors.pdf && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {errors.pdf}
                </p>
              )}
              {/* Buttons Section */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setStepDisable(true);
                    if (!(activeStep <= 0)) {
                      setActiveStep(activeStep - 1);
                    }
                  }}
                  style={{
                    width: "48%", // Equal width for both buttons
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  style={{
                    width: "48%", // Equal width for both buttons
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 2:
        // return (
        //   <div>
        //     <input
        //       type="file"
        //       name="image"
        //       accept="image/*"
        //       onChange={handlePhotoChange}
        //     />
        //     <div
        //       style={{
        //         width: "150px",
        //         height: "150px",
        //         overflow: "hidden",
        //         borderRadius: "10px",
        //         border: "1px solid #ccc",
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         backgroundColor: "#f9f9f9", // Optional background color
        //       }}
        //     >
        //       <img
        //         src={location.state?.post?.imageUrlS3?.[0]} // Replace with your image URL or path
        //         alt="Thumbnail"
        //         style={{
        //           width: "100%",
        //           height: "100%",
        //           objectFit: "cover", // Ensures the image covers the box area
        //         }}
        //       />
        //     </div>
        //     {imageSrc && (
        //       <div style={{ position: "relative", height: 400, width: "100%" }}>
        //         <Cropper
        //           image={imageSrc}
        //           crop={crop}
        //           zoom={zoom}
        //           aspect={16 / 9}
        //           onCropChange={setCrop}
        //           onCropComplete={handleCropComplete}
        //           onZoomChange={setZoom}
        //         />
        //         <Button variant="contained" onClick={handleCrop}>
        //           Crop
        //         </Button>
        //       </div>
        //     )}
        //     {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
        //     <Button
        //       variant="contained"
        //       onClick={() => {
        //         setStepDisable(true);
        //         if (!(activeStep <= 0)) {
        //           setActiveStep(activeStep - 1);
        //         }
        //       }}
        //     >
        //       Back
        //     </Button>
        //     <Button variant="contained" onClick={handleNext}>
        //       Next
        //     </Button>
        //   </div>
        // );

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh", // Center vertically in viewport
              backgroundColor: "#f8f9fa", // Light background
              overflow: "hidden", // Prevent scrolling
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#fff", // White card
                width: "400px", // Limit box width
                textAlign: "center", // Center text and content
              }}
            >
              {/* File Upload Input */}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{
                  display: "block",
                  margin: "10px auto",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />

              {/* Thumbnail Preview */}
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
                  backgroundColor: "#f9f9f9",
                  margin: "10px auto", // Center horizontally
                }}
              >
                {/* <img
                  src={location.state?.post?.imageUrlS3?.[0]} // Replace with your image URL or path
                  alt="Thumbnail"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ensures the image covers the box area
                  }}
                /> */}
                {imageSrc ? ( // Show selected file preview
                  <img
                    src={imageSrc}
                    alt="Thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : thumbnail ? ( // Show cropped image if available
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  // Show existing post image if no file is selected
                  <img
                    src={location.state?.post?.imageUrlS3?.[0] || ""}
                    alt="Thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* Image Cropper */}
              {imageSrc && (
                <>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "250px",
                      marginTop: "10px",
                    }}
                  >
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setCrop}
                      onCropComplete={handleCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "10px 0",
                      marginTop: "15px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={handleCrop}
                  >
                    Crop Image
                  </button>
                </>
              )}

              {errors.photo && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {errors.photo}
                </p>
              )}

              {/* Buttons Section */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setStepDisable(true);
                    if (!(activeStep <= 0)) {
                      setActiveStep(activeStep - 1);
                    }
                  }}
                  style={{
                    width: "48%", // Equal width for both buttons
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  style={{
                    width: "48%", // Equal width for both buttons
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        // return (
        //   <Box
        //     sx={{
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       // minHeight: '100vh', // Full viewport height for vertical centering
        //       backgroundColor: "#f0f0f0", // Optional: background for contrast
        //     }}
        //   >
        //     <Card variant="outlined" sx={{ maxWidth: 550, padding: 2 }}>
        //       <CardContent>
        //         <Typography variant="h5" gutterBottom>
        //           Preview
        //         </Typography>

        //         <Typography variant="body1">
        //           <strong>Title:</strong> {title}
        //         </Typography>
        //         {photoFile && (
        //           <Box
        //             component="img"
        //             src={URL.createObjectURL(photoFile)}
        //             alt="Cropped Preview"
        //             sx={{ maxWidth: "100%", marginTop: 2 }}
        //           />
        //         )}
        //         <Typography variant="body1">
        //           <strong>Genre:</strong> {genre}
        //         </Typography>

        //         <Typography variant="body1">
        //           <strong>Tags:</strong> {tags.join(", ")}
        //         </Typography>

        //         <Typography variant="body1">
        //           <strong>Summary:</strong> {summary}
        //         </Typography>

        //         {pdfFile && (
        //           <Typography variant="body1">
        //             <strong>PDF File:</strong> {pdfFile.name}
        //           </Typography>
        //         )}

        //         <Box mt={2}>
        //           <Button
        //             variant="contained"
        //             onClick={() => {
        //               setStepDisable(true);
        //               if (!(activeStep <= 0)) {
        //                 setActiveStep(activeStep - 1);
        //               }
        //             }}
        //           >
        //             Back
        //           </Button>
        //           <Button
        //             onClick={submitPost}
        //             variant="contained"
        //             color="primary"
        //           >
        //             Submit
        //           </Button>
        //         </Box>
        //       </CardContent>
        //     </Card>
        //   </Box>
        // );
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "55vh", // Ensure vertical centering
              backgroundColor: "#f0f0f0", // Light background for better contrast
              overflow: "hidden", // Prevent scrolling within the container
            }}
          >
            <Card
              variant="outlined"
              sx={{
                maxWidth: 550,
                padding: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for card
                backgroundColor: "#fff", // White background
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Preview
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Title:</strong> {title}
                </Typography>

                {photoFile && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(photoFile)}
                    alt="Cropped Preview"
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      marginTop: 2,
                      borderRadius: "5px", // Rounded corners
                    }}
                  />
                )}

                <Typography variant="body1" gutterBottom>
                  <strong>Genre:</strong> {genre}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Tags:</strong> {tags.join(", ")}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Summary:</strong> {summary}
                </Typography>

                {pdfFile && (
                  <Typography variant="body1" gutterBottom>
                    <strong>PDF File:</strong> {pdfFile.name}
                  </Typography>
                )}

                {/* Buttons Section */}
                <Box
                  mt={3}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2, // Adds space between buttons
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setStepDisable(true);
                      if (!(activeStep <= 0)) {
                        setActiveStep(activeStep - 1);
                      }
                    }}
                    sx={{ width: "48%" }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={submitPost}
                    variant="contained"
                    color="primary"
                    sx={{ width: "48%" }}
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
      <Navbar />
      <Stepper
        sx={{
          alignItems: "center",
          width: "80%",
          marginTop: "10vh",
          marginLeft: 29,
        }}
      >
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
          marginLeft: "15vw",
          marginTop: 5,
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "70vw",
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
