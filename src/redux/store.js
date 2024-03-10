// Create the Store
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice';
import checkoutSlice from './slices/checkoutSlice';

export const store = configureStore({
    reducer:{
    // Slices go here 
    cart: cartSlice, 
    checkout: checkoutSlice
    },
});