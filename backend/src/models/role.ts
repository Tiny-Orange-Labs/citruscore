import mongoose from 'mongoose';
import Rights from '../data/shared/rights';

interface Role extends Rights {
    teamId: mongoose.Schema.Types.ObjectId;
}

const roleSchema = new mongoose.Schema<Role>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    addTeamMember: {
        type: Boolean,
        required: true,
        default: false,
    },
    removeTeamMember: {
        type: Boolean,
        required: true,
        default: false,
    },
    changeTeamMemberRole: {
        type: Boolean,
        required: true,
        default: false,
    },
    createRole: {
        type: Boolean,
        required: true,
        default: false,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
});
const _roleModel = mongoose.model('role', roleSchema);

_roleModel.collection.createIndex({ teamId: 1, name: 1 });

export const roleModel = _roleModel;
