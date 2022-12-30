import Hapi from '@hapi/hapi';
import './utilities/init_env';
import host from './staticfiles/app';
import './utilities/init_mongo';
import auth from './routes/auth';
import user from './routes/user';
const hostAdress = process.env.RUNTIME === 'production' ? '0.0.0.0' : 'localhost';
const server = Hapi.server({
    port: 3000,
    host: hostAdress,
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
