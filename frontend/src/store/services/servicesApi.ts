import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { RootType } from "..";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://cors-anywhere.herokuapp.com/http://10.4.56.72:8080/",
  // baseUrl: "http://10.4.56.72:8080/",
  baseUrl: "http://81.94.150.101:8080",
  // baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootType).userSlice.jwtToken ||
      localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const retryQuery = retry(baseQuery, { maxRetries: 0 });

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: retryQuery,
  refetchOnFocus: true,
  endpoints: () => ({}),
});
