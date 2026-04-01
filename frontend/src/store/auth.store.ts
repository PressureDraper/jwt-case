import { create } from 'zustand'
import { verifyToken } from '../services/auth.service'
import type { AuthStore } from '../interfaces/auth.interface'

export const useAuthStore = create<AuthStore> ((set) => ({
    isAuthenticated: false,
    isChecking: true,

    checkAuth: async () => {
        const isValid = await verifyToken();
        set({ isAuthenticated: isValid, isChecking: false });
        if (!isValid) localStorage.removeItem('token');
    },

    login: (token: string) => {
        localStorage.setItem('token', token);
        set({ isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false });
    }
}));