import ApiService from './ApiService';
import * as ApiConstants from '../constants/Api.js';

class UsersServiceImplementation{
    constructor(apiService){
        this.apiService = apiService;
    }

    getByEmail(email, onSuccess, onError){
        this.apiService.get(`/${ApiConstants.API_APP_ID}/user/${email}`, onSuccess, onError);
    }

    getAll(onSuccess, onError){
        this.apiService.get(`/${ApiConstants.API_APP_ID}/user`, onSuccess, onError);
    }

    update(user, onSuccess, onError){
        this.apiService.put(`/${ApiConstants.API_APP_ID}/user/${user.email}`, user.customData, onSuccess, onError);
    }
}

export const UsersService = new UsersServiceImplementation(ApiService);