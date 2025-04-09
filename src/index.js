import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
 
import { ThemeProvider, createTheme } from '@mui/material/styles' 
const theme = createTheme({
  palette: {
    mode: 'light', 
    orangePrimary: {
      main: "#E57C00", 
      // main: "#000", 
      icon:"#ff9800"
      // icon:"#000"
    },
    secondaryColor:{
      main:'#222240'
    },
    bluePrimary: {
      main: '#222240',  
    },
    bgColor: {
      main:  "#FEE1DC",  
    }, 
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


