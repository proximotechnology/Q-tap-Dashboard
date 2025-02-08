import React, { useState } from 'react';
import {
  Button,
  Box,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  useTheme,
  CircularProgress,
  Radio,
  RadioGroup,
} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router';
import axios from 'axios';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState('');
  const [userType, setUserType] = useState('qtap_admins');

  const handleSubmit = async () => {
    // Reset API states
    setApiError('');
    setApiSuccess('');
  
    // Validate inputs
    if (!email || !password) {
      setApiError('All fields are required!');
      return;
    }
  
    // Prepare data for API
    const data = {
      email,
      password,
      user_type: userType,
    };
  
    // Send data to API
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://highleveltecknology.com/Qtap/api/login',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      console.log('API Response:', response.data); // Debug log
  
      if (response?.data?.user) {
        setApiSuccess('Successful login!');
  
        // Determine user type with fallback logic
        const loginUserType = response.data.user?.user_type ;
        console.log('User Type:', loginUserType); // Debug log
  
        // Navigate based on user role
        if (loginUserType === 'qtap_admins') {
          localStorage.setItem('adminToken', response.data.token);
          navigate('/dashboard-home');
        } else if (loginUserType === 'qtap_affiliates') {
          localStorage.setItem('affiliateToken', response.data.token);
          navigate('/dashboard-affiliate');
        } else if (loginUserType === 'qtap_clients') {
          localStorage.setItem('clientToken', response.data.token);
          navigate('/logo-cient');
        } else {
          navigate('/');
        }
      } else {
        setApiError(response?.data?.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login Error:', error); // Debug log
      setApiError(error.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <FormControl variant="outlined" fullWidth margin="normal">
        <OutlinedInput
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <MailOutlinedIcon sx={{ fontSize: '18px' }} />
            </InputAdornment>
          }
          required
          sx={{
            borderRadius: '50px',
            height: '35px',
            fontSize: '11px',
            color: 'gray',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              outline: 'none',
            },
          }}
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth margin="normal">
        <OutlinedInput
          id="outlined-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <span className="icon-padlock" style={{ fontSize: '18px' }} />
            </InputAdornment>
          }
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon sx={{ fontSize: '18px' }} />
                ) : (
                  <span className="icon-show" style={{ fontSize: '16px' }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Password"
          sx={{
            borderRadius: '50px',
            height: '35px',
            fontSize: '11px',
            color: 'gray',
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <RadioGroup
          row
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          sx={{ justifyContent: 'center' }}
        >
          <FormControlLabel 
            value="qtap_admins" 
            control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 , color: '#e2944a'}  }} />} 
            label={<Typography sx={{ fontSize: '12px' }}>Admin</Typography>}
          />  
          <FormControlLabel 
            value="qtap_affiliates" 
            control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 , color: '#e2944a'}  }} />} 
            label={<Typography sx={{ fontSize: '12px' }}>Affiliate</Typography>}
          />
          <FormControlLabel 
            value="qtap_clients" 
            control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 , color: '#e2944a'}  }} />} 
            label={<Typography sx={{ fontSize: '12px' }}>Client</Typography>}
          />
        </RadioGroup>
      </FormControl>

      <Typography
        variant="body2"
        sx={{
          color: '#2E3189',
          fontSize: '10px',
          cursor: 'pointer',
          margin: '5px 0px',
        }}
        onClick={() => navigate('/reset')}
      >
        <span style={{ borderBottom: '1px solid #2E3189' }}>Reset Password</span>
      </Typography>

      {apiError && (
        <Typography sx={{ color: 'red', fontSize: '12px' }}>{apiError}</Typography>
      )}
      {apiSuccess && (
        <Typography sx={{ color: 'green', fontSize: '12px' }}>{apiSuccess}</Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        style={{ marginTop: 16 }}
        sx={{
          fontSize: '11px',
          bgcolor: theme.palette.bluePrimary.main,
          borderRadius: '50px',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: '#222240',
          },
        }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Log In'}
      </Button>

      <FormControlLabel
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
        control={
          <Checkbox
            sx={{
              color: '#c2bbbb',
              transform: 'scale(0.7)',
            }}
          />
        }
        label={<Typography sx={{ fontSize: '10px', color: 'gray' }}>Stay Logged In</Typography>}
      />
    </Box>
  );
};