import { useState } from "react"
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
    const [payload, setPayload] = useState({ username: '', password: '' });
    const [error, setError] = useState({ username: false, password: false });
    const [apiError, setApiError] = useState('');
    const { handleLogin } = useAuth();

    const validate = () => {
        const newErrors = {
            username: payload.username.trim() === '',
            password: payload.password.trim() === '',
        };
        setError(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleChange = (field: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, [field]: e.target.value }));
        setError((prev) => ({ ...prev, [field]: false }));
        setApiError('');
    };

    const handleClick = async () => {
        if (!validate()) return;
        try {
            await handleLogin(payload.username, payload.password);
        } catch (err) {
            console.log(err);
            
            setApiError('Invalid username or password.');
        }
    };

    return (
        <div className="bg-blue-950 h-screen flex items-center justify-center">
            <div>
                <h1 className="text-3xl font-bold mb-6 text-center pb-7 text-blue-100 font-['Poppins']">Login</h1>
                <form className="bg-blue-50 p-6 rounded shadow-md w-80 h-auto justify-bewteen flex flex-col gap-7">

                    <div className="mb-4 h-1/2">
                        <label className="block text-gray-700 text-sm font-bold pb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.username ? 'border-red-500' : ''}`}
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={payload.username}
                            onChange={handleChange('username')}
                        />
                        {error.username && <p className="text-red-500 text-sm pt-1">This field is required</p>}
                    </div>

                    <div className="mb-6 h-1/2">
                        <label className="block text-gray-700 text-sm font-bold pb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.password ? 'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={payload.password}
                            onChange={handleChange('password')}
                        />
                        {error.password && <p className="text-red-500 text-sm pt-1">This field is required</p>}
                    </div>

                    {apiError && (
                        <p className="text-red-500 text-sm text-center mt-4">{apiError}</p>
                    )}

                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
                            type="button"
                            onClick={handleClick}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}