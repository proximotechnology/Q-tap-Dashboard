import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/helperFunction';



export const fetchMenuData = createAsyncThunk(
    'menu/fetchMenuData',
    async (branchNumber, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}menu/${branchNumber}`);
            console.log("fetchMenuData",response)
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || error.message);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);
const initialState = {
    data: [],
    loading: 'idle',
    error: null
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenuData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMenuData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default menuSlice.reducer;

export const selectMenuData = (state) => state?.menu?.data;