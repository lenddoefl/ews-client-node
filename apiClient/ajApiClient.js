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

function startSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'startSession');

    return generalRequest(url, data, APIKey, hostname);
}

function finishSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'finishSession');

    return generalRequest(url, data, APIKey, hostname);
}

function finishStep(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'finishStep');

    return generalRequest(url, data, APIKey, hostname);
}

function createAttachment(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'createAttachment');

    return generalRequest(url, data, APIKey, hostname);
}

function getApplication(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'getApplication');

    return generalRequest(url, data, APIKey, hostname);
}

function prefetchApplications(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'prefetchApplications');

    return loginAndHandling(url, data, APIKey, hostname);
}

function resumeSession(data, APIKey, hostname) {
    let url = generateURI(hostname, clientAPI.path, 'resumeSession');

    return loginAndHandling(url, data, APIKey, hostname);
}

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
