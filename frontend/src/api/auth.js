export async function loginUser(login, password) {
    const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password})
    })

    const data = JSON.parse(await response.json())['access_token'];

    if (response.ok) {
        localStorage.setItem('access_token', data);
    }

    return data;
}


export async function registerUser(login, password) {
    const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password})
    })
    const data = JSON.parse(await response.json())['status'];

    return data;
}


export async function validateToken(token){
    const response = await fetch(`http://127.0.0.1:8000/token?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = JSON.parse(await response.json());

    return data.status === 'Success';
}