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
          secondary: "#222240", //theme.palette.secondaryColor.main
        },
        bluePrimary: {
          main: '#222240',  //theme.palette.bluePrimary
        },
        bgColor: {
          main: "#FEE1DC",
        },
        bodyColor: {
          main: '#EBEDF3',
          secandary: "#ffffff",//
          secandaryInput: " #EBEDF3",//
          dark: '#181616',
          tableMain: "#ffffff",
          tableSecandary: "#EBEDF3",
          whiteGray: '#EBEDF3',
          whiteGray_lightBlack: "#EBEDF3",
          white_333: "white",
          gray_lightBlack40: " #9d9d9c",
          white_lightBlack:" #ffffff"
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
          gray: '#575756',
          blue: 'rgb(3, 3, 80)',// login form
          orange: '#E57C00',
          fixedGray: '#575756',
          fixedWhite: '#ffffff',
          fixedBlack: "#000",
          red: 'red',
          green: 'green',
          black_white: "black",
          gray_white: "gray",
          gray_light: '#575756',

        },
        chart: {
          pink: '#AD4181', pinkLight: "#ffaed8",
          blue: "#2EA6F7", blueLight: "#aad6f3",
          orange: "#ef7d00", orangeLight: "#f8cb9e"
        },
        buttons: {
          blue: '#222240',
          blueHover: '#322240',
          orange: '#E57C00',
          orangeHover: '#ef7d10'
        }
      }
      : /* darkMode */
      {
        orangePrimary: {
          main: " #E57C00", //theme.palette.orangePrimary.main
          icon: "#000",
          secondary: "#000"
        },
        secondaryColor: {
          main: "#000", //theme.palette.secondaryColor.main
          secondary: "rgb(49, 49, 82)", //theme.palette.secondaryColor.main
        },
        bluePrimary: {
          main: '#222240',  //theme.palette.bluePrimary.main
        },
        bgColor: {
          main: "#000",
        },
        bodyColor: {// theme.palette.bodyColor.
          //#f4f6fc
          main: '#121212',
          secandary: " #2d2c2c",//
          secandaryInput: " #2d2c2c",//
          dark: '#000',
          tableMain: "#000",
          tableSecandary: "#000",
          whiteGray: '#575756',

          whiteGray_lightBlack: " #4d4d4d", // #EBEDF3
          white_lightBlack:" #4d4d4d",
          
          gray_lightBlack40: ' #404040',// #9d9d9c
          white_333: " #333333",
          
        },
        gradient: {
          orange: '#000',
          red: '#000',

          yellow: '#000',
          deepOrange: '#000'
        },
        text: {// theme.palette.text.
          white: '#000000', // White text for better contrast
          gray: '#FFFFFF', // Lighter gray text for secondary content //#D8E0E0
          black: "#FFFFFF",
          fixedGray: ' #575756',
          fixedWhite: '#FFFFFF', // White text for better contrast
          fixedBlack: "#000000",
          orange: '#E57C00',

          black_white: " #FFFFFF",//theme.palette.text.white_black
          gray_white: " #FFFFFF", // #575756
          dGray27_white:" #FFFFFF",// #272725
          blue:'blue'
,
          gray_light: 'rgb(191, 191, 188)',

        },
        chart: {
          pink: '#AD4181', pinkLight: "#ffaed8",
          blue: "#2EA6F7", blueLight: "#aad6f3",
          orange: "#ef7d00", orangeLight: "#f8cb9e"
        },
        buttons: {
          blue: '#222240',
          blueHover: '#322240',
          orange: '#E57C00',
          orangeHover: '#ef7d10',
          white: '',
          gray: '',
          black: ''
        }
      }
    ),
  },
});