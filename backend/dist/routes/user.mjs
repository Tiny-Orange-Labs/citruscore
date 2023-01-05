import { getMe, setUser } from '../controller/user';
export default async function user(server) {
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
    ]);
}
