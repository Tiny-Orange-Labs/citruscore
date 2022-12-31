import { userModel } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { logout } from './auth';
export async function getUser(request) {
    const username = request.state['log-cookie'].username;
    return await userModel.findOne({ username }, { password: 0 }).lean();
}
export async function setUser(request) {
    const username = request.state['log-cookie'].username;
    const data = request.payload.data;
    if (username !== data.username) {
        sendEmail({
            to: data.email,
            subject: 'Username Changed',
            text: `Your username has been changed from ${username} to ${data.username}`,
            html: `<p>Your username has been changed from ${username} to ${data.username}</p>`,
        });
        await logout(request, null);
    }
    return await userModel.updateOne({ username }, { ...data }, { password: 0 });
}
