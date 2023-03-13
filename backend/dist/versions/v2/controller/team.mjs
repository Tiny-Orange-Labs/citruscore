import { teamModel } from '../models/team';
import { userModel } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { getMe } from './user';
import { getRoles } from './role';
import createPassword from '../utilities/createPassword';
import Bcrypt from 'bcrypt';
export async function getTeam(request) {
    const me = await getMe(request);
    return await teamModel.findOne({ members: me._id }, { __v: 0 }).lean();
}
export async function changeRole(request) {
    const { role, member } = request.payload.data;
    const roles = await getRoles(request);
    const roleFound = roles.find((r) => r.name === role);
    if (roleFound) {
        return await userModel.updateOne({ _id: member._id }, { role: roleFound._id, roleName: roleFound.name });
    }
    throw new Error(`Role ${role} not found`);
}
export async function removeTeamMember(request) {
    const user = await getMe(request);
    const team = await getTeam(request);
    const { member } = request.payload.data;
    await teamModel.updateOne({ _id: team._id }, { $pull: { members: member._id } });
    await sendEmail({
        to: member.email,
        subject: `You have been removed from ${team.name}`,
        text: `You have been removed from ${team.name}`,
        html: `You have been removed from ${team.name}`,
    });
    return team;
}
export async function addTeamMember(request) {
    const { member, email, roleName } = request.payload.data;
    const user = await getMe(request);
    const team = await getTeam(request);
    const roles = await getRoles(request);
    const myRole = roles.find((r) => r._id + '' === user.role + '');
    const password = createPassword();
    const role = roles.find((r) => r.name === roleName)?._id;
    const username = `user${Date.now()}`;
    const text = `You have been added to ${team.name} from ${member.username}. Login at ${process.env.URL}. Your username ${username} password is ${password}`;
    if (!myRole?.addTeamMember) {
        throw new Error(`${member.username} do not have permission to add team members`);
    }
    try {
        const newMember = await userModel.create({
            username,
            email,
            password: await Bcrypt.hash(password, 10),
            role,
            about: `invited by ${member.username}`,
            roleName,
            team: team._id,
        });
        newMember.save();
        await teamModel.updateOne({ _id: team._id }, { $push: { members: newMember._id } });
        await sendEmail({
            to: email,
            subject: `You have been added to ${team.name}`,
            text,
            html: text,
        });
        return team;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
