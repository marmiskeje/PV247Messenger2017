import {UPDATED_CURRENT_CHANNEL_EVENT} from '../constants/Events';

export const updatedCurrentChannelEvent = (currentChannelId, messages) => ({
    type: UPDATED_CURRENT_CHANNEL_EVENT,
    payload: {
        currentChannelId,
        messages
    }
});