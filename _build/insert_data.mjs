import '../backend/dist/utilities/config/init_env.mjs';
import { userModel } from '../backend/dist/models/user.mjs';
import { teamModel } from '../backend/dist/models/team.mjs';
import mongoose from 'mongoose';

const password = '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm'; // secret

const admin = new userModel({
    username: 'admin',
    email: 'admin@localhost.com',
    password,
    about: 'Full rights admin acc for testing',
});
const operator = new userModel({
    username: 'operator',
    email: 'operator@localhost.com',
    password,
    about: 'Add and remove rights for operator acc',
});
const member = new userModel({
    username: 'member',
    email: 'member@localhost.com',
    password,
    about: 'No rights member acc for testing',
});
const member2 = new userModel({
    username: 'member2',
    email: 'member@localhost.com',
    password,
    about: 'No rights member acc for testing',
});

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

const adminMongo = await admin.save();
const memberMongo = await member.save();
const operatorMongo = await operator.save();
const member2Mongo = await member2.save();
const devTeam = new teamModel({
    name: 'superTeam',
    maxMembers: 5,
    about: 'Team for testing',
    members: [
        {
            member: adminMongo._id,
            role: 'admin',
            rights: {
                addTeamMember: true,
                removeTeamMember: true,
                changeTeamMemberRole: true,
                changeTeamMemberRights: true,
            },
        },
        {
            member: operatorMongo._id,
            role: 'operator',
            rights: {
                addTeamMember: true,
                removeTeamMember: true,
                changeTeamMemberRole: false,
                changeTeamMemberRights: false,
            },
        },
        {
            member: memberMongo._id,
            role: 'member',
            rights: {
                addTeamMember: false,
                removeTeamMember: false,
                changeTeamMemberRole: false,
                changeTeamMemberRights: false,
            },
        },
        {
            member: member2Mongo._id,
            role: 'member',
            rights: {
                addTeamMember: false,
                removeTeamMember: false,
                changeTeamMemberRole: false,
                changeTeamMemberRights: false,
            },
        },
    ],
});
await devTeam.save();
console.log('done inserting admin and member as user with password "secret"');
process.exit(0);
