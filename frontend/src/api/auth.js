export async function loginUser(login, password) {
    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
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
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password})
    })
    const data = JSON.parse(await response.json())['status'];

    return data;
}


export async function validateToken(token){
    const response = await fetch(`http://localhost:8000/auth/token?token=${token}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    const data = JSON.parse(await response.json());

    return data.status === 'Success';
}