import Bcrypt from 'bcrypt';
import { Server } from '@hapi/hapi';
import cokie from '@hapi/cookie';

//* Need database */
const users = [
    {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
        name: 'John Doe',
        id: '2133d32a',
    },
];

export default async function auth(server: Server) {
    await server.register(cokie);

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'log-cookie',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false,
        },
        redirectTo: '/login/',
        validate: function (request: any, session: { id: string }) {
            const account = users.find(user => user.id === session?.id);

            if (!account) {
                return { isValid: false };
            }

            return { isValid: true, credentials: account };
        },
    });
    server.auth.default('session');
    server.route({
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const payload = request.payload as any;
            const { username, password } = payload.data;
            const account = users.find(user => user.username === username);

            if (!account || !(await Bcrypt.compare(password, account.password))) {
                return { auth: false };
            }

            request.cookieAuth.set({ id: account.id });
            return h.redirect('/');
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session',
            },
        },
    });
}
