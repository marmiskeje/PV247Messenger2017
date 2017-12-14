import * as keys from '../../constants/LocalStorageKeys';
import * as routes from '../../constants/Routes';
import { push } from 'connected-react-router';

export const destroySessionAction = () => {
    return (dispatch) => {
        localStorage.removeItem(keys.TOKEN);
        localStorage.removeItem(keys.CURRENT_USER_ID);
        dispatch(push(routes.LOGIN));
    };
};
