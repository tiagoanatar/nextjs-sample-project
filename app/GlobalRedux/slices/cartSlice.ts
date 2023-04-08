'use client';

import { createSlice } from '@reduxjs/toolkit';
import { SingleProduct } from "@/types";

export interface CounterState {
    products: SingleProduct[]
}

const initialState: CounterState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => { 
            state.products.push(action.payload) 
        },
        removeFromCart: (state, action) => { 
            state.products = state.products.filter((item) => {
                if (item.id !== action.payload){
                    return item
                }
            })
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;