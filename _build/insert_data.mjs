import '../backend/dist/utilities/config/init_env.mjs';
import { userModel } from '../backend/dist/models/user.mjs';
import { teamModel } from '../backend/dist/models/team.mjs';
import { roleModel } from '../backend/dist/models/role.mjs';
import mongoose from 'mongoose';
import createAvatars from './createAvatars.mjs';

async function startMongo() {
    // todo password, username
    await mongoose.connect(`mongodb://${process.env.MONGO_URL}/log`);

    mongoose.set('strictQuery', false);
    mongoose.connection.on('error', console.error);
    mongoose.connection.on('disconnected', () => console.log('disconnected event triggered'));
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('disconnected through app termination');
            process.exit(0);
        });
    });
    await mongoose.connection.db.dropDatabase();
}

await startMongo();

const password = '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm'; // secret
const roles = [
    {
        name: 'admin',
        addTeamMember: true,
        removeTeamMember: true,
        changeTeamMemberRole: true,
        createRole: true,
    },
    {
        name: 'operator',
        addTeamMember: true,
        removeTeamMember: true,
        changeTeamMemberRole: false,
        createRole: false,
    },
    {
        name: 'member',
        addTeamMember: false,
        removeTeamMember: false,
        changeTeamMemberRole: false,
        createRole: false,
    },
];
const users = [
    {
        username: 'oliver',
        about: 'Full rights admin acc for testing.',
        isSuperAdmin: true,
    },
    {
        username: 'boris',
        about: 'Add and remove rights for operator acc.',
    },
    {
        username: 'elon',
    },
    {
        username: 'bill',
    },
    {
        username: 'steve',
    },
    {
        username: 'mark',
    },
    {
        username: 'jeff',
    },
    {
        username: 'tim',
    },
    {
        username: 'larry',
    },
    {
        username: 'sundar',
    },
    {
        username: 'satya',
    },
    {
        username: 'peter',
    },
    {
        username: 'alex',
    },
    {
        username: 'sergey',
    },
];

const userModels = users.map(function (user, i) {
    return new userModel({
        password,
        email: `development${i}@dev.dev`,
        about: 'No rights member acc for testing. You can safely delete this acc.',
        ...user,
    });
});

const userProms = userModels.map(async model => {
    return await model.save();
});
await Promise.all(userProms);

const devTeam = new teamModel({
    name: 'superTeam',
    maxMembers: 15,
    about: 'Team for testing',
    members: userModels.map(model => model._id),
});
await devTeam.save();

const roleModels = roles.map(role => {
    return new roleModel({ ...role, teamId: devTeam._id });
});

const roleProms = roleModels.map(async model => {
    return await model.save();
});

await Promise.all(roleProms);

const proms = userModels.map(async model => {
    const avatar = `./user/img/${model._id}/avatar/`;

    if (model.username === 'oliver') {
        // admin
        return await model.updateOne({ role: roleModels[0]._id, avatar });
    }
    if (model.username === 'boris') {
        // operator
        return await model.updateOne({ role: roleModels[1]._id, avatar });
    }

    return await model.updateOne({ role: roleModels[2]._id, avatar });
});
await Promise.all(proms);
await createAvatars(userModels);

console.log(`done ${users.map(u => u.username).join(', ')} with password "secret"`);
setTimeout(() => process.exit(0), 1000);
