// Slice is made up of three steps
// 1) Create a Slice
// 2) Create initial State
// 3) Create reducers
// 4) Export the reducer and reducers

// import { createSlice } from "@reduxjs/toolkit";
const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    currentStep: 1,
    checkoutFormData: {},
};
const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        // Function to used to manipulate the state
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;            
        },
        updateCheckoutFormData: (state, action) => {           
            state.checkoutFormData = {
                ...state.checkoutFormData,
                ...action.payload,
            };
        },        
    },
});
export const { 
    setCurrentStep, 
    updateCheckoutFormData,      
} = checkoutSlice.actions;
export default checkoutSlice.reducer;