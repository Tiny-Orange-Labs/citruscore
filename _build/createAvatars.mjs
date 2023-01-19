import fs from 'fs/promises';

export default async function createAvatars(userModels) {
    try {
        await fs.rm('./backend/uploads/user/', { recursive: true, force: true });
    } catch (err) {}
    const copyAvatar = userModels.map(async function (model) {
        const fileName = model.username + '.webp';
        const source = `./_build/avatars/${fileName}`;
        const dest = `./backend/uploads/user/img/${model._id.toString()}/avatar/`;

        await fs.mkdir(dest, { recursive: true });
        await fs.copyFile(source, dest + 'avatar_small.webp');
        await fs.copyFile(source, dest + 'avatar_medium.webp');
        return await fs.copyFile(source, dest + 'avatar_large.webp');
    });
    return await Promise.all(copyAvatar);
}
