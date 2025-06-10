import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from './theme'; // Your custom theme generator
import { useTranslation } from 'react-i18next';

const ColorModeContext = createContext();

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Read from localStorage on first render
    const storedMode = localStorage.getItem("themeMode");
    return storedMode === "dark" ? "dark" : "light"; // fallback to light
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language
  const isArabic = currentLanguage === 'ar';

  const theme = useMemo(() => createTheme(
    {
      ...getDesignTokens(mode),
      typography: {
        fontFamily: isArabic
          ? "'GE SS Two', Tahoma, Arial !important"
          : "Montserrat, sans-serif, Arial, 'GE SS Two',sans-serif !important"
      },
    }
  ), [mode, isArabic]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
