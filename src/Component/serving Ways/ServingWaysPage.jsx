import { Box, Grid, useTheme } from "@mui/material";
import { ServingWays } from './ServingWays'
import { SetupPage } from '../Business-info/SetupPage';
import Language from '../dashboard/TopBar/Language';


export const ServingWaysPage = () => {
    const theme = useTheme()
    let isDarkMode = theme.palette.mode === "dark"
    return (
        <Grid container
            sx={{ backgroundColor: theme.palette.bodyColor.white_333, backgroundImage: isDarkMode ? 'none' : 'url(/images/Rectangle.png)', backgroundSize: "100% 100%", width: "100%", height: "100vh" }}>
            <SetupPage />

            <Grid item xs={12} md={8} >
                <Box sx={{
                    position: "absolute", top: "30px", insetInlineEnd: "80px",
                    cursor: "pointer", display: "flex", alignItems: "center"
                }}>
                    <img
                        src="/images/help.jpg"
                        alt="icon"
                        style={{ width: "20px", height: "20px", marginRight: "30px" }}
                    />

                    <Language />
                </Box>

                <ServingWays />
            </Grid>


        </Grid>

    )
}
