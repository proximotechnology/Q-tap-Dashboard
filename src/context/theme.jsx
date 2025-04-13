export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        orangePrimary: {
          main: "#E57C00", //theme.palette.orangePrimary.main
          icon: "#ff9800",
          secondary: "#000"
        },
        secondaryColor: {
          main: "#222240", //theme.palette.secondaryColor.main
        },
        bluePrimary: {
          main: '#222240',  //theme.palette.
        },
        bgColor: {
          main: "#FEE1DC",
        },
        bodyColor: {
          main: '#EBEDF3',
          secandary: "#ffffff",//
          dark: '#181616',
          tableMain: "#ffffff",
          tableSecandary: "#EBEDF3"
        },
        gradient: {
          orange: '#f7931e',
          red: '#f15a24',

          yellow: '#fbc927',
          deepOrange: '#f05a27'
        },
        text: {//theme.palette.text.white
          white: '#ffffff', 
          black: "#000",
          gray: '#b0b0b0', 
          blue:'rgb(3, 3, 80)',// login form
          orange: '#E57C00',
          fixedGray: '#b0b0b0', 
          fixedWhite: '#ffffff', 
          fixedBlack: "#000",
          red:'red',
          green:'green'

        },
        chart: {
          pink: '#AD4181', pinkLight: "#ffaed8",
          blue: "#2EA6F7", blueLight: "#aad6f3",
          orange: "#ef7d00", orangeLight: "#f8cb9e"
        }
      }
      : /* darkMode */
      {
        orangePrimary: {
          main: "#E57C00", //theme.palette.orangePrimary.main
          icon: "#000",
          secondary: "#000"
        },
        secondaryColor: {
          main: "#000", //theme.palette.secondaryColor.main
        },
        bluePrimary: {
          main: '#000',  //theme.palette.
        },
        bgColor: {
          main: "#000",
        },
        bodyColor: {
          main: '#121212',
          secandary: "#2d2c2c",//
          dark: '#000',
          tableMain: "#000",
          tableSecandary: "#000"
        },
        gradient: {
          orange: '#000',
          red: '#000',

          yellow: '#000',
          deepOrange: '#000'
        },
        text: {//theme.palette.text.white
          white: '#000', // White text for better contrast
          gray: '#fff', // Lighter gray text for secondary content //#D8E0E0
          black: "#fff",
          fixedWhite: '#000', // White text for better contrast
          fixedBlack: "#000",
          orange: '#E57C00',
        },
        chart: {
          pink: '#000', pinkLight: "#000",
          blue: "#000", blueLight: "#000",
          orange: "#000", orangeLight: "#000"
        }
      }
    ),
  },
});