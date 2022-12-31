import Hapi from '@hapi/hapi';
import './utilities/init_env';
import host from './staticfiles/app';
import './utilities/init_mongo';
import auth from './routes/auth';
import user from './routes/user';
import hapiRRateLimit from 'hapi-rate-limitor';
const hostAdress = process.env.RUNTIME === 'production' ? '0.0.0.0' : 'localhost';
const server = Hapi.server({
    port: 3000,
    host: hostAdress,
});
server.register({
    plugin: hapiRRateLimit,
    options: {
        redis: `redis://ratelimit:${process.env.REDIS_PASSWORD}@127.0.0.1:6379`,
        namespace: 'hapi-rate-limitor',
        max: 100,
        duration: 60000,
    },
});
await auth(server);
await user(server);
await host(server);
await server.start();
console.log('server running on %s %s %s', server.info.uri, hostAdress, process.env.ENV);
process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
