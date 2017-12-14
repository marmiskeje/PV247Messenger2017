import ApiService from './ApiService';

class FilesServiceImplementation{
    constructor(apiService){
        this.apiService = apiService;
    }

    create(file, onSuccess, onError){
        const formData = new FormData();
        formData.append('Files', file);
        this.apiService.postFormData(`/file`, formData, onSuccess, onError);
    }

    getDownloadLink(fileId, onSuccess, onError){
        this.apiService.get(`/file/${fileId}/download-link`, onSuccess, onError);
    }
}

export const FilesService = new FilesServiceImplementation(ApiService);