import {UPDATED_USERS_EVENT} from '../constants/Events';

export const updatedUsersEvent = (users) => ({
    type: UPDATED_USERS_EVENT,
    payload: {
        users
    }
});