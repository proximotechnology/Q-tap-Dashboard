import { createSlice } from "@reduxjs/toolkit";

// Initial state matching the context's businessData, branches, and selectedBranch
const initialState = {
  businessData: {
    businessName: "",
    website: "",
    businessEmail: "",
    businessPhone: "",
    country: "",
    city: "",
    mode: "white",
    design: "grid",
    format: "",
    currency: "",
    workschedules: {
      Saturday: ["9:00 am", "7:00 pm"],
      Sunday: ["9:00 am", "7:00 pm"],
    },
    callWaiter: "inactive",
    paymentTime: "after",
    tableCount: "",
    paymentMethods: [],
    servingWays: [],
    latitude: "",
    longitude: "",
  },
  branches: [],
  selectedBranch: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    updateBusinessData: (state, action) => {
      if (state.selectedBranch !== null && state.branches[state.selectedBranch]) {
        const updatedBranches = [...state.branches];
        updatedBranches[state.selectedBranch] = {
          ...updatedBranches[state.selectedBranch],
          ...action.payload,
        };
        state.branches = updatedBranches;
      } else {
        state.businessData = { ...state.businessData, ...action.payload };
      }
    },
    addBranch: (state) => {
      const newBranch = { ...state.businessData };
      state.branches = [...state.branches, newBranch];
      // Clear businessData after adding branch
      state.businessData = {
        businessName: "",
        website: "",
        businessEmail: "",
        businessPhone: "",
        country: "",
        city: "",
        mode: "white",
        design: "grid",
        format: "",
        currency: "",
        workschedules: {
          Saturday: ["9:00 am", "7:00 pm"],
          Sunday: ["9:00 am", "7:00 pm"],
        },
        callWaiter: "inactive",
        paymentTime: "after",
        tableCount: "",
        paymentMethods: [],
        servingWays: [],
        latitude: "",
        longitude: "",
      };
      state.selectedBranch = null;
    },
    selectBranch: (state, action) => {
      const index = action.payload;
      state.selectedBranch = index;
      if (state.branches[index]) {
        state.businessData = { ...state.branches[index] };
      }
    },
    clearBusinessData: (state) => {
      state.businessData = {
        businessName: "",
        website: "",
        businessEmail: "",
        businessPhone: "",
        country: "",
        city: "",
        mode: "white",
        design: "grid",
        format: "",
        currency: "",
        workschedules: {
          Saturday: ["9:00 am", "7:00 pm"],
          Sunday: ["9:00 am", "7:00 pm"],
        },
        callWaiter: "inactive",
        paymentTime: "after",
        tableCount: "",
        paymentMethods: [],
        servingWays: [],
        latitude: "",
        longitude: "",
      };
      state.selectedBranch = null;
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
  },
});

// Export actions
export const {
  updateBusinessData,
  addBranch,
  selectBranch,
  clearBusinessData,
  setBranches,
} = businessSlice.actions;

// Export reducer
export const businessReducer = businessSlice.reducer;