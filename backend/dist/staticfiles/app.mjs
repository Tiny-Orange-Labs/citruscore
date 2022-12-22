import inert from '@hapi/inert';
export default async function host(server) {
    await server.register(inert);
    // Login Staticfiles
    server.route({
        method: 'GET',
        path: '/login/{param*}',
        handler: {
            directory: {
                path: './frontend/dist/prod/login/',
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
    // App Staticfiles
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './frontend/dist/prod/app/',
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
