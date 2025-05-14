import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'YOUR_BASE_URL_HERE'; // Replace with your actual base URL

// Function to handle Axios errors
const handleAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error:', error.response.data);
    console.error('Status Code:', error.response.status);
    return `Request failed with status code ${error.response.status}: ${JSON.stringify(error.response.data)}`;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('Network Error:', error.request);
    return 'Network error: No response received from the server.';
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request Setup Error:', error.message);
    return `Request setup error: ${error.message}`;
  }
};

// Async Thunks for API calls
export const fetchSalesByDays = createAsyncThunk(
  'restaurantData/fetchSalesByDays',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}Sales_by_days_restaurant/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const fetchSales = createAsyncThunk(
  'restaurantData/fetchSales',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}Sales_restaurant/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const fetchDashboardData = createAsyncThunk(
  'restaurantData/fetchDashboardData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}dashboard/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const fetchPerformanceData = createAsyncThunk(
  'restaurantData/fetchPerformanceData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}Performance_restaurant/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const fetchWalletData = createAsyncThunk(
  'restaurantData/fetchWalletData',
  async ({ branchId, restaurantId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}wallet_restaurant/${branchId}/${restaurantId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const fetchCustomerLog = createAsyncThunk(
  'restaurantData/fetchCustomerLog',
  async ({ branchId, restaurantId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}Customer_log/${branchId}/${restaurantId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Initial State
const initialState = {
  salesByDays: {
    data: null,
    loading: false,
    error: null,
  },
  sales: {
    data: null,
    loading: false,
    error: null,
  },
  dashboard: {
    data: null,
    loading: false,
    error: null,
  },
  performance: {
    data: null,
    loading: false,
    error: null,
  },
  wallet: {
    data: null,
    loading: false,
    error: null,
  },
  customerLog: {
    data: null,
    loading: false,
    error: null,
  },
};

// Redux Toolkit Slice
const restaurantDataSlice = createSlice({
  name: 'restaurantData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Sales by Days
    builder.addCase(fetchSalesByDays.pending, (state) => {
      state.salesByDays.loading = true;
      state.salesByDays.error = null;
    });
    builder.addCase(fetchSalesByDays.fulfilled, (state, action) => {
      state.salesByDays.loading = false;
      state.salesByDays.data = action.payload;
    });
    builder.addCase(fetchSalesByDays.rejected, (state, action) => {
      state.salesByDays.loading = false;
      state.salesByDays.error = action.payload; // Error message from handleAxiosError
    });

    // Sales
    builder.addCase(fetchSales.pending, (state) => {
      state.sales.loading = true;
      state.sales.error = null;
    });
    builder.addCase(fetchSales.fulfilled, (state, action) => {
      state.sales.loading = false;
      state.sales.data = action.payload;
    });
    builder.addCase(fetchSales.rejected, (state, action) => {
      state.sales.loading = false;
      state.sales.error = action.payload; // Error message from handleAxiosError
    });

    // Dashboard
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.dashboard.loading = true;
      state.dashboard.error = null;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.dashboard.loading = false;
      state.dashboard.data = action.payload;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.dashboard.loading = false;
      state.dashboard.error = action.payload; // Error message from handleAxiosError
    });

    // Performance
    builder.addCase(fetchPerformanceData.pending, (state) => {
      state.performance.loading = true;
      state.performance.error = null;
    });
    builder.addCase(fetchPerformanceData.fulfilled, (state, action) => {
      state.performance.loading = false;
      state.performance.data = action.payload;
    });
    builder.addCase(fetchPerformanceData.rejected, (state, action) => {
      state.performance.loading = false;
      state.performance.error = action.payload; // Error message from handleAxiosError
    });

    // Wallet
    builder.addCase(fetchWalletData.pending, (state) => {
      state.wallet.loading = true;
      state.wallet.error = null;
    });
    builder.addCase(fetchWalletData.fulfilled, (state, action) => {
      state.wallet.loading = false;
      state.wallet.data = action.payload;
    });
    builder.addCase(fetchWalletData.rejected, (state, action) => {
      state.wallet.loading = false;
      state.wallet.error = action.payload; // Error message from handleAxiosError
    });

    // Customer Log
    builder.addCase(fetchCustomerLog.pending, (state) => {
      state.customerLog.loading = true;
      state.customerLog.error = null;
    });
    builder.addCase(fetchCustomerLog.fulfilled, (state, action) => {
      state.customerLog.loading = false;
      state.customerLog.data = action.payload;
    });
    builder.addCase(fetchCustomerLog.rejected, (state, action) => {
      state.customerLog.loading = false;
      state.customerLog.error = action.payload; // Error message from handleAxiosError
    });
  },
});

// Export the reducer
export default restaurantDataSlice.reducer;