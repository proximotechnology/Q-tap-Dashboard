import { Menu, Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const SidebarButton = ({ openSidebar, handleToggleSideBar, top }) => {
    return (
        <Button sx={{
            position: openSidebar ? "fixed" : "absolute",
            top: openSidebar ? '25px' : top ? top : '50px',
            insetInlineStart: openSidebar ? '45%' : '0px',
            display: {
                sm: "",
                md: 'none'
            },
            zIndex: "9999"
        }}
            onClick={handleToggleSideBar}
        >
            {openSidebar ? <Close sx={{ color: "black" }} /> : <Menu sx={{ color: "black" }} />}
        </Button>
    )
}

export default SidebarButton




export const CloseSideBarButton = ({ customSX = {}, handleToggleSideBar }) => {
    return (
        <Button
            sx={{

                position: 'absolute', ...customSX,
            }}
            onClick={handleToggleSideBar}
        >
            <Close sx={{ color: "black" }} />
        </Button>
    )
}

export const OpenSideBarButton = ({ customSX = {}, handleToggleSideBar }) => {
    return (
        <Button
            sx={{

                position: 'absolute', ...customSX,
            }}
            onClick={handleToggleSideBar}
        >
            <Menu sx={{ color: "black" }} />
        </Button>
    )
}



