import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height="100vh"  // Set to 100vh to cover the full height of the viewport
      width="100vw"   // Set to 100vw to cover the full width of the viewport
    //   bgcolor="grey.100" // Set the background color to eliminate white background
      p={3}           // Optional padding for some spacing
    >
      <Grid container spacing={3} justifyContent="center"  alignItems="center" flexGrow={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Box 
            p={4} 
            bgcolor="primary.light" 
            borderRadius={1} 
            textAlign="center" 
            height="100%" 
            display="flex" 
            flexDirection="column" 
            justifyContent="center"
          >
            <Typography variant="h5">User Count</Typography>
            <Typography variant="h4">120</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box 
            p={4} 
            bgcolor="secondary.light" 
            borderRadius={1} 
            textAlign="center" 
            height="100%" 
            display="flex" 
            flexDirection="column" 
            justifyContent="center"
          >
            <Typography variant="h5">Post Count</Typography>
            <Typography variant="h4">340</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={3} textAlign="center" display="flex" alignItems="center" justifyContent="center">
        <Button variant="contained" style={{ backgroundColor: 'orange', padding: '10px 20px' }}>
          Action Button
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
