import { Server } from '@hapi/hapi';
import inert from '@hapi/inert';

export default async function host(server: Server) {
    const directory: string = process.env.SERVE === 'production' ? 'prod' : 'dev';
    await server.register(inert);

    // Login Staticfiles
    server.route({
        method: 'GET',
        path: '/login/{param*}',
        handler: {
            directory: {
                path: `./frontend/dist/${directory}/login/`,
                index: ['login.html'],
            },
        },
        options: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/user/{param*}',
        handler: {
            directory: {
                path: `./backend/uploads/user/`,
            },
        },
        options: {
            auth: {
                mode: 'required',
                strategy: 'session',
            },
        },
    });

    // App Staticfiles
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: `./frontend/dist/${directory}/app/`,
                index: ['index.html'],
            },
        },
        options: {
            auth: {
                mode: 'required',
                strategy: 'session',
            },
        },
    });
}
