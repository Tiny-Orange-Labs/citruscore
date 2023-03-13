import Hapi, { Server } from '@hapi/hapi';
import './versions/v1/utilities/config/init_env';
import './versions/v1/utilities/config/init_mongo';
import './versions/v1/utilities/config/init_email';
import initRateLimit from './versions/v1/utilities/config/init_ratelimiting';
import host from './versions/v1/staticfiles/app';
import auth from './versions/v1/routes/auth';
import user from './versions/v1/routes/user';
import team from './versions/v1/routes/team';
import role from './versions/v1/routes/role';

const hostAdress: string = process.env.RUNTIME === 'production' ? '0.0.0.0' : 'localhost';
const server: Server = Hapi.server({
    port: 3000,
    host: hostAdress,
});

initRateLimit(server);
await auth(server);
await user(server);
await team(server);
await role(server);
await host(server);
await server.start();

console.log('server running on %s %s %s', server.info.uri, hostAdress, process.env.ENV);

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
