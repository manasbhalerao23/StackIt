// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { login, logout } from "../features/auth/authSlice";
import { type User } from "../features/auth/authSlice";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };
};
