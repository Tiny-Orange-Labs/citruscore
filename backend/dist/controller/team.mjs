import { teamModel } from '../models/team';
import { getMe } from './user';
export async function getTeam(request) {
    const user = await getMe(request);
    return await teamModel.findOne({ 'members.member': user._id }, { __v: 0 }).lean();
}
