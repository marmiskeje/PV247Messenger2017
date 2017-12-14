import {newMessageCreatedEvent} from '../../events/newMessageCreatedEvent';
import {NotificationService} from '../../services/NotificationService';
import { store } from '../../utils/createStore';
import {MessagesService} from "../../services/MessagesService";

export const createMessageAction = (channelId, text) => {
    return (dispatch) => {
        if (channelId && text){
            const currentState = store.getState();
            MessagesService.createMessage(channelId, { value: text, customData: JSON.stringify({rate: 0})}, function(createdMessage){
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
                dispatch(newMessageCreatedEvent(message));
            }, function(){
                NotificationService.show('Creating of message failed. Server error occurred.', 'error');
            });
        }
    };
};
