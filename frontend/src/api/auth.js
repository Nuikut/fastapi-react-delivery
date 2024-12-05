export async function loginUser(login, password) {
    const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password})
    })

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('access_token', data['access_token']);
    }

    return data['access_token'];
}


export async function registerUser(login, password) {
    const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'applicatiogn/json',
        },
        body: JSON.stringify({login: login, password: password})
    })
    const data = await response.json();

    return data['status'];
}


export async function validateToken(token){
    const response = await fetch(`http://127.0.0.1:8000/token?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json();

    return data.status === 'Success';
}