import {UPDATED_CHANNELS_EVENT} from '../constants/Events';

export const updatedChannelsEvent = (channels) => ({
    type: UPDATED_CHANNELS_EVENT,
    payload: {
        channels
    }
});