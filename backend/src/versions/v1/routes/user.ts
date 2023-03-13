import { Server } from '@hapi/hapi';
import { getMe, setUser, getUsers, uploadAvatar } from '../controller/user';
import { strictRouteOptions } from '../data/routeOptions';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/v1/user/me',
            handler: getMe,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/user/getUser',
            handler: setUser,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/user/getUsers',
            handler: getUsers,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/user/changeAvatar',
            handler: uploadAvatar,
            options: {
                ...strictRouteOptions,
                payload: {
                    maxBytes: 1024 * 1024 * 4.5, // 4.5MBs
                },
            },
        },
    ]);
}
