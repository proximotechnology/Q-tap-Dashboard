import React, { useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import SideBar from './SideBar';
import Content from './Content';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData, selectMenuData, selectMenuDataStatus } from '../../../store/client/menuSlice';

const MenuClient = () => {
    const [selectedCategory, setSelectedCategory] = useState('Popular');

    const dispatch = useDispatch()
    const data = useSelector(selectMenuData)
    const status = useSelector(selectMenuDataStatus)
    const allMenuData = data?.data
    console.log("allMenuData", allMenuData)
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current && status !== 'success') {
            const branch = localStorage.getItem('selectedBranch');
            dispatch(fetchMenuData(branch));
            hasFetched.current = true;
        }
    }, [dispatch, status]);



    const theme = useTheme()

    return (
        <Box sx={{ display: 'flex', background: theme.palette.bodyColor.whiteGray_lightBlack, padding: "20px 0px", minHeight: "100vh" }}>
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