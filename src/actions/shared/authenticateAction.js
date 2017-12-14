import * as keys from '../../constants/LocalStorageKeys';
import { push } from 'connected-react-router';
import {AuthService} from '../../services/AuthService';
import {UsersService} from '../../services/UsersService';
import {createSessionEvent} from '../../events/createSessionEvents';
import {NotificationService} from '../../services/NotificationService';

export const authenticateAction = (destinationLocation, email) => {
    return (dispatch) => {
        AuthService.authenticate(email, function(token){
            localStorage.setItem(keys.TOKEN, token);
            UsersService.getByEmail(email, function(user){
                const customData = JSON.parse(user.customData);
                const currentUser = { id: customData.id, email: user.email, nickname: customData.nickname, pictureUrl: customData.pictureUrl };
                localStorage.setItem(keys.CURRENT_USER_ID, currentUser.id);
                dispatch(createSessionEvent(token, currentUser));
                dispatch(push(destinationLocation));
            }, function(){
                NotificationService.show('Failed to get user info. Try later.', 'error');
            });

        }, function(httpResponse){
            let msg = 'A server error occurred. Try later.';
            if (httpResponse.status === 400){
                msg = 'Login failed. Incorrect credentials. Try again.';
            }
            NotificationService.show(msg, 'error');
        });
    };
};
