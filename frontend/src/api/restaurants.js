export async function getRestaurants() {
    const response = await fetch('http://127.0.0.1:8000/restaurants', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return JSON.parse(await response.json());
}

export async function getMenu(restaurant) {
    const response = await fetch(`http://127.0.0.1:8000/menu?restaurant=${restaurant}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json();

    return data['menu'];
}