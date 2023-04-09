'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import currencyReducer from './slices/currencySlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        currency: currencyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;