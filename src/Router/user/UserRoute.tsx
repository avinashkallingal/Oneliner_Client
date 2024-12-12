import { Routes, Route } from "react-router-dom";

import Signup from "../../Pages/user/Signup/Signup";
import Otp from "../../Pages/user/Otp/Otp";
import UserProfileEdit from "../../Pages/user/UserProfile/UserProfileEdit";
import UserProfile from "../../Pages/user/UserProfile/UserProfile";
// import Login from "../Pages/user/LoginPage/Login";
import Login from "../../Components/user/Auth/Login/Login";
import AddPost from "../../Pages/posts/AddPost";
import Home from "../../Pages/user/Home/Home";
import EditPost from "../../Components/user/Home/EditPost"
import ChatBox from "../../Pages/user/ChatBox/ChatBox";
import ViewPost from "../../Pages/user/ViewPost/ViewPost";
import VideoChat from "../../Components/user/Home/VideoChat";
import { SimpleDialog } from "../../Components/user/Home/SearchBox";
import PrivateRoute from "./PrivateRoute";
import PrivateRouteUser from "./PrivateUserRoute";



function UserRoute() {
  // console.log("hi this is user router page");
  return (
    <>

    {/* <Login/> */}
      <Routes>
        <Route path="/" element={<PrivateRoute><Login /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRouteUser ><Home /></PrivateRouteUser>} />
        <Route path="/signup" element={<PrivateRoute><Signup /></PrivateRoute>} />
        <Route path="/otp" element={<PrivateRoute><Otp /></PrivateRoute>} />
        <Route path="/userProfileEdit" element={<PrivateRouteUser ><UserProfileEdit /></PrivateRouteUser>} />
        <Route path="/userProfile" element={<PrivateRouteUser ><UserProfile /></PrivateRouteUser>} />
        <Route path="/add-post" element={<PrivateRouteUser ><AddPost /></PrivateRouteUser>} />
        <Route path="/editPost" element={<PrivateRouteUser ><EditPost /></PrivateRouteUser>} />
        <Route path="/viewPost" element={<PrivateRouteUser ><ViewPost /></PrivateRouteUser>} />
        <Route path="/chats" element={<PrivateRouteUser ><ChatBox /></PrivateRouteUser>} /> 
        {/* <Route path="/search" element={<SimpleDialog />} />  */}
        {/* <Route path='/login' element={ <PrivateRoute > <TutorLogin />  </PrivateRoute>} /> */}
        
        {/* <Route path="/videoChat" element={<VideoChat />} />        */}
      </Routes>
    </>
  );
}

export default UserRoute;
