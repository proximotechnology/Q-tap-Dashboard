import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
 
import { ThemeProvider, createTheme } from '@mui/material/styles' 
import { deepOrange, yellow } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    mode: 'light', 
    orangePrimary: {
      // main: "#E57C00", 
      main: "#000", 
      icon:"#ff9800",
    },
    secondaryColor:{
      // main:"#222240", //theme.palette.secondaryColor.main
      main:'#000',
    },
    red:{
      main:''
    },
    green:{
      main:''
    },
    bluePrimary: {
      main: '#222240',  
    },
    bgColor: {
      main:  "#FEE1DC",  
    }, 
    gradient:{
      // orange:'#f7931e',
      // red:'#f15a24',

      // yellow:'#fbc927',
      // deepOrange:'#f05a27'
      
      orange:'#000',
      red:'#000',
//linear-gradient(to right, ${theme.palette.gradient.yellow}, ${theme.palette.gradient.deepOrange})
      yellow:'#000',//theme.palette.gradient.yellow
      deepOrange:'#000'
    }
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> 
    <App />
  </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();


