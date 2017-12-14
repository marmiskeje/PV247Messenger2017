import * as Events from '../../constants/Events';

export const sharedEventsProcessor = (prevState = { token: null }, event) => {
    switch (event.type){
        case Events.CREATE_SESSION_EVENT:
            return { token: event.payload.token };
    }
    return prevState;
};
