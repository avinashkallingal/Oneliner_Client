import React,{ReactNode} from "react";
import { Navigate } from "react-router-dom";
//  import Cookies from "js-cookie";
interface privateRouteTutorProps{
    children:ReactNode
}
const  PrivateRouteUser:React.FC<privateRouteTutorProps>=({children})=> {
    const tutor = localStorage.getItem('userRefreshToken')

  return tutor? children:<Navigate to = "/"/>
}

export default PrivateRouteUser
