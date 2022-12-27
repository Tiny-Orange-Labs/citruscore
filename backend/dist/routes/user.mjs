import { getUser, setUser } from '../controller/user';
export default async function user(server) {
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
