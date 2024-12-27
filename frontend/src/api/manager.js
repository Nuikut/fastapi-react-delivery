const API_URL = process.env.REACT_APP_API_URL;

export async function updateStaff(login, newLogin, password, restaurant) {

    if (!login) {
        return {"status": "No login"};
    }
    const response = await fetch(`${API_URL}/api/manager/staff`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('manager_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: login, newLogin:newLogin, password: password, restaurant: restaurant})
    })
    const data = await response.json()
    console.log(data)
    return JSON.parse(data);
}

export async function deleteStaff(login, restaurant) {
    if (!login) {
        return {"status": "No login"};
    }
    const response = await fetch(`${API_URL}/api/manager/staff`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('manager_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: login, password: restaurant})
    })

    return JSON.parse(await response.json());
}

export async function createMeal(name, description, price, category, available = true, restaurant) {
    if (!name || !description || !price || !category) {
        return {"status": "Not enough data"};
    }
    const response = await fetch(`${API_URL}/api/manager/meal`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('manager_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, description: description, price: price, category: category, available: available, restaurant: restaurant})
    })

    return JSON.parse(await response.json());
}