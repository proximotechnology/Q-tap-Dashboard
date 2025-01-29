import React, { useState } from 'react';
import { Button, Box, InputAdornment, FormControl, OutlinedInput, IconButton, FormControlLabel, Checkbox, Typography, useTheme } from '@mui/material';
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
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [apiSuccess, setApiSuccess] = useState('');


    const handleSubmit = async() => {
         // API states
        setApiError('');
        setApiSuccess('');

        // static login for client and affiliate
        if (email === 'client@gmail.com') {
            navigate('/logo-cient');


        } else if (email === 'affiliate@gmail.com') {
            navigate('/dashboard-affiliate');
        }

        // inputs validate 
        if (!email || !password ) {
            setApiError('All fields are required!');
            return;
          }

        // resive data from user 
        const data = {
            email,
            password,
          };

            
        // send data to api 
        try {
            setIsLoading(true);
            const options = {
              method: 'POST',
              url:"https://highleveltecknology.com/Qtap/api/login",
              headers: { 'Content-Type': 'application/json' },
              data
  
            }
            const response = await axios.request(options)
            .then(res => res )
            .catch(error => console.log(error))
            console.log(response);
            
           
            setIsLoading(false);
              
            if (response?.data?.user) {
              setApiSuccess('successful login!');
              localStorage.setItem("adminToken" , response?.data?.token);
  
              navigate('/dashboard-home')
            } else {
              setApiError(response?.data?.message || 'check email and password again!');
            }
          } catch (error) {
            setIsLoading(false);
            setApiError(error.response?.data?.message || 'Failed to login. Please try again.');
          }
  
  
    };


    return (
        <Box>
            <FormControl variant="outlined" fullWidth margin="normal">
                <OutlinedInput
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <MailOutlinedIcon sx={{ fontSize: "18px" }} />
                        </InputAdornment>
                    }
                    required
                    sx={{
                        borderRadius: '50px', height: "35px", fontSize: "11px",color:"gray",
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            outline: 'none',
                        },
                    }}
                />
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal" >
                <OutlinedInput
                    id="outlined-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-padlock" style={{ fontSize: "18px" }} />
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
                                {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} /> 
                                :
                                <span class="icon-show" style={{ fontSize: "16px" }}></span>
                                }
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="Confirm Password"
                    sx={{
                        borderRadius: '50px', height: "35px", fontSize: "11px",color:"gray",
                    }}
                />
            </FormControl>

            <Typography variant="body2"
                sx={{
                    color: "#2E3189",fontSize: "10px", cursor: "pointer" ,margin:"5px 0px"}}
                    onClick={() => navigate('/reset')}>
                <span style={{borderBottom: "1px solid #2E3189",}}>Reset Password</span> 
            </Typography>
            {apiError && <Typography sx={{ color: 'red', fontSize: '12px' }}>{apiError}</Typography>}
            {apiSuccess && <Typography sx={{ color: 'green', fontSize: '12px' }}>{apiSuccess}</Typography>}
            <Button
                variant="contained"
                fullWidth
                style={{ marginTop: 16 }}
                sx={{
                    fontSize:"11px",
                    bgcolor: theme.palette.bluePrimary.main,
                    borderRadius: "50px",
                    textTransform: "capitalize",
                    '&:hover': {
                        backgroundColor: '#222240',
                    }
                }}
                onClick={handleSubmit}
            >
                Log In
            </Button>

            <FormControlLabel sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
                control={ <Checkbox
                    sx={{
                        color: "#c2bbbb",
                        transform: "scale(0.7)"
                    }}
                />}
                label={<Typography sx={{ fontSize: "10px", color: "gray" }}>Stay Logged In</Typography>}
            />
        </Box>
    )
}
