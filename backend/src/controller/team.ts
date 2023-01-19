import { teamModel, Team } from '../models/team';
import { UserType } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { getMe, getUser } from './user';

export async function getTeam(request: any): Promise<Team> {
    const me: UserType = await getMe(request);
    return await teamModel.findOne({ members: me._id }, { __v: 0 }).lean();
}

export async function changeRole(request: any) {
    const team: Team = await getTeam(request);
    const { rights, member } = request.payload.data;
    const memberIndex = team.members.findIndex(tMember => tMember + '' === member._id + '');

    await teamModel.updateOne({ _id: team._id }, { $set: { [`members.${memberIndex}.rights`]: rights } });

    return team;
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
