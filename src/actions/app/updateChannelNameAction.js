import {updatedChannelsEvent} from '../../events/updatedChannelsEvent';
import {NotificationService} from '../../services/NotificationService';
import {ChannelsService} from '../../services/ChannelsService';
import { store } from '../../utils/createStore';
import * as Immutable from "immutable";

export const updateChannelNameAction = (channel, currentState = store.getState(), notificationService = NotificationService, channelsService = ChannelsService) => {
    return (dispatch) => {
        let channelName = prompt('Enter channel name for update:', channel.name);
        if (channelName != null){
            channelName = channelName.trim();
            if (channelName.length === 0){
                notificationService.show('Invalid channel name!', 'warning');
            } else {
                const currentUserId = currentState.users.currentUserId;

                const channelRequest = {id: channel.id, name: channelName, customData: JSON.stringify({ownerId: channel.ownerId, memberIds: channel.memberIds})};
                channelsService.updateChannel(channelRequest, function(appData){
                    let channelsMap = Immutable.OrderedMap();
                    for (var i = 0; i < appData.channels.length; i++){
                        const channel = appData.channels[i];
                        const customData = JSON.parse(channel.customData);
                        if (customData.ownerId === currentUserId || customData.memberIds.includes(currentUserId)){ // only user´s channels or channels where is a member
                            channelsMap = channelsMap.set(channel.id, { id: channel.id, name: channel.name, ownerId: customData.ownerId, memberIds: customData.memberIds });
                        }
                    }
                    dispatch(updatedChannelsEvent(channelsMap));
                }, function(){
                    notificationService.show('Update of channel failed. Server error occurred.', 'error');
                });
            }
        }

    };
};
