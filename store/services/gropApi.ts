import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gropApi = createApi({
  reducerPath: "gropApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // Định nghĩa endpoint để lấy build
    getMoveSuggest: builder.mutation<any, string>({
      query: (name) => ({
        url: "/move-suggest",
        method: "POST",
        body: { pokemonName: name },
      }),
      // Mutation không tự động cache như Query,
      // nhưng giúp ông kiểm soát việc "chỉ hiện khi click" tốt hơn.
    }),
  }),
});

export const { useGetMoveSuggestMutation } = gropApi;
