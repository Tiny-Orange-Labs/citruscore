import Hapi, { Server } from '@hapi/hapi';
import host from './staticfiles/app';

const server: Server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

await host(server);
await server.start();
console.log('server running on %s', server.info.uri);

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
