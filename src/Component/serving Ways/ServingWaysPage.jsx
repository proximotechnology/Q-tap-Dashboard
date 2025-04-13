import { Box, Grid} from "@mui/material";
import { ServingWays } from './ServingWays'
import { SetupPage } from '../Business-info/SetupPage';
import Language from '../dashboard/TopBar/Language';


export const ServingWaysPage = () => {

    return (
        <Grid container
            sx={{ backgroundImage: "url(/images/Rectangle.png)", backgroundSize: "100% 100%", width: "100%", height: "100vh" }}>
            <SetupPage />

            <Grid item xs={12} md={8} >
                <Box sx={{
                    position: "absolute", top: "30px", insetInlineEnd: "80px",
                    cursor: "pointer", display: "flex", alignItems: "center"
                }}>
                    <img src="/assets/helplogo.svg" alt="icon" style={{ width: "25px", height: "25px", marginRight: "30px" }} />

                    <Language/>
                </Box>

                <ServingWays />
            </Grid>


        </Grid>

    )
}
