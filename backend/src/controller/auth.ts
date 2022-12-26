import Bcrypt from 'bcrypt';
import { userModel, UserType } from '../models/user';
import crypto from 'node:crypto';

type LoginData = {
    username: string;
    password: string;
};
const sessionIDs: Set<string> = new Set<string>();

//* Need database */
const users = [
    {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
        id: '2133d32a',
    },
];

export async function login(request: any) {
    const { username, password }: LoginData = request.payload.data;
    const userData: UserType = await userModel.findOne({ username }).lean();
    const sessionID = crypto.randomUUID();

    if (!userData || !(await Bcrypt.compare(password, userData.password))) {
        return { auth: false };
    }

    request.cookieAuth.set({ id: sessionID });
    sessionIDs.add(sessionID);
    await userModel.updateOne({ _id: userData._id }, { sessionID });

    return { auth: true };
}

export function validate(request: any, session: { id: string }) {
    const account = sessionIDs.has(session.id);

    if (!account) {
        return { isValid: false };
    }

    return { isValid: true, credentials: account };
}

export function logout(request: any, h: any) {
    request.cookieAuth.clear();
    return h.redirect('/login/');
}
