import React, { useState,useEffect } from 'react';
import {  Grid, TextField, Paper, Button, Typography } from "@mui/material";
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Constarints/axios/adminAxios';
import { adminEndpoints } from '../../../Constarints/endpoints/adminEndpoints';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigate=useNavigate()

  const validate = () => {
    let isValid = true;
    let newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'email is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const login = async() => {
    if (validate()) {
      console.log("login clicked");
      
      // Proceed with login logic
      const result=await axios.post(adminEndpoints.adminLogin,{email,password})
      console.log(result.data," admin login result")
      if(result.data.success){
        localStorage.setItem("adminToken",result.data.token)
        console.log("login success");
        toast.info(result.data.message);
        navigate("/admin/dashboard")
      }else{
        console.log("login error");
        toast.info(result.data.message);
      }

    }
    
  };
  // useEffect(() => {
  //   const token=localStorage.getItem("adminToken")
  //   if(token){
  //     navigate("/admin/dashboard")
  //   }  
  // }, [])

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: 30 }}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Admin Login
            </Typography>

            <Grid item xs={12} style={{ width: '100%' }}>
              <TextField
                fullWidth
                label="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} style={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

           

            <Grid item xs={12} style={{ width: '100%' }}>
              <Button variant="contained" color="primary" fullWidth onClick={login}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
