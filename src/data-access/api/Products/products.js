import { apiSlice } from "../api.slice";
import { gql } from "graphql-request";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query MyQuery {
              Products {
                description
                discount
                id
                images
                name
                price
                type
                status
                count
              }
            }
          `,
        },
      }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation MyMutation($payload: Products_insert_input!) {
              insert_Products_one(object: $payload) {
                id
              }
            }
          `,
          variables: {
            payload,
          },
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation MyMutation($id : uuid!) {
              delete_Products_by_pk(id: $id) {
                id
              }
            }          
          `,
          variables: {
            id,
          },
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = extendedApi;
