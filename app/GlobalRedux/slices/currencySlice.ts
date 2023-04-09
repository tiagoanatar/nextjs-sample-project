"use client";

import { createSlice } from "@reduxjs/toolkit";

export type Currencies = "USD" | "EUR" | "JPY" | "GBP" | string;

export interface CurrencyState {
  current: Currencies;
  old: Currencies
}

const initialState: CurrencyState = {
  current: "USD",
  old: ''
};

export const counterSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.old = state.current
      state.current = action.payload;
    },
  },
});

export const { setCurrency } = counterSlice.actions;

export default counterSlice.reducer;
