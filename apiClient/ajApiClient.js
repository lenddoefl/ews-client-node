var ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

let clientAPI = {
    name: 'AJAPI',
    path: 'api/v2/applicant_journey',
    data: 'data'
};

function startSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'startSession');

    if(!auth.AJAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.AJAPI, data).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    }
}

function finishSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'finishSession');

    if(!auth.AJAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.AJAPI, data).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    }
}

function finishStep(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'finishStep');

    if(!auth.AJAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.AJAPI, data).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    }
}

function createAttachment(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'createAttachment');

    if(!auth.AJAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.AJAPI, data).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    }
}

function getApplication(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'getApplication');

    if(!auth.AJAPI) {
        return login(clientAPI, APIKey, hostname).then(() => {
            return request(url, auth.AJAPI, data).then(response => {
                return response;
            });
        });
    } else {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    }
}

function prefetchApplications(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'prefetchApplications');

    return login(clientAPI, APIKey, hostname).then(() => {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    });
}

function resumeSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'resumeSession');

    return login(clientAPI, APIKey, hostname).then(() => {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    });
}

module.exports = {
    init: ews.init,
    login: ews.login,
    startSession: startSession,
    finishSession: finishSession,
    finishStep: finishStep,
    createAttachment: createAttachment,
    getApplication: getApplication,
    prefetchApplications: prefetchApplications,
    resumeSession: resumeSession,
    generateURI: generateURI
};
