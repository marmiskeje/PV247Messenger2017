import { store } from '../../utils/createStore';
import {NotificationService} from '../../services/NotificationService';
import {UsersService} from '../../services/UsersService';
import {updatedUserEvent} from "../../events/updatedUserEvent";
import {FilesService} from "../../services/FilesService";

export const saveProfileAction = (updateProfileData) => {
    return (dispatch) => {
        const currentState = store.getState();
        const user = currentState.users.allByIds.get(updateProfileData.userId);
        let newPictureUrl = null;
        if (updateProfileData.imageFile) {
            FilesService.create(updateProfileData.imageFile, function(filesInfo){
                FilesService.getDownloadLink(filesInfo[0].id, function(link){
                    newPictureUrl = link;
                    const userToUpdate = { email: user.email, customData: JSON.stringify({id: user.id, nickname: updateProfileData.nickname, pictureUrl: newPictureUrl || user.pictureUrl}) };
                    UsersService.update(userToUpdate, function(updatedUser){
                        const customData = JSON.parse(updatedUser.customData);
                        const newUser = { id: customData.id, email: user.email, nickname: customData.nickname, pictureUrl: customData.pictureUrl };
                        dispatch(updatedUserEvent(newUser));
                        NotificationService.show('Profile was successfully updated.', 'info');
                    }, function(){
                        NotificationService.show('Updating of user failed. Server error occurred.', 'error');
                    });
                }, function(){
                    NotificationService.show('Getting of image url failed. Server error occurred.', 'error');
                });
            }, function(){
                NotificationService.show('Uploading of image failed. Server error occurred.', 'error');
            });
        }
        else {
            const userToUpdate = { email: user.email, customData: JSON.stringify({id: user.id, nickname: updateProfileData.nickname, pictureUrl: newPictureUrl || user.pictureUrl}) };
            UsersService.update(userToUpdate, function(updatedUser){
                const customData = JSON.parse(updatedUser.customData);
                const newUser = { id: customData.id, email: updatedUser.email, nickname: customData.nickname, pictureUrl: customData.pictureUrl };
                dispatch(updatedUserEvent(newUser));
                NotificationService.show('Profile was successfully updated.', 'info');
            }, function(){
                NotificationService.show('Updating of user failed. Server error occurred.', 'error');
            });
        }
    };
};
