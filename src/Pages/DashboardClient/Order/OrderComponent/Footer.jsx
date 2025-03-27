import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = ({ selectedOrder ,isAccepted ,isServed ,isDone ,isClose}) => {
    const {t} = useTranslation()
    return (
        <Box
            style={{
                backgroundColor: '#222240',
                color: '#fff',
                padding: 12,
                position: "fixed",
                bottom: 0,
                width: selectedOrder ? "77%" : "100%",
                transition: "width 0.3s ease-in-out",
                display: "flex",zIndex:1 ,
            }}
        >
            <img src="/assets/qtapwhite.svg" alt="icon_footer" style={{ width:"80px",height:"25px"}} />
            {
                selectedOrder ?
                    (
                    <Box
                        display="flex"
                        alignItems="center"
                        marginLeft={"20px"}
                    >
                    <span class="icon-online-shop"  
                    style={{backgroundImage:"linear-gradient(to right, #FDB913, #F2672E)" ,
                    color:"black" , padding:"8px" , borderRadius:"25px"}}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                    
                    
                        <Box ml={1}  sx={{ display:"flex" , flexDirection:"column"}}>
                            <Typography variant="body2" color="#FFA500" fontSize={"9px"}>{t("orderPlaced")}</Typography>
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
                ) : (
                    <></>
                )
            }
            {
                isAccepted?
                (
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <span class="icon-check"
                        style={{backgroundImage:"linear-gradient(to right, #FDB913, #F2672E)" ,
                        color:"black" , padding:"8px" , borderRadius:"25px"}} ></span>
                
                    <Box ml={1} sx={{ display:"flex" , flexDirection:"column"}}>
                        <Typography variant="body2" color="#FFA500" fontSize={"9px"}>{t("accepted")}</Typography>
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
                ):(
                    <></>
                )
            }
            {
                isServed?(
                    <>
                <Box
                    display="flex"
                    alignItems="center"
                >

                    <Box sx={{backgroundImage:"linear-gradient(to right, #FDB913, #F2672E)" ,
                        color:"black" , padding:"7px 8px" , borderRadius:"50%"}} >
                    <span class="icon-chef" style={{ fontSize: "16px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                    </Box>
                
                    <Box ml={1} sx={{ display:"flex" , flexDirection:"column"}} >
                        <Typography variant="body2" color="#FFA500" fontSize={"9px"}>{t("prepared")}</Typography>
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
                    </>
                ):(
                    <></>
                )
            }
            {
                isDone?(
                    <Box
                    display="flex"
                    alignItems="center"
                >
                    <Box sx={{backgroundImage:"linear-gradient(to right, #FDB913, #F2672E)" ,
                        color:"black" , padding:"7px 8px" , borderRadius:"50%"}} >
                    <span class="icon-waiter" style={{fontSize:"16px",color:"white"}}></span>
                        </Box>
                
                    <Box ml={1} sx={{ display:"flex" , flexDirection:"column"}} >
                        <Typography variant="body2" color="#FFA500" fontSize={"9px"}>{t("served")}</Typography>
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
                ):(
                    <></>
                )
            }
            {
                isClose?(
                    <Box
                    display="flex"
                    alignItems="center"
                >
                    <Box sx={{backgroundImage:"linear-gradient(to right, #FDB913, #F2672E)" ,
                        padding:"8px" , borderRadius:"50%"}} >
                    <span class="icon-double-check" style={{fontSize:"16px"}}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                        </Box>
                    <Box ml={1} sx={{ display:"flex" , flexDirection:"column"}} >
                        <Typography variant="body2" color="#FFA500" fontSize={"9px"}>{t("done")}</Typography>
                        <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>3:51 PM</Typography>
                        <Typography variant="caption" color="#FFFFFF" fontSize={"8px"}>04 August, 2024</Typography>
                    </Box>

                </Box>
                ):(
                    <></>
                )
            }
        </Box>
    );
};

export default Footer;
