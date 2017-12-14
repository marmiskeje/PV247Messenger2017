import ApiService from './ApiService';

class AuthServiceImplementation{
    constructor(apiService){
        this.apiService = apiService;
    }

    authenticate(email, onSuccess, onError){
        this.apiService.post('/auth', email, onSuccess, onError);
    }
}

export const AuthService = new AuthServiceImplementation(ApiService);