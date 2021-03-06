const {createClient} = require('redis');

let client;


async function connect() {
    client = createClient({
        url: 'redis://redis:6379'
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
}

async function set(key, values) {
    await client.json.set(key, '.', values)
}

module.exports = {
    connect,
    set
}