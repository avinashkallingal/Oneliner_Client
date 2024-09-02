import UserProfile1 from "../../../components/user/Home/UserProfile"
import Navbar from "../../../components/user/Home/Navbar"
import { Toaster } from "sonner"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function UserProfile() {
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem("onelinejwttoken")
    console.log("token in useeffect",token)
    if(!token){
      navigate("/")
    } 
   
  }, [])
  // const response = await axiosInstance.post('/admin/changeStatus', {
  //   email: userEmail,
  //   isBlocked: !isBlocked,
  // });
  return (
    <>
    <Toaster/>
      <Navbar/>
      <UserProfile1/>
    </>
  )
}

export default UserProfile
