import * as Immutable from 'immutable';
import {channelsEventsProcessor} from "./channelsEventsProcessor";
import {updatedChannelsEvent} from "../events/updatedChannelsEvent";
import {destroySessionEvent} from "../events/destroySessionEvent";

test('Channels events processor test - Updated channels', () => {
    const prevState = Immutable.OrderedMap();
    let newChannels = Immutable.OrderedMap();
    const channel = { id: 'test'};
    newChannels = newChannels.set(1, channel);
    const event = updatedChannelsEvent(newChannels);

    let newState = channelsEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual(newChannels);
});

test('Channels events processor test - Destroyed session', () => {
    let prevState = Immutable.OrderedMap();
    const channel = { id: 'test'};
    prevState = prevState.set(1, channel);
    const event = destroySessionEvent();

    let newState = channelsEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual(Immutable.OrderedMap());
});

