import React from "react";
import Navbar from "../../Components/user/Home/Navbar";
import ButtonStepper from "../../Components/user/Home/AddPost";



import Home from '@mui/icons-material/Home'; // Importing the Home icon



function AddPost() {
  return (
    <div style={{ minHeight: '100vh',width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"0px" }}>
      <Navbar />
   
      <ButtonStepper />

    </div>
  );
}

export default AddPost;