import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

export const useAuth = () => {
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        const { token } = await login(username, password);
        localStorage.setItem('token', token);
        navigate('/');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return { handleLogin, handleLogout };
}