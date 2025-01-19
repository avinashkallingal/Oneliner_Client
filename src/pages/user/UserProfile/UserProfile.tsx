import UserProfile1 from "../../../Components/user/Home/UserProfile"
import Navbar from "../../../Components/user/Home/Navbar"
import { useLocation } from "react-router-dom"

function UserProfile() {
  const location=useLocation()

  const userId=location.state.id
  console.log(userId," location state in userprofile page section $$$$$$$$$$$$$")
 
  return (
    <div style={{ minHeight: '100vh',width: '100vw',background:"#D3D3D3", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    
      <Navbar/>
      <UserProfile1 id={userId}/>
      
    </div>
  )
}

export default UserProfile
