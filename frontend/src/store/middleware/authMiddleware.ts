import { createListenerMiddleware } from "@reduxjs/toolkit";

import { userApi } from "../services/endpoints/userApi";

export const authMiddleware = createListenerMiddleware();

// "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaW1hMDIzQG1haWwucnUiLCJpYXQiOjE3MjQ4Nzg4OTgsImV4cCI6MTcyNDg4MTA1OH0.siFIrWCLNFqkABdBT25vtrIA-byaIlkk9LZRQiouMQE

authMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});
