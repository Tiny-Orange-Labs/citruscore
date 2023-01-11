import fs from 'fs/promises';
import { userModel } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { logout } from './auth';
export async function getMe(request) {
    const username = request.state['log-cookie'].username;
    return await userModel.findOne({ username }, { password: 0 }).lean();
}
export async function getUser(request) {
    return await userModel.find().where('_id').in(request.payload.data.ids).exec();
}
export async function setUser(request) {
    const user = await getMe(request);
    const data = request.payload.data;
    if (user.email !== data.email) {
        sendEmail({
            to: user.email,
            subject: 'Email Changed',
            text: `Your email has been changed from ${user.email} to ${data.email}`,
            html: `<h2>Log</h2><p>Your email has been changed from ${user.email} to ${data.email}</p>`,
        });
        setTimeout(() => logout(request, null), 2500);
    }
    if (user.username !== data.username) {
        sendEmail({
            to: data.email,
            subject: 'Username Changed',
            text: `Your username has been changed from ${user.username} to ${data.username}`,
            html: `<h2>Log</h2><p>Your username has been changed from ${user.username} to ${data.username}</p>`,
        });
        setTimeout(() => logout(request, null), 2500);
    }
    return await userModel.updateOne({ username: user?.username }, { ...data }, { password: 0 });
}
export async function uploadAvatar(request) {
    const user = await getMe(request);
    const dir = `./backend/uploads/user/img/user/${user._id}/avatar/`;
    const path = `${dir}avatar.jpeg`;
    const avatar = `./user/img/user/${user._id}/avatar/avatar.jpeg`;
    await userModel.updateOne({ username: user?.username }, { avatar });
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path, request.payload.data.file.replace(`data:${request.payload.data.type};base64,`, ''), 'base64');
    console.log(path);
    return { avatar };
}
