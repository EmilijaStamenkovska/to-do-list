// Constants
import { API_BASE_URL } from "../../data/constants/index";

export const allTodos = async () => {
    let token = localStorage.getItem('token');
    
    return await fetch(
        `${API_BASE_URL}/api/v1/todos/getAll`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const oneTodo = async (id) => {
    let token = localStorage.getItem('jwt_key');

    return await fetch(
        `${API_BASE_URL}/api/v1/todos/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const createTodo = async (title, description, done, not_done) => {
    const token = localStorage.getItem('jwt_key');
    let data = {
        title,
        description,
        done,
        not_done
    };

    return await fetch(
        `${API_BASE_URL}/api/v1/todos/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
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

export const finishedTodos = async () => {
    return await fetch(
        `${API_BASE_URL}/api/v1/todos/finished`,
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

export const notFinishedTodos = async () => {
    return await fetch(
        `${API_BASE_URL}/api/v1/todos/not-finished`,
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

export const deleteTodo = async (id) => {
    const token = localStorage.getItem('jwt');

    return await fetch(
        `${API_BASE_URL}/api/v1/todos/delete/${id}`,
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