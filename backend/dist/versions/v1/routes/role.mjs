import { getRole, getRoles, removeRole, createRole, updateRole } from '../controller/role';
import { strictRouteOptions } from '../data/routeOptions';
export default async function user(server) {
    server.route([
        {
            method: 'GET',
            path: '/v1/role/getRole',
            handler: getRole,
            options: strictRouteOptions,
        },
        {
            method: 'GET',
            path: '/v1/role/getRoles',
            handler: getRoles,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/role/removeRole',
            handler: removeRole,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/role/createRole',
            handler: createRole,
            options: strictRouteOptions,
        },
        {
            method: 'POST',
            path: '/v1/role/updateRole',
            handler: updateRole,
            options: strictRouteOptions,
        },
    ]);
}
