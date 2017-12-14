import * as Immutable from 'immutable';
import * as Events from '../../constants/Events';

export const channelsEventsProcessor = (prevState = Immutable.OrderedMap(), event) => {
    switch (event.type){
        case Events.UPDATED_CHANNELS_EVENT:
            return event.payload.channels;
    }
    return prevState;
};
