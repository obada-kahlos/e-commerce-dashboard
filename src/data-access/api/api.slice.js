import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from 'js-cookie';

const BASE_URL = "https://spc-net.hasura.app/v1/graphql";

export const apiSlice = createApi({
  reducerPath: "husura",
  tagTypes: ["Products", "Dollar"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      headers.set(
        "x-hasura-admin-secret",
        `NOFnPHC0owtJH6EC2U4xkJQhfpQ6Umo21TnA4YvJaVzGO5Y9k9YqO3dlyFeCBmAp`
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});
