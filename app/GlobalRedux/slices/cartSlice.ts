'use client';

import { createSlice } from '@reduxjs/toolkit';
import { SingleProduct } from "@/types";

export interface CartState {
    value: number[]
}

const initialState: CartState = {
    value: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => { 
            state.value.push(action.payload) 
        },
        removeFromCart: (state, action) => { 
            state.value = state.value.filter((item) => {
                if (item !== action.payload){
                    return item
                }
            })
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;