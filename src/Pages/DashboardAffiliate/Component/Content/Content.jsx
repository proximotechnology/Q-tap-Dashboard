import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from "../../../Themes/dark";



export default function Content() {
    const theme = createTheme(getDesignTokens("light"));

    return (
        <ThemeProvider theme={theme}>
            <Box component="main" sx={{
                flexGrow: 1, p: 3,
            }}>

                <Outlet />

            </Box>
        </ThemeProvider>
    );
}
