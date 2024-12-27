const API_URL = process.env.REACT_APP_API_URL;

export async function getActiveOrders(username) {
    const response = await fetch(`${API_URL}/ordering/order?login=${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })
    return JSON.parse(await response.json());
}

export async function getHistoryOrders(username) {
    const response = await fetch(`${API_URL}/ordering/orders?login=${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })
    return JSON.parse(await response.json());
}

export async function getRandomStaff(restaurant) {
    const response = await fetch(`${API_URL}/ordering/staff?restaurant=${restaurant}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return JSON.parse(await response.json());
}

export async function placeOrder(price, username, staff, restaurant, cart) {
    console.log(price, username, staff, restaurant, cart);
    const response = await fetch(`${API_URL}/ordering/order`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({total_price: price, client: username, staff: staff, restaurant: restaurant, cart: cart})
    })
    return JSON.parse(await response.json());
}

export async function rateOrder(id, rating) {
    const response = await fetch(`${API_URL}/ordering/order?id=${id}&rating=${rating}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return JSON.parse(await response.json());
}