import React from 'react';
import { Button, Grid, Card, CardContent, IconButton, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddButton } from './Header';
import { Box } from '@mui/system';
import { items } from './items';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router';
export const Content = () => {
    const navigate = useNavigate();

    return (
        <Paper style={{ padding: '10px 0px', borderRadius: "20px", marginTop: "40px" }}>
            <Grid container width={"100%"} >
                <Grid container xs={12} sx={{
                    backgroundColor: '#20253c',
                    width: "100%",
                    borderRadius: "20px 20px 0px 0px",
                    height: "35px",
                    justifyContent: "space-between",
                    position: "relative",
                    top: "-20px",
                    padding: "0px 20px"
                }}>
                    <Box>

                        <AddButton variant="contained" sx={{ marginTop: "-20px", fontSize: "11px", padding: '5px 35px', }} >
                            Category Name
                        </AddButton>
                    </Box>
                    <Box>
                        <IconButton sx={{ padding: "5px", margin: "0px" }} >
                            <AddIcon sx={{ color: "white", fontSize: "18px" }} />
                        </IconButton>

                        <IconButton sx={{ padding: "5px", margin: "0px" }}>
                            <span class="icon-edit" style={{ color: "white", fontSize: "16px" }}></span>
                        </IconButton>

                        <IconButton sx={{ padding: "5px", margin: "0px" }} >
                            <span class="icon-delete" style={{ color: "white", fontSize: "16px" }} />
                        </IconButton>

                        <IconButton sx={{ padding: "5px", margin: "0px" }} >
                            <span class="icon-move" style={{ color: "#AAAAAA", fontSize: "15px", marginLeft: "25px" }} />
                        </IconButton>
                    </Box>

                </Grid>

                <Grid item xs={12} padding="10px" sx={{ display: "flex" }}>
                    {items.map((item, index) => (

                        <Card key={index} sx={{
                            width: "10%", height: "150px", boxShadow: "none",
                            borderRadius: "20px", border: "1px solid #F1F2F2", marginLeft: "20px"
                        }}>
                            <Box sx={{
                                width: "100%", backgroundColor: "#F1F2F2", borderRaduis: "30px", height: "45%",
                                display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center"
                            }}>
                                <span class="icon-image-gallery" style={{ fontSize: "26px", color: "gray" }}></span>
                            </Box>
                            <CardContent sx={{ padding: "5px" }}>
                                <Typography variant='body1' sx={{ fontSize: "10px", color: "#ef7d00" }}>{item.name}</Typography>
                                <Typography variant='body2' sx={{ fontSize: "9px", color: "gray" }}>{item.description}</Typography>
                                <Button
                                    sx={{ backgroundColor: "#46B479", color: "white", padding: "1px 0px", fontSize: "8px", borderRadius: "20px" }} >{item.price}
                                </Button>

                                <Typography variant='body2' sx={{ fontSize: "7px", marginTop: "5px", color: "#222240", textAlign: "center", alignItems: "center" }}>
                                    {item.icon} {item.status}</Typography>
                            </CardContent>
                        </Card>
                    ))}

                    <Grid>
                        <Card
                            sx={{
                                backgroundColor: "#F1F2F2",
                                border: "1px solid #CACCCC",
                                marginLeft: "20px",
                                borderRadius: "20px",
                                width: "100%", height: "150px", boxShadow: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CardContent
                                onClick={() => { navigate('/add-item'); }}
                            >
                                <IconButton>
                                    <AddCircleOutlineOutlinedIcon sx={{ color: "#ef7d00", fontSize: "26px" }} />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>


            </Grid>
        </Paper>
    )
}
