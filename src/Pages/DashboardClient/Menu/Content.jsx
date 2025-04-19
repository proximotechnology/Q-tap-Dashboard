import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Offers from './Offers';
import Item from './Items';
import ProductDetails from './ProductDetails/ProductDetails';
import TopBar from './TopBar';
import { useTranslation } from 'react-i18next';

const Content = ({ allMenuData, selectedCategory }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeItemId, setActiveItemId] = useState(null);
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedItemOptions, setSelectedItemOptions] = useState({});
    const [selectedItemExtra, setSelectedItemExtra] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsCartOpen(false);
        setActiveItemId(item.id === activeItemId ? null : item.id);
    };

    const handleExtraClick = (itemId, extra) => {
        setSelectedItemExtra((prev) => {
            const currentExtra = prev[itemId] || [];
            if (currentExtra.includes(extra)) {
                return { ...prev, [itemId]: currentExtra.filter((selected) => selected !== extra) };
            } else {
                return { ...prev, [itemId]: [...currentExtra, extra] };
            }
        });
    };

    const handleOptionClick = (itemId, option) => {
        setSelectedItemOptions((prev) => {
            const currentOptions = prev[itemId] || [];
            if (currentOptions.includes(option)) {
                return { ...prev, [itemId]: currentOptions.filter((selected) => selected !== option) };
            } else {
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

    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(cartCount + 1);
    };

    const { t } = useTranslation();

    // جمع كل الوجبات من allMenuData
    const allMeals = allMenuData?.flatMap(category => category.meals) || [];

    // تصفية الوجبات بناءً على الفئة المختارة والبحث
    const filteredMeals = selectedCategory === 'Popular'
        ? allMeals.filter(meal => 
            meal.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allMeals.filter(meal => 
            meal.categories_id === allMenuData.find(cat => cat.name === selectedCategory)?.id &&
            meal.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

    return (
        <Container>
            <TopBar 
                isItemSelected={!!selectedItem} 
                setSearchQuery={setSearchQuery}
            />
            <Offers isItemSelected={!!selectedItem} />

            <Box sx={{ mt: 5, display: 'flex' }}>
                <Box
                    sx={{ 
                        width: selectedItem ? '96%' : '100%', 
                        transition: 'width 0.3s ease', 
                        position: "relative", 
                        start: "3%" 
                    }}
                    onClick={() => setSelectedItem(null)}
                >
                    <Typography 
                        variant="h5" 
                        sx={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '20px', color: '#575756' }}
                    >
                        <span style={{ padding: '2px 0px', borderBottom: '2px solid #ef7d00' }}>
                            {t("item.many")}
                        </span>
                    </Typography>
                    <Grid container spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {filteredMeals.map((meal) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                md={selectedItem ? 6 : 4} 
                                lg={selectedItem ? 3 : 2} 
                                key={meal.id}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: { xs: 'center', sm: 'start' },
                                        alignItems: 'center',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Item 
                                        item={meal} 
                                        onItemSelect={() => handleItemClick(meal)} 
                                        handleAddToCart={handleAddToCart} 
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {selectedItem && (
                    <Box
                        sx={{ transition: 'width 0.3s ease', paddingLeft: '16px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ProductDetails 
                            item={selectedItem} 
                            cartCount={cartCount} 
                            setCartCount={setCartCount}
                            activeItemId={activeItemId}
                            isCartOpen={isCartOpen} 
                            toggleCart={toggleCart}
                            handleSizeClick={handleSizeClick}
                            selectedSize={selectedSize}
                            handleOptionClick={handleOptionClick}
                            selectedItemOptions={selectedItemOptions}
                            handleExtraClick={handleExtraClick}
                            selectedItemExtra={selectedItemExtra}
                            onClose={() => setSelectedItem(null)}
                        />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Content;