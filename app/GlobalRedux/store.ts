'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import currencyReducer from './slices/currencySlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        currency: currencyReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;