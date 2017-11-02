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
        this.auth = {};
    }

    subject(data, APIKey, hostname) {
        let endpoint = 'subjects';
        let url = generateURI(hostname, clientAPI.path, 'subject', clientAPI.pathParams);

        return this.generalRequest(url, endpoint, data, APIKey, hostname);
    }

    dateQuery(data, APIKey, hostname) {
        let endpoint = 'dateQuery';
        let url = generateURI(hostname, clientAPI.path, endpoint, clientAPI.pathParams);

        return this.generalRequest(url, endpoint, data, APIKey, hostname);
    }

    init(data) {
        data.clientAPI = 'Scores';
        return ews.init(data);
    }

    login(APIKey, hostname) {
        return login(clientAPI, APIKey, hostname).then(response => {
            this.auth = {
                authToken: response.authToken,
                reqToken: response.reqToken
            };

            return response;
        });
    }

    generateURI(hostname, clientAPI, endpoint, params) {
        return generateURI(hostname, clientAPI, endpoint, params);
    }

    generalRequest(url, endpoint, data, APIKey, hostname) {
        if(!this.auth.authToken && !this.auth.reqToken) {
            return this.login(APIKey, hostname).then(() => {
                return request(url, this.auth, data, endpoint).then(response => {
                    return response.data;
                });
            });
        } else {
            return request(url, this.auth, data, endpoint).then(response => {
                return response.data;
            });
        }
    }
};
