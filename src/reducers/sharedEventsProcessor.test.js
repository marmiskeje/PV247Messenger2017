import {sharedEventsProcessor} from "./sharedEventsProcessor";
import {createSessionEvent} from "../events/createSessionEvent";
import {destroySessionEvent} from "../events/destroySessionEvent";

test('Shared events processor test - Create session', () => {
    const token = "test";
    const prevState = null;
    const event = createSessionEvent(token);

    let newState = sharedEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ token: token });
});

test('Shared events processor test - Destroyed session', () => {
    let prevState = { token: 'test' };
    const event = destroySessionEvent();

    let newState = sharedEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ token: null });
});

