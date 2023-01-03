import { userModel } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { logout } from './auth';

export async function getUser(request: any) {
    const username: string = request.state['log-cookie'].username;
    return await userModel.findOne({ username }, { password: 0 }).lean();
}

export async function setUser(request: any) {
    const username: string = request.state['log-cookie'].username;
    const data = request.payload.data;
    const user = await getUser(request);

    if (user?.email !== data.email) {
        sendEmail({
            to: data.email,
            subject: 'Email Changed',
            text: `Your email has been changed from ${user?.email} to ${data.email}`,
            html: `<h2>Log</h2><p>Your email has been changed from ${user?.email} to ${data.email}</p>`,
        });
    }
    if (username !== data.username) {
        sendEmail({
            to: data.email,
            subject: 'Username Changed',
            text: `Your username has been changed from ${username} to ${data.username}`,
            html: `<h2>Log</h2><p>Your username has been changed from ${username} to ${data.username}</p>`,
        });
        await logout(request, null);
    }

    return await userModel.updateOne({ username }, { ...data }, { password: 0 });
}
