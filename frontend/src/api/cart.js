const API_URL = process.env.REACT_APP_API_URL;

export async function getOrders(username) {
    const response = await fetch(`${API_URL}/ordering/orders/?login=${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })
    return JSON.parse(await response.json());
}