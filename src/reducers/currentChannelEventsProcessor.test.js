import * as Immutable from 'immutable';
import {currentChannelEventsProcessor} from "./currentChannelEventsProcessor";
import {updatedCurrentChannelEvent} from "../events/updatedCurrentChannelEvent";
import {newMessageCreatedEvent} from "../events/newMessageCreatedEvent";
import {updatedMessageEvent} from "../events/updatedMessageEvent";
import {destroySessionEvent} from "../events/destroySessionEvent";

test('Current channel events processor test - Updated current channel', () => {
    const prevState = null;
    const currentChannel = { id: 'test', name: 'test', timerId: null};
    let messages = Immutable.OrderedMap();
    messages = messages.set('test', {});
    const event = updatedCurrentChannelEvent(null, currentChannel, messages);

    let newState = currentChannelEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ id: currentChannel.id, name: currentChannel.name, timerId: null, messages: messages });
});

test('Current channel events processor test - New message', () => {
    const prevState = { id: 'test', name: 'test', timerId: null, messages: Immutable.OrderedMap() };
    const message = { id: 'test', text: 'test' };
    const event = newMessageCreatedEvent(message);

    let newState = currentChannelEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ id: prevState.id, name: prevState.name, timerId: null, messages: Immutable.OrderedMap().set(message.id, message) });
});

test('Current channel events processor test - Updated message', () => {
    const message = { id: 'test', text: 'test' };
    const updatedMessage = { id: 'test', text: 'test2' };
    const prevState = { id: 'test', name: 'test', timerId: null, messages: Immutable.OrderedMap().set(message.id, message) };

    const event = updatedMessageEvent(updatedMessage);

    let newState = currentChannelEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ id: prevState.id, name: prevState.name, timerId: null, messages: Immutable.OrderedMap().set(message.id, updatedMessage) });
});

test('Current channel events processor test - Destroyed session', () => {
    let prevState = { id: 'test', name: 'test', timerId: null, messages: Immutable.OrderedMap().set('test', {}) }
    const event = destroySessionEvent();

    let newState = currentChannelEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ id: null, name: '', timerId: null, messages: Immutable.OrderedMap() });
});

