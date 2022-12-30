import { userModel } from '../models/user';
export async function getUser(request) {
    const username = request.state['log-cookie'].username;
    return await userModel.findOne({ username }, { password: 0 }).lean();
}
export async function setUser(request) {
    const username = request.state['log-cookie'].username;
    const data = request.payload.data;
    return await userModel.updateOne({ username }, { ...data }, { password: 0 });
}
