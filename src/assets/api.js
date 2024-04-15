const api = 'https://volleyboll-dev-quiet-mountain-3664.fly.dev/';

function apiGet(endpoint, callback) {
    let result = false;

    fetch(`${api}${endpoint}`)
    .then(response => {
        if (response.ok) {
            result = true;
        };
        return response.json();
    })
    .then(data => {
        callback(data, result);
    });
}

function apiPost(endpoint, callback) {
    let result = false;

    fetch(`${api}${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
        if (response.ok) {
            result = true;
        };
        return response.json();
    })
    .then(data => {
        callback(data, result);
    });
};

function apiPut(endpoint, callback) {
    let result = false;

    fetch(`${api}${endpoint}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
        if (response.ok) {
            result = true;
        };
        return response.json();
    })
    .then(data => {
        callback(data, result);
    });
};

function apiDelete(endpoint, callback) {
    let result = false;

    fetch(`${api}${endpoint}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
        if (response.ok) {
            result = true;
        };
        return response.json();
    })
    .then(data => {
        callback(data, result);
    });
};

export {apiGet, apiPost, apiPut, apiDelete}