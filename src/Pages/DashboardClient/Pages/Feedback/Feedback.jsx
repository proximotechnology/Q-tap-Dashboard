import { Button, Divider, Grid, Paper, RadioGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


export const Feedback = () => {
    return (
        <Paper sx={{ padding: "15px 30px 50px 30px", borderRadius: "20px" }} >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                padding="5px 0"
            >
                <Box sx={{ display: "flex" }}>
                    <StarIcon sx={{ fontSize: "25px", color: "gray", marginRight: "5px" }} />
                    <Typography variant='body1' sx={{ fontSize: "15px", color: "#575756" }}>
                        Tell us about your experiment
                    </Typography>
                </Box>

            </Box>
            <Divider
                sx={{
                    backgroundImage:'linear-gradient(to right , #FDB913, #E57C00 )',
                    height: '2px',
                    width: "100%", border: "none",
                }}
            />

            <Grid container spacing={4} padding={"25px 40px"}>
                {/* الجزء الأيسر */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: "12px" }}>
                        How much you satisfied with the product?
                    </Typography>
                    <Box sx={{ margin: "10px 0px" }}>
                        <StarIcon sx={{ color: "#ef7d00" }} />
                        <StarIcon sx={{ color: "#ef7d00", marginLeft: "8px" }} />
                        <StarIcon sx={{ color: "#ef7d00", marginLeft: "8px" }} />
                        <StarIcon sx={{ color: "#ef7d00", marginLeft: "8px" }} />
                        <StarBorderIcon sx={{ color: "#ef7d00", marginLeft: "8px" }} />
                    </Box>

                    <Typography variant="body1" gutterBottom sx={{ fontSize: "12px" }}>
                        How happy are you with the product?
                    </Typography>
                    <Box>
                        <RadioGroup row sx={{ margin: "10px 0px" }}>
                            <Box>
                                <SentimentVeryDissatisfiedIcon sx={{ fontSize: "35px", color: "red" }} />
                                <Typography variant="body2" gutterBottom sx={{ fontSize: "10px", color: "gray" }}>said</Typography>
                            </Box>
                            <Box sx={{ marginLeft: "15px" }}>
                                <SentimentSatisfiedAltIcon sx={{ fontSize: "35px", color: "#ef7d00" }} />
                                <Typography variant="body2" gutterBottom sx={{ fontSize: "10px", color: "gray" }}>happy</Typography>
                            </Box>

                            <Box sx={{ marginLeft: "15px" }}>
                                <SentimentVerySatisfiedIcon sx={{ fontSize: "35px", color: "green" }} />
                                <Typography variant="body2" gutterBottom sx={{ fontSize: "10px", color: "gray" }}>very happy</Typography>

                            </Box>

                        </RadioGroup>
                    </Box>

                    <Typography variant="body1" gutterBottom sx={{ fontSize: "12px" }}>
                        Does the product help you achieve your goals?
                    </Typography>
                    <Box>
                        <RadioGroup row>
                            <Box >
                                <CheckIcon sx={{ padding: "5px", fontSize: "30px", backgroundColor: "green", borderRadius: "50%", color: "white" }} />
                                <Typography variant="body2" gutterBottom sx={{ fontSize: "10px", color: "gray" }}>Yes</Typography>
                            </Box>

                            <Box sx={{ marginLeft: "15px" }}>
                                <ClearIcon sx={{ padding: "5px", fontSize: "30px", border: "1px solid red", borderRadius: "50%", color: "red" }} />
                                <Typography variant="body2" gutterBottom sx={{ fontSize: "10px", color: "gray" }}>No</Typography>

                            </Box>
                        </RadioGroup>
                    </Box>

                    <Typography variant="body1" gutterBottom sx={{ fontSize: "12px" }}>
                        What are the things missing in Q-tap Menus?
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        sx={{ width: '70%' }}
                        inputProps={{
                            style: { fontSize: '10px' } 
                        }}
                        rows={2}
                        placeholder="Please give your opinion and thoughts so we can improve our services."
                    />

                </Grid>

                {/* الجزء الأيمن */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            src="/images/feedback.jpg"
                            alt="Experiment illustration"
                            width={"300px"}
                            style={{ maxWidth: '100%' ,margin:"10px 0px" }}
                        />
                    </Box>

        
                    <Typography variant="body1" gutterBottom sx={{ fontSize: "12px" }}>
                        Comment</Typography>
                    <TextField
                        fullWidth
                        multiline
                        sx={{ width: '100%' }}
                        inputProps={{
                            style: { fontSize: '12px' } 
                        }}
                        rows={4}
                        placeholder="Please write a brief about your experiment."
                    />
                </Grid>

            </Grid>
            <Box sx={{ textAlign: 'center', marginTop: '30px' ,justifyContent:"center"}}>
                        <Button  
                        sx={{textTransform:"capitalize",color:"white" ,padding:"3px 45px" ,
                            backgroundImage: "linear-gradient(to right, #FDB913, #E57C00)" ,
                            fontSize:"12px",borderRadius:"20px",
                            '&:hover':{
                                backgroundImage:'linear-gradient(to right , #FDB913, #E57C00 )'

                            }
                        }}>
                            <CheckIcon sx={{marginRight:"6px",fontSize:"15px"}}/> Submit
                        </Button>
                    </Box>
        </Paper>
    )
}
