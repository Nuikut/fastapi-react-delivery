const API_URL = process.env.REACT_APP_API_URL;

export async function loginUser(login, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
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

    } catch (error) {
        console.log(error)
        return 'Error while logging in'
    }
}


export async function registerUser(login, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password})
    })
    return JSON.parse(await response.json())['status'];
}

export async function loginStaff(login, password) {
    const response = await fetch(`${API_URL}/auth/staff`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password})
    })

    const data = JSON.parse(await response.json())['access_token'];

    if (response.ok) {
        localStorage.setItem('staff_token', data);
    }

    return data;
}

export async function validateToken(token){
    if (!token)
        return false;
    const response = await fetch(`${API_URL}/auth/token`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    const data = JSON.parse(await response.json());

    return data.status === 'Success';
}

export async function updateUserInfo(token, username, password, newUsername){
    if (!newUsername) newUsername = '';
    if (!password) password = '';
    if (!token)
        return false;
    const response = await fetch(`${API_URL}/auth/update`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: username, password: password, newLogin: newUsername})
    })
    const data = JSON.parse(await response.json());

    return data.status;
}

export async function loginManager(login, password, restaurant) {
    try {
        const response = await fetch(`${API_URL}/auth/manager`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({login: login, password: password, restaurant: restaurant})
        })

        const data = JSON.parse(await response.json())['access_token'];

        if (response.ok) {
            localStorage.setItem('manager_token', data);
        }

        return data;

    } catch (error) {
        console.log(error)
        return 'Error while logging in'
    }
}