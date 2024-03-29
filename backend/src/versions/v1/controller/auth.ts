import Bcrypt from 'bcrypt';
import { userModel, UserType } from '../models/user';
import crypto from 'node:crypto';
import redis from '../utilities/config/init_redis';
import sendEmail from '../utilities/sendEmail';
import { getMe } from './user';

const cookieKey = 'session';
const ttl = 90 * 24 * 60 * 60 * 1000; // 90 days

type LoginData = {
    username: string;
    password: string;
};

export async function login(request: any): Promise<{ auth: boolean }> {
    const { username, password }: LoginData = request.payload.data;
    const userData: UserType = await userModel.findOne({ username }).lean();
    const sessionID = crypto.randomUUID();

    if (!userData || !(await Bcrypt.compare(password, userData.password))) {
        return { auth: false };
    }

    request.cookieAuth.set({ id: sessionID, username });
    request.cookieAuth.ttl(ttl);
    await redis.SADD(cookieKey, sessionID);

    return { auth: true };
}

export async function validate(_: any, session: { id: string }): Promise<{ isValid: boolean; credentials?: any }> {
    if (session.id) {
        const account = await redis.SISMEMBER(cookieKey, session.id);
        return !account ? { isValid: false } : { isValid: true, credentials: account };
    }

    return { isValid: false };
}

export async function logout(request: any, h: any) {
    request.cookieAuth.clear();
    await redis.SREM(cookieKey, request.state['log-cookie'].id);

    if (h) {
        return h.redirect('/login/');
    }
}

export async function checkPassword(request: any): Promise<{ auth: boolean }> {
    console.log(request.state['log-cookie'].username, request.payload.data.password);
    const username: string = request.state['log-cookie'].username;
    const { password } = request.payload.data;
    console.log('checkPassword', username, password);
    const userData: UserType = await userModel.findOne({ username }).lean();
    const validPW: boolean = await Bcrypt.compare(password, userData.password);
    console.log(userData, validPW);
    if (userData && validPW) {
        return { auth: true };
    }

    return { auth: false };
}

export async function changePassword(request: any, h: any): Promise<{ status: any }> {
    const user = await getMe(request);
    const { password } = request.payload.data;
    const status = await userModel.updateOne(
        { username: user.username },
        { password: await Bcrypt.hash(password, 10) },
    );

    sendEmail({
        to: user.email,
        subject: 'Password Changed',
        text: `Your password has been changed`,
        html: `<h2>Log</h2><p>Your password has been changed</p>`,
    });

    // work around so we can still deliver the icons in the notification
    // otherwise the cookie would be cleared before the notification is delivered
    setTimeout(() => logout(request, null), 2500);
    return { status };
}
