import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinitialstate {
  isGlobal: boolean;
  isOpenMenu: boolean;
}

const initialState: Iinitialstate = {
  isGlobal: false,
  isOpenMenu: false,
};

export const gWrapperSlice = createSlice({
  name: "gWrapperSlice",
  initialState,
  reducers: {
    toggleWrapper: (state, action: PayloadAction<boolean>) => {
      state.isGlobal = action.payload;
    },

    toggleOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpenMenu = action.payload;
    },
  },
});

export const { toggleWrapper, toggleOpenMenu } = gWrapperSlice.actions;
export const gWrapperSliceReducer = gWrapperSlice.reducer;
