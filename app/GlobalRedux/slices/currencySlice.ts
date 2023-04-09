"use client";

import { createSlice } from "@reduxjs/toolkit";

export type Currencies = "USD" | "EUR" | "JPY" | "GBP" | string;

export interface CurrencyState {
  current: Currencies;
  old: Currencies;
  loading: boolean;
}

const initialState: CurrencyState = {
  current: "USD",
  old: '',
  loading: false,
};

export const counterSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.old = state.current
      state.current = action.payload;
    },
    setCurrencyLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setCurrency, setCurrencyLoading } = counterSlice.actions;

export default counterSlice.reducer;
