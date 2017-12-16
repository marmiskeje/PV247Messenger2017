import {UPDATED_CURRENT_CHANNEL_EVENT} from '../constants/Events';

export const updatedCurrentChannelEvent = (timerId, currentChannel, messages) => ({
    type: UPDATED_CURRENT_CHANNEL_EVENT,
    payload: {
        timerId,
        currentChannel,
        messages
    }
});