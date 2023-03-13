import { Server } from '@hapi/hapi';
import { getTeam, changeRole, removeTeamMember, addTeamMember } from '../controller/team';
import { strictRouteOptions } from '../data/routeOptions';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/v1/team',
            handler: getTeam,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/team/changeRole',
            handler: changeRole,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/team/removeMember',
            handler: removeTeamMember,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/team/addMember',
            handler: addTeamMember,
            options: strictRouteOptions,
        },
    ]);
}
