import { Server } from '@hapi/hapi';
import { getMe, setUser, getUser, uploadAvatar } from '../controller/user';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/me',
            handler: getMe,
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
        {
            method: 'POST',
            path: '/getUsers',
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
            path: '/changeAvatar',
            handler: uploadAvatar,
            options: {
                auth: {
                    mode: 'required',
                    strategy: 'session',
                },
            },
        },
    ]);
}
