import React, { useEffect, useState } from 'react';
import { AppBar,IconButton, Tabs, Tab, Box, Toolbar, Container } from '@mui/material';
import Dashboard from '../../../Components/admin/Dashboard/Dashboard';
import UserList from '../../../Components/admin/UserManagement/UserManagement';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const navigate=useNavigate()

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  const handleLogout=()=>{
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }
  useEffect(() => {
  const token=localStorage.getItem("adminToken")
  if(!token){
    navigate("/admin/login")
  }
  
   
  }, [])
  

  return (
    
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Toolbar>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            centered
            sx={{ width: '100%' }}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Dashboard" sx={{ fontSize: '1.1rem', color: 'white' }} />
            <Tab label="User List" sx={{ fontSize: '1.1rem', color: 'white' }} />
          </Tabs>
          <IconButton color="inherit" onClick={handleLogout}>
         logout
        </IconButton>
        </Toolbar>
        
      </AppBar>

      <Toolbar /> {/* Add an empty Toolbar to push the content below the fixed AppBar */}
      
      <Box
        component="main"
        flexGrow={1}
        p={3}
        mt={2}
        sx={{ width: '100%', maxWidth: '100vw', color: '#333' }}
      >
        <Container sx={{ maxWidth: '100%', padding: 0 }}>
          {tabIndex === 0 && <Dashboard />}
          {tabIndex === 1 && <UserList />}
        </Container>
      </Box>
    </Box>
  );
};

export default App;
