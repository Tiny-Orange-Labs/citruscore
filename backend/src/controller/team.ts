import { teamModel, teamType } from '../models/team';
import { UserType } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { getMe, getUser } from './user';

export async function getTeam(request: any): Promise<teamType> {
    const user: UserType = await getMe(request);
    return await teamModel.findOne({ 'members.member': user._id }, { __v: 0 }).lean();
}

export async function changeTeamMemberRights(request: any) {
    const user: UserType = await getMe(request);
    const team: teamType = await getTeam(request);
    const { rights, member } = request.payload.data;
    const userRights = team.members.find(member => member.member + '' === user._id + '');
    const memberIndex = team.members.findIndex(tMember => tMember.member + '' === member._id + '');
    const memberDB = await getUser(member._id);

    if (!userRights) {
        throw new Error(`${user.username} is not a team member`);
    }
    if (userRights.rights?.changeTeamMemberRights !== true) {
        throw new Error(`${user.username} has no rights to change team member rights`);
    }
    await teamModel.updateOne({ _id: team._id }, { $set: { [`members.${memberIndex}.rights`]: rights } });

    return team;
}
