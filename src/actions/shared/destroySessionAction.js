import * as keys from '../../constants/LocalStorageKeys';
import * as routes from '../../constants/Routes';
import { push } from 'connected-react-router';
import {destroySessionEvent} from "../../events/destroySessionEvent";

export const destroySessionAction = () => {
    return (dispatch) => {
        localStorage.removeItem(keys.TOKEN);
        localStorage.removeItem(keys.CURRENT_USER_ID);
        dispatch(destroySessionEvent());
        dispatch(push(routes.LOGIN));
    };
};
