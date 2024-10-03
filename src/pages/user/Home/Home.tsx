import React from 'react'
import Navbar from '../../../Components/user/Home/Navbar'
import Home from '../../../Components/user/Home/Home'
import { List, ListItem, ListItemButton, ListItemDecorator, ListItemContent } from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'; 
import TopBar from '../../../Components/user/Home/TopBar';

function Home1() {
  return (
    <div style={{ minHeight: '100vh',width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Navbar/>
      {/* <TopBar/> */}
      <Home />
    </div>
  )
}

export default Home1
