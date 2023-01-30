import { getMe, setUser, getUsers, uploadAvatar } from '../controller/user';
import { strictRouteOptions } from '../data/routeOptions';
export default async function user(server) {
    server.route([
        {
            method: 'GET',
            path: '/user/me',
            handler: getMe,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/user/getUser',
            handler: setUser,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/user/getUsers',
            handler: getUsers,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/user/changeAvatar',
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
