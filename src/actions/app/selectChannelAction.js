import {updatedCurrentChannelEvent} from '../../events/updatedCurrentChannelEvent';
import {NotificationService} from '../../services/NotificationService';
import { store } from '../../utils/createStore';
import * as Immutable from "immutable";
import {MessagesService} from "../../services/MessagesService";

export const selectChannelAction = (channel) => {
    return (dispatch) => {
        const currentState = store.getState();
        if (currentState.currentChannel && currentState.currentChannel.timerId){
            clearInterval(currentState.currentChannel.timerId);
            dispatch(updatedCurrentChannelEvent(null, currentState.currentChannel, currentState.currentChannel.messages));
        }
        MessagesService.getMessagesForChannel(channel.id, function(messages){
            let messagesMap = Immutable.OrderedMap();
            for (var i = 0; i < messages.length; i++){
                const message = messages[i];
                const customData = JSON.parse(message.customData);
                const createdByUser = currentState.users.allByEmails.get(message.createdBy);
                const updatedByUser = currentState.users.allByEmails.get(message.updatedBy);
                messagesMap = messagesMap.set(message.id,
                    {
                        id: message.id,
                        createdBy: createdByUser.id, createdAt: new Date(message.createdAt),
                        updatedBy: updatedByUser.id, updatedAt: new Date(message.updatedAt),
                        text: message.value,
                        rate: customData.rate
                    }
                );
            }

            const timerId = setInterval(function(){
                const currentState = store.getState();
                if (currentState.currentChannel && currentState.currentChannel.id) {
                    store.dispatch(selectChannelAction(currentState.currentChannel));
                }
            }, 10000);
            dispatch(updatedCurrentChannelEvent(timerId, channel, messagesMap));
        }, function(){
            NotificationService.show('Getting of messages failed. Server error occurred.', 'error');
        });
    };
};
