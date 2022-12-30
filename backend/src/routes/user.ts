import { Server } from '@hapi/hapi';
import { getUser, setUser } from '../controller/user';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/user',
            handler: getUser,
            options: {
                auth: {
                    mode: 'required',
                    strategy: 'session',
                },
            },
        },
        {
            method: 'POST',
            path: '/user',
            handler: setUser,
            options: {
                auth: {
                    mode: 'required',
                    strategy: 'session',
                },
            },
        },
    ]);
}
