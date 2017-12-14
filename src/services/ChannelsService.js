import ApiService from './ApiService';
import * as ApiConstants from '../constants/Api.js';

class ChannelsServiceImplementation{
    constructor(apiService){
        this.apiService = apiService;
    }

    getAllChannels(onSuccess, onError) {
        this.apiService.get(`/app/${ApiConstants.API_APP_ID}`, onSuccess, onError);
    }

    addChannel(channel, onSuccess, onError){
        const request = [
            {
                "path": "/channels/-",
                "op": "add",
                "value": channel
            }
        ];
        this.apiService.patch(`/app/${ApiConstants.API_APP_ID}`, request, onSuccess, onError);
    }

    updateChannel(channel, onSuccess, onError){
        const request = [
            {
                "path": `/channels/${channel.id}`,
                "op": "replace",
                "value": channel
            }
        ];
        this.apiService.patch(`/app/${ApiConstants.API_APP_ID}`, request, onSuccess, onError);
    }

    removeChannel(channelId, onSuccess, onError){
        const request = [
            {
                "path": `/channels/${channelId}`,
                "op": "remove"
            }
        ];
        this.apiService.patch(`/app/${ApiConstants.API_APP_ID}`, request, onSuccess, onError);
    }

}

export const ChannelsService = new ChannelsServiceImplementation(ApiService);