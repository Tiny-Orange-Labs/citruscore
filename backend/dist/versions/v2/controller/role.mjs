import { roleModel } from '../models/role';
import { getMe, getUsers } from './user';
import { getTeam } from './team';
export async function doIHaveRights(role, teamId, right) {
    const rights = await roleModel.findOne({ _id: role, teamId });
    return rights && rights[right];
}
export async function createRole(request) {
    const me = await getMe(request);
    const team = await getTeam(request);
    const newRole = request.payload.data;
    const changeAllowed = await doIHaveRights(me.role, team._id, 'createRole');
    if (!changeAllowed) {
        throw new Error(`${me.username} has no rights to create roles`);
    }
    const rights = new roleModel(newRole);
    await rights.save();
    return { success: true };
}
export async function getRole(request) {
    const me = await getMe(request);
    const team = await getTeam(request);
    return roleModel.findOne({ _id: me.role, teamId: team._id });
}
export async function getRoles(request) {
    const team = await getTeam(request);
    return roleModel.find({ teamId: team._id }).lean();
}
export async function updateRole(request) {
    const me = await getMe(request);
    const team = await getTeam(request);
    const changeAllowed = await doIHaveRights(me.role, team._id, 'createRole');
    const { name, update } = request.payload.data;
    if (!changeAllowed) {
        throw new Error(`${me.username} has no rights to update roles`);
    }
    return roleModel.updateOne({ name }, { $set: update });
}
export async function removeRole(request) {
    const me = await getMe(request);
    const team = await getTeam(request);
    const changeAllowed = await doIHaveRights(me.role, team._id, 'createRole');
    const name = request.payload.data.name;
    const ids = team.members.map((member) => member._id);
    request.payload.data.ids = ids;
    const users = await getUsers(request);
    const userThatHasRole = users
        .filter((user) => user.roleName === name)
        .map((user) => user.username);
    if (!changeAllowed) {
        throw new Error(`${me.username} has no rights to remove roles`);
    }
    if (userThatHasRole.length !== 0) {
        return {
            success: false,
            problem: 'ROLE_IN_USE',
            userThatHasRole,
        };
    }
    return {
        success: true,
        ...(await roleModel.deleteOne({ name, teamId: team._id })),
    };
}
