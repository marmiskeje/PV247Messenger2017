import * as ApiConstants from '../constants/Api.js';
import * as keys from '../constants/LocalStorageKeys';
import $ from "jquery";

class ApiService {

    processUri(uri){
        let uriToUse = uri;
        if (!uri.startsWith('/')){
            uriToUse = '/' + uri;
        }
        return uriToUse;
    }

    addTokenToHeader(headers){
        const token = localStorage.getItem(keys.TOKEN);
        if (token != null) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    }

    // if you are experiencing bug with progressbar, build the application (in case you have made change, webstorm is not perfect)
    watchedFetch(url, input){
        $("#webpage-progressbar").show();
        return fetch(url, input).then(function(httpResponse){
            $("#webpage-progressbar").hide();
            return new Promise((resolve) =>{
                resolve(httpResponse);
            });
        });
    }

    post(uri, request, onSuccess, onError) {
        const uriToUse = this.processUri(uri);
        this.watchedFetch(ApiConstants.API_URI + uriToUse,
            {
                method: 'POST',
                headers: this.addTokenToHeader({'Content-Type': 'application/json', 'Accept': 'application/json'}),
                body: JSON.stringify(request)
            }).then(function(httpResponse){
                if (httpResponse.status === 200 || httpResponse.status === 201 || httpResponse.status === 202){
                    httpResponse.json().then(onSuccess);
                } else {
                    onError(httpResponse);
                    console.log(`API ERROR. Status: ${httpResponse.status}, StatusText: ${httpResponse.statusText}`);
                }
            });
    }

    postFormData(uri, formData, onSuccess, onError) {
        const uriToUse = this.processUri(uri);
        this.watchedFetch(ApiConstants.API_URI + uriToUse,
            {
                method: 'POST',
                headers: this.addTokenToHeader({'Accept': 'application/json'}),
                body: formData
            }).then(function(httpResponse){
                if (httpResponse.status === 200 || httpResponse.status === 201 || httpResponse.status === 202){
                    httpResponse.json().then(onSuccess);
                } else {
                    onError(httpResponse);
                    console.log(`API ERROR. Status: ${httpResponse.status}, StatusText: ${httpResponse.statusText}`);
                }
            });
    }

    put(uri, request, onSuccess, onError) {
        const uriToUse = this.processUri(uri);
        this.watchedFetch(ApiConstants.API_URI + uriToUse,
            {
                method: 'PUT',
                headers: this.addTokenToHeader({'Content-Type': 'application/json', 'Accept': 'application/json'}),
                body: JSON.stringify(request)
            }).then(function(httpResponse){
                if (httpResponse.status === 200 || httpResponse.status === 201){
                    httpResponse.json().then(onSuccess);
                } else {
                    onError(httpResponse);
                    console.log(`API ERROR. Status: ${httpResponse.status}, StatusText: ${httpResponse.statusText}`);
                }
            });
    }

    get(uri, onSuccess, onError) {
        const uriToUse = this.processUri(uri);
        this.watchedFetch(ApiConstants.API_URI + uriToUse,
            {
                method: 'GET',
                headers: this.addTokenToHeader({'Content-Type': 'application/json', 'Accept': 'application/json'}),
            }).then(function(httpResponse){
                if (httpResponse.status === 200){
                    httpResponse.json().then(onSuccess);
                } else {
                    onError(httpResponse);
                    console.log(`API ERROR. Status: ${httpResponse.status}, StatusText: ${httpResponse.statusText}`);
                }
            });
    }

    delete(uri, onSuccess, onError) {
        const uriToUse = this.processUri(uri);
        this.watchedFetch(ApiConstants.API_URI + uriToUse,
            {
                method: 'DELETE',
                headers: this.addTokenToHeader({'Content-Type': 'application/json', 'Accept': 'application/json'}),
            }).then(function(httpResponse){
                if (httpResponse.status === 200){
                    httpResponse.text().then(function(text){
                        if (text){
                            const data = JSON.parse(text);
                            onSuccess(data);
                        } else{
                            onSuccess();
                        }
                    });
                } else {
                    onError(httpResponse);
                    console.log(`API ERROR. Status: ${httpResponse.status}, StatusText: ${httpResponse.statusText}`);
                }
            });
    }

    patch(uri, request, onSuccess, onError) {
        const uriToUse = this.processUri(uri);
        this.watchedFetch(ApiConstants.API_URI + uriToUse,
            {
                method: 'PATCH',
                headers: this.addTokenToHeader({'Content-Type': 'application/json-patch+json', 'Accept': 'application/json'}),
                body: JSON.stringify(request)
            }).then(function(httpResponse){
                if (httpResponse.status === 200){
                    httpResponse.json().then(onSuccess);
                } else {
                    onError(httpResponse);
                    console.log(`API ERROR. Status: ${httpResponse.status}, StatusText: ${httpResponse.statusText}`);
                }
            });
    }
}

export default new ApiService();