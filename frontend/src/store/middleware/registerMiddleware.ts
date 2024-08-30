import { createListenerMiddleware } from "@reduxjs/toolkit";

import { userApi } from "../services/endpoints/userApi";

export const registerMiddleware = createListenerMiddleware();

registerMiddleware.startListening({
  matcher: userApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});
