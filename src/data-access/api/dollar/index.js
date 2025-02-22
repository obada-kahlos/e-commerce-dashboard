import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDollar: builder.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query MyQuery {
              dollar_price_by_pk(id: "d930fc44-7061-4184-b8fe-42c6f6cbc069") {
                dollar_price
                id
              }
            }
          `,
        },
      }),
      providesTags: ["Dollar"],
    }),
    updateDollar: builder.mutation({
      query: ({ payload, id }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
          mutation UpdateDollar($payload: dollar_price_set_input, $id: uuid = "") {
            update_dollar_price_by_pk(pk_columns: {id: $id}, _set: $payload){
              id
            }
          }
          `,
          variables: {
            payload,
            id,
          },
        },
      }),
      invalidatesTags: ["Dollar"],
    }),
  }),
});

export const { useGetDollarQuery, useUpdateDollarMutation } = extendedApi;
