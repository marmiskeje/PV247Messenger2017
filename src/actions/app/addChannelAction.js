import {updatedChannelsEvent} from '../../events/updatedChannelsEvent';
import {NotificationService} from '../../services/NotificationService';
import {ChannelsService} from '../../services/ChannelsService';
import { store } from '../../utils/createStore';
import * as Immutable from "immutable";

export const addChannelAction = (currentState = store.getState(), notificationService = NotificationService, channelsService = ChannelsService) => {
    return (dispatch) => {
        let channelName = prompt('Enter new channel name:', '');
        if (channelName != null){
            channelName = channelName.trim();
            if (channelName.length === 0){
                notificationService.show('Invalid channel name!', 'warning');
            } else {
                const currentUserId = currentState.users.currentUserId;

                const channelRequest = {name: channelName, customData: JSON.stringify({ownerId: currentUserId, memberIds: [currentUserId]})};
                channelsService.addChannel(channelRequest, function(appData){
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
                    notificationService.show('Adding of channel failed. Server error occurred.', 'error');
                });
            }
        }

    };
};
