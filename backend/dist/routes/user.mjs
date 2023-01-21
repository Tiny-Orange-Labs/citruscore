import { getMe, setUser, getUsers, uploadAvatar } from '../controller/user';
import { strictRouteOptions } from '../data/routeOptions';
export default async function user(server) {
    server.route([
        {
            method: 'GET',
            path: '/me',
            handler: getMe,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/user',
            handler: setUser,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/getUsers',
            handler: getUsers,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/changeAvatar',
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
