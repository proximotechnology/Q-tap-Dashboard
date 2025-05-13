import { configureStore } from "@reduxjs/toolkit"
import { affiliateReducer } from "./affiliateSlice"
import { adminReducer } from "./adminSlice"

export const store = configureStore({
    reducer: {
        affiliates: affiliateReducer,
        admins: adminReducer
    }
}) 