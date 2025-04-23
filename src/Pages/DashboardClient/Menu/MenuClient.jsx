import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SideBar from './SideBar';
import Content from './Content';
import { MenuDataContext } from '../../../context/MenuDataContext';

const MenuClient = () => {
    const [selectedCategory, setSelectedCategory] = useState('Popular');
    const [allMenuData, setAllMenuData] = useState([]);
    const { menuData, getMenuData } = useContext(MenuDataContext);
    
    useEffect(() => {
        getMenuData(localStorage.getItem('selectedBranch'));
    }, []);

    useEffect(() => {
        if (menuData?.length === 0) {
            setAllMenuData([]);
        } else {
            setAllMenuData(menuData || []);
        }
    }, [menuData]);
    // console.log("allMenuData", allMenuData);
    
    

    return (
        <Box sx={{ display: 'flex', background: "#EBEDF3", padding: "20px 0px", minHeight: "100vh" }}>
            <SideBar 
                setSelectedCategory={setSelectedCategory} 
                allMenuData={allMenuData} 
                selectedCategory={selectedCategory}
            />
            <Box sx={{ flex: 1, maxWidth: { xs: "100vw", sm: 'calc(100vw - 100px)' }, marginX: { xs: '0px', sm: '100px' } }}>
                <Content 
                    allMenuData={allMenuData} 
                    selectedCategory={selectedCategory}
                />
            </Box>
        </Box>
    );
};

export default MenuClient;