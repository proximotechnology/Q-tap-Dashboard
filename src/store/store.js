import { configureStore } from "@reduxjs/toolkit"
import { affiliateReducer } from "./affiliateSlice"
import { adminReducer } from "./adminSlice"
import { clientDashBoard } from "./clientDashBoardSlice"
export const store = configureStore({
    reducer: {
        affiliates: affiliateReducer,
        admins: adminReducer,
        clientDashBoard,
    }
}) 