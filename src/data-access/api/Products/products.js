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
              products(order_by : {name : desc}) {
                description
                discount
                id
                url1
                url2
                url3
                url4
                url5
                name
                price
                type
                status
                count
                age
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
            mutation MyMutation($payload: products_insert_input!) {
              insert_products_one(object: $payload) {
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
    editProduct: builder.mutation({
      query: ({ payload, id }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
          mutation MyMutation($payload: products_set_input, $id: uuid = "") {
            update_products_by_pk(pk_columns: {id: $id}, _set: $payload){
              id
              age
              count
              description
              discount
              url1
              name
              price
              status
              type
            }
          }
          `,
          variables: {
            payload,
            id,
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
              delete_products_by_pk(id: $id) {
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
  useEditProductMutation,
} = extendedApi;
