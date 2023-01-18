import { getTeam, changeTeamMemberRights } from '../controller/team';
export default async function user(server) {
    server.route([
        {
            method: 'GET',
            path: '/team',
            handler: getTeam,
            options: {
                auth: {
                    mode: 'required',
                    strategy: 'session',
                },
            },
        },
        {
            method: 'POST',
            path: '/team/changeTeamMemberRights',
            handler: changeTeamMemberRights,
            options: {
                auth: {
                    mode: 'required',
                    strategy: 'session',
                },
            },
        },
    ]);
}
