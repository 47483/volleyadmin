const api = 'https://volleyboll-dev.fly.dev/';

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
    })
};

export {post}