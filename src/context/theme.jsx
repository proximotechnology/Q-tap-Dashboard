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
                main:"#222240", //theme.palette.secondaryColor.main
              },
              red: {
                main: ''
              },
              green: {
                main: ''
              },
              bluePrimary: {
                main: '#222240',  //theme.palette.
              },
              bgColor: {
                main: "#FEE1DC",
              },
              bodyColor: { 
                main: '#EBEDF3', 
                secandary:"#ffffff",//
                dark: '#181616', 
                tableMain:"#ffffff",
                tableSecandary:"#EBEDF3"
              },
              gradient: {
                orange:'#f7931e',
                red:'#f15a24',
          
                yellow:'#fbc927',
                deepOrange:'#f05a27'
              },
              text: {
                primary: '#ffffff', // White text for better contrast
                secondary: '#b0b0b0', // Lighter gray text for secondary content //#D8E0E0
                default: "#000",
                orange: '#E57C00'
          
              },
              chart: {
                pink: '#AD4181', pinkLight: "#ffaed8",
                blue: "#2EA6F7", blueLight: "#aad6f3",
                orange: "#ef7d00", orangeLight: "#f8cb9e"
              }
          }
        : {
            orangePrimary: {
                // main: "#E57C00", //theme.palette.orangePrimary.main
                main: "#000",
                icon: "#ff9800",
                secondary: "#000"
              },
              secondaryColor: {
                // main:"#222240", //theme.palette.secondaryColor.main
                main: '#000',
              },
              red: {
                main: ''
              },
              green: {
                main: ''
              },
              bluePrimary: {
                // main: '#222240',  //theme.palette.
                main: '#000',  //theme.palette.
              },
              bgColor: {
                main: "#FEE1DC",
              },
              bodyColor: { 
                // main: '#EBEDF3', 
                main: '#181616', 
          //theme.palette.bodyColor.secandary
                secandary:"#5d5959",//
                dark: '#181616', 
                tableMain:"#ffffff",
                tableSecandary:"#EBEDF3"
              },
              gradient: {
                // orange:'#f7931e',
                // red:'#f15a24',
          
                // yellow:'#fbc927',
                // deepOrange:'#f05a27'
          
                orange: '#000',//
                red: '#000',
                //linear-gradient(to right, ${theme.palette.gradient.yellow}, ${theme.palette.gradient.deepOrange})
                yellow: '#000',//theme.palette.gradient.yellow
                deepOrange: '#000'
              },
              text: {
                primary: '#ffffff', // White text for better contrast
                secondary: '#b0b0b0', // Lighter gray text for secondary content //#D8E0E0
                default: "#000",
                orange: '#E57C00'
          
              },
              chart: {
                pink: '#AD4181', pinkLight: "#ffaed8",
                blue: "#2EA6F7", blueLight: "#aad6f3",
                orange: "#ef7d00", orangeLight: "#f8cb9e"
              }
          }),
    },
  });