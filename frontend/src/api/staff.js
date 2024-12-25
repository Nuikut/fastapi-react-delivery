const API_URL = process.env.REACT_APP_API_URL;

export async function getActiveStaffOrders(login) {
    if (!login) {
        return {"order": "Fail"};
    }
    const response = await fetch(`${API_URL}/staff/orders?login=${login}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return JSON.parse(await response.json());
}

export async function getHistoryStaffOrders(login) {
    if (!login) {
        return {"order": "Fail"};
    }
    const response = await fetch(`${API_URL}/staff/orders/old?login=${login}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return JSON.parse(await response.json());
}

export async function setOrderReady(id) {
    const response = await fetch(`${API_URL}/staff/order?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return JSON.parse(await response.json());
}