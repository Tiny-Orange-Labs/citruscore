import inert from '@hapi/inert';
export default async function host(server) {
    await server.register(inert);
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './frontend/dist/prod/',
                index: ['index.html'],
            },
        },
    });
}
