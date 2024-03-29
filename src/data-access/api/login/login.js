import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body: body,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        try {
          console.log({ data });
        } catch {
          throw Error("Error");
        }
      },
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useLoginMutation } = extendedApi;
