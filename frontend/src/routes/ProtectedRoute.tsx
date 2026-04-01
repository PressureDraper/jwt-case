import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export const ProtectedRoute = () => {
    const { isAuthenticated, checkAuth, isChecking } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isChecking) return <div>Loading...</div>;
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}