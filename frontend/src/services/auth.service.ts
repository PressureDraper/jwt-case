export const loginService = async (username: string, password: string) => {
    try {
        const response = await fetch('http://localhost:49152/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data; // { token: string }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export const verifyToken = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch('http://localhost:49152/api/v1/auth/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.ok;
    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
}