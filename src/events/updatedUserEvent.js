import {UPDATED_USER_EVENT} from '../constants/Events';

export const updatedUserEvent = (user) => ({
    type: UPDATED_USER_EVENT,
    payload: {
        user
    }
});