export async function getRestaurants() {
    const response = await fetch('http://localhost:8000/ordering/restaurants', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return JSON.parse(await response.json());
}

export async function getMenu(restaurant) {
    const response = await fetch(`http://localhost:8000/ordering/menu?restaurant=${restaurant}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return JSON.parse(await response.json());
}