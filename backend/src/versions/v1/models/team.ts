import mongoose from 'mongoose';

export interface Team {
    name: string;
    about: string;
    maxMembers: number;
    members: mongoose.ObjectId[];
    _id: mongoose.ObjectId;
}

const teamSchema = new mongoose.Schema<Team>({
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
    members: [mongoose.Schema.Types.ObjectId],
});

export const teamModel = mongoose.model('team', teamSchema);
