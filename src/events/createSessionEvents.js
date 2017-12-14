import {CREATE_SESSION_EVENT} from '../constants/Events';

export const createSessionEvent = (token, currentUser) => ({
    type: CREATE_SESSION_EVENT,
    payload: {
        token,
        currentUser
    }
});