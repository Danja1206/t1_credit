import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinitialstate {
  hightBorderSum: number;
}

const initialState: Iinitialstate = {
  hightBorderSum: 0,
};

export const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setHightBorderSum: (state, action: PayloadAction<number>) => {
      state.hightBorderSum = action.payload;
    },
  },
});

export const { setHightBorderSum } = paymentSlice.actions;
export const paymentSliceReducer = paymentSlice.reducer;
