import {DESTROY_SESSION_EVENT} from '../constants/Events';

export const destroySessionEvent = () => ({
    type: DESTROY_SESSION_EVENT,
    payload: {
    }
});