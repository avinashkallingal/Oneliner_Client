
import {Routes, Route } from "react-router-dom";
import Login from '../pages/user/LoginPage/Login'
import Signup from "../pages/user/Signup/Signup";
import Otp from "../pages/user/Otp/Otp"
import UserProfile from "../pages/user/UserProfile/UserProfile";

function UserRoute() {
  console.log("hi this is user router page")
  return (
    <>

      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/otp" element={<Otp />}/>
        <Route path="/userprofile" element={<UserProfile />}/>

        {/* <Route path="/userProfile" element={<UserProfile />} /> */}
      </Routes>
    
  </>
  )
}

export default UserRoute
