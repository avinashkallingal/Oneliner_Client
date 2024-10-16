import UserProfile1 from "../../../Components/user/Home/UserProfile"
import Navbar from "../../../Components/user/Home/Navbar"
import { Toaster } from "sonner"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function UserProfile() {
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem("userToken")
    console.log("token in useeffect",token)
    if(!token){
      navigate("/")
    } 
   
  }, [])
 
  return (
    <div style={{ minHeight: '100vh',width: '100vw',background:"#D3D3D3", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Toaster/>
      <Navbar/>
      <UserProfile1/>
      
    </div>
  )
}

export default UserProfile
