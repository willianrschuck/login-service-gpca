import config from 'config/config.json';

async function login(username, password) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        const fetchResponse = await fetch(`${config.apiEndpoint}/api/login`, requestOptions);
        const data = await fetchResponse.json();
        console.log(data)
        if (fetchResponse.status !== 200) {
            return [null, data];
        }
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export { login }