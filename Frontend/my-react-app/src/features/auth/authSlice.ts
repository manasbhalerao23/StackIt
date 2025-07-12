import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("stackit_user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("stackit_user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("stackit_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
