import Bcrypt from 'bcrypt';
import cokie from '@hapi/cookie';
//* Need database */
const users = [
    {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',
        name: 'John Doe',
        id: '2133d32a',
    },
];
export default async function auth(server) {
    await server.register(cokie);
    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'log-cookie',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false,
        },
        redirectTo: '/login/',
        validate: function (request, session) {
            const account = users.find(user => user.id === session?.id);
            if (!account) {
                return { isValid: false };
            }
            return { isValid: true, credentials: account };
        },
    });
    server.auth.default('session');
    server.route([
        {
            method: 'POST',
            path: '/login',
            handler: async (request, h) => {
                const payload = request.payload;
                const { username, password } = payload.data;
                const account = users.find(user => user.username === username);
                if (!account || !(await Bcrypt.compare(password, account.password))) {
                    return { auth: false };
                }
                request.cookieAuth.set({ id: account.id });
                return { auth: true };
            },
            options: {
                auth: {
                    mode: 'try',
                    strategy: 'session',
                },
            },
        },
        {
            method: 'GET',
            path: '/logout',
            handler: async (request, h) => {
                request.cookieAuth.clear();
                return h.redirect('/login/');
            },
        },
    ]);
}
