const hosts = 'https://wedev-api.sky.pro/api/v2/todos';

export function getTodos(token) {
    return fetch(hosts, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                //token = prompt('Введите верный пароль');
                //fetchTodosAndRender();
                throw new Error('неверный пароль');
            }
            return response.json();
        });
}

export function deleteTodos(token, id) {
    return fetch(hosts + '/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        });
}

export function postTodos({text, token}) {
    return fetch(hosts, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        });
}

export function login({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            return response.json();
        });
}