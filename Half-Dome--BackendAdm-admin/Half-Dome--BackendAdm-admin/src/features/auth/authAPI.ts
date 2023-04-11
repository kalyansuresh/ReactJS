import { ellacoreApi } from "../../app/services";

export interface User {
    fullname: string;
}

export interface UserResponse {

    statusCode: number;
    message: string;
    user: User;
    token:string;
}

export interface LoginRequest {
    email: string;
    password: string;
    roleid: number;
}

export interface LogoutRequest {
    email: string;
    token: string;
}


export const api = ellacoreApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: "emailvalidation",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation<UserResponse, LogoutRequest>({
            query: (credentials) => ({
                url: "logout",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = api;
