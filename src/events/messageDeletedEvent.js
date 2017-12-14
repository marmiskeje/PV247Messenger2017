import {MESSAGE_DELETED_EVENT} from '../constants/Events';

export const messageDeletedEvent = (messageId) => ({
    type: MESSAGE_DELETED_EVENT,
    payload: {
        messageId
    }
});