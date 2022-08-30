import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAccount } from "../../model/IAccount";
import { ILogin } from "../../model/ILogin";

export const UserAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (build) => ({
    getLogin: build.query<ILogin, string>({
      query: (formLogin) => ({
        url: "users",
        params: {
          login: formLogin,
        },
      }),
      transformResponse: (serverLogins: ILogin[]): ILogin => {
        return serverLogins[0];
      },
    }),
    addUser: build.mutation<ILogin, ILogin>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),
    getAccount: build.query<IAccount, string>({
      query: (user) => ({
        url: "accounts",
        params: {
          user: user,
        },
      }),
      transformResponse: (serverAccounts: IAccount[]): IAccount => {
        return serverAccounts[0];
      },
    }),
    addAccount: build.mutation<IAccount, IAccount>({
      query: (account) => ({
        url: "accounts",
        method: "POST",
        body: account,
      }),
    }),
    deleteContact: build.mutation<null, number>({
      query: (account) => ({
        url: "accounts",
        method: "DELETE",
      }),
    }),
  }),
});
