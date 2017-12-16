import * as keys from '../../constants/LocalStorageKeys';
import * as routes from '../../constants/Routes';
import { push } from 'connected-react-router';
import {destroySessionEvent} from "../../events/destroySessionEvent";
import {updatedCurrentChannelEvent} from "../../events/updatedCurrentChannelEvent";
import {store} from "../../utils/createStore";

export const destroySessionAction = () => {
    return (dispatch) => {
        const currentState = store.getState();
        if (currentState.currentChannel && currentState.currentChannel.timerId){
            clearInterval(currentState.currentChannel.timerId);
            dispatch(updatedCurrentChannelEvent(null, currentState.currentChannel, currentState.currentChannel.messages));
        }
        localStorage.removeItem(keys.TOKEN);
        localStorage.removeItem(keys.CURRENT_USER_ID);
        dispatch(destroySessionEvent());
        dispatch(push(routes.LOGIN));
    };
};
