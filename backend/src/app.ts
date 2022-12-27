import Hapi, { Server } from '@hapi/hapi';
import host from './staticfiles/app';
import './utilities/database';
import auth from './routes/auth';
import user from './routes/user';

const hostAdress: string = process.env.RUNTIME === 'production' ? '0.0.0.0' : 'localhost';
const server: Server = Hapi.server({
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
