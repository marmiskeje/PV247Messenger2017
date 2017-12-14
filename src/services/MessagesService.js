import ApiService from './ApiService';
import * as ApiConstants from '../constants/Api.js';

class MessageServiceImplementation{
    constructor(apiService){
        this.apiService = apiService;
    }

    createMessage(channelId, message, onSuccess, onError){
        this.apiService.post(`/app/${ApiConstants.API_APP_ID}/channel/${channelId}/message`, message, onSuccess, onError);
    }

    updateMessage(channelId, message, onSuccess, onError){
        this.apiService.put(`/app/${ApiConstants.API_APP_ID}/channel/${channelId}/message/${message.id}`, message, onSuccess, onError);
    }

    deleteMessage(channelId, messageId, onSuccess, onError){
        this.apiService.delete(`/app/${ApiConstants.API_APP_ID}/channel/${channelId}/message/${messageId}`, onSuccess, onError);
    }

    getMessagesForChannel(channelId, onSuccess, onError) {
        this.apiService.get(`/app/${ApiConstants.API_APP_ID}/channel/${channelId}/message`, onSuccess, onError);
    }
}

export const MessagesService = new MessageServiceImplementation(ApiService);