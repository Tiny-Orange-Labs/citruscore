import Bcrypt from 'bcrypt';
import { userModel, UserType } from '../models/user';
import crypto from 'node:crypto';

type LoginData = {
    username: string;
    password: string;
};
const sessionIDs: Set<string> = new Set<string>();

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
    return !account ? { isValid: false } : { isValid: true, credentials: account };
}

export function logout(request: any, h: any) {
    request.cookieAuth.clear();
    return h.redirect('/login/');
}

export async function checkPassword(request: any) {
    const sessionID: string = request.state['log-cookie'].id;
    const { password } = request.payload.data;
    const userData: UserType = await userModel.findOne({ sessionID }).lean();
    const validPW: boolean = await Bcrypt.compare(password, userData.password);

    if (userData && validPW) {
        return { auth: true };
    }

    return { auth: false };
}
