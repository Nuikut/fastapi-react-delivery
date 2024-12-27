const API_URL = process.env.REACT_APP_API_URL;

export async function loginAdmin(login, password) {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: login, password: password})
    })

    const data = JSON.parse(await response.json())['access_token'];

    if (response.ok) {
        localStorage.setItem('admin_token', data);
    }

    return data;
}


export async function getStaff(token = localStorage.getItem('admin_token')) {
    const response = await fetch(`${API_URL}/admin/staff`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return JSON.parse(await response.json())['staff'];
}

export async function deactivateStaff(login) {
    const response = await fetch(`${API_URL}/admin/staff`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: login})
    })

    return JSON.parse(await response.json())['status']
}


export async function createStaff(login, password, restaurant) {
    const response = await fetch(`${API_URL}/admin/staff`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: login, password: password, restaurant: restaurant})
    })

    return JSON.parse(await response.json())['status']
}

export async function createRestaurant(address, category, login, password) {
    const response = await fetch(`${API_URL}/admin/restaurant`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({address: address, category:category, manager_login: login, manager_password: password})
    })

    return JSON.parse(await response.json())['status']
}

export async function deleteRestaurant(address) {
    const response = await fetch(`${API_URL}/admin/restaurant`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({address: address})
    })

    return JSON.parse(await response.json())['status']
}