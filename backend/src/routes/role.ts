import { Server } from '@hapi/hapi';
import { getRole, getRoles, removeRole, createRole, updateRole } from '../controller/role';
import { strictRouteOptions } from '../data/routeOptions';

export default async function user(server: Server) {
    server.route([
        {
            method: 'GET',
            path: '/role/getRole',
            handler: getRole,
            options: strictRouteOptions,
        },
        {
            method: 'GET',
            path: '/role/getRoles',
            handler: getRoles,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/role/removeRole',
            handler: removeRole,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/role/createRole',
            handler: createRole,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/role/updateRole',
            handler: updateRole,
            options: strictRouteOptions,
        },
    ]);
}
