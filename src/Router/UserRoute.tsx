import { Routes, Route } from "react-router-dom";

import Signup from "../Pages/user/Signup/Signup";
import Otp from "../Pages/user/Otp/Otp";
import UserProfileEdit from "../Pages/user/UserProfile/UserProfileEdit";
import UserProfile from "../Pages/user/UserProfile/UserProfile";
// import Login from "../Pages/user/LoginPage/Login";
import Login from "../Components/user/Auth/Login/Login";
import AddPost from "../Pages/posts/AddPost";
import Home from "../Pages/user/Home/Home";


function UserRoute() {
  console.log("hi this is user router page");
  return (
    <>

    {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/userProfileEdit" element={<UserProfileEdit />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/add-post" element={<AddPost />} />

      
      </Routes>
    </>
  );
}

export default UserRoute;
