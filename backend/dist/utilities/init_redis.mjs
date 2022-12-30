import redis from 'redis';
const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
});
client.connect().then(function () {
    client.on('warning', console.log);
    client.on('error', console.log);
});
export default client;
