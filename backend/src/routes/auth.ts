import { Server } from '@hapi/hapi';
import cokie from '@hapi/cookie';
import { validate, login, logout, checkPassword, changePassword } from '../controller/auth';
import { strictRouteOptions } from '../data/routeOptions';

export default async function auth(server: Server) {
    await server.register(cokie);

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'log-cookie',
            password: process.env.COOKIE_PASSWORD,
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
            method: 'POST',
            path: '/changePassword',
            handler: changePassword,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/checkPassword',
            handler: checkPassword,
            options: strictRouteOptions,
        },
        {
            method: 'GET',
            path: '/logout',
            handler: logout,
            options: strictRouteOptions,
        },
    ]);
}
