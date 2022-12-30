import Bcrypt from 'bcrypt';
import { userModel } from '../models/user';
import crypto from 'node:crypto';
import redis from '../utilities/init_redis';
const cookieKey = 'session';
export async function login(request) {
    const { username, password } = request.payload.data;
    const userData = await userModel.findOne({ username }).lean();
    const sessionID = crypto.randomUUID();
    if (!userData || !(await Bcrypt.compare(password, userData.password))) {
        return { auth: false };
    }
    request.cookieAuth.set({ id: sessionID, username });
    request.cookieAuth.ttl(90 * 24 * 60 * 60 * 1000); // 90 days
    await redis.SADD(cookieKey, sessionID);
    return { auth: true };
}
export async function validate(request, session) {
    const account = await redis.SISMEMBER(cookieKey, session.id);
    return !account ? { isValid: false } : { isValid: true, credentials: account };
}
export async function logout(request, h) {
    request.cookieAuth.clear();
    await redis.SREM(cookieKey, request.state['log-cookie'].id);
    if (h) {
        return h.redirect('/login/');
    }
}
export async function checkPassword(request) {
    const username = request.state['log-cookie'].username;
    const { password } = request.payload.data;
    const userData = await userModel.findOne({ username }).lean();
    const validPW = await Bcrypt.compare(password, userData.password);
    if (userData && validPW) {
        return { auth: true };
    }
    return { auth: false };
}
export async function changePassword(request, h) {
    const sessionID = request.state['log-cookie'].id;
    const { password } = request.payload.data;
    const status = await userModel.updateOne({ sessionID }, { password: await Bcrypt.hash(password, 10) });
    await logout(request, null);
    return { status };
}
