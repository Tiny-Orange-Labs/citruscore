import { Server } from '@hapi/hapi';
import inert from '@hapi/inert';

export default async function host(server: Server) {
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
