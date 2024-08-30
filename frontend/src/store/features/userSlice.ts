import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userApi } from "../services/endpoints/userApi";

export interface IinitialState {
  jwtToken: string;
  isAuth: boolean;
}

const initialState: IinitialState = {
  jwtToken: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "useSlice",
  initialState,
  reducers: {
    toggleUserData: (
      state,
      action: PayloadAction<{ jwtToken: string; isAuth: boolean }>
    ) => {
      state.jwtToken = action.payload.jwtToken;
      state.isAuth = action.payload.isAuth;
    },

    logout: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.jwtToken = action.payload.token;
          state.isAuth = true;
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.jwtToken = action.payload.token;
          state.isAuth = true;
        }
      );
  },
});

export const { toggleUserData, logout } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
