import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function AdminRoute() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<AdminLogin />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      
    </Routes>
  </Router>
  )
}

export default AdminRoute

