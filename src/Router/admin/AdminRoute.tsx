import { Routes, Route } from "react-router-dom";
import Dashboard from '../../Pages/admin/Dashboard/Dashboard';
import AdminLogin from '../../Pages/admin/LoginPage/Login';
import PrivateRoute from './PrivateRoute';
import PrivateRouteAdmin from './PrivateAdminRoute';
import NotFound from "../../Components/user/Home/NotFound";


function AdminRoute() {
  return (
   
    <Routes>
      <Route path="/login" element={<PrivateRoute><AdminLogin /></PrivateRoute>}/>
      <Route path="/dashboard" element={<PrivateRouteAdmin><Dashboard /></PrivateRouteAdmin>}/>
          {/* 404 Route - Catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
      
    </Routes>

  )
}

export default AdminRoute

