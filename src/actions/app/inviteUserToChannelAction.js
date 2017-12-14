import {updatedChannelsEvent} from '../../events/updatedChannelsEvent';
import {NotificationService} from '../../services/NotificationService';
import {ChannelsService} from '../../services/ChannelsService';
import { store } from '../../utils/createStore';
import * as Immutable from "immutable";

export const inviteUserToChannelAction = (channel) => {
    return (dispatch) => {
        let email = prompt(`Enter user´s email for invitation to channel ${channel.name}:`, '');
        if (email != null){
            email = email.trim();
            const currentState = store.getState();
            if (email.length === 0 || !currentState.users.allByEmails.has(email)){
                NotificationService.show('Invalid email!', 'warning');
            }
            else {
                const userToUse = currentState.users.allByEmails.get(email);
                if (channel.memberIds.includes(userToUse.id)) {
                    NotificationService.show('User with entered email is already in channel!', 'warning');
                } else {
                    const currentState = store.getState();
                    const currentUserId = currentState.users.currentUserId;
                    let newMemberIds = new Array(channel.memberIds);
                    newMemberIds.push(userToUse.id);
                    const channelRequest = {id: channel.id, name: channel.name, customData: JSON.stringify({ownerId: channel.ownerId, memberIds: newMemberIds})};
                    ChannelsService.updateChannel(channelRequest, function(appData){
                        let channelsMap = Immutable.OrderedMap();
                        for (var i = 0; i < appData.channels.length; i++){
                            const channel = appData.channels[i];
                            const customData = JSON.parse(channel.customData);
                            if (customData.ownerId === currentUserId || customData.memberIds.includes(currentUserId)){ // only user´s channels or channels where is a member
                                channelsMap = channelsMap.set(channel.id, { id: channel.id, name: channel.name, ownerId: customData.ownerId, memberIds: customData.memberIds });
                            }
                        }
                        dispatch(updatedChannelsEvent(channelsMap));
                        NotificationService.show(`User ${email} was successfully added to channel ${channel.name}.`, 'info');
                    }, function(){
                        NotificationService.show('Update of channel failed. Server error occurred.', 'error');
                    });
                }
            }
        }

    };
};
