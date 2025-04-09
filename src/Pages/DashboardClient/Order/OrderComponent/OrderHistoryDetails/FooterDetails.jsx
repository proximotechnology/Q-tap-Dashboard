
import { Box, Divider, Typography, useTheme } from '@mui/material';

const FooterDetails = () => {
    const theme = useTheme()
    return (
        <Box
            style={{
                backgroundColor: theme.palette.secondaryColor.main,
                color: '#fff',
                padding: 12,
                bottom: 0,
                width: "97.5%",
                transition: "width 0.3s ease-in-out",
                display: "flex",
                position: 'relative', borderRadius: "0px 0px 10px 10px",
            }}

        >
            <img src="/assets/qtapwhite.svg" alt="icon_footer" style={{ width: "80px", height: "25px" }} />
            <Box
                display="flex"
                alignItems="center"
                marginLeft={"20px"}
            >
                <span class="icon-online-shop"
                    style={{
                        backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                        color: "black", padding: "8px", borderRadius: "25px"
                    }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>


                <Box ml={1} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body2" color="#FFA500" fontSize={"9px"}>Order Placed</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>3:51 PM</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>04 August, 2024</Typography>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#C0C0C0',
                        height: '1px',
                        width: '40px',
                        margin: '0px 15px'
                    }}
                />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >
                <span class="icon-check"
                    style={{
                        backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                        color: "black", padding: "8px", borderRadius: "25px"
                    }} ></span>

                <Box ml={1} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body2" color="#FFA500" fontSize={"9px"}>Accepted</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>3:51 PM</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>04 August, 2024</Typography>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#C0C0C0',
                        height: '1px',
                        width: '40px',
                        margin: '0px 15px'
                    }}
                />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >

                <Box sx={{
                    backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                    color: "black", padding: "7px 8px", borderRadius: "50%"
                }} >
                    <span class="icon-chef" style={{ fontSize: "16px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                </Box>

                <Box ml={1} sx={{ display: "flex", flexDirection: "column" }} >
                    <Typography variant="body2" color="#FFA500" fontSize={"9px"}>Prepared</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>3:51 PM</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>04 August, 2024</Typography>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#C0C0C0',
                        height: '1px',
                        width: '40px',
                        margin: '0px 15px'
                    }}
                />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >
                <Box sx={{
                    backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                    color: "black", padding: "7px 8px", borderRadius: "50%"
                }} >
                    <span class="icon-waiter" style={{ fontSize: "16px", color: "white" }}></span>
                </Box>

                <Box ml={1} sx={{ display: "flex", flexDirection: "column" }} >
                    <Typography variant="body2" color="#FFA500" fontSize={"9px"}>served</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>3:51 PM</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>04 August, 2024</Typography>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#C0C0C0',
                        height: '1px',
                        width: '40px',
                        margin: '0px 15px'
                    }}
                />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >
                <Box sx={{
                    backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                    padding: "8px", borderRadius: "50%"
                }} >
                    <span class="icon-double-check" style={{ fontSize: "16px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                </Box>
                <Box ml={1} sx={{ display: "flex", flexDirection: "column" }} >
                    <Typography variant="body2" color="#FFA500" fontSize={"9px"}>Done</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>3:51 PM</Typography>
                    <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>04 August, 2024</Typography>
                </Box>

            </Box>

        </Box>
    );
};

export default FooterDetails;
