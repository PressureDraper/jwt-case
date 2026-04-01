import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/Home';
import { useAuthStore } from '../store/auth.store';

export const AppRouter = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Route>

                <Route path='*' element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
            </Routes>
        </Router>
    )
}
