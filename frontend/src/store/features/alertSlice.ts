import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinitialstate {
  alertText: string;
  isAlert: boolean;
  isAuthAlert: boolean;
  isDeleteWind: boolean;
  isPayment: boolean;
}

const initialState: Iinitialstate = {
  alertText: "Внимание!",
  isAlert: false,
  isAuthAlert: false,
  isDeleteWind: false,
  isPayment: false,
};

export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    toggleAlert: (
      state,
      action: PayloadAction<{
        alertText?: string;
        isAlert: boolean;
        isAuthAlert: boolean;
      }>
    ) => {
      if (action.payload?.alertText) state.alertText = action.payload.alertText;

      state.isAuthAlert = action.payload.isAuthAlert;
      state.isAlert = action.payload.isAlert;
    },

    toggleDeleteWind: (state, action: PayloadAction<boolean>) => {
      state.isDeleteWind = action.payload;
    },

    togglePayment: (state, action: PayloadAction<boolean>) => {
      state.isPayment = action.payload;
    },
  },
});

export const { toggleAlert, toggleDeleteWind, togglePayment } =
  alertSlice.actions;
export const alertSliceReducer = alertSlice.reducer;
