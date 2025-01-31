import { Box, Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { toast } from 'react-toastify';
import { useBusinessContext } from '../../context/BusinessContext';

const Divider = styled(Box)({
    width: '5%',
    height: '3px',
    backgroundColor: '#E57C00',
    borderRadius: "20px",
    marginBottom: "20px"
});

const Divider2 = styled(Box)({
    width: '60%',
    height: '1px',
    backgroundColor: '#E57C00',
    borderRadius: "20px",
    marginBottom: "20px"
});


export const ServingWays = () => {
    const navigate = useNavigate();
    const { updateBusinessData } = useBusinessContext();
    const [serviceOptions, setServiceOptions] = useState([
        { name: "Dine In", icon: <span class="icon-chair" style={{fontSize:"80px"}}></span>, selected: false },
        { name: "Takeaway", icon: <span class="icon-takeaway"  style={{fontSize:"80px"}}></span>, selected: false },
        { name: "Delivery", icon: <span class="icon-fast-shipping" style={{fontSize:"80px"}}></span>, selected: false }
    ]);

    const handleBoxClick = (index) => { 
        const newOptions = serviceOptions.map((option, i) => ({
            ...option,
            selected: i === index ? !option.selected : option.selected
        }));
        setServiceOptions(newOptions);

        // Update BusinessContext with new serving ways
        updateBusinessData({
            servingWays: {
                dineIn: newOptions[0].selected,
                takeaway: newOptions[1].selected,
                delivery: newOptions[2].selected
            }
        });
    };

    const handleNextClick = () => {
        if(isDineInSelected){
            navigate('/branches');
        }else{
            toast.error("Please select a service");
        }
    };
    
    const isDineInSelected = serviceOptions.find(option => option.name === "Dine In").selected;

    return (
        <Box marginTop={"50px"} flexGrow={1}>
            <Typography variant="body1" sx={{ fontSize: "18px", color: "#222240" }}>
                Business Info .
            </Typography>
            <Divider />

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <span class="icon-waiter" style={{ color: 'grey', marginRight: "6px" }}></span>
                    <Typography variant="h6" sx={{ fontSize: { xs: "12px", md: "12px" }, color: "gray" }}>
                        Serving Ways
                    </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2} sx={{ marginBottom: 4 }}>
                    {serviceOptions.map((option, index) => {
                        const serviceName = option.name.toLowerCase().replace(' ', '');
                        return (
                            <Box
                                key={index}
                                onClick={() => {
                                    const newOptions = serviceOptions.map((opt, i) => ({
                                        ...opt,
                                        selected: i === index ? !opt.selected : opt.selected
                                    }));
                                    setServiceOptions(newOptions);

                                    // Create array of selected services
                                    const selectedServices = newOptions
                                        .filter(opt => opt.selected)
                                        .map(opt => opt.name.toLowerCase().replace(' ', ''));

                                    // Update context with array of selected services
                                    updateBusinessData({
                                        servingWays: {
                                            dineIn: selectedServices.includes('dinein'),
                                            takeaway: selectedServices.includes('takeaway'), 
                                            delivery: selectedServices.includes('delivery')
                                        }
                                    });
                                }}
                                sx={{
                                    width: { xs: "115px", sm: "115px" },
                                    marginRight: "20px",
                                    height: "160px", 
                                    borderRadius: "20px",
                                    backgroundColor: "#222240",
                                    cursor: "pointer",
                                }} >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: "13px",
                                        color: "#E57C00",
                                        padding: "20px 0px 2px 0px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    {option.name}
                                </Typography>
                                <Divider2 />

                                <Box
                                    sx={{
                                        color: "gray",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    {React.cloneElement(option.icon)}
                                </Box>

                                {option.selected && (
                                    <CheckOutlinedIcon
                                        sx={{
                                            position: "relative",
                                            bottom: "20px",
                                            left: "10px",
                                            fontSize: "23px",
                                            color: "#FF7F3F",
                                        }} />
                                )}
                            </Box>
                        );
                    })}
                </Box>

                {isDineInSelected && (
                    <TextField
                        variant="outlined"
                        placeholder="How Many Tables Do You Have (optional)"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TableBarOutlinedIcon sx={{ fontSize: "19px" }} />
                                </InputAdornment>
                            ),
                            sx: {
                                border: "1px solid gray",
                                height: "35px",
                                fontSize: "11px",
                                borderRadius: '10px',
                                '& fieldset': { border: 'none' },
                            }
                        }}
                        sx={{ marginTop: 4, maxWidth: { xs: "100%", sm: 330 } }}
                    />
                )}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{
                            width: '20%',
                            fontSize: "13px",
                            borderRadius: '50px',
                            backgroundColor: "#E57C00",
                            textTransform: 'none',
                            padding: "6px 0",
                            position: "fixed", bottom: "30px",
                            left: "55%",
                            '&:hover': {
                                backgroundColor: "#E57C00",
                            },
                            color: "#fff"
                        }}
                        onClick={handleNextClick}
                    >
                        Next
                        <TrendingFlatIcon sx={{ marginLeft: "8px", fontSize: "18px" }} />
                    </Button>
                </Grid> {/* الزرار  */}
            </Box>
        </Box>

    )
}
