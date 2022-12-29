import Bcrypt from 'bcrypt';
import { userModel } from '../models/user';
import crypto from 'node:crypto';
const sessionIDs = new Set();
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
    return !account ? { isValid: false } : { isValid: true, credentials: account };
}
export function logout(request, h) {
    request.cookieAuth.clear();
    return h.redirect('/login/');
}
export async function checkPassword(request) {
    const sessionID = request.state['log-cookie'].id;
    const { password } = request.payload.data;
    const userData = await userModel.findOne({ sessionID }).lean();
    const validPW = await Bcrypt.compare(password, userData.password);
    if (userData && validPW) {
        return { auth: true };
    }
    return { auth: false };
}
