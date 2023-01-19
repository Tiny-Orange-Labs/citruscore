import { RouteOptions } from '@hapi/hapi';

export const strictRouteOptions: RouteOptions = {
    auth: {
        mode: 'required',
        strategy: 'session',
    },
};
