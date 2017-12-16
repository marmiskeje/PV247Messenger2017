import { getInitialState } from './getInitialState';
import * as keys from "../constants/LocalStorageKeys";

test('Get initial state test', () => {
    const token = "test"
    const currentUserId = "UserId";
    const state = getInitialState();

    const expectedToken = localStorage.getItem(keys.TOKEN);
    const expectedCurrentUserId = localStorage.getItem(keys.CURRENT_USER_ID);
    expect(state).toBeDefined();
    expect(state.shared).toBeDefined();
    expect(state.shared.token).toBe(expectedToken);
    expect(state.users).toBeDefined();
    expect(state.users.currentUserId).toBe(expectedCurrentUserId);
    expect(state.channels).toBeDefined();
    expect(state.currentChannel).toBeDefined();
});