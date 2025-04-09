
import React, { useState } from 'react';
import { Box } from '@mui/material';
import SideBar from './SideBar';
import Content from './Content';
import { itemsData } from './data/itemsData';



const MenuClient = () => {
    const [filteredItems, setFilteredItems] = useState(itemsData);

    return (
        <Box sx={{ display: 'flex',background:"#EBEDF3" ,padding:"20px 0px"}}>
            <SideBar setFilteredItems={setFilteredItems}/>

            <Box sx={{ flex: 1 ,maxWidth:{xs:"100vw",sm:'calc(100vw - 100px)'},marginX:{xs:'0px',sm:'100px'} }}>
                <Content items={filteredItems} />
            </Box>
        </Box>
    );
};


export default MenuClient;
