let ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

let clientAPI = {
    name: 'AJAPI',
    path: 'api/v2/applicant_journey',
    data: 'data'
};

module.exports = class AjApiClient {
    startSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'startSession');

        return generalRequest(url, data, APIKey, hostname);
    }

    finishSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'finishSession');

        return generalRequest(url, data, APIKey, hostname);
    }

    finishStep(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'finishStep');

        return generalRequest(url, data, APIKey, hostname);
    }

    createAttachment(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'createAttachment');

        return generalRequest(url, data, APIKey, hostname);
    }

    getApplication(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'getApplication');

        return generalRequest(url, data, APIKey, hostname);
    }

    prefetchApplications(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'prefetchApplications');

        return loginAndHandling(url, data, APIKey, hostname);
    }

    resumeSession(data, APIKey, hostname) {
        let url = generateURI(hostname, clientAPI.path, 'resumeSession');

        return loginAndHandling(url, data, APIKey, hostname);
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

function generalRequest(url, data, APIKey, hostname) {
    if(!auth.AJAPI) {
        return loginAndHandling(url, data, APIKey, hostname);
    } else {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    }
}

function loginAndHandling(url, data, APIKey, hostname) {
    return login(clientAPI, APIKey, hostname).then(() => {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    });
}
