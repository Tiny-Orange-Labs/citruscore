import fs from 'fs/promises';
import { userModel } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { logout } from './auth';
import avatarSizes from '../data/shared/avatarSizes';
import sharp from 'sharp';
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
    let refresh = false;
    if (user.email !== data.email) {
        sendEmail({
            to: user.email,
            subject: 'Email Changed',
            text: `Your email has been changed from ${user.email} to ${data.email}`,
            html: `<h2>Log</h2><p>Your email has been changed from ${user.email} to ${data.email}</p>`,
        });
        setTimeout(() => logout(request, null), 2500);
        refresh = true;
    }
    if (user.username !== data.username) {
        sendEmail({
            to: data.email,
            subject: 'Username Changed',
            text: `Your username has been changed from ${user.username} to ${data.username}`,
            html: `<h2>Log</h2><p>Your username has been changed from ${user.username} to ${data.username}</p>`,
        });
        setTimeout(() => logout(request, null), 2500);
        refresh = true;
    }
    const status = await userModel.updateOne({ username: user?.username }, { ...data });
    return { ...status, refresh };
}
export async function uploadAvatar(request) {
    const user = await getMe(request);
    const dir = `./backend/uploads/user/img/user/${user._id}/avatar/`;
    const avatar = `./user/img/user/${user._id}/avatar/`;
    const uri = request.payload.data.file.split(';base64,').pop();
    const buffer = Buffer.from(uri, 'base64');
    await userModel.updateOne({ username: user?.username }, { avatar });
    await fs.mkdir(dir, { recursive: true });
    try {
        await sharp(buffer)
            .webp({ lossless: true })
            .resize({ width: avatarSizes.large })
            .toFile(`${dir}avatar_large.webp`);
        await sharp(buffer)
            .webp({ lossless: true })
            .resize({ width: avatarSizes.medium })
            .toFile(`${dir}avatar_medium.webp`);
        await sharp(buffer)
            .webp({ lossless: true })
            .resize({ width: avatarSizes.small })
            .toFile(`${dir}avatar_small.webp`);
    }
    catch (error) {
        console.log(error);
    }
    return { avatar };
}
