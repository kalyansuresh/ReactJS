import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "./authAPI";

type AuthState = {
  user: User | null | string;
  token: string | null;
};

// const user = parseJSON(localStorage.getItem("USER")) || null;
const token = localStorage.getItem("ISAUTH") || "";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.user = user;
      state.token = token || "";
    },
  }
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectAuthToken = (state: RootState) => state.auth.token;
