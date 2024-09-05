import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '../Pages/admin/Dashboard/Dashboard';
import AdminLogin from '../Pages/admin/LoginPage/Login';

function AdminRoute() {
  return (
   
    <Routes>
      <Route path="/login" element={<AdminLogin />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      
    </Routes>

  )
}

export default AdminRoute

