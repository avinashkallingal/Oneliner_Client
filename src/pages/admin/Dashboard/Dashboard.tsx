import React, { useState } from 'react';
import { AppBar, IconButton, Tabs, Tab, Box, Toolbar, Container } from '@mui/material';
import Dashboard from '../../../Components/admin/Dashboard/Dashboard';
import UserList from '../../../Components/admin/UserManagement/UserManagement';
import { useNavigate } from 'react-router-dom';
import Posts from '../../../Components/admin/Posts/Posts';


const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    console.log(event)
    setTabIndex(newIndex);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   if (!token) {
  //     navigate("/admin/login");
  //   }
  // }, [navigate]);

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
            <Tab label="Reported Posts" sx={{ fontSize: '1.1rem', color: 'white' }} />
          </Tabs>
          <IconButton color="inherit" onClick={handleLogout}>
            logout
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* Empty Toolbar to push content below AppBar */}
      
      <Box
        component="main"
        flexGrow={1}
        p={3}
        mt={2}
        sx={{
          width: '100vw',
          maxWidth: '100vw',
          color: '#333',
          background: '#cfe2f3', // Background applied here         
          display: 'flex',
          flexDirection: 'column', // Allow vertical stacking of content
           
        }}
      >
        <Container
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
           
          }}
        >
          {/* Render the appropriate tab content */}
          {tabIndex === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <Dashboard />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <UserList />
            </Box>
          )}
          {tabIndex === 2 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <Posts />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default App;
