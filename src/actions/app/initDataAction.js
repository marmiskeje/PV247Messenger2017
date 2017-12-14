import {UsersService} from '../../services/UsersService';
import {ChannelsService} from '../../services/ChannelsService';
import * as Immutable from 'immutable';
import {NotificationService} from '../../services/NotificationService';
import {updatedUsersEvent} from "../../events/updatedUsersEvent";
import {updatedChannelsEvent} from "../../events/updatedChannelsEvent";
import { store } from '../../utils/createStore';

export const initDataAction = () => {
    return (dispatch) => {
        const currentState = store.getState();
        if (currentState.shared && currentState.shared.token && currentState.users.currentUserId){
            UsersService.getAll(function(users){
                let usersMap = Immutable.Map();
                const currentUserId = currentState.users.currentUserId;
                for (var i = 0; i < users.length; i++){
                    const user = users[i];
                    const customData = JSON.parse(user.customData);
                    usersMap = usersMap.set(customData.id, { id: customData.id, email: user.email, nickname: customData.nickname, pictureUrl: customData.pictureUrl });
                }
                ChannelsService.getAllChannels(function(appData){
                    let channelsMap = Immutable.Map();
                    for (var i = 0; i < appData.channels.length; i++){
                        const channel = appData.channels[i];
                        const customData = JSON.parse(channel.customData);
                        if (customData.ownerId === currentUserId || customData.memberIds.includes(currentUserId)){ // only user´s channels or channels where is a member
                            channelsMap = channelsMap.set(channel.id, { id: channel.id, name: channel.name, ownerId: customData.ownerId, memberIds: customData.memberIds });
                        }
                    }
                    dispatch(updatedChannelsEvent(channelsMap));
                    dispatch(updatedUsersEvent(usersMap));
                }, function(){
                    NotificationService.show('Failed to get channels.', 'error');
                });

            }, function(){
                NotificationService.show('Failed to get users.', 'error');
            });
        }
    };
};
