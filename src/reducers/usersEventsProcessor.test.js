import {usersEventsProcessor} from "./usersEventsProcessor";
import {updatedUsersEvent} from "../events/updatedUsersEvent";
import {updatedUserEvent} from "../events/updatedUserEvent";
import {createSessionEvent} from "../events/createSessionEvent";
import {destroySessionEvent} from "../events/destroySessionEvent";
import * as Immutable from "immutable";

test('User events processor test - Updated users', () => {
    const prevState = { currentUserId: null, currentUser: null, allByIds: Immutable.Map(), allByEmails: Immutable.Map() };
    let users = Immutable.Map().set('test', { id: 'test', email: 'test@test.com'}).set('test2', { id: 'test2', email: 'test2@test.com'});
    let usersByEmail = Immutable.Map().set('test@test.com', { id: 'test', email: 'test@test.com'}).set('test2@test.com', { id: 'test2', email: 'test2@test.com'});
    const event = updatedUsersEvent(users);

    let newState = usersEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ currentUserId: null, currentUser: null, allByIds: users, allByEmails: usersByEmail });
});

test('User events processor test - Updated user', () => {
    let users = Immutable.Map().set('test', { id: 'test', email: 'test@test.com', nickname: 'test'}).set('test2', { id: 'test2', email: 'test2@test.com', nickname: 'test2'});
    let usersByEmail = Immutable.Map().set('test@test.com', { id: 'test', email: 'test@test.com', nickname: 'test'}).set('test2@test.com', { id: 'test2', email: 'test2@test.com', nickname: 'tes2'});
    const prevState = { currentUserId: null, currentUser: null, allByIds: users, allByEmails: usersByEmail };
    const user = { id: 'test', email: 'test@test.com', nickname: 'updateTest'};
    const event = updatedUserEvent(user);

    let newState = usersEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ currentUserId: null, currentUser: null, allByIds: users.set(user.id, user), allByEmails: usersByEmail.set(user.email, user) });
});

test('User events processor test - Created session', () => {
    const currentUser = { id: 'test', email: 'test@test.com'};
    let prevState = { currentUserId: null, currentUser: null, allByIds: Immutable.Map(), allByEmails: Immutable.Map() };
    const event = createSessionEvent("testToken", currentUser);

    let newState = usersEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ currentUserId: currentUser.id, currentUser: currentUser, allByIds: Immutable.Map(), allByEmails: Immutable.Map() });
});

test('User events processor test - Destroyed session', () => {
    let prevState = { currentUserId: 'test', currentUser: { id: 'test', email: 'test@test.com'}, allByIds: Immutable.Map(), allByEmails: Immutable.Map() };
    const event = destroySessionEvent();

    let newState = usersEventsProcessor(prevState, event);
    expect(newState).toBeDefined();
    expect(newState).toEqual({ currentUserId: null, currentUser: null, allByIds: Immutable.Map(), allByEmails: Immutable.Map() });
});

