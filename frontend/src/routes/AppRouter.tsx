import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { useState } from 'react'
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/Home';

export const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
    console.log(isAuthenticated);
    

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />

                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Route>

                <Route path='*' element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
            </Routes>
        </Router>
    )
}
