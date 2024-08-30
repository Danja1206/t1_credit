import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinitialstate {
  isActiveTerm: boolean;
  isActiveSum: boolean;
}

const initialState: Iinitialstate = {
  isActiveTerm: false,
  isActiveSum: false,
};

export const inputSlice = createSlice({
  name: "inputSlice",
  initialState,
  reducers: {
    toggleTermActive: (state, action: PayloadAction<boolean>) => {
      state.isActiveTerm = action.payload;
    },

    toggleSumActive: (state, action: PayloadAction<boolean>) => {
      state.isActiveSum = action.payload;
    },
  },
});

export const { toggleTermActive, toggleSumActive } = inputSlice.actions;
export const inputSliceReducer = inputSlice.reducer;
