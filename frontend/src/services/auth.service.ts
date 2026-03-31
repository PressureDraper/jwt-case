export const login = async (username: string, password: string) => {
    try {
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
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