import { teamModel, Team } from '../models/team';
import { userModel, UserType } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { getMe } from './user';
import { getRoles } from './role';
import createPassword from '../utilities/createPassword';
import Bcrypt from 'bcrypt';

export async function getTeam(request: any): Promise<Team> {
    const me: UserType = await getMe(request);
    return await teamModel.findOne({ members: me._id }, { __v: 0 }).lean();
}

export async function changeRole(request: any) {
    const { role, member } = request.payload.data;
    const roles = await getRoles(request);
    const roleFound = roles.find((r: any) => r.name === role);

    if (roleFound) {
        return await userModel.updateOne({ _id: member._id }, { role: roleFound._id, roleName: roleFound.name });
    }

    throw new Error(`Role ${role} not found`);
}

export async function removeTeamMember(request: any) {
    const user: UserType = await getMe(request);
    const team: Team = await getTeam(request);
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

export async function addTeamMember(request: any) {
    const { member, email, roleName } = request.payload.data;
    const team: Team = await getTeam(request);
    const roles = await getRoles(request);
    const myRole = roles.find((r: any) => r._id === member.role);
    const password = createPassword();
    const text = `You have been added to ${team.name} from ${member.username}. Login at ${process.env.URL}. Your password is ${password}`;

    if (!myRole?.addTeamMember) {
        throw new Error(`${member.username} do not have permission to add team members`);
    }

    const newMember = await userModel.create({
        username: `user${Date.now()}}`,
        email,
        password: await Bcrypt.hash(password, 10),
        role: roles.find((r: any) => r.name === roleName)?._id,
        roleName,
        team: team._id,
    });

    await teamModel.updateOne({ _id: team._id }, { $push: { members: newMember._id } });
    await sendEmail({
        to: email,
        subject: `You have been added to ${team.name}`,
        text,
        html: text,
    });

    return team;
}
