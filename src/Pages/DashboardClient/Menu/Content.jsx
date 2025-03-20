import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Offers from './Offers';
import Item from './Items'; 
import ProductDetails from './ProductDetails/ProductDetails';
import TopBar from './TopBar';
import { useTranslation } from 'react-i18next';

const Content = ({ items }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeItemId, setActiveItemId] = useState(null); 
    const [selectedSize, setSelectedSize] = useState({});  
    const [selectedItemOptions, setSelectedItemOptions] = useState({}); 
    const [selectedItemExtra, setSelectedItemExtra] = useState({}); 
    
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsCartOpen(false);
        setActiveItemId(item.id === activeItemId ? null : item.id);  
    };
    
    const handleExtraClick = (itemId, extra) => {
        setSelectedItemExtra((prev) => {
            const currentExtra = prev[itemId] || [];
            if (currentExtra.includes(extra)) {
                // إزالة العنصر الإضافي إذا كان مختارًا مسبقًا
                return { ...prev, [itemId]: currentExtra.filter((selected) => selected !== extra) };
            } else {
                // إضافة العنصر الإضافي إذا لم يكن مختارًا
                return { ...prev, [itemId]: [...currentExtra, extra] };
            }
        });
    };
    
    const handleOptionClick = (itemId, option) => {
        setSelectedItemOptions((prev) => {
            const currentOptions = prev[itemId] || [];
            if (currentOptions.includes(option)) {
                // إزالة الخيار إذا كان مختارًا مسبقًا
                return { ...prev, [itemId]: currentOptions.filter((selected) => selected !== option) };
            } else {
                // إضافة الخيار إذا لم يكن مختارًا
                return { ...prev, [itemId]: [...currentOptions, option] };
            }
        });
    };

    const handleSizeClick = (itemId, size) => {
        setSelectedSize((prevSizes) => ({
            ...prevSizes,
            [itemId]: size,  
        }));
    };
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };


    const [cartCount, setCartCount] = useState(0)
    
    const handleAddToCart = () => {
        setCartCount(cartCount + 1);  
    };
    const { t } = useTranslation();
    return (
        <Container>
            <TopBar isItemSelected={!!selectedItem}/>
            <Offers isItemSelected={!!selectedItem}/>

            <Box sx={{ mt: 5, display: 'flex' , }}>
                <Box sx={{width: selectedItem ? '96%' : '100%', transition: 'width 0.3s ease', position:"relative" , left:"3%"}}>
                <Typography variant="h5" sx={{ fontSize: '15px',fontWeight: 'bold',marginBottom: '20px',color: '#575756', }} >
                    <span style={{ padding: '2px 0px', borderBottom: '2px solid #ef7d00' }}>
                        {t("item.many")}
                    </span>
                </Typography>
                    <Grid container spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {items.map((item) => (
                            <Grid item xs={12} sm={6} md={selectedItem ? 6 : 4} lg={selectedItem ? 3 : 2} key={item.id}>
                                <Item item={item}  onItemSelect={() => handleItemClick(item)}  handleAddToCart={handleAddToCart}/> 
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {selectedItem && (
                    <Box sx={{ width: '30%', transition: 'width 0.3s ease', paddingLeft: '16px' }}>
                        <ProductDetails item={selectedItem}  cartCount={cartCount} activeItemId={activeItemId}
                        isCartOpen={isCartOpen} toggleCart={toggleCart} 
                        handleSizeClick={handleSizeClick} 
                        selectedSize={selectedSize} 
                        handleOptionClick={handleOptionClick}
                        selectedItemOptions={selectedItemOptions}
                        handleExtraClick={handleExtraClick}
                        selectedItemExtra={selectedItemExtra}
                        />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Content;
