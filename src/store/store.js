import { configureStore } from "@reduxjs/toolkit"
import { affiliateReducer } from "./affiliateSlice"
import { adminReducer } from "./adminSlice"
import clientDashBoard from "./client/clientDashBoardSlice"
import clientLogin from "./client/clientLoginSlic"
import menu from "./client/menuSlice"
import DiscountMenu from "./client/DiscountMenuSlice"
import { personalReducer } from "./register/personalSlice"
import { businessReducer } from "./register/businessSlice"

export const store = configureStore({
    reducer: {
        affiliates: affiliateReducer,
        admins: adminReducer,
        clientDashBoard,
        clientLogin,
        menu,
        DiscountMenu,
        personalStore: personalReducer,
        businessStore: businessReducer
    }
}) 