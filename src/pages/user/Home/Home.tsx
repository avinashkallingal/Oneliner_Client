import React from 'react'
import Navbar from '../../../Components/user/Home/Navbar'
import Home from '../../../Components/user/Home/Home'

function Home1() {
  return (
    <div style={{ minHeight: '100vh',width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Navbar/>
      <Home />
    </div>
  )
}

export default Home1
