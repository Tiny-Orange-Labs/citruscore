import { userModel } from '../models/user';

export async function getUser(request: any) {
    const sessionID: string = request.state['log-cookie'].id;
    return await userModel.findOne({ sessionID }, { password: 0 }).lean();
}

export async function setUser(request: any) {
    const sessionID: string = request.state['log-cookie'].id;
    const data = request.payload.data;

    return await userModel.updateOne({ sessionID }, { ...data }, { password: 0 });
}
