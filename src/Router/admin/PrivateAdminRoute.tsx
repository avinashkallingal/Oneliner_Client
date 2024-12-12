import React,{ReactNode} from "react";
import { Navigate } from "react-router-dom";
//  import Cookies from "js-cookie";
interface privateRouteTutorProps{
    children:ReactNode
}
const  PrivateRouteAdmin:React.FC<privateRouteTutorProps>=({children})=> {
    const tutor = localStorage.getItem('adminToken')

  return tutor? children:<Navigate to = "/admin/login"/>
}

export default PrivateRouteAdmin
