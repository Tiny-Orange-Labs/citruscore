import Bcrypt from 'bcrypt';

//* Need database */
const users = [
    {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
        name: 'John Doe',
        id: '2133d32a',
    },
];

export async function login(request: any) {
    const { username, password } = request.payload.data;
    const account = users.find(user => user.username === username);

    if (!account || !(await Bcrypt.compare(password, account.password))) {
        return { auth: false };
    }

    request.cookieAuth.set({ id: account.id });
    return { auth: true };
}

export function validate(request: any, session: { id: string }) {
    const account = users.find(user => user.id === session?.id);

    if (!account) {
        return { isValid: false };
    }

    return { isValid: true, credentials: account };
}

export function logout(request: any, h: any) {
    request.cookieAuth.clear();
    return h.redirect('/login/');
}
