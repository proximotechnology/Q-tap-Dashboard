import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid, Card, CardContent, IconButton, Paper, Typography, TextField, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddButton } from './Header';
import { Box } from '@mui/system';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBranch } from '../../../../context/BranchContext';
import { ContentMenu } from '../../../../context/ContentMenuContext';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';


export const Content = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const { selectedBranch } = useBranch();
    const { setContentForMenu, setCategoriesId } = useContext(ContentMenu);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [editName, setEditName] = useState('');
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    // const selectedBranch = localStorage.getItem('selectedBranch');



    // Slider settings
    const sliderSettings = {
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleEditOpen = (category) => {
        setEditCategory(category);
        setEditName(category.name);
        setOpenEditDialog(true);
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
        setEditName('');
    };

    const getContent = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/meals', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                },
                params: {
                    brunch_id: selectedBranch
                }
            });

            if (response.data) {
                setItems(response.data || []);
                setContentForMenu(response.data);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            toast.error(t("errorFetchingItems"));
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/meals_categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                },
                params: {
                    brunch_id: selectedBranch
                }
            });

            if (response.data) {
                setCategories(response.data || []);
                setCategoriesId(response.data);

            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error(t("errorFetchingCategories"));
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedBranch) {
            getContent();
            getCategories();
        }
    }, [selectedBranch]);

    const handleEditSave = async () => {
        try {
            const response = await axios({
                method: 'PUT',
                url: `https://highleveltecknology.com/Qtap/api/meals_categories/${editCategory.id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                },
                data: {
                    name: editName,
                    brunch_id: selectedBranch
                }
            });

            if (response.data) {
                toast.success(t("CategoryUpdatedSuccessfully"));
                setCategories(categories.map(cat => cat.id === editCategory.id ? { ...cat, name: editName } : cat));
                handleEditClose();
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error(t("errorUpdateCategory"));
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `https://highleveltecknology.com/Qtap/api/meals_categories/${categoryId}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                }
            });

            if (response.data) {
                toast.success(t("categoryDeletedSucc"));
                getCategories();
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error(t("errorDeleteCategory"));
        }
    };

    return (
        <>
            {categories.map((category, index) => (
                <Paper key={index} style={{ padding: '10px 0px', borderRadius: "20px", marginTop: "40px" }}>
                    <Grid container width={"100%"}>
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
                                    {category.name}
                                </AddButton>
                            </Box>
                            <Box>
                                <IconButton sx={{ padding: "5px", margin: "0px" }} >
                                    <AddIcon sx={{ color: "white", fontSize: "18px" }} />
                                </IconButton>

                                <IconButton onClick={() => handleEditOpen(category)} sx={{ padding: "5px", margin: "0px" }} >
                                    <span className="icon-edit" style={{ color: "white", fontSize: "16px" }}></span>
                                </IconButton>

                                <IconButton onClick={() => handleDelete(category.id)} sx={{ padding: "5px", margin: "0px" }} >
                                    <span className="icon-delete" style={{ color: "white", fontSize: "16px" }} />
                                </IconButton>

                                <IconButton sx={{ padding: "5px", margin: "0px" }}  >
                                    <span className="icon-move" style={{ color: "#AAAAAA", fontSize: "15px", marginLeft: "25px" }} />
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={12} padding="10px" sx={{ display: "flex", alignItems: "center" }}>
                            {/* Slider for item cards */}
                            {/* <Box sx={{ width: '88%' }}>
                                <Slider {...sliderSettings}> */}
                            {items
                                .filter(item => item.categories_id === category.id) // ✅ تصفية العناصر التي تتوافق مع الـ category.id
                                .map((item, index) => (
                                    <Card key={index} sx={{
                                        width: "150px !important", height: "150px", boxShadow: "none",
                                        borderRadius: "20px", border: "1px solidrgb(45, 163, 163)", marginLeft: "10px",
                                    }}>
                                        <Box sx={{
                                            width: "100%", backgroundColor: "#F1F2F2", borderRadius: "30px", height: "45%",
                                            display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center"
                                        }}>
                                            <img src={`https://highleveltecknology.com/Qtap/${item.img}`} alt="item" style={{ width: "100%", height: "100%" }} />
                                        </Box>
                                        <CardContent
                                            sx={{ padding: "5px" }}
                                            onClick={() => { navigate(`/add-item?categoryId=${category.id}&itemId=${item.id}`); }}
                                        >
                                            <Typography variant='body1' sx={{ fontSize: "10px", color: "#ef7d00" }}>{item.name}</Typography>
                                            <Typography variant='body2' sx={{ fontSize: "9px", color: "gray" }}>{item.Description}</Typography>
                                            <Button
                                                sx={{ backgroundColor: "#46B479", color: "white", padding: "1px 0px", fontSize: "8px", borderRadius: "20px" }} >
                                                {item.price}
                                            </Button>
                                            <Typography variant='body2' sx={{ fontSize: "7px", marginTop: "5px", color: "#222240", textAlign: "center", alignItems: "center" }}>
                                                {item.icon} {item.status}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            {/* </Slider>
                            </Box> */}

                            {/* Fixed add-icon card */}
                            <Card
                                sx={{
                                    backgroundColor: "#F1F2F2",
                                    border: "1px solid #CACCCC",
                                    marginLeft: "20px",
                                    borderRadius: "20px",
                                    width: "10%", height: "150px", boxShadow: "none",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CardContent
                                    onClick={() => { navigate(`/add-item?categoryId=${category.id}`); }}
                                >
                                    <IconButton>
                                        <AddCircleOutlineOutlinedIcon sx={{ color: "#ef7d00", fontSize: "26px" }} />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Dialog open={openEditDialog} onClose={handleEditClose}>
                <DialogContent>
                    <Typography variant="h6">{t("category.edit")}</Typography>
                    <TextField
                        label={t("name")}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        onClick={handleEditSave}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ef7d00',
                            ':hover': {
                                backgroundColor: '#e17d33'
                            }
                        }}
                    >{t("save")}</Button>
                </DialogContent>
            </Dialog>
        </>
    );
};