"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: "USD" | "EUR" | "JPY" | "GBP";
}

const initialState: CounterState = {
  value: "USD",
};

export const counterSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrency } = counterSlice.actions;

export default counterSlice.reducer;
