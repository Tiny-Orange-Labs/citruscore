import { Server } from '@hapi/hapi';
import { getUser, setUser } from '../controller/user';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/user',
            handler: getUser,
        },
        {
            method: 'POST',
            path: '/user',
            handler: setUser,
        },
    ]);
}
