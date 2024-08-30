import { serviceApi } from "../servicesApi";

export const userApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      { token: string },
      {
        email: string;
        password: string;
      }
    >({
      query: (user) => ({
        url: "/team21/api/v1/auth/register",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // mode: "no-cors",
        body: {
          email: user.email,
          password: user.password,
        },
      }),
    }),

    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (user) => ({
        url: "/team21/api/v1/auth/authenticate",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: user.email,
          password: user.password,
        },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = userApi;
