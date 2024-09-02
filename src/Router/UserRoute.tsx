import { Routes, Route } from "react-router-dom";

import Signup from "../Pages/user/Signup/Signup";
import Otp from "../Pages/user/Otp/Otp";
import UserProfile from "../Pages/user/UserProfile/UserProfile";
// import Login from "../Pages/user/LoginPage/Login";
import Login from "../Components/user/Auth/Login/Login";


function UserRoute() {
  console.log("hi this is user router page");
  return (
    <>

    {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Login />} />
     

        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/userprofile" element={<UserProfile />} />

        {/* <Route path="/userProfile" element={<UserProfile />} /> */}
      </Routes>
    </>
  );
}

export default UserRoute;
