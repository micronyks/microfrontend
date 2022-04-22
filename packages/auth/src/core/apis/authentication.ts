export const authenticateUser = async (credential: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credential.email, password: credential.password })
    };

    return await fetch('http://localhost:5000/login', requestOptions);
} 