const api = 'https://volleyboll-dev-quiet-mountain-3664.fly.dev/';

function get(endpoint, callback) {
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

function post(endpoint, callback) {
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

function put(endpoint, callback) {
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

export {get, post, put}