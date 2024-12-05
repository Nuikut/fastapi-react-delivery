export async function getRestaurants() {
    const response = await fetch('http://127.0.0.1:8000/restaurants', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json();

    return data['restaurants'];
}