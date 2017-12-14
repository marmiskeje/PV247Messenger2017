import {UPDATED_MESSAGE_EVENT} from '../constants/Events';

export const updatedMessageEvent = (message) => ({
    type: UPDATED_MESSAGE_EVENT,
    payload: {
        message
    }
});