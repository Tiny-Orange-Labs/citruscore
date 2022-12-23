import { Server } from '@hapi/hapi';
import cokie from '@hapi/cookie';
import { validate, login, logout } from '../controller/auth';

export default async function auth(server: Server) {
    await server.register(cokie);

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'log-cookie',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: true,
        },
        redirectTo: '/login/',
        validate,
    });
    server.auth.default('session');
    server.route([
        {
            method: 'POST',
            path: '/login',
            handler: login,
            options: {
                auth: {
                    mode: 'try',
                    strategy: 'session',
                },
            },
        },
        {
            method: 'GET',
            path: '/logout',
            handler: logout,
        },
    ]);
}
