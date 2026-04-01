import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuthStore();

    const handleLogin = async (username: string, password: string) => {
        const { token } = await loginService(username, password);
        login(token);
        navigate('/');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return { handleLogin, handleLogout };
}