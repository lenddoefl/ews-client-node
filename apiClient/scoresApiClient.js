let ews = require('./ews.js'),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

let clientAPI = {
    path: 'api/v1/scores',
    pathParams: 'auth_type=1'
};

module.exports = class ScoresApiClient {
    constructor() {
        this.APIKey = '';
        this.hostname = '';

        this.auth = {};
    }

    subject(data) {
        let endpoint = 'subjects';
        let url = this.generateURI('subject', clientAPI.pathParams);

        return this.generalRequest(url, endpoint, data);
    }

    dateQuery(data) {
        let endpoint = 'dateQuery';
        let url = this.generateURI(endpoint, clientAPI.pathParams);

        return this.generalRequest(url, endpoint, data);
    }

    init(data) {
        let enterData = ews.init(data);
        this.APIKey = enterData.APIKey;
        this.hostname = enterData.hostname;
    }

    login() {
        return login(clientAPI, this.APIKey, this.hostname).then(response => {
            this.auth = {
                authToken: response.authToken,
                reqToken: response.reqToken
            };

            return response;
        });
    }

    generateURI(endpoint, params) {
        return generateURI(this.hostname, clientAPI.path, endpoint, params);
    }

    generalRequest(url, endpoint, data) {
        if(!this.auth.authToken && !this.auth.reqToken) {
            return this.login().then(() => {
                return request(url, this.auth, data, endpoint)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => {
                        return error.response;
                    });
            });
        } else {
            return request(url, this.auth, data, endpoint)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return error.response;
                });
        }
    }
};
