import React, { createContext, useState } from 'react';

export const ContentMenu = createContext();

export const ContentMenuProvider = ({ children }) => {
    const [contentForMenu, setContentForMenu] = useState([]);
    const [categoriesId, setCategoriesId] = useState([]);
    const [variantsContext, setVariantsContext] = useState([])
    return (
        <ContentMenu.Provider value={{
            contentForMenu, setContentForMenu,
            categoriesId, setCategoriesId,
            variantsContext, setVariantsContext

        }}>
            {children}
        </ContentMenu.Provider>
    );
};