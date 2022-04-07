export const selection = async (userId: number) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //  body: JSON.stringify({ email: credential.email, password: credential.password })
    };

    return await fetch(`http://localhost:5000/vessels/${userId}`, requestOptions);


} 