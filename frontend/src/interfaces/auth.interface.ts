export interface AuthStore {
    isAuthenticated: boolean;
    isChecking: boolean;
    checkAuth: () => Promise<void>;
    login: (token: string) => void;
    logout: () => void;
}