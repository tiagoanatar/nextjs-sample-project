"use client";

import { createSlice } from "@reduxjs/toolkit";

export type Currencies = "USD" | "EUR" | "JPY" | "GBP"

export interface CounterState {
  value: Currencies;
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
