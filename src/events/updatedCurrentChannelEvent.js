import {UPDATED_CURRENT_CHANNEL_EVENT} from '../constants/Events';

export const updatedCurrentChannelEvent = (currentChannel, messages) => ({
    type: UPDATED_CURRENT_CHANNEL_EVENT,
    payload: {
        currentChannel,
        messages
    }
});