export {
    login,
    getUsers,
    persistUser,
    getUserById
}

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    try {
        const fetchResponse = await fetch('/api/login', requestOptions);
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

async function getUsers() {

    const requestOptions = {
        method: 'GET',
    };

    try {
        const fetchResponse = await fetch("/users", requestOptions);
        const data = await fetchResponse.json();
        return [data, null];
    } catch (error) {
        return [null, error];
    }

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

async function persistUser(user, token) {

    const uri = user.id ? '/users/' + user.id : '/users';
    const method = user.id ? 'PUT' : 'POST';

    const requestOptions = {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `x-access-token ${token}` },
        body: JSON.stringify(user)
    };

    console.log(requestOptions)

    try {
        const fetchResponse = await fetch(uri, requestOptions);
        const data = await fetchResponse.json();
        if (fetchResponse.status !== 200) {
            return [null, data];
        }
        return [data, null];
    } catch (error) {
        return [null, error];
    }

}

async function getUserById(id) {

    try {
        const fetchResponse = await fetch('/users/' + id);
        const data = await fetchResponse.json();
        if (fetchResponse.status !== 200) {
            return [null, data];
        }
        return [data, null];
    } catch (error) {
        return [null, error];
    }

}