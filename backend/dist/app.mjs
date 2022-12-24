import Hapi from '@hapi/hapi';
import host from './staticfiles/app';
import auth from './routes/auth';
const address = process.env.ENV === 'production' ? '0.0.0.0' : 'localhost';
const server = Hapi.server({
    port: 3000,
    host: address,
});
await auth(server);
await host(server);
await server.start();
console.log('server running on %s %s', server.info.uri, address);
process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
