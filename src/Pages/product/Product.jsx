import { Box, Card, CardContent, Paper, Typography, IconButton, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddMenuModal from './AddMenuModal';
import { BASE_URL, BASE_URL_IMG } from '../../utils/helperFunction';

const Product = () => {
  const [menus, setMenus] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const theme = useTheme()

  const getMenus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.data.products) {  
        setMenus(response.data.products);
        // console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await axios.delete(`${BASE_URL}products/${menuId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      // Refresh the menu list after deletion
      getMenus();
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  const handleAddClick = () => {
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
  };

  const handleMenuAdded = () => {
    getMenus(); // Refresh the menu list
  };

  return (
    <Box sx={{ display: "flex", padding: "0px 20px", flexWrap: "wrap", gap: "20px" }}>
      {menus.map((menu) => (
        <Card
          key={menu.id}
          sx={{
            borderRadius: '20px',
            width: "17%",
            height: "39vh",
            minWidth:"200px",
            background: `linear-gradient(to Bottom,${theme.palette.secondaryColor.main},#3B2D37,#694328 ,#DA7703)`,
            color: 'white',
            position: 'relative',
          }}>
          <IconButton 
            onClick={() => handleDeleteMenu(menu.id)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          <CardContent sx={{ padding: "20px" }}>
            <Box>
              {menu.img && (
                <img 
                  src={`${BASE_URL_IMG}${menu.img}`} 
                  alt={menu.name}
                  style={{ 
                    width: "70px", 
                    height: "70px", 
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px"
                  }} 
                />
              )}
              {menu.img && (
                <img 
                  src={`${BASE_URL_IMG}${menu.img}`} 
                  alt={menu.name}
                  style={{ 
                    width: "120px", 
                    height: "120px", 
                    objectFit: "cover",
                    position: "absolute",
                    bottom: "10px",
                    right: "-1%",
                    opacity:'.2'
                  }} 
                />
              )}
              <Typography variant="body2" sx={{ letterSpacing: "2px", fontSize:"18px" }}>
                {menu.name}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Paper
        onClick={handleAddClick}
        sx={{
          borderRadius: '20px',
          width: "17%",
          height: "39vh",
          display: "flex",
          minWidth:"200px",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}>
        <AddIcon sx={{ fontSize: "50px", color: "#464444" }} />
      </Paper>

      <AddMenuModal 
        open={openAddModal}
        handleClose={handleCloseModal}
        onSuccess={handleMenuAdded}
      />
    </Box>
  );
};

export default Product; 