import React, { createContext, useState } from 'react';

export const ContentMenu = createContext();

export const ContentMenuProvider = ({ children }) => {
    const [contentForMenu, setContentForMenu] = useState([]);
    const [categoriesId, setCategoriesId] = useState([]);

    return (
        <ContentMenu.Provider value={{ contentForMenu, setContentForMenu, categoriesId, setCategoriesId }}>
            {children}
        </ContentMenu.Provider>
    );
};