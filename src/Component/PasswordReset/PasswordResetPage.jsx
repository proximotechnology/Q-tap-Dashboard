
import QtapLogo from '../QtapLogo'
import { PasswordReset } from './PasswordReset'
import React from 'react'
import { Box, Grid} from "@mui/material";
import Language from '../dashboard/TopBar/Language';


export const PasswordResetPage = () => {
 
   

    
    return (
        <Box>

            <Box >
                <Grid container spacing={0}
                    sx={{ backgroundImage: "url(/images/Rectangle.png)", backgroundSize: "100% 100%", width: "100%" }}>
                    <Grid item xs={12} md={6}>
                        <QtapLogo />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            position: "absolute", top: "30px", right: "80px", zIndex: 2000,
                            cursor: "pointer", display: "flex", alignItems: "center"
                        }}>
                            <img src="/assets/helplogo.svg" alt="icon" style={{ width: "25px", height: "25px", marginRight: "30px" }} />

                            <Language/>
                        </Box>

                        <Box display="flex" flexDirection="column" justifyContent="center"
                            alignItems="center" height="100vh" className="iamhere">

                            <Box sx={{ width: { lg: "47%", md: "70%", xs: "90%" } }} >
                                <Box display="flex" justifyContent="center" >
                                    <img src="/assets/qtap.svg" alt="logo Qtap" style={{ width: "250px", height: "40px" }} />
                                </Box>


                                <PasswordReset />
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
