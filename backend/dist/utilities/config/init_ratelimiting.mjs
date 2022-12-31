import hapiRRateLimit from 'hapi-rate-limitor';
export default function initRateLimit(server) {
    server.register({
        plugin: hapiRRateLimit,
        options: {
            redis: `redis://ratelimit:${process.env.REDIS_PASSWORD}@127.0.0.1:6379`,
            namespace: 'hapi-rate-limitor',
            max: 250,
            duration: 60000,
        },
    });
}
