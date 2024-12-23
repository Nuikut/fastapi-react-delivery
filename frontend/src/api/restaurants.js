const API_URL = process.env.REACT_APP_API_URL;

export async function getRestaurants() {
    const response = await fetch(`${API_URL}/ordering/restaurants`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return JSON.parse(await response.json());
}

export async function getMenu(restaurant) {
    if (!restaurant) {
        return [];
    }
    const response = await fetch(`${API_URL}/ordering/menu?restaurant=${restaurant}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return JSON.parse(await response.json());
}