import {NEW_MESSAGE_CREATED_EVENT} from '../constants/Events';

export const newMessageCreatedEvent = (message) => ({
    type: NEW_MESSAGE_CREATED_EVENT,
    payload: {
        message
    }
});