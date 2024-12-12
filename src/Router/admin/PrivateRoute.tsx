import React,{ReactNode} from 'react';
// import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps{
  children:ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps>=({children})=> {
const user = localStorage.getItem('adminToken')

  return  user? <Navigate to='/admin/dashboard'/>:<>{children}</>
}
export default PrivateRoute;