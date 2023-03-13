// ToDo: add more rights later
type rights = {
    _id: string;
    name: string;
    createRole: boolean;
    addTeamMember: boolean;
    removeTeamMember: boolean;
    changeTeamMemberRole: boolean;
    changeTeamMemberRights: boolean;
};

export default rights;
