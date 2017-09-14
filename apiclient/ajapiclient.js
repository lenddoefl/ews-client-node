var ews = require('./ews.js'),
    auth = ews.getTokens(),
    login = ews.login,
    request = ews.request,
    generateURI = ews.generateURI;

var clientAPI = 'AJAPI';

function startSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI, 'startSession');

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
    let url = generateURI(hostname, clientAPI, 'finishSession');

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
    let url = generateURI(hostname, clientAPI, 'finishStep');

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
    let url = generateURI(hostname, clientAPI, 'createAttachment');

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
    let url = generateURI(hostname, clientAPI, 'getApplication');

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
    let url = generateURI(hostname, clientAPI, 'prefetchApplications');

    return login(clientAPI, APIKey, hostname).then(() => {
        return request(url, auth.AJAPI, data).then(response => {
            return response;
        });
    });
}

function resumeSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI, 'resumeSession');

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
