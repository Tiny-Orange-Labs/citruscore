import { Server } from '@hapi/hapi';
import { getTeam } from '../controller/team';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/team',
            handler: getTeam,
            options: {
                auth: {
                    mode: 'required',
                    strategy: 'session',
                },
            },
        },
    ]);
}
