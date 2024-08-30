import { configureStore } from "@reduxjs/toolkit";

import { serviceApi } from "./services/servicesApi";
import { alertSliceReducer } from "./features/alertSlice";
import { gWrapperSliceReducer } from "./features/gWrapperslice";
import { userSliceReducer } from "./features/userSlice";
import { inputSliceReducer } from "./features/inputSlice";
import { paymentSliceReducer } from "./features/paymentSlice";

import { authMiddleware } from "./middleware/authMiddleware";
import { registerMiddleware } from "./middleware/registerMiddleware";

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    alertSlice: alertSliceReducer,
    gWrapperSlice: gWrapperSliceReducer,
    userSlice: userSliceReducer,
    inputSlice: inputSliceReducer,
    paymentSlice: paymentSliceReducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      serviceApi.middleware,
      authMiddleware.middleware,
      registerMiddleware.middleware
    ),
});

export type RootType = ReturnType<typeof store.getState>;
