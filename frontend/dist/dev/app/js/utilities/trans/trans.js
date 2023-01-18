import { msg } from '@lit/localize';
export function transRights(key) {
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
}
export function transRightsInfo(key) {
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
        return msg('Team membeer can change the rights of other team members');
    }
}
