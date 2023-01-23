import { msg } from '@lit/localize';

export function transRights(key: string) {
    if (key === 'addTeamMember') {
        return msg('Add Team Member');
    }
    if (key === 'removeTeamMember') {
        return msg('Remove Team Member');
    }
    if (key === 'changeTeamMemberRole') {
        return msg('Change Team Member Role');
    }
    if (key === 'changeTeamMemberRights') {
        return msg('Change Team Member Rights');
    }
    if (key === 'createRole') {
        return msg('Team member can create roles');
    }
    return msg('Unknown');
}

export function transRightsInfo(key: string) {
    if (key === 'addTeamMember') {
        return msg('Team member can add other team members');
    }
    if (key === 'removeTeamMember') {
        return msg('Team member can remove other team members');
    }
    if (key === 'changeTeamMemberRole') {
        return msg('Team member can change the role of other team members');
    }
    if (key === 'changeTeamMemberRights') {
        return msg('Team member can change the rights of other team members');
    }
    if (key === 'createRole') {
        return msg('Team member can create new roles for other team member');
    }
    return msg('Unknown Rights, please add them to frontent/src/ts/utililties/trans/');
}
