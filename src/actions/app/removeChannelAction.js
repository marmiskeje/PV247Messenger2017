import {updatedChannelsEvent} from '../../events/updatedChannelsEvent';
import {NotificationService} from '../../services/NotificationService';
import {ChannelsService} from '../../services/ChannelsService';
import { store } from '../../utils/createStore';
import * as Immutable from "immutable";

export const removeChannelAction = (channelId) => {
    return (dispatch) => {
        ChannelsService.removeChannel(channelId, function(appData){
            const currentState = store.getState();
            const currentUserId = currentState.users.currentUserId;

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
            NotificationService.show('Removing of channel failed. Server error occurred.', 'error');
        });
    };
};
