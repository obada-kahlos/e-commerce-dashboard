import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from 'js-cookie';

const BASE_URL = "https://closing-bulldog-49.hasura.app/v1/graphql";

export const apiSlice = createApi({
  reducerPath: "husura",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', `application/json`);
      headers.set('x-hasura-admin-secret', `xFo60XppD9JIFdsIXz1mW1T72XSC30aIdZKqUnvLPDTjTgnFiPuzuKwNeDKMQwEU`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
