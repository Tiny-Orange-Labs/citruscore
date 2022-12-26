import Hapi from '@hapi/hapi';
import host from './staticfiles/app';
import './utilities/database';
import auth from './routes/auth';
const hostAdress = process.env.RUNTIME === 'production' ? '0.0.0.0' : 'localhost';
const server = Hapi.server({
    port: 3000,
    host: hostAdress,
});
await auth(server);
await host(server);
await server.start();
console.log('server running on %s %s %s', server.info.uri, hostAdress, process.env.ENV);
process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
