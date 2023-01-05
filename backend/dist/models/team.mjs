import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: 3,
        maxLength: 20,
        toLowerCase: true,
        unique: true,
    },
    maxMembers: {
        required: true,
        type: Number,
        min: 1,
        max: 1000,
    },
    about: {
        type: String,
        minLength: 1,
        maxLength: 560,
    },
    members: [
        {
            member: mongoose.Schema.Types.ObjectId,
            role: {
                type: String,
                default: 'member',
                required: true,
            },
            rights: {
                type: {
                    addTeamMember: Boolean,
                    removeTeamMember: Boolean,
                    changeTeamMemberRole: Boolean,
                    changeTeamMemberRights: Boolean,
                },
                required: true,
                default: {
                    addTeamMember: false,
                    removeTeamMember: false,
                    changeTeamMemberRole: false,
                    changeTeamMemberRights: false,
                },
            },
        },
    ],
});
export const teamModel = mongoose.model('team', teamSchema);
