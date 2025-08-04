// src/Stores/mercadoPago/authSlice.ts
import { StateCreator } from "zustand";

export interface AuthSlice {
  token: string | null;
  userId: string | null;
  isTokenLoading: boolean;
  error: string | null;
  setToken: (token: string, userId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  token: null,
  userId: null,
  isTokenLoading: false,
  error: null,
  setToken: (token, userId) => set({ token, userId, isTokenLoading: false }),
  setLoading: (loading) => set({ isTokenLoading: loading }),
  setError: (error) => set({ error, isTokenLoading: false }),
});
