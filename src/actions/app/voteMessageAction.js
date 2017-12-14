import {updatedMessageEvent} from '../../events/updatedMessageEvent';
import {NotificationService} from '../../services/NotificationService';
import { store } from '../../utils/createStore';
import {MessagesService} from "../../services/MessagesService";

export const voteMessageAction = (channelId, messageId, newRate = 0) => {
    return (dispatch) => {
        if (channelId && messageId){
            const currentState = store.getState();
            const message = currentState.currentChannel.messages.get(messageId);
            MessagesService.updateMessage(channelId, {
                id: message.id,
                value: message.text,
                customData: JSON.stringify({rate: newRate})
            }, function(createdMessage){
                const createdByUser = currentState.users.allByEmails.get(createdMessage.createdBy);
                const updatedByUser = currentState.users.allByEmails.get(createdMessage.updatedBy);
                const customData = JSON.parse(createdMessage.customData);
                let message= {
                    id: createdMessage.id,
                    createdBy: createdByUser.id, createdAt: new Date(createdMessage.createdAt),
                    updatedBy: updatedByUser.id, updatedAt: new Date(createdMessage.updatedAt),
                    text: createdMessage.value,
                    rate: customData.rate
                };
                dispatch(updatedMessageEvent(message));
            }, function(){
                NotificationService.show('Update of message failed. Server error occurred.', 'error');
            });
        }
    };
};
