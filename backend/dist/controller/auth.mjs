import Bcrypt from 'bcrypt';
import { userModel } from '../models/user';
import crypto from 'node:crypto';
const sessionIDs = new Set();
//* Need database */
const users = [
    {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',
        id: '2133d32a',
    },
];
export async function login(request) {
    const { username, password } = request.payload.data;
    const userData = await userModel.findOne({ username }).lean();
    const sessionID = crypto.randomUUID();
    if (!userData || !(await Bcrypt.compare(password, userData.password))) {
        return { auth: false };
    }
    request.cookieAuth.set({ id: sessionID });
    sessionIDs.add(sessionID);
    await userModel.updateOne({ _id: userData._id }, { sessionID });
    return { auth: true };
}
export function validate(request, session) {
    const account = sessionIDs.has(session.id);
    if (!account) {
        return { isValid: false };
    }
    return { isValid: true, credentials: account };
}
export function logout(request, h) {
    request.cookieAuth.clear();
    return h.redirect('/login/');
}
