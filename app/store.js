// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categorySlice from "./categorySlice";
import panierSlice from "./panierSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categorySlice,
        panier: panierSlice
    },
});