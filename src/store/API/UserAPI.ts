import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IContacts } from "../../model/IContacts";
import { ILogin } from "../../model/ILogin";

export const UserAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Contacts"],
  endpoints: (build) => ({
    getUser: build.query<ILogin, string>({
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
    getContacts: build.query<IContacts[], string>({
      query: (userId) => ({
        url: "contacts",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["Contacts"],
    }),
    addContact: build.mutation<IContacts, IContacts>({
      query: (contact) => ({
        url: `contacts`,
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    editContact: build.mutation<IContacts, IContacts>({
      query: (contact) => ({
        url: `contacts/${contact.id}`,
        method: "PUT",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: build.mutation<null, number>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});
