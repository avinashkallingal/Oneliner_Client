import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./Router/AdminRoute"
import UserRoute from "./Router/UserRoute"


import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoute />}/>
          <Route path="/*" element={<UserRoute />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
