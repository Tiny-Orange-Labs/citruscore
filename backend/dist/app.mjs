import Hapi from '@hapi/hapi';
import './utilities/init_env';
import './utilities/init_mongo';
import './utilities/init_email';
import initRateLimit from './utilities/config/init_ratelimiting';
import host from './staticfiles/app';
import auth from './routes/auth';
import user from './routes/user';
const hostAdress = process.env.RUNTIME === 'production' ? '0.0.0.0' : 'localhost';
const server = Hapi.server({
    port: 3000,
    host: hostAdress,
});
initRateLimit(server);
await auth(server);
await user(server);
await host(server);
await server.start();
console.log('server running on %s %s %s', server.info.uri, hostAdress, process.env.ENV);
process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
