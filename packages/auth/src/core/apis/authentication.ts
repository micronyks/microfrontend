import { ENDPOINTS } from "../constants";

export const authenticateUser = async (credential: any) => {

    console.log('before hitting : API_ENDPOINT env variable#######', process.env.API_ENDPOINT)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: credential.email, password: credential.password })
    };

    return await fetch(ENDPOINTS.LOGIN, requestOptions);
} 