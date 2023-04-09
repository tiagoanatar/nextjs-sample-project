'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SingleProduct } from "@/types";

export interface ProductsState {
    value: SingleProduct[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: ProductsState = {
    value: [],
    status: 'idle',
    error: null,
  }
  
  export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log("thunk");
    return data.slice(0,4);
  });

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action) => { 
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if(state.value.length ===0){
                state.value = action.payload;
            }
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Something went wrong.';
          });
      },
})

export const { addProducts } = productsSlice.actions;

export default productsSlice.reducer;