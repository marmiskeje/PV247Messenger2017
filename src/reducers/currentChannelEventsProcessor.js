import * as Immutable from 'immutable';
import * as Events from '../constants/Events';

export const currentChannelEventsProcessor = (prevState = { id: null, name: '', timerId: null, messages: Immutable.OrderedMap()}, event) => {
    let newState = prevState;
    let doSort = false;
    switch (event.type){
        case Events.UPDATED_CURRENT_CHANNEL_EVENT:
            doSort = true;
            newState = { id: event.payload.currentChannel.id, name: event.payload.currentChannel.name, timerId: event.payload.timerId, messages: event.payload.messages };
            break;
        case Events.NEW_MESSAGE_CREATED_EVENT:
        case Events.UPDATED_MESSAGE_EVENT:
            doSort = true;
            newState.messages = newState.messages.set(event.payload.message.id, event.payload.message);
            break;
        case Events.MESSAGE_DELETED_EVENT:
            newState.messages = newState.messages.remove(event.payload.messageId);
            break;
        case Events.DESTROY_SESSION_EVENT:
            newState = { id: null, name: '', timerId: null,  messages: Immutable.OrderedMap() };
            break;
    }
    if (doSort){
        newState.messages = newState.messages.sort((x,y) =>
        {
            return x.createdAt - y.createdAt;
        });
    }
    return newState;
};
