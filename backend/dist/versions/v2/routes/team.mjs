import { getTeam, changeRole, removeTeamMember, addTeamMember } from '../controller/team';
import { strictRouteOptions } from '../data/routeOptions';
export default async function user(server) {
    server.route([
        {
            method: 'GET',
            path: '/team',
            handler: getTeam,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/team/changeRole',
            handler: changeRole,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/team/removeMember',
            handler: removeTeamMember,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/team/addMember',
            handler: addTeamMember,
            options: strictRouteOptions,
        },
    ]);
}
