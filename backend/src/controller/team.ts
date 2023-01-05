import { teamModel, teamType } from '../models/team';
import { UserType } from '../models/user';
import sendEmail from '../utilities/sendEmail';
import { getMe } from './user';

export async function getTeam(request: any): Promise<teamType> {
    const user: UserType = await getMe(request);
    return await teamModel.findOne({ 'members.member': user._id }, { __v: 0 }).lean();
}
