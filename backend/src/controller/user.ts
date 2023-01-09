import { userModel, UserType } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { logout } from './auth';

export async function getMe(request: any): Promise<UserType> {
    const username: string = request.state['log-cookie'].username;
    return await userModel.findOne({ username }, { password: 0 }).lean();
}

export async function getUser(request: any): Promise<UserType[]> {
    return await userModel.find().where('_id').in(request.payload.data.ids).exec();
}

export async function setUser(request: any) {
    const user = await getMe(request);
    const data = request.payload.data;

    if (user.email !== data.email) {
        sendEmail({
            to: user.email,
            subject: 'Email Changed',
            text: `Your email has been changed from ${user.email} to ${data.email}`,
            html: `<h2>Log</h2><p>Your email has been changed from ${user.email} to ${data.email}</p>`,
        });
    }
    if (user.username !== data.username) {
        sendEmail({
            to: data.email,
            subject: 'Username Changed',
            text: `Your username has been changed from ${user.username} to ${data.username}`,
            html: `<h2>Log</h2><p>Your username has been changed from ${user.username} to ${data.username}</p>`,
        });
        await logout(request, null);
    }

    return await userModel.updateOne({ username: user?.username }, { ...data }, { password: 0 });
}
