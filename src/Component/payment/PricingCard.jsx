import { Box, Button, Radio, styled, Typography } from "@mui/material";
import { useState } from "react";

import { FormControlLabel, RadioGroup } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useTranslation } from "react-i18next";



const Divider = styled(Box)({
    width: '60%',
    height: '1px',
    backgroundColor: '#E57C00',
    borderRadius: "20px",
    marginBottom: "10px",
    marginLeft: "25px"
});

export function PricingCard({ title, pricePerMonth, pricePerYear, orders, buttonText }) {
    const [buttonColor, setButtonColor] = useState(false);
    const {t} = useTranslation()
    const handleClick = () => {
        setButtonColor(prevIsOrange => !prevIsOrange);
    };
    return (
        <Box sx={{ width: "130px", height: "200px" }}>
            <Box
                sx={{
                    width: "90px",
                    borderRadius: "20px",
                    textAlign: "center",
                    color: "#fff",
                    position: "relative",
                    top: "15px", left: "20px"
                }}>

                <Typography variant="body1"
                    sx={{ backgroundColor: "#E57C00", borderRadius: "20px", padding: "5px 6px", fontSize: "12px" }}>
                    {title}
                </Typography>
            </Box>

            <Box>
                <Box
                    sx={{
                        width: "100%", height: "100%",
                        borderRadius: "20px",
                        backgroundColor: "#222240",
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    <Box>
                        <Box sx={{ padding: "10px 0px" }}>
                            <Typography variant="body1" sx={{ margin: "15px 0", fontSize: "10px" }}>
                                <sup style={{ color: "#E57C00", fontSize: "8px", margin: "0px 5px 0px 0px" }}>EGP</sup>
                                <span style={{ fontSize: "18px" }}>{pricePerMonth}</span>/{t("month")}
                            </Typography>

                            <Divider />
                            <Typography variant="body1" sx={{ marginBottom: "15px", fontSize: "10px" }}>
                                <sup style={{ color: "#E57C00", fontSize: "8px", margin: "0px 5px 0px 0px" }}>EGP</sup>
                                <span style={{ fontSize: "18px" }}>{pricePerYear}</span> /{t("year")}
                            </Typography>
                        </Box>

                        <Box sx={{
                            backgroundColor: "#E57C00", height: "50px", justifyContent: "center",
                            display: "flex", alignItems: "center", borderRadius: "0px 0px 20px 20px",
                        }} >
                            <Typography variant="body2" sx={{ color: "white", fontSize: "12px" }}>
                                <span style={{ color: "#222240", fontSize: "16px" }}>{orders} </span>
                                {t("order")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        width: { lg: "70%", md: "30%", xs: "30%" },
                        marginTop: "10px", padding: "1px",
                        marginLeft: { lg: "20px", md: "0" },
                        borderRadius: "50px",
                        backgroundColor: buttonColor ? "#E57C00" : "#222240",
                        textTransform: "capitalize",
                        fontSize: "11px",
                        '&:hover': {
                            backgroundColor: buttonColor ? "#E57C00" : "#222240",
                        },

                    }}
                >
                    {buttonText}
                </Button>

                <RadioGroup row sx={{width:"200px",marginTop:"5px"}} >
                    <Box>
                        <FormControlLabel
                            value="monthly"
                            control={
                                <Radio
                                    icon={<CircleOutlinedIcon style={{ color: "#AAAAAA", fontSize: "15px" }} />}
                                    checkedIcon={<CircleIcon style={{ color: "#E57C00", fontSize: "15px" }} />} // دائرة ملونة عند التفعيل
                                />
                            }
                            label={<Typography  sx={{ color: "#AAAAAA", fontSize: "11px" }}>{t("monthly")}</Typography>}
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            value="yearly"
                            control={
                                <Radio
                                    icon={<CircleOutlinedIcon style={{ color: "#AAAAAA", fontSize: "15px" }} />}
                                    checkedIcon={<CircleIcon style={{ color: "#E57C00", fontSize: "15px" }} />}
                                />
                            }
                            label={<Typography sx={{ color: "#AAAAAA", fontSize: "11px" }}>{t("yearly")}</Typography>}
                        />
                    </Box>
                </RadioGroup>
            </Box>
        </Box>

    );
}


