// Constants
import { API_BASE_URL } from "../../data/constants/index";

export const createUser = async (username, email, password) => {
    let payload = {
        username,
        email,
        password
    };
    return await fetch(
        `${API_BASE_URL}/api/v1/user/create-user`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => {
        if(!res.ok) {
            return Promise.reject(res);
        }
        if(res.headers.get('content-type').includes('application/json')) {
            return res.json();
        } else if(res.headers.get('content-type').includes('text/plain')) {
            return res.text();
        }
    })
};

export const loginUser = async (email, password) => {
    let payload = {
        email,
        password
    };
    return await fetch(
        `${API_BASE_URL}/api/v1/user/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => {
        if (!res.ok) {
            return Promise.reject(res);
        }
        if (res.headers.get('content-type').includes('application/json')) {
            return res.json();
        } else if (res.headers.get('content-type').includes('text/plain')) {
            return res.text();
        }
    })
};

export const oneUser = async (id) => {
    return await fetch(
        `${API_BASE_URL}/api/v1/user/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => {
        if (!res.ok) {
            return Promise.reject(res);
        };
        if (res.headers.get('content-type').includes('application/json')) {
            return res.json();
        } else if (res.headers.get('content-type').includes('text/plain')) {
            return res.text();
        };
    })
};

export const allUsers = async () => {
    return await fetch(
        `${API_BASE_URL}/api/v1/user/getAll`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => {
        if (!res.ok) {
            return Promise.reject(res);
        }
        if (res.headers.get('content-type').includes('application/json')) {
            return res.json();
        } else if (res.headers.get('content-type').includes('text/plain')) {
            return res.text();
        }
    })
};

export const deleteUser = async (id) => {
    const token = localStorage.getItem('jwt');

    return await fetch(
        `${API_BASE_URL}/api/v1/user/${id}/delete`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(res => {
        if (!res.ok) {
            return Promise.reject(res);
        }
        return Promise.resolve(true);
    })
};