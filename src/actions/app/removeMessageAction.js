import {NotificationService} from '../../services/NotificationService';
import {MessagesService} from "../../services/MessagesService";
import {messageDeletedEvent} from "../../events/messageDeletedEvent";

export const removeMessageAction = (channelId, messageId) => {
    return (dispatch) => {
        MessagesService.deleteMessage(channelId, messageId, function(){
            dispatch(messageDeletedEvent(messageId));
        }, function(){
            NotificationService.show('Removing of message failed. Server error occurred.', 'error');
        });
    };
};
