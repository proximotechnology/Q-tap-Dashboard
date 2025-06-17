import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeModeProvider} from './context/ThemeModeProvider'
import './utils/use-tailwind/useTailwind.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </React.StrictMode>
);


reportWebVitals();


