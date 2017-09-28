let ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

let clientAPI = {
    name: 'ScoresAPI',
    path: 'api/v1/scores',
    pathParams: 'auth_type=1'
};

module.exports = class ScoresApiClient {
    subject(data, APIKey, hostname) {
        let endpoint = 'subjects';
        let url = generateURI(hostname, clientAPI.path, 'subject', clientAPI.pathParams);

        return generalRequest(url, endpoint, data, APIKey, hostname);
    }

    dataQuery(data, APIKey, hostname) {
        let endpoint = 'dateQuery';
        let url = generateURI(hostname, clientAPI.path, endpoint, clientAPI.pathParams);

        return generalRequest(url, endpoint, data, APIKey, hostname);
    }

    init(data) {
        return ews.init(data);
    }

    login(clientAPI, APIKey, hostname) {
        return login(clientAPI, APIKey, hostname);
    }

    generateURI(hostname, clientAPI, endpoint, params) {
        return generateURI(hostname, clientAPI, endpoint, params);
    }
};

function generalRequest(url, endpoint, data, APIKey, hostname) {
    if(!auth.ScoresAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.ScoresAPI, data, endpoint).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.ScoresAPI, data, endpoint).then(response => {
            return response;
        });
    }
}
